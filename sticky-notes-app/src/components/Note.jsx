import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

export default function Note({ note, onDeleteNote }) {
  return (
    <motion.div
      className={`note${note.isImportant ? ' important' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
    >
      <button
        className="delete-btn"
        onClick={() => onDeleteNote(note.id)}
        aria-label="Eliminar nota"
      >
        <FaTimes />
      </button>
      <h3>{note.title || 'Sin título'}</h3>
      <p>{note.description}</p>
    </motion.div>
  );
}