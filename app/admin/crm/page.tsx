'use client';
import { useEffect, useState } from 'react';

type Customer = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  store?: string;
  agent?: string;
  status?: 'new' | 'contacted' | 'converted';
};

const mockData = {
  users: [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    { id: 3, name: 'Bob Smith', email: 'bob@example.com' },
  ]
};

export default function CRMPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    store: '',
    agent: '',
    status: ''
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // Filter mock data based on filters
        let results = mockData.users.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          status: 'new' as const
        }));
        
        if (filters.status) {
          results = results.filter(c => c.status === filters.status);
        }
        
        setCustomers(results);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div>Loading customers...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Customer Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Store</label>
          <select
            name="store"
            className="bg-gradient-to-r from-pink-200 to-red-200 border-2 border-pink-400 rounded-lg p-2 text-pink-800 font-medium focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            value={filters.store}
            onChange={handleFilterChange}
          >
            <option value="">All Stores</option>
            <option value="Main Store" className="bg-red-100 text-red-800 text-black">Main Store</option>
            <option value="Downtown" className="bg-orange-100 text-orange-800 text-black">Downtown</option>
            <option value="Westside" className="bg-amber-100 text-amber-800 text-black">Westside</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Agent</label>
          <select
            name="agent"
            className="bg-gradient-to-r from-teal-200 to-cyan-200 border-2 border-teal-400 rounded-lg p-2 text-teal-800 font-medium focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            value={filters.agent}
            onChange={handleFilterChange}
          >
            <option value="">All Agents</option>
            <option value="John" className="bg-cyan-100 text-cyan-800">John</option>
            <option value="Sarah" className="bg-emerald-100 text-emerald-800">Sarah</option>
            <option value="Mike" className="bg-sky-100 text-sky-800">Mike</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            className="bg-gradient-to-r from-purple-200 to-blue-200 border-2 border-purple-400 rounded-lg p-2 text-purple-800 font-medium focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">All Statuses</option>
            <option value="new" className="bg-green-100 text-green-800">New</option>
            <option value="contacted" className="bg-yellow-100 text-yellow-800">Contacted</option>
            <option value="converted" className="bg-blue-100 text-blue-800">Converted</option>
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 hidden sm:table-header-group">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id} className={`block sm:table-row mb-4 sm:mb-0 ${customer.status === 'new' ? 'bg-green-50 hover:bg-green-100' : customer.status === 'contacted' ? 'bg-yellow-50 hover:bg-yellow-100' : 'bg-blue-50 hover:bg-blue-100'}`}>
                <td className="block sm:hidden px-4 py-3">
                  <div className="space-y-1">
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-gray-500">{customer.email}</div>
                    <div className="text-sm">{customer.phone}</div>
                    <div className="text-sm">
                      Status: <span className={`capitalize px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${customer.status === 'new' ? 'bg-blue-100 text-blue-800' : customer.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                        {customer.status}
                      </span>
                    </div>
                  </div>
                </td>
                
                <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">{customer.name}</td>
                <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">{customer.email}</td>
                <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">{customer.phone}</td>
                <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap capitalize">{customer.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
