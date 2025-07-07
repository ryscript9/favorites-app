import { Layout } from "../components/layout/Layout";

export default function NotFound() {
  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Page not found</h2>
      <p>Sorry, the page you're looking for doesn't exist.</p>
    </Layout>
  );
}
