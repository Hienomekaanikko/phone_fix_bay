export default function NavButton({ children, ...props }) {
  return (
    <button
      className="hover:-rotate-1 text-shadow-lg text-2xl font-bold text-yellow-300 border-2 rounded-2xl p-2 hover:text-yellow-100 hover:ring-2 hover:ring-yellow-100 transition-all"
      {...props}
    >
      {children}
    </button>
  );
}
