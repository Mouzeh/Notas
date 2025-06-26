import Note from './Note';

export default function NotesList({ notes, onDeleteNote }) {
  if (!notes.length) {
    return <div className="empty-message">Aún No Hay Notas Escritas.</div>;
  }
  return (
    <>
      {notes.map(note => (
        <Note key={note.id} note={note} onDeleteNote={onDeleteNote} />
      ))}
    </>
  );
}