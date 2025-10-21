import { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface YearData {
  year: number;
  movies: number;
  tvShows: number;
  total: number;
}

export default function YearlyTrends() {
  const [yearlyData, setYearlyData] = useState<YearData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchYearlyTrends();
  }, []);

  const fetchYearlyTrends = async () => {
    try {
      const { data, error } = await supabase
        .from('netflix_content')
        .select('release_year, type')
        .not('release_year', 'is', null)
        .gte('release_year', 2010)
        .order('release_year', { ascending: true });

      if (error) throw error;

      const yearMap: { [key: number]: YearData } = {};

      data.forEach((item) => {
        const year = item.release_year;
        if (!yearMap[year]) {
          yearMap[year] = { year, movies: 0, tvShows: 0, total: 0 };
        }

        if (item.type === 'Movie') {
          yearMap[year].movies++;
        } else {
          yearMap[year].tvShows++;
        }
        yearMap[year].total++;
      });

      const sortedData = Object.values(yearMap).sort((a, b) => a.year - b.year);
      setYearlyData(sortedData);
    } catch (error) {
      console.error('Error fetching yearly trends:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse h-96" />;
  }

  const maxTotal = Math.max(...yearlyData.map(d => d.total));

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="h-6 w-6 text-red-600" />
        <h2 className="text-xl font-semibold text-gray-800">Content Release Trends (2010-2021)</h2>
      </div>

      <div className="space-y-4">
        {yearlyData.map((yearData) => (
          <div key={yearData.year} className="group">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-700 w-16">
                {yearData.year}
              </span>
              <div className="flex gap-4 text-xs">
                <span className="text-blue-600">
                  Movies: {yearData.movies}
                </span>
                <span className="text-green-600">
                  TV Shows: {yearData.tvShows}
                </span>
                <span className="font-semibold text-gray-700">
                  Total: {yearData.total}
                </span>
              </div>
            </div>
            <div className="flex gap-1 h-8">
              <div
                className="bg-blue-500 rounded-l transition-all duration-300 group-hover:bg-blue-600 flex items-center justify-center"
                style={{ width: `${(yearData.movies / maxTotal) * 100}%` }}
              >
                {yearData.movies > maxTotal * 0.1 && (
                  <span className="text-xs text-white font-medium">{yearData.movies}</span>
                )}
              </div>
              <div
                className="bg-green-500 rounded-r transition-all duration-300 group-hover:bg-green-600 flex items-center justify-center"
                style={{ width: `${(yearData.tvShows / maxTotal) * 100}%` }}
              >
                {yearData.tvShows > maxTotal * 0.1 && (
                  <span className="text-xs text-white font-medium">{yearData.tvShows}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded" />
            <span className="text-sm text-gray-600">Movies</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded" />
            <span className="text-sm text-gray-600">TV Shows</span>
          </div>
        </div>
      </div>
    </div>
  );
}
