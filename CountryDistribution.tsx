import { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CountryData {
  country: string;
  count: number;
}

export default function CountryDistribution() {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountryDistribution();
  }, []);

  const fetchCountryDistribution = async () => {
    try {
      const { data, error } = await supabase
        .from('netflix_content')
        .select('country');

      if (error) throw error;

      const countryCount: { [key: string]: number } = {};

      data.forEach((item) => {
        if (item.country) {
          const itemCountries = item.country.split(',').map(c => c.trim());
          itemCountries.forEach(country => {
            if (country) {
              countryCount[country] = (countryCount[country] || 0) + 1;
            }
          });
        }
      });

      const sortedCountries = Object.entries(countryCount)
        .map(([country, count]) => ({ country, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 12);

      setCountries(sortedCountries);
    } catch (error) {
      console.error('Error fetching country distribution:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse h-96" />;
  }

  const maxCount = countries[0]?.count || 1;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="h-6 w-6 text-red-600" />
        <h2 className="text-xl font-semibold text-gray-800">Top Content Producing Countries</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {countries.map((country, index) => (
          <div key={country.country} className="group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full group-hover:bg-red-200 transition-colors">
                  <span className="text-xs font-bold text-red-600">
                    {index + 1}
                  </span>
                </div>
                <span className="font-medium text-gray-700 group-hover:text-red-600 transition-colors">
                  {country.country}
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                {country.count} titles
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 h-2.5 rounded-full transition-all duration-500 group-hover:from-red-500 group-hover:to-red-700"
                style={{ width: `${(country.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-2">Global Reach Analysis</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {countries[0]?.country} dominates with {countries[0]?.count} titles, showcasing Netflix's strong presence.
          The diversity across {countries.length} countries demonstrates Netflix's global content strategy
          and commitment to regional representation.
        </p>
      </div>
    </div>
  );
}
