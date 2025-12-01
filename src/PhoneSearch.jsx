import { useState } from "react";
import ProblemSearch from "./ProblemSearch";

export default function PhoneSearch() {
  const [phoneModel, setModel] = useState("");
  const [searchModel, setSearchModel] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchModel(phoneModel);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8 space-y-4">
      <input
        type="text"
        placeholder="Search for phonemodel..."
        value={phoneModel}
        onChange={(e) => setModel(e.target.value)}
        onKeyDown={handleKeyDown}
        className="text-yellow-500 w-80 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 text-center"
      />
      {searchModel && <ProblemSearch model={searchModel} />}
    </div>
  );
}
