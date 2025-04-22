'use client';
import { useState } from 'react';

type Store = {
  id: string;
  name: string;
  location: string;
  whatsappNumber: string;
  assignedAgents: string[];
};

type Agent = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export default function AdminSettings() {
  // Mock data
  const [stores, setStores] = useState<Store[]>([
    {
      id: '1',
      name: 'Main Store',
      location: '123 Main St',
      whatsappNumber: '+15551234567',
      assignedAgents: ['1', '2']
    },
    {
      id: '2',
      name: 'Downtown Branch',
      location: '456 Center Ave',
      whatsappNumber: '+15552345678',
      assignedAgents: ['2']
    }
  ]);

  const [agents, setAgents] = useState<Agent[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+15551112222' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+15552223333' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', phone: '+15553334444' }
  ]);

  const [activeTab, setActiveTab] = useState<'stores' | 'agents' | 'whatsapp'>('stores');
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [newWhatsappNumber, setNewWhatsappNumber] = useState('');

  // Store CRUD operations
  const handleAddStore = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const newStore: Store = {
      id: Date.now().toString(),
      name: form.storeName.value,
      location: form.storeLocation.value,
      whatsappNumber: form.whatsappNumber.value,
      assignedAgents: Array.from(form.assignedAgents.selectedOptions).map(opt => opt.value)
    };
    setStores([...stores, newStore]);
    form.reset();
  };

  const handleUpdateStore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStore) return;
    
    const form = e.target as HTMLFormElement;
    const updatedStore: Store = {
      ...editingStore,
      name: form.storeName.value,
      location: form.storeLocation.value,
      whatsappNumber: form.whatsappNumber.value,
      assignedAgents: Array.from(form.assignedAgents.selectedOptions).map(opt => opt.value)
    };
    
    setStores(stores.map(store => store.id === updatedStore.id ? updatedStore : store));
    setEditingStore(null);
  };

  const handleDeleteStore = (id: string) => {
    setStores(stores.filter(store => store.id !== id));
  };

  // Agent CRUD operations
  const handleAddAgent = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const newAgent: Agent = {
      id: Date.now().toString(),
      name: form.agentName.value,
      email: form.agentEmail.value,
      phone: form.agentPhone.value
    };
    setAgents([...agents, newAgent]);
    form.reset();
  };

  const handleUpdateAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAgent) return;
    
    const form = e.target as HTMLFormElement;
    const updatedAgent: Agent = {
      ...editingAgent,
      name: form.agentName.value,
      email: form.agentEmail.value,
      phone: form.agentPhone.value
    };
    
    setAgents(agents.map(agent => agent.id === updatedAgent.id ? updatedAgent : agent));
    setEditingAgent(null);
  };

  const handleDeleteAgent = (id: string) => {
    setAgents(agents.filter(agent => agent.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>
      
      {/* Navigation Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'stores' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('stores')}
        >
          Stores
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'agents' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('agents')}
        >
          Sales Agents
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'whatsapp' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('whatsapp')}
        >
          WhatsApp Numbers
        </button>
      </div>

      {/* Stores Tab */}
      {activeTab === 'stores' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Manage Stores</h2>
            
            {/* Add/Edit Store Form */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-3 text-black">{editingStore ? 'Edit Store' : 'Add New Store'}</h3>
              <form onSubmit={editingStore ? handleUpdateStore : handleAddStore} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                  <input
                    type="text"
                    name="storeName"
                    defaultValue={editingStore?.name || ''}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="storeLocation"
                    defaultValue={editingStore?.location || ''}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                  <input
                    type="tel"
                    name="whatsappNumber"
                    defaultValue={editingStore?.whatsappNumber || ''}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Agents</label>
                  <select
                    name="assignedAgents"
                    multiple
                    defaultValue={editingStore?.assignedAgents || []}
                    className="w-full p-2 border rounded min-h-[100px] text-black"
                  >
                    {agents.map(agent => (
                      <option key={agent.id} value={agent.id}>
                        {agent.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {editingStore ? 'Update Store' : 'Add Store'}
                  </button>
                  {editingStore && (
                    <button
                      type="button"
                      onClick={() => setEditingStore(null)}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
            
            {/* Stores List */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WhatsApp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agents</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stores.map(store => (
                    <tr key={store.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{store.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{store.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{store.whatsappNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {store.assignedAgents.map(id => {
                          const agent = agents.find(a => a.id === id);
                          return agent ? (
                            <span key={id} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                              {agent.name}
                            </span>
                          ) : null;
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setEditingStore(store)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteStore(store.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Agents Tab */}
      {activeTab === 'agents' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Manage Sales Agents</h2>
            
            {/* Add/Edit Agent Form */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-3 text-black">{editingAgent ? 'Edit Agent' : 'Add New Agent'}</h3>
              <form onSubmit={editingAgent ? handleUpdateAgent : handleAddAgent} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="agentName"
                    defaultValue={editingAgent?.name || ''}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="agentEmail"
                    defaultValue={editingAgent?.email || ''}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="agentPhone"
                    defaultValue={editingAgent?.phone || ''}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {editingAgent ? 'Update Agent' : 'Add Agent'}
                  </button>
                  {editingAgent && (
                    <button
                      type="button"
                      onClick={() => setEditingAgent(null)}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
            
            {/* Agents List */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {agents.map(agent => (
                    <tr key={agent.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{agent.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{agent.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{agent.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setEditingAgent(agent)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAgent(agent.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Numbers Tab */}
      {activeTab === 'whatsapp' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">WhatsApp Numbers</h2>
            
            {/* Add WhatsApp Number */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-3 text-black">Add WhatsApp Number</h3>
              <div className="flex space-x-2">
                <input
                  type="tel"
                  value={newWhatsappNumber}
                  onChange={(e) => setNewWhatsappNumber(e.target.value)}
                  placeholder="+1234567890"
                  className="flex-1 p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newWhatsappNumber) {
                      alert(`Number ${newWhatsappNumber} would be added in a real implementation`);
                      setNewWhatsappNumber('');
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add Number
                </button>
              </div>
            </div>
            
            {/* WhatsApp Numbers List */}
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <ul className="divide-y divide-gray-200">
                {stores.map(store => (
                  <li key={store.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 text-black">{store.name}</p>
                        <p className="text-sm text-gray-500">{store.whatsappNumber}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => alert(`Would edit ${store.whatsappNumber} in a real implementation`)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
