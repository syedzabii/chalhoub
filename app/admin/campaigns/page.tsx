'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Template = {
  id: string;
  name: string;
  category: string;
  approved: boolean;
  content: string;
};

type Tag = {
  id: string;
  name: string;
  color: string;
};

export default function CampaignManager() {
  const router = useRouter();
  
  // Mock data
  const mockTemplates: Template[] = [
    {
      id: '1',
      name: 'Welcome Offer',
      category: 'Promotional',
      approved: true,
      content: 'Hi {name}, enjoy 20% off your first purchase! Use code WELCOME20.'
    },
    {
      id: '2',
      name: 'Order Update',
      category: 'Transactional',
      approved: true,
      content: 'Hello {name}, your order #{order_id} has been shipped.'
    },
    {
      id: '3',
      name: 'Feedback Request',
      category: 'Service',
      approved: true,
      content: 'Hi {name}, how was your recent experience with us?'
    }
  ];

  const mockTags: Tag[] = [
    { id: '1', name: 'VIP', color: 'bg-purple-500' },
    { id: '2', name: 'New Customer', color: 'bg-green-500' },
    { id: '3', name: 'Inactive', color: 'bg-gray-500' },
    { id: '4', name: 'High Value', color: 'bg-yellow-500' }
  ];

  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [scheduleDate, setScheduleDate] = useState<string>('');
  const [scheduleTime, setScheduleTime] = useState<string>('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate API call
    setTimeout(() => {
      alert('Campaign scheduled successfully!');
      setIsSending(false);
      router.push('/admin/campaigns');
    }, 1500);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">WhatsApp Campaign Manager</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Template Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Select Template</label>
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="w-full p-3 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 focus:ring-2 focus:ring-blue-500 text-black"
            required
          >
            <option value="">-- Select a template --</option>
            {mockTemplates
              .filter(t => t.approved)
              .map(template => (
                <option key={template.id} value={template.id}>
                  {template.name} ({template.category})
                </option>
              ))}
          </select>
          
          {selectedTemplate && (
            <div className="p-4 bg-gray-50 rounded-lg mt-2">
              <h3 className="font-medium mb-2">Template Preview:</h3>
              <p className="whitespace-pre-line bg-white p-3 rounded border">
                {mockTemplates.find(t => t.id === selectedTemplate)?.content}
              </p>
            </div>
          )}
        </div>

        {/* Recipient Filtering */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Filter Recipients</label>
          <div className="flex flex-wrap gap-2">
            {mockTags.map(tag => (
              <label key={tag.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag.id)}
                  onChange={() => {
                    setSelectedTags(prev => 
                      prev.includes(tag.id)
                        ? prev.filter(id => id !== tag.id)
                        : [...prev, tag.id]
                    );
                  }}
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300 text-black"
                />
                <span className={`px-2 py-1 text-xs rounded-full text-white ${tag.color}`}>
                  {tag.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Scheduling */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Date</label>
            <input
              type="date"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-3 border rounded-lg bg-gradient-to-r from-green-50 to-blue-50 border-green-200 focus:ring-2 focus:ring-green-500 text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Time</label>
            <input
              type="time"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 focus:ring-2 focus:ring-yellow-500 text-black"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSending}
          className={`w-full py-3 px-4 rounded-lg font-medium text-black ${isSending ? 'bg-gray-400' : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600'}`}
        >
          {isSending ? 'Sending Campaign...' : 'Schedule Campaign'}
        </button>
      </form>

      {/* Campaign Stats Preview */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-4 text-black">Campaign Preview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-blue-600">1,250</div>
            <div className="text-sm text-gray-500">Total Recipients</div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-green-600">98%</div>
            <div className="text-sm text-gray-500">Approval Rate</div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-purple-600">3</div>
            <div className="text-sm text-gray-500">Variables Used</div>
          </div>
        </div>
      </div>
    </div>
  );
}
