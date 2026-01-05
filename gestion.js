// Importation du module express
const express = require('express');

// Création de l'application express
const app = express();

// Permet de lire les données envoyées en JSON dans le body
app.use(express.json());

// ==========================
// "Base de données" : tableau de tâches
// ==========================
let taches = [];
let idAuto = 1; // pour identifier chaque tâche

// ==========================
// 1️⃣ Route pour ajouter une tâche
// ==========================
app.post('/taches', (req, res) => {
    // Récupération des données envoyées par le client
    const { nom, description, statut } = req.body;

    // Création d'une nouvelle tâche
    const nouvelleTache = {
        id: idAuto,
        nom: nom,
        description: description,
        statut: statut // "en cours" ou "termine"
    };

    // Ajout de la tâche dans le tableau
    taches.push(nouvelleTache);

    // Incrémentation de l'id automatique
    idAuto++;

    // Réponse envoyée au client
    res.status(201).json({
        message: "Tâche ajoutée avec succès",
        tache: nouvelleTache
    });
});

// ==========================
// 2️⃣ Route pour lister toutes les tâches
// ==========================
app.get('/taches', (req, res) => {
    // On renvoie le tableau de tâches
    res.json(taches);
});

// ==========================
// 3️⃣ Route pour supprimer une tâche
// ==========================
app.delete('/taches/:id', (req, res) => {
    // Récupération de l'id depuis l'URL
    const id = parseInt(req.params.id);

    // Filtrer le tableau pour enlever la tâche correspondante
    taches = taches.filter(tache => tache.id !== id);

    // Réponse
    res.json({
        message: "Tâche supprimée avec succès"
    });
});

// ==========================
// 4️⃣ Route pour modifier une tâche
// ==========================
app.put('/taches/:id', (req, res) => {
    // Récupération de l'id
    const id = parseInt(req.params.id);

    // Recherche de la tâche
    const tache = taches.find(t => t.id === id);

    // Si la tâche n'existe pas
    if (!tache) {
        return res.status(404).json({
            message: "Tâche non trouvée"
        });
    }

    // Mise à jour des champs
    tache.nom = req.body.nom || tache.nom;
    tache.description = req.body.description || tache.description;
    tache.statut = req.body.statut || tache.statut;

    // Réponse
    res.json({
        message: "Tâche modifiée avec succès",
        tache: tache
    });
});

// ==========================
// Lancement du serveur
// ==========================
app.listen(3000, () => {
    console.log("Serveur démarré sur http://localhost:3000");
});