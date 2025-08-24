const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, '../../public'))); // Serve static files
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// In-memory storage for designs (in production, you would use a database)
let designs = [];

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/designs', (req, res) => {
  res.json(designs);
});

app.post('/api/designs', (req, res) => {
  const design = {
    id: Date.now().toString(),
    name: req.body.name || `Design ${designs.length + 1}`,
    components: req.body.components || [],
    createdAt: new Date().toISOString()
  };
  
  designs.push(design);
  res.status(201).json(design);
});

app.get('/api/designs/:id', (req, res) => {
  const design = designs.find(d => d.id === req.params.id);
  if (!design) {
    return res.status(404).json({ error: 'Design not found' });
  }
  res.json(design);
});

// Serve the frontend application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Axiom server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the application`);
});