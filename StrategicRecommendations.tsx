import { Lightbulb, Target, TrendingUp, Globe2 } from 'lucide-react';

export default function StrategicRecommendations() {
  const recommendations = [
    {
      icon: Target,
      title: 'Content Balance Optimization',
      description: 'Maintain the current Movies to TV Shows ratio while monitoring audience engagement metrics. Consider increasing TV Show production for better subscriber retention through episodic content.',
      priority: 'High',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      icon: TrendingUp,
      title: 'Genre Diversification',
      description: 'While focusing on top-performing genres, invest in underrepresented categories like documentaries and limited series to capture niche audiences and differentiate from competitors.',
      priority: 'Medium',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Globe2,
      title: 'Regional Content Expansion',
      description: 'Expand content acquisition and production in emerging markets beyond the top 5 countries. Focus on Asian, African, and South American content to capture growing international subscriber bases.',
      priority: 'High',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Lightbulb,
      title: 'Original Content Strategy',
      description: 'Increase investment in original productions for top-performing genres while maintaining licensed content for catalog depth. Original content drives brand differentiation and reduces licensing costs long-term.',
      priority: 'High',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="h-6 w-6 text-red-600" />
        <h2 className="text-xl font-semibold text-gray-800">Strategic Recommendations</h2>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all">
            <div className="flex items-start gap-4">
              <div className={`p-3 ${rec.bgColor} rounded-lg flex-shrink-0`}>
                <rec.icon className={`h-6 w-6 ${rec.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">{rec.title}</h3>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    rec.priority === 'High'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {rec.priority} Priority
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {rec.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-3">Key Takeaways</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-0.5">•</span>
            <span>Netflix should focus on producing more original content in top-performing genres while maintaining a balanced content catalog</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-0.5">•</span>
            <span>Geographic expansion into underrepresented markets offers significant growth opportunities</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-0.5">•</span>
            <span>TV Shows provide better long-term engagement; increasing their proportion could improve retention rates</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-0.5">•</span>
            <span>Diversifying genre offerings will help capture niche audiences and reduce dependency on mainstream categories</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
