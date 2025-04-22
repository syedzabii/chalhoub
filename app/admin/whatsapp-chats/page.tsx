'use client';
import { useState, useEffect } from 'react';

type Message = {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  store: string;
};

type Store = {
  id: string;
  name: string;
};

export default function WhatsAppChats() {
  // Mock stores data
  const mockStores: Store[] = [
    { id: '1', name: 'Main Store' },
    { id: '2', name: 'Downtown Branch' },
    { id: '3', name: 'Westside Outlet' }
  ];

  // Mock chat messages
  const mockMessages: Message[] = [
    {
      id: '1',
      sender: 'Sales Agent 1',
      text: 'Hello, how can I help you today?',
      timestamp: new Date(),
      store: '1'
    },
    {
      id: '2',
      sender: 'Customer',
      text: 'I have a question about product availability',
      timestamp: new Date(),
      store: '1'
    },
    {
      id: '3',
      sender: 'Sales Agent 2',
      text: 'Welcome to our store!',
      timestamp: new Date(),
      store: '2'
    }
  ];

  const [selectedStore, setSelectedStore] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (selectedStore) {
      // Filter messages by selected store
      const filteredMessages = mockMessages.filter(
        message => message.store === selectedStore
      );
      setMessages(filteredMessages);

      // Simulate real-time updates
      const interval = setInterval(() => {
        // In a real app, this would fetch new messages
        console.log('Checking for new messages...');
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [selectedStore]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">WhatsApp Chat Monitor</h1>
      
      <div className="mb-6">
        <label htmlFor="store-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Store
        </label>
        <select
          id="store-select"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
        >
          <option value="">-- Select a store --</option>
          {mockStores.map(store => (
            <option key={store.id} value={store.id}>
              {store.name}
            </option>
          ))}
        </select>
      </div>

      <div className="border rounded-lg p-4 bg-gray-50">
        <h2 className="text-lg font-semibold mb-4">Chat Logs</h2>
        
        {selectedStore ? (
          <div className="space-y-4">
            {messages.length > 0 ? (
              messages.map(message => (
                <div key={message.id} className="p-3 bg-white rounded-lg shadow">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-medium">{message.sender}</span>
                    <span className="text-xs text-gray-500">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p>{message.text}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No messages found for this store</p>
            )}
          </div>
        ) : (
          <p className="text-gray-500">Please select a store to view chat logs</p>
        )}
      </div>
    </div>
  );
}
