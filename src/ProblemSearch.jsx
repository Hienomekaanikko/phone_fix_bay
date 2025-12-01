export default function ProblemSearch({ model }) {
  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="Search for issue..."
        className="text-yellow-500 w-80 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 text-center"
      />
    </div>
  );
}
