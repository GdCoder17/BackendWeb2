import { authHeaders, clearToken } from './auth';

const API_BASE = '/api';

async function handleResponse(response) {
  if (response.status === 401) {
    clearToken();
    throw new Error('Session expirée. Veuillez vous reconnecter.');
  }

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  if (!response.ok) {
    const error = isJson ? await response.json() : await response.text();
    throw new Error(
      typeof error === 'string'
        ? error
        : error.message || 'Une erreur est survenue'
    );
  }

  if (isJson) {
    return response.json();
  }

  return response.text();
}

export async function fetchStudents() {
  return handleResponse(
    await fetch(`${API_BASE}/etudiants`, {
      headers: authHeaders(),
    })
  );
}

export async function createStudent(student) {
  return handleResponse(
    await fetch(`${API_BASE}/etudiants`, {
      method: 'POST',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(student),
    })
  );
}

export async function updateStudent(id, name) {
  return handleResponse(
    await fetch(`${API_BASE}/etudiants/${id}`, {
      method: 'PUT',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ name }),
    })
  );
}

export async function deleteStudent(id) {
  return handleResponse(
    await fetch(`${API_BASE}/etudiants/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    })
  );
}
