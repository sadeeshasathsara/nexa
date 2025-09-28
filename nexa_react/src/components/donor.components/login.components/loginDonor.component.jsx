import React, { useState } from 'react';

const LoginDonor = ({ onLoginSuccess }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setLoading(true);
		try {
			// TODO: call backend API
			await new Promise((r) => setTimeout(r, 500));
			onLoginSuccess && onLoginSuccess();
		} catch (err) {
			setError('Login failed');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-white rounded-3xl p-8 border border-rose-100 max-w-md mx-auto">
			<h2 className="text-2xl font-bold text-gray-900 mb-4">Sign in</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					className="w-full p-4 border border-gray-200 rounded-xl"
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					className="w-full p-4 border border-gray-200 rounded-xl"
				/>
				{error && <p className="text-red-500 text-sm">{error}</p>}
				<button
					type="submit"
					disabled={loading}
					className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 rounded-xl"
				>
					{loading ? 'Signing in...' : 'Sign in'}
				</button>
			</form>
		</div>
	);
};

export default LoginDonor;
