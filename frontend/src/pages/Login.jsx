import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../components/FormField';
import Button from '../components/Button';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: real auth
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-white">Welcome back</h2>
        <p className="text-surface-400 text-sm mt-1">Sign in to your account</p>
      </div>

      <FormField
        id="login-email"
        label="Email"
        type="email"
        placeholder="admin@transitops.io"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <FormField
        id="login-password"
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-surface-400 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 rounded bg-surface-700 border-surface-600 text-accent-500 focus:ring-accent-500/50"
          />
          Remember me
        </label>
        <a href="#" className="text-accent-400 hover:text-accent-300">
          Forgot password?
        </a>
      </div>

      <Button type="submit" className="w-full">
        Sign In
      </Button>

      <p className="text-center text-surface-500 text-xs">
        Demo credentials: admin@transitops.io / password
      </p>
    </form>
  );
}
