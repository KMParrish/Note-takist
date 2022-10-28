const util = require('util');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); 
const reviewNote = util.promisify(fs.readFile);
const makeNote = util.promisify(fs.writeFile);


class Save {
    write(note) {
        return makeNote('db/db.json', JSON.stringify(note));
    }

    read() {
        return reviewNote('db/db.json', 'utf8');
    }

    fetchNotes() {
        return this.read().then(notes => {
            let trackedNotes;
            try {
                trackedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                trackedNotes = [];
            }
            return trackedNotes;
        });
    }

    appendNote(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error;
        }
        const newNote = { title, text, id: uuidv4() };

        
        return this.fetchNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => newNote);
    }

    deleteNote(id) {
        return this.fetchNotes()
            .then(notes => notes.filter(note => note.id !== id))
            .then(filteredNotes => this.write(filteredNotes));
    }
}

module.exports = new Save();