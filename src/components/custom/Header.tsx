export function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-10 flex justify-between items-center px-8 py-5 bg-transparent">
      <div className="flex items-center gap-4">
        <img src="/logo-transparent.png" alt="ROAR Industries" className="rounded-full h-28" />
      </div>
      <h2
        className="w-22 h-20 text-white font-medium text-md tracking-wider hover:text-yellow-300 transition-all duration-300 transform hover:scale-105 cursor-pointer">
        SIGN UP
      </h2>
    </header>
  );
} 