import { HashRouter, Route, Routes } from "react-router-dom";
import SiteFooter from "./components/SiteFooter";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <SiteFooter />
    </HashRouter>
  );
}
