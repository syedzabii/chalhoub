// Mock data implementation
const mockData = {
  users: [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ],
  products: [
    { id: 1, name: 'Product 1', price: 9.99 },
    { id: 2, name: 'Product 2', price: 19.99 }
  ]
};

export async function connectToDatabase() {
  return { db: mockData };
}

export async function getDb() {
  const db = await connectToDatabase();
  return db.db;
}
