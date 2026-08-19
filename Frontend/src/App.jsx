import { useCallback, useEffect, useState } from 'react';
import {
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from './api/students';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './App.css';

const emptyForm = { id: '', name: '' };

export default function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const showMessage = useCallback((text, isError = false) => {
    if (isError) {
      setError(text);
      setMessage(null);
    } else {
      setMessage(text);
      setError(null);
    }
    setTimeout(() => {
      setMessage(null);
      setError(null);
    }, 4000);
  }, []);

  const loadStudents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchStudents();
      setStudents(data);
      setError(null);
    } catch (err) {
      showMessage(
        err.message || 'Impossible de charger les étudiants. Vérifiez que le backend est démarré.',
        true
      );
    } finally {
      setLoading(false);
    }
  }, [showMessage]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) return;

    setSubmitting(true);
    try {
      if (editingId !== null) {
        const response = await updateStudent(editingId, formData.name.trim());
        showMessage(typeof response === 'string' ? response : 'Étudiant mis à jour.');
      } else {
        const response = await createStudent({
          id: Number(formData.id),
          name: formData.name.trim(),
        });
        showMessage(typeof response === 'string' ? response : 'Étudiant ajouté.');
      }
      setFormData(emptyForm);
      setEditingId(null);
      await loadStudents();
    } catch (err) {
      showMessage(err.message || 'Une erreur est survenue.', true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setFormData({ id: String(student.id), name: student.name });
    setMessage(null);
    setError(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData(emptyForm);
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Supprimer l'étudiant #${id} ?`)) return;

    setDeletingId(id);
    try {
      const response = await deleteStudent(id);
      showMessage(typeof response === 'string' ? response : 'Étudiant supprimé.');
      if (editingId === id) handleCancel();
      await loadStudents();
    } catch (err) {
      showMessage(err.message || 'Impossible de supprimer.', true);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Gestion des étudiants</h1>
        <p>Ajoutez, modifiez et supprimez des étudiants via l'API backend.</p>
      </header>

      {message && <div className="message message-success">{message}</div>}
      {error && <div className="message message-error">{error}</div>}

      <section className="card">
        <h2>{editingId !== null ? 'Modifier un étudiant' : 'Nouvel étudiant'}</h2>
        <StudentForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isEditing={editingId !== null}
          isSubmitting={submitting}
        />
      </section>

      <section className="card">
        <h2>Liste ({students.length})</h2>
        {loading ? (
          <div className="loading">Chargement…</div>
        ) : (
          <StudentList
            students={students}
            onEdit={handleEdit}
            onDelete={handleDelete}
            deletingId={deletingId}
          />
        )}
      </section>
    </div>
  );
}
