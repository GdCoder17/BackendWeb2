export default function StudentForm({
  formData,
  onChange,
  onSubmit,
  onCancel,
  isEditing,
  isSubmitting,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="form-row">
        <div className="field">
          <label htmlFor="student-id">Identifiant</label>
          <input
            id="student-id"
            type="number"
            value={formData.id}
            onChange={(e) => onChange('id', e.target.value)}
            disabled={isEditing || isSubmitting}
            required
            min="1"
            placeholder="Ex. 101"
          />
        </div>
        <div className="field">
          <label htmlFor="student-name">Nom</label>
          <input
            id="student-name"
            type="text"
            value={formData.name}
            onChange={(e) => onChange('name', e.target.value)}
            disabled={isSubmitting}
            required
            placeholder="Ex. Marie Dupont"
          />
        </div>
        <div className="actions">
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isEditing ? 'Enregistrer' : 'Ajouter'}
          </button>
          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Annuler
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
