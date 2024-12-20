import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiPieChart, FiTarget, FiTrendingUp, FiShield } from 'react-icons/fi';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 pb-2">
              Master Your Money with BudgetVibe
            </h1>
            <p className="text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Experience the future of personal finance with AI-powered insights, 
              real-time tracking, and intelligent recommendations.
            </p>
            <div className="flex justify-center gap-6">
              <Link to="/signup" className="group relative inline-flex items-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Start Free Trial
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/demo" className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-purple-500 text-purple-400 hover:text-white hover:bg-purple-500 rounded-full text-lg font-semibold transition-all duration-300">
                Watch Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Why Choose BudgetVibe?</h2>
          <p className="text-gray-400 text-xl">Powerful features to transform your financial journey</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity" />
              <feature.icon className="text-4xl text-purple-500 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Features Showcase */}
      <div className="bg-gray-900/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">AI-Powered Financial Intelligence</h2>
            <p className="text-gray-400 text-xl">Let our advanced AI help you make smarter financial decisions</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-8 border border-purple-500/20"
              >
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  {feature.icon}
                  <span className="ml-3">{feature.title}</span>
                </h3>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start text-gray-300">
                      <FiCheck className="text-green-500 mt-1 mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-5xl font-bold text-white mb-8">
            Ready to Transform Your Financial Future?
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Join thousands of users who have already taken control of their finances with BudgetVibe.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105"
          >
            Get Started Now
            <FiArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

const features = [
  {
    icon: FiPieChart,
    title: "Smart Analytics",
    description: "Get detailed insights into your spending patterns with AI-powered analysis and personalized recommendations."
  },
  {
    icon: FiTarget,
    title: "Goal Setting",
    description: "Set and track financial goals with intelligent milestone tracking and achievement rewards."
  },
  {
    icon: FiTrendingUp,
    title: "Investment Tracking",
    description: "Monitor your investments and get real-time updates on your portfolio performance."
  }
];

const aiFeatures = [
  {
    icon: "🤖",
    title: "Predictive Analysis",
    benefits: [
      "Forecast future expenses based on spending patterns",
      "Receive early warnings about potential budget overruns",
      "Get personalized savings recommendations",
      "Smart categorization of transactions"
    ]
  },
  {
    icon: "✨",
    title: "Smart Insights",
    benefits: [
      "Custom financial advice based on your goals",
      "Automated expense categorization",
      "Intelligent budget adjustments",
      "Spending pattern analysis"
    ]
  }
];

export default HomePage;
