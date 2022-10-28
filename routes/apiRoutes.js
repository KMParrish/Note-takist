const router = require('express').Router();
const saveData = require('../db/saveData');

router.get('/notes', function (req, res) {
    saveData
        .fetchNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));
});

router.post('/notes', (req, res) => {
    saveData
        .appendNote(req.body)
        .then((note) => res.json(note))
        .catch(err => res.status(500).json(err));
});

// Delete Note
router.delete('/notes/:id', function (req, res) {
    saveData
        .deleteNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err));
});

module.exports = router;