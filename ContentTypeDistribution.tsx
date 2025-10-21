import { useEffect, useState } from 'react';
import { Film, Tv } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface TypeStats {
  type: string;
  count: number;
  percentage: number;
}

export default function ContentTypeDistribution() {
  const [stats, setStats] = useState<TypeStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTypeDistribution();
  }, []);

  const fetchTypeDistribution = async () => {
    try {
      const { data, error } = await supabase
        .from('netflix_content')
        .select('type');

      if (error) throw error;

      const typeCounts = data.reduce((acc: any, item) => {
        acc[item.type] = (acc[item.type] || 0) + 1;
        return acc;
      }, {});

      const total = data.length;
      const typeStats = Object.entries(typeCounts).map(([type, count]) => ({
        type,
        count: count as number,
        percentage: ((count as number / total) * 100)
      }));

      setStats(typeStats);
    } catch (error) {
      console.error('Error fetching type distribution:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse h-64" />;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Content Type Distribution</h2>

      <div className="space-y-6">
        {stats.map((stat) => (
          <div key={stat.type}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                {stat.type === 'Movie' ? (
                  <Film className="h-5 w-5 text-red-600" />
                ) : (
                  <Tv className="h-5 w-5 text-red-600" />
                )}
                <span className="font-medium text-gray-700">{stat.type}</span>
              </div>
              <span className="text-sm text-gray-600">
                {stat.count} ({stat.percentage.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${stat.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600 leading-relaxed">
          The distribution shows Netflix's content strategy balance.
          {stats.find(s => s.type === 'Movie')?.percentage > 60
            ? ' Movies dominate the catalog, indicating focus on standalone content.'
            : ' A balanced mix of Movies and TV Shows caters to diverse viewing preferences.'}
        </p>
      </div>
    </div>
  );
}
