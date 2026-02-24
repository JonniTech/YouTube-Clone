import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Watch from "./pages/Watch";
import Shorts from "./pages/Shorts";
import Subscriptions from "./pages/Subscriptions";
import You from "./pages/You";
import { ThemeProvider } from "@/hooks/use-theme";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          <Navbar />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 h-[calc(100vh-56px)] overflow-y-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/watch/:videoId" element={<Watch />} />
                <Route path="/shorts" element={<Shorts />} />
                <Route path="/subscriptions" element={<Subscriptions />} />
                <Route path="/you" element={<You />} />
              </Routes>
            </main>
          </div>
          <footer className="border-t py-6 text-center text-sm text-muted-foreground">
            <p>This project uses the YouTube API but is not affiliated with YouTube.</p>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
