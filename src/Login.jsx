import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      const token = btoa(JSON.stringify({ username, timestamp: Date.now() }));
      localStorage.setItem("jwt", token);
      onLogin(token);
    } else {
      alert("Enter username and password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-sky-400 via-indigo-250 to-purple-600">
      <h1 className="text-yellow-300 text-4xl font-bold mb-6">PhoneFixBay Login</h1>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="text-yellow-500 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 text-center"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-yellow-500 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 text-center"
        />
        <button
          type="submit"
          className="bg-yellow-300 text-sky-900 font-bold rounded-full px-6 py-2 hover:bg-yellow-400 transition-all"
        >
          Login
        </button>
      </form>
    </div>
  );
}
