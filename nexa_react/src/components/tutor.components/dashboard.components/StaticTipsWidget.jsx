import React from "react";
import { Lightbulb, Users, BookOpen, TrendingUp } from "lucide-react";

const StaticTipsWidget = () => {
  const tips = [
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Engage Your Students",
      description:
        "Use interactive quizzes and multimedia content to keep students engaged",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Build Community",
      description:
        "Encourage discussions and peer-to-peer learning in your courses",
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Quality Content",
      description:
        "Break down complex topics into digestible lessons with clear objectives",
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Track Progress",
      description: "Monitor student performance and provide timely feedback",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Lightbulb className="w-6 h-6 text-yellow-500" />
        Teaching Tips
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="flex gap-3 p-3 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-md transition-shadow"
          >
            <div className="text-blue-600 flex-shrink-0 mt-1">{tip.icon}</div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">
                {tip.title}
              </h3>
              <p className="text-xs text-gray-600">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaticTipsWidget;
