const API_BASE = '/api';

async function handleResponse(response) {
  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  if (!response.ok) {
    const error = isJson ? await response.json() : await response.text();
    throw new Error(typeof error === 'string' ? error : 'Une erreur est survenue');
  }

  if (isJson) {
    return response.json();
  }

  return response.text();
}

export async function fetchStudents() {
  return handleResponse(await fetch(`${API_BASE}/etudiants`));
}

export async function createStudent(student) {
  return handleResponse(
    await fetch(`${API_BASE}/etudiants`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    })
  );
}

export async function updateStudent(id, name) {
  return handleResponse(
    await fetch(`${API_BASE}/etudiants/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
  );
}

export async function deleteStudent(id) {
  return handleResponse(
    await fetch(`${API_BASE}/etudiants/${id}`, {
      method: 'DELETE',
    })
  );
}
