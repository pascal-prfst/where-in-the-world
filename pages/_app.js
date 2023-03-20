import "@/styles/globals.css";
import Layout from "@/components/layout/layout";
import { ThemeContextProvider } from "@/context/theme-context";

export default function App({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeContextProvider>
  );
}
