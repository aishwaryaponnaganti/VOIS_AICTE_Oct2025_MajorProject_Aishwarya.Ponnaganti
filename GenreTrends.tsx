import { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface GenreData {
  genre: string;
  count: number;
}

export default function GenreTrends() {
  const [genres, setGenres] = useState<GenreData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGenreTrends();
  }, []);

  const fetchGenreTrends = async () => {
    try {
      const { data, error } = await supabase
        .from('netflix_content')
        .select('listed_in');

      if (error) throw error;

      const genreCount: { [key: string]: number } = {};

      data.forEach((item) => {
        if (item.listed_in) {
          const itemGenres = item.listed_in.split(',').map(g => g.trim());
          itemGenres.forEach(genre => {
            genreCount[genre] = (genreCount[genre] || 0) + 1;
          });
        }
      });

      const sortedGenres = Object.entries(genreCount)
        .map(([genre, count]) => ({ genre, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 15);

      setGenres(sortedGenres);
    } catch (error) {
      console.error('Error fetching genre trends:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse h-96" />;
  }

  const maxCount = genres[0]?.count || 1;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-6 w-6 text-red-600" />
        <h2 className="text-xl font-semibold text-gray-800">Top 15 Genres</h2>
      </div>

      <div className="space-y-3">
        {genres.map((genre, index) => (
          <div key={genre.genre} className="group">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-400 w-6">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-red-600 transition-colors">
                  {genre.genre}
                </span>
              </div>
              <span className="text-sm text-gray-600 font-semibold">
                {genre.count}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 ml-8">
              <div
                className="bg-gradient-to-r from-red-400 to-red-600 h-2 rounded-full transition-all duration-500 group-hover:from-red-500 group-hover:to-red-700"
                style={{ width: `${(genre.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-2">Genre Insights</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• {genres[0]?.genre} leads with {genres[0]?.count} titles</li>
          <li>• Top 3 genres account for significant content share</li>
          <li>• Diverse genre mix targets multiple audience segments</li>
        </ul>
      </div>
    </div>
  );
}
