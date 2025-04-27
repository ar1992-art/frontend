import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    if (password1 !== password2) {
      setError('Passwords do not match');
      return;
    }
    register({ username, email, password1, password2 })
      .then(() => navigate('/dashboard'))
      .catch(() => setError('Registration failed'));
  };

  return (
    <div className="max-w-sm mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="password"
          value={password1}
          onChange={e => setPassword1(e.target.value)}
          placeholder="Password"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="password"
          value={password2}
          onChange={e => setPassword2(e.target.value)}
          placeholder="Confirm Password"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white rounded">
          Register
        </button>
      </form>
      <p className="mt-4 text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-green-600 hover:underline">Login</Link>
      </p>
    </div>
  );
}
