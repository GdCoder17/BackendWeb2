export default function StudentList({ students, onEdit, onDelete, deletingId }) {
  if (students.length === 0) {
    return (
      <div className="empty-state">
        Aucun étudiant pour le moment. Ajoutez-en un ci-dessus.
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>
                <div className="actions">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => onEdit(student)}
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(student.id)}
                    disabled={deletingId === student.id}
                  >
                    {deletingId === student.id ? '…' : 'Supprimer'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
