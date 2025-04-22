import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <main className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Welcome to <span className="text-blue-600">My App</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Your powerful dashboard for managing stores, agents, and customer relationships
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/admin/settings"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </a>
            <a 
              href="/admin/crm" 
              className="px-8 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              View CRM
            </a>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Store Management</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Easily manage all your store locations, details, and assigned agents in one place.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Agent Coordination</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Keep track of your sales team with detailed agent profiles and assignments.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Customer Relations</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Streamline customer interactions with our integrated CRM system.
            </p>
          </div>
        </section>

        {/* Admin Quick Access */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Admin Dashboard</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/admin/settings" 
              className="px-6 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Store Settings
            </a>
            <a 
              href="/admin/crm" 
              className="px-6 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              CRM
            </a>
            <a 
              href="/admin/settings?tab=whatsapp" 
              className="px-6 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              WhatsApp Numbers
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
