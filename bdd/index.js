const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/Users');
const Course = require('./models/Courses');
const Denounce = require('./models/Denounce');
const bcrypt = require('bcryptjs'); // Pour comparer les mots de passe hachés


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const URI = process.env.MONGO_URI;

mongoose.connect(URI)
.then(() => console.log("Connecté à Atlas"))
.catch(err => console.error('Erreur de connexion à Atlas :', err))

// ✅ Route POST - Ajouter une dénonciation
app.post('/api/denounce', async (req, res) => {
    try {
        const { name, lastName, adress, street, abuseType, message } = req.body;
        const newDenounce = new Denounce({ name, lastName, adress, street, abuseType, message });
        await newDenounce.save();
        res.status(201).json(newDenounce);
    } catch (err) {
        res.status(400).json({ error: "Impossible d’ajouter la dénonciation" });
    }
});


// ✅ Route pour récupérer tous les cours
app.get('/api/courses', async (req, res) => {
    try{
        const course = await Course.find();
        res.json(course);
    }
    catch(error) {
        res.status(500).json({error : 'Erreur serveur'})
    }
})

// ✅ Route POST - Ajouter un cours
app.post('/api/course', async (req, res) => {
    try {
        const { title, description, link } = req.body;
        const newCourse = new Course({ title, description, link });
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(400).json({ error: "Impossible d’ajouter le cours" });
    }
});

// Route pour récupérer tous les utilisateurs
app.get('/api/users', async (req, res) => {
    try{
        const user = await User.find();
        res.json(user);
    }
    catch(error) {
        res.status(500).json({error : 'Erreur serveur'})
    }
})

// ✅ Route POST - Ajouter un utilisateur
app.post('/api/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        newUser.isConnected = true;
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: "Impossible d’ajouter l’utilisateur" });
    }
});

// ✅ Route POST - récupérer un utilisateur via son id
app.post('/api/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email }).select('name email password isConnected');
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        // Comparer le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
        }
        user.isConnected = true;
        await user.save();
        res.json({ message: 'Connexion réussie', user: { name: user.name, email: user.email, connected : user.isConnected } });
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// ✅ Route POST - récupérer un utilisateur via son id
app.post('/api/users/logout', async (req, res) => {
    try {
        const { email } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email }).select('name email password isConnected');
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        if (user.isConnected) {
            user.isConnected = false;
            await user.save()
            res.json({ message: 'Déconnexion réussie', user: { name: user.name, email: user.email, connected : user.isConnected } });
        }
        else{
            return res.status(401).json({ error: 'Problème lors de la déconnexion' });
        }
        
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.post('/api/users/check', async (req, res) => {
    try {
        const { email } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email }).select('name email password isConnected');
        
        if (user) {
            // Utilisateur existe déjà
            return res.status(409).json({ 
                error: "L'utilisateur existe déjà !",
                exists: true 
            });
        }

        // Utilisateur n'existe pas
        return res.status(200).json({ 
            message: "L'utilisateur peut être créé",
            exists: false 
        });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.listen(PORT, () => {
    console.log("Connexion à http://localhost:" + PORT)
})
