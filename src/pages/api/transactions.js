import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function handler(req, res) {
  try {
    await client.connect();
    const db = client.db();
    const transactions = db.collection('transactions');

    if (req.method === 'GET') {
      const data = await transactions.find({}).sort({ date: -1 }).toArray();
      const formattedData = data.map(txn => ({
        ...txn,
        _id: txn._id.toString(),
        date: new Date(txn.date).toISOString().split('T')[0]
      }));
      res.status(200).json(formattedData);
    }

    else if (req.method === 'POST') {
      const newTransaction = {
        ...req.body,
        date: req.body.date,
        amount: parseFloat(req.body.amount)
      };
      
      const result = await transactions.insertOne(newTransaction);
      res.status(201).json({ 
        ...newTransaction, 
        _id: result.insertedId.toString() 
      });
    }

    else if (req.method === 'PUT') {
      try {
        const { _id, ...updatedFields } = req.body;
        
        if (!_id) {
          return res.status(400).json({ error: 'Transaction ID is required' });
        }

        console.log('Updating transaction with ID:', _id);
        console.log('Update fields:', updatedFields);

        const formattedUpdate = {
          ...updatedFields,
          date: updatedFields.date,
          amount: parseFloat(updatedFields.amount)
        };

        console.log('Formatted update:', formattedUpdate);

        const objectId = new ObjectId(_id);
        console.log('Created ObjectId:', objectId);
        
        const result = await transactions.findOneAndUpdate(
          { _id: objectId },
          { $set: formattedUpdate },
          { returnDocument: 'after' }
        );

        console.log('MongoDB result:', result);

        if (!result) {
          console.log('No result returned from MongoDB');
          return res.status(404).json({ error: 'Transaction not found' });
        }

        // Handle both old and new MongoDB driver response formats
        const updatedDoc = result.value || result;
        
        if (!updatedDoc) {
          console.log('No document in result:', result);
          return res.status(404).json({ error: 'Transaction not found' });
        }

        const response = {
          ...updatedDoc,
          _id: updatedDoc._id.toString(),
          date: updatedDoc.date
        };

        console.log('Sending response:', response);
        res.status(200).json(response);
      } catch (error) {
        console.error('PUT Error:', error);
        if (error.message.includes('ObjectId')) {
          return res.status(400).json({ error: 'Invalid transaction ID format' });
        }
        throw error;
      }
    }

    else if (req.method === 'DELETE') {
      const { id } = req.body;
      
      if (!id) {
        return res.status(400).json({ error: 'Transaction ID is required' });
      }

      try {
        const objectId = new ObjectId(id);
        const result = await transactions.deleteOne({ _id: objectId });

        if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'Transaction not found' });
        }

        res.status(200).json({ message: 'Transaction deleted successfully' });
      } catch (error) {
        if (error.message.includes('ObjectId')) {
          return res.status(400).json({ error: 'Invalid transaction ID format' });
        }
        throw error;
      }
    }

    else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Don't close the client on every request in development
    if (process.env.NODE_ENV === 'production') {
      await client.close();
    }
  }
}

export default handler;
