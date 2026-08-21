import { useCallback, useEffect, useState } from 'react';
import {
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from './api/students';
import {
  clearToken,
  getToken,
  loginStudent,
  registerStudent,
  setToken,
} from './api/auth';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import AuthForm from './components/AuthForm';
import './App.css';

const emptyForm = { id: '', name: '' };

export default function App() {
  const [token, setTokenState] = useState(() => getToken());
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [authSubmitting, setAuthSubmitting] = useState(false);
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
      if (String(err.message).includes('reconnecter')) {
        setTokenState(null);
      }
      showMessage(
        err.message || 'Impossible de charger les étudiants. Vérifiez que le backend est démarré.',
        true
      );
    } finally {
      setLoading(false);
    }
  }, [showMessage]);

  useEffect(() => {
    if (token) {
      loadStudents();
    }
  }, [token, loadStudents]);

  const handleAuthSuccess = (authToken) => {
    setToken(authToken);
    setTokenState(authToken);
  };

  const handleLogin = async (credentials) => {
    setAuthSubmitting(true);
    try {
      const result = await loginStudent(credentials);
      handleAuthSuccess(result.token);
      showMessage('Connexion réussie.');
    } catch (err) {
      showMessage(err.message || 'Connexion impossible.', true);
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleRegister = async (payload) => {
    setAuthSubmitting(true);
    try {
      const result = await registerStudent(payload);
      handleAuthSuccess(result.token);
      showMessage('Compte créé.');
    } catch (err) {
      showMessage(err.message || 'Inscription impossible.', true);
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleLogout = () => {
    clearToken();
    setTokenState(null);
    setStudents([]);
    setFormData(emptyForm);
    setEditingId(null);
  };

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
      <header className="header header-row">
        <div>
          <h1>Gestion des étudiants</h1>
          <p>
            {token
              ? 'Ajoutez, modifiez et supprimez des étudiants via l\'API backend.'
              : 'Connectez-vous pour accéder à la liste des étudiants.'}
          </p>
        </div>
        {token && (
          <button type="button" className="btn btn-secondary" onClick={handleLogout}>
            Déconnexion
          </button>
        )}
      </header>

      {message && <div className="message message-success">{message}</div>}
      {error && <div className="message message-error">{error}</div>}

      {!token ? (
        <AuthForm
          onLogin={handleLogin}
          onRegister={handleRegister}
          isSubmitting={authSubmitting}
        />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
