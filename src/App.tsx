import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { MobileSidebar } from "@/components/MobileSidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Watch from "./pages/Watch";
import Shorts from "./pages/Shorts";
import Subscriptions from "./pages/Subscriptions";
import You from "./pages/You";
import { ThemeProvider } from "@/hooks/use-theme";
import { Footer } from "@/components/Footer";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-hidden max-w-full">
          <Navbar />
          <MobileSidebar />
          <div className="flex w-full">
            <Sidebar />
            <main id="main-content" className="flex-1 h-[calc(100vh-56px)] overflow-y-auto min-w-0 flex flex-col">
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/watch/:videoId" element={<Watch />} />
                  <Route path="/shorts" element={<Shorts />} />
                  <Route path="/subscriptions" element={<Subscriptions />} />
                  <Route path="/you" element={<You />} />
                </Routes>
              </div>
              <Footer />
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
