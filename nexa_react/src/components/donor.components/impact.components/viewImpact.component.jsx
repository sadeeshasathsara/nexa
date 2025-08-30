import { TrendingUp, Users, Globe, Target, Calendar, DollarSign, Heart, Award } from 'lucide-react';
import React, { useState } from 'react';

const ViewImpact = ({ onBack }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');
  const [selectedCause, setSelectedCause] = useState('all');

  // Mock data - in real app, this would come from API
  const impactData = {
    totalDonations: 15420.50,
    totalDonationsCount: 47,
    peopleHelped: 2340,
    causesSupported: 8,
    countriesReached: 12,
    recurringDonations: 5,
    impactBreakdown: [
      { cause: 'Education', amount: 5200, people: 890, icon: '📚' },
      { cause: 'Healthcare', amount: 3800, people: 650, icon: '🏥' },
      { cause: 'Disaster Relief', amount: 2800, people: 420, icon: '🚑' },
      { cause: 'Environment', amount: 2200, people: 180, icon: '🌱' },
      { cause: 'Poverty Alleviation', amount: 1420.50, people: 200, icon: '🤝' }
    ],
    recentMilestones: [
      { date: '2024-01-15', milestone: 'Reached $15,000 total donations', icon: '🎉' },
      { date: '2024-01-10', milestone: 'Helped 2,000+ people', icon: '👥' },
      { date: '2024-01-05', milestone: 'Supported 8 different causes', icon: '🎯' },
      { date: '2023-12-20', milestone: 'First recurring donation setup', icon: '🔄' }
    ],
    monthlyTrends: [
      { month: 'Jan', amount: 1200, donations: 8 },
      { month: 'Feb', amount: 980, donations: 6 },
      { month: 'Mar', amount: 1500, donations: 9 },
      { month: 'Apr', amount: 1100, donations: 7 },
      { month: 'May', amount: 1800, donations: 11 },
      { month: 'Jun', amount: 2200, donations: 13 }
    ]
  };

  const getTimeframeLabel = (timeframe) => {
    const labels = {
      'all': 'All Time',
      'year': 'This Year',
      'month': 'This Month',
      'week': 'This Week'
    };
    return labels[timeframe] || timeframe;
  };

  const getCauseLabel = (cause) => {
    const labels = {
      'all': 'All Causes',
      'education': 'Education',
      'healthcare': 'Healthcare',
      'disaster-relief': 'Disaster Relief',
      'environment': 'Environment',
      'poverty': 'Poverty Alleviation'
    };
    return labels[cause] || cause;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
                  <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <TrendingUp className="w-8 h-8 text-green-500 mr-3" />
            Your Educational Impact Dashboard
          </h1>
          <p className="text-gray-600 mt-2">See the real difference your support is making in students' lives</p>
        </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timeframe</label>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Time</option>
                <option value="year">This Year</option>
                <option value="month">This Month</option>
                <option value="week">This Week</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Focus Area</label>
              <select
                value={selectedCause}
                onChange={(e) => setSelectedCause(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Focus Areas</option>
                <option value="math-science">Math & Science</option>
                <option value="language-arts">Language Arts</option>
                <option value="computer-science">Computer Science</option>
                <option value="special-needs">Special Needs</option>
                <option value="college-prep">College Prep</option>
                <option value="vocational-training">Vocational Training</option>
              </select>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Educational Support</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${impactData.totalDonations.toLocaleString()}
                    </p>
                  </div>
                </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Students Helped</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {impactData.peopleHelped.toLocaleString()}
                    </p>
                  </div>
                </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Focus Areas Supported</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {impactData.causesSupported}
                    </p>
                  </div>
                </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Countries Reached</p>
                <p className="text-2xl font-bold text-gray-900">
                  {impactData.countriesReached}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Impact by Focus Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="w-5 h-5 text-green-500 mr-2" />
            Impact by Focus Area
          </h3>
            <div className="space-y-4">
              {impactData.impactBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{item.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900">{item.cause}</p>
                      <p className="text-sm text-gray-600">{item.people} students helped</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">${item.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">
                      {((item.amount / impactData.totalDonations) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Milestones */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Award className="w-5 h-5 text-yellow-500 mr-2" />
              Recent Milestones
            </h3>
            <div className="space-y-4">
              {impactData.recentMilestones.map((milestone, index) => (
                <div key={index} className="flex items-start p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <span className="text-2xl mr-3">{milestone.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{milestone.milestone}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(milestone.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 text-blue-500 mr-2" />
            Monthly Educational Support Trends
          </h3>
          <div className="grid grid-cols-6 gap-4">
            {impactData.monthlyTrends.map((month, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-lg p-3 mb-2">
                  <div 
                    className="bg-blue-500 rounded-t-sm mx-auto"
                    style={{ 
                      height: `${(month.amount / 2200) * 100}px`,
                      maxHeight: '120px'
                    }}
                  ></div>
                </div>
                <p className="text-sm font-medium text-gray-900">{month.month}</p>
                <p className="text-xs text-gray-600">${month.amount}</p>
                <p className="text-xs text-gray-500">{month.donations} donations</p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Stories */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Heart className="w-5 h-5 text-red-500 mr-2" />
            Student Success Stories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Math & Science Tutoring</h4>
              <p className="text-blue-800 text-sm mb-3">
                Your support helped provide one-on-one tutoring to 150 students struggling with math and science, resulting in 85% grade improvement.
              </p>
              <div className="flex items-center text-blue-700 text-sm">
                <Users className="w-4 h-4 mr-1" />
                <span>150 students improved grades</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-6 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">College Preparation Program</h4>
              <p className="text-green-800 text-sm mb-3">
                Your support funded college prep workshops and SAT tutoring for 300 high school students, with 92% gaining college acceptance.
              </p>
              <div className="flex items-center text-green-700 text-sm">
                <Users className="w-4 h-4 mr-1" />
                <span>300 students college-ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-8 mt-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Continue Supporting Student Success</h3>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Every contribution counts. Whether it's a one-time gift or setting up recurring support, 
            you're helping students achieve their educational dreams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Support Another Student
            </button>
            <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
              Set Up Recurring Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewImpact;
