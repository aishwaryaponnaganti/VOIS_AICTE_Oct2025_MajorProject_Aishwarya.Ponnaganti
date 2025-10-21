import { useEffect, useState } from 'react';
import { Film, Tv, Calendar, Globe } from 'lucide-react';
import { supabase } from '../lib/supabase';
import StatCard from './StatCard';

interface Stats {
  totalContent: number;
  totalMovies: number;
  totalTvShows: number;
  totalCountries: number;
  averageReleaseYear: number;
}

export default function OverviewStats() {
  const [stats, setStats] = useState<Stats>({
    totalContent: 0,
    totalMovies: 0,
    totalTvShows: 0,
    totalCountries: 0,
    averageReleaseYear: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('netflix_content')
        .select('type, country, release_year');

      if (error) throw error;

      const totalContent = data.length;
      const totalMovies = data.filter(item => item.type === 'Movie').length;
      const totalTvShows = data.filter(item => item.type === 'TV Show').length;

      const countriesSet = new Set<string>();
      data.forEach(item => {
        if (item.country) {
          item.country.split(',').forEach(c => countriesSet.add(c.trim()));
        }
      });

      const validYears = data
        .filter(item => item.release_year)
        .map(item => item.release_year);
      const averageReleaseYear = validYears.length > 0
        ? Math.round(validYears.reduce((sum, year) => sum + year, 0) / validYears.length)
        : 0;

      setStats({
        totalContent,
        totalMovies,
        totalTvShows,
        totalCountries: countriesSet.size,
        averageReleaseYear
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse h-32" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatCard
        title="Total Movies"
        value={stats.totalMovies.toLocaleString()}
        icon={Film}
        trend={`${((stats.totalMovies / stats.totalContent) * 100).toFixed(1)}%`}
      />
      <StatCard
        title="Total TV Shows"
        value={stats.totalTvShows.toLocaleString()}
        icon={Tv}
        trend={`${((stats.totalTvShows / stats.totalContent) * 100).toFixed(1)}%`}
      />
      <StatCard
        title="Countries"
        value={stats.totalCountries}
        icon={Globe}
      />
      <StatCard
        title="Avg Release Year"
        value={stats.averageReleaseYear}
        icon={Calendar}
      />
    </div>
  );
}
