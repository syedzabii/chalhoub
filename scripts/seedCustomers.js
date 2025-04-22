const { MongoClient } = require('mongodb');
require('dotenv').config();

async function seedCustomers() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db();
    
    const customers = [
      { name: 'John Doe', email: 'john@example.com', phone: '1234567890', store: 'store1', agent: 'agent1', status: 'new', createdAt: new Date() },
      { name: 'Jane Smith', email: 'jane@example.com', phone: '9876543210', store: 'store2', agent: 'agent2', status: 'contacted', createdAt: new Date() },
      { name: 'Bob Johnson', email: 'bob@example.com', phone: '5551234567', store: 'store1', agent: 'agent1', status: 'converted', createdAt: new Date() },
      { name: 'Alice Williams', email: 'alice@example.com', phone: '4445556666', store: 'store2', agent: 'agent2', status: 'new', createdAt: new Date() },
    ];
    
    await db.collection('customers').insertMany(customers);
    console.log('Successfully seeded customers');
  } finally {
    await client.close();
  }
}

seedCustomers().catch(console.error);
