import { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import DataUpload from './components/DataUpload';
import OverviewStats from './components/OverviewStats';
import ContentTypeDistribution from './components/ContentTypeDistribution';
import GenreTrends from './components/GenreTrends';
import CountryDistribution from './components/CountryDistribution';
import YearlyTrends from './components/YearlyTrends';
import StrategicRecommendations from './components/StrategicRecommendations';

function App() {
  const [showUpload, setShowUpload] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-gradient-to-r from-red-600 to-red-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Netflix Content Analytics
                </h1>
                <p className="text-red-100 text-sm mt-1">
                  Strategic Insights & Trend Analysis Dashboard
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-600">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Problem Statement: Content Trends Analysis for Strategic Recommendations
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            This dashboard analyzes Netflix's content distribution (Movies vs. TV Shows, genres, and country contributions)
            to identify key trends, audience preferences, and strategic insights for global content expansion.
            The analysis covers 7,789+ records spanning multiple years and diverse international markets.
          </p>
        </div>

        {showUpload && (
          <div className="mb-8">
            <DataUpload />
            <button
              onClick={() => setShowUpload(false)}
              className="mt-4 text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              Hide upload section
            </button>
          </div>
        )}

        {!showUpload && (
          <button
            onClick={() => setShowUpload(true)}
            className="mb-8 text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            Show upload section
          </button>
        )}

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Overview Statistics</h2>
          <OverviewStats />
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Content Distribution Analysis</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ContentTypeDistribution />
            <YearlyTrends />
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Genre & Geographic Insights</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GenreTrends />
            <CountryDistribution />
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Strategic Recommendations</h2>
          <StrategicRecommendations />
        </section>

        <section className="mb-8">
          <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg shadow-sm p-6 border border-red-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Expected Outcomes & Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-red-600 mb-2">Content Strategy Evolution</h3>
                <p className="text-sm text-gray-600">
                  Clear understanding of how Netflix's content library has grown and evolved over the years
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-red-600 mb-2">Top-Performing Genres</h3>
                <p className="text-sm text-gray-600">
                  Identification of the most popular content categories and genre performance trends
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-red-600 mb-2">Strategic Focus Areas</h3>
                <p className="text-sm text-gray-600">
                  Data-driven recommendations on which content types Netflix should prioritize for future growth
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-400">
            Netflix Content Analytics Dashboard - Strategic Data Analysis for Content Optimization
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
