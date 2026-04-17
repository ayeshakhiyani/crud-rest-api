const express = require('express');
const app = express();
app.use(express.json());

// Array for storing data
let items = [];

// CREATE - POST endpoint
app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json({
    message: 'Item created successfully',
    data: newItem
  });
});

// READ - GET all items
app.get('/items', (req, res) => {
  res.json({
    message: 'All items',
    data: items
  });
});

// READ - GET single item by id
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(item => item.id === id);
  
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  
  res.json({
    message: 'Item found',
    data: item
  });
});

// UPDATE - PUT endpoint (edit)
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(item => item.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }
  
  items[index] = { ...items[index], ...req.body };
  res.json({
    message: 'Item updated successfully',
    data: items[index]
  });
});

// DELETE - DELETE endpoint
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(item => item.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }
  
  items.splice(index, 1);
  res.json({ message: 'Item deleted successfully' });
});

// Test route
app.get('/', (req, res) => {
  res.send('API is working!');
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});