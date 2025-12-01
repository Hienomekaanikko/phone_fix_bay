import NavButton from "./NavButton";

export default function NavBar({ onContribute }) {
  return (
    <div className="absolute top-10 left-10 flex space-x-4">
      <NavButton onClick={onContribute}>Contribute</NavButton>
      <NavButton>Heroes</NavButton>
      <NavButton>Latest</NavButton>
    </div>
  );
}
