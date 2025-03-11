import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function handler(req, res) {
  await client.connect();
  const db = client.db();
  const transactions = db.collection('transactions');

  if (req.method === 'GET') {
    const data = await transactions.find({}).toArray();
    res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const newTransaction = req.body;
    await transactions.insertOne(newTransaction);
    res.status(201).json(newTransaction);
  }

  if (req.method === 'PUT') {
    const { id, updatedTransaction } = req.body;
    await transactions.updateOne({ _id: id }, { $set: updatedTransaction });
    res.status(200).json(updatedTransaction);
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    await transactions.deleteOne({ _id: id });
    res.status(200).json({ message: 'Deleted successfully' });
  }
}

export default handler;
