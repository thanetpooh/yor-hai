export function Header() {
  return (
    <header className="flex items-center px-10 pt-7 max-sm:px-6 max-sm:pt-6">
      <div className="flex items-center gap-2.5 font-serif text-2xl tracking-tight">
        <span className="grid h-7 w-7 -rotate-3 place-items-center rounded-lg bg-ink font-mono text-sm font-semibold text-skin">
          /
        </span>
        <span>Yor Hai</span>
      </div>
    </header>
  );
}
