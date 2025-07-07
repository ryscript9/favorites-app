import { Header } from "./Header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="container mx-auto flex flex-col">
        <main className="flex-grow p-4">
          {children}
        </main>
      </div>
      <footer className="fixed bottom-0 right-0 left-0 bg-gray-100 text-center p-4 text-gray-500 text-sm">
        &copy; 2025 Favorite Movies App
      </footer>
    </>
  );
}
