import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import './App.css';

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('sticky-notes');
    if (savedNotes) {
      try {
        const parsed = JSON.parse(savedNotes);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('sticky-notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (newNote) => {
    const completeNote = {
      ...newNote,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    setNotes([...notes, completeNote]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const clearAllNotes = () => {
    if (window.confirm('¿Estás seguro de querer eliminar todas las notas?')) {
      setNotes([]);
    }
  };

  return (
    <div className="app">
      <h1>Mis Notas</h1>
      <div className="form-section">
        <NoteForm onAddNote={addNote} />
        <button
          onClick={clearAllNotes}
          className="clear-all-btn"
          disabled={notes.length === 0}
        >
          Limpiar Todas las Notas
        </button>
      </div>
      <div className="notes-section">
        <AnimatePresence>
          <NotesList notes={notes} onDeleteNote={deleteNote} />
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;