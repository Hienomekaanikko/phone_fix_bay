import { useState, useEffect } from "react";
import Login from "./Login";
import NavBar from "./NavBar";
import PhoneSearch from "./PhoneSearch";
import TopContributors from "./TopContributors";
import ContributeForm from "./ContributeForm";

const decodeFakeJWT = (token) => {
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
};

function App() {
  const [token, setToken] = useState(null);
  const [showContribute, setShowContribute] = useState(false);
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    const savedToken = localStorage.getItem("jwt");
    if (savedToken) setToken(savedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
  };

  if (!token) return <Login onLogin={setToken} />;

  const userData = decodeFakeJWT(token);

  return (
    <section className="relative h-screen bg-gradient-to-r from-sky-400 via-indigo-250 to-purple-600 flex flex-col items-center justify-center">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 text-yellow-300 px-4 py-2 transition-all"
      >
        Logout
      </button>

      <h1 className="text-yellow-300 text-5xl font-bold pb-5">PhoneFixBay</h1>
      <h2 className="text-yellow-100 text-center max-w-2xl">
        A place for those weird issues that anyone can face during phone repairs. Tested methods with years of experience.
      </h2>

      <p className="text-yellow-200 mt-4">Welcome, {userData?.username}!</p>

      <PhoneSearch />

      <NavBar onContribute={() => setShowContribute(true)} />

      {showContribute && (
        <ContributeForm
          onClose={() => setShowContribute(false)}
          onSubmit={(data) => {
            console.log("Submitted:", data);
            setContributions((prev) => [...prev, data]);
            // TODO: send to backend
          }}
        />
      )}

      <h3 className="text-yellow-300 text-1xl font-bold mt-10">
        <TopContributors />
      </h3>
    </section>
  );
}

export default App;
