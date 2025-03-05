const mongoose = require('mongoose');

// Définition du modèle utilisateur
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
