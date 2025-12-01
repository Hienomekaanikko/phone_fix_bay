import { useState } from "react";

export default function ContributeForm({ onClose, onSubmit }) {
  const [phoneModel, setPhoneModel] = useState("");
  const [issue, setIssue] = useState("");
  const [solution, setSolution] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!phoneModel || !issue || !solution) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contributions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneModel, issue, solution }),
      });

      if (!res.ok) throw new Error("Failed to save contribution");

      const data = await res.json();
      console.log("Saved:", data);

      onSubmit({ phoneModel, issue, solution });

      setPhoneModel("");
      setIssue("");
      setSolution("");
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-200 rounded-xl p-10 shadow-lg flex flex-col space-y-4 w-100 z-50">
      <h2 className="text-2xl text-gray-800 text-center">Contribute a Solution</h2>

      {submitted ? (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-green-700 text-center">
            Thank you for contributing! Your submission will be reviewed within 2 days.
          </p>
          <button
            onClick={() => { setSubmitted(false); onClose(); }}
            className="px-4 py-2 bg-sky-400 text-white rounded-md hover:bg-sky-500 transition-all"
          >
            Close
          </button>
        </div>
      ) : (
        <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Phone Model"
            value={phoneModel}
            onChange={(e) => setPhoneModel(e.target.value)}
            className="px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <input
            type="text"
            placeholder="Issue"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className="px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <textarea
            placeholder="Solution"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            className="px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          {error && <p className="text-red-600">{error}</p>}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-sky-400 text-white rounded-md hover:bg-sky-500 transition-all disabled:opacity-50"
            >
              {loading ? "Saving..." : "Submit"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
