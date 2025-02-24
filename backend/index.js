const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User'); // Import du modèle User


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Pour parser les requêtes JSON

// Connexion à MongoDB Atlas
const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Exemple de route API
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// ✅ Route GET - Récupérer tous les utilisateurs
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// ✅ Route POST - Ajouter un utilisateur
app.post('/api/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = new User({ name, email });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: 'Impossible d’ajouter l’utilisateur' });
    }
});

// ✅ Route PUT - Modifier un utilisateur
app.put('/api/users/:id', async (req, res) => {
    try {
        const { name, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: 'Impossible de modifier l’utilisateur' });
    }
});

// ✅ Route DELETE - Supprimer un utilisateur
app.delete('/api/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Utilisateur supprimé' });
    } catch (err) {
        res.status(400).json({ error: 'Erreur lors de la suppression' });
    }
});
// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
