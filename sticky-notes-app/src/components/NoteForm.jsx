import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function NoteForm({ onAddNote }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isImportant: false
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.description.trim()) {
      setError('La descripción es obligatoria');
      return;
    }

    onAddNote({
      id: uuidv4(),
      title: formData.title,
      description: formData.description,
      isImportant: formData.isImportant,
      createdAt: new Date().toISOString()
    });

    // Resetear formulario
    setFormData({
      title: '',
      description: '',
      isImportant: false
    });
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <input
        type="text"
        name="title"
        placeholder="Ingrese el título"
        value={formData.title}
        onChange={handleChange}
      />
      
      <textarea
        name="description"
        placeholder="Empiece a escribir..."
        value={formData.description}
        onChange={handleChange}
        required
      />
      
      {error && <p className="error">{error}</p>}
      
      <label>
        <input
          type="checkbox"
          name="isImportant"
          checked={formData.isImportant}
          onChange={handleChange}
        />
        Marcar como importante
      </label>
      
      <button type="submit">Agregar Nota</button>
    </form>
  );
}