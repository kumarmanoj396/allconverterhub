export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-blue-600">
          AllConverterHub
        </h1>

        <nav className="hidden gap-8 md:flex">
          <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#" className="hover:text-blue-600">Tools</a>
          <a href="#" className="hover:text-blue-600">Categories</a>
          <a href="#" className="hover:text-blue-600">Contact</a>
        </nav>

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Login
        </button>
      </div>
    </header>
  );
}