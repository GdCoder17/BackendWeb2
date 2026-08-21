import { useState } from 'react';

const emptyLogin = { email: '', password: '' };
const emptyRegister = { id: '', name: '', email: '', password: '' };

export default function AuthForm({ onLogin, onRegister, isSubmitting }) {
  const [mode, setMode] = useState('login');
  const [loginData, setLoginData] = useState(emptyLogin);
  const [registerData, setRegisterData] = useState(emptyRegister);

  const isLogin = mode === 'login';

  return (
    <section className="card">
      <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isLogin) {
            onLogin(loginData);
          } else {
            onRegister({
              ...registerData,
              id: Number(registerData.id),
            });
          }
        }}
      >
        {!isLogin && (
          <>
            <div className="field" style={{ marginBottom: '0.75rem' }}>
              <label htmlFor="register-id">Identifiant</label>
              <input
                id="register-id"
                type="number"
                min="1"
                required
                value={registerData.id}
                onChange={(e) =>
                  setRegisterData((prev) => ({ ...prev, id: e.target.value }))
                }
                placeholder="Ex. 2"
              />
            </div>
            <div className="field" style={{ marginBottom: '0.75rem' }}>
              <label htmlFor="register-name">Nom</label>
              <input
                id="register-name"
                type="text"
                required
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Entrez le nom ici"
              />
            </div>
          </>
        )}
        <div className="field" style={{ marginBottom: '0.75rem' }}>
          <label htmlFor="auth-email">Email</label>
          <input
            id="auth-email"
            type="email"
            required
            value={isLogin ? loginData.email : registerData.email}
            onChange={(e) => {
              const email = e.target.value;
              if (isLogin) {
                setLoginData((prev) => ({ ...prev, email }));
              } else {
                setRegisterData((prev) => ({ ...prev, email }));
              }
            }}
            placeholder="student@gmail.com"
          />
        </div>
        <div className="field" style={{ marginBottom: '1rem' }}>
          <label htmlFor="auth-password">Mot de passe</label>
          <input
            id="auth-password"
            type="password"
            required
            value={isLogin ? loginData.password : registerData.password}
            onChange={(e) => {
              const password = e.target.value;
              if (isLogin) {
                setLoginData((prev) => ({ ...prev, password }));
              } else {
                setRegisterData((prev) => ({ ...prev, password }));
              }
            }}
            placeholder="Entrez le mot de passe"
          />
        </div>
        <div className="actions">
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isLogin ? 'Se connecter' : "S'inscrire"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setMode(isLogin ? 'register' : 'login')}
            disabled={isSubmitting}
          >
            {isLogin ? "Créer un compte" : 'Déjà inscrit ?'}
          </button>
        </div>
      </form>
    </section>
  );
}
