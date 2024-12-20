import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Students from "./pages/students";
import Chapter from "./pages/chapter";
import Help from "./pages/help";
import Reports from "./pages/reports";
import Settings from "./pages/settings";
import Layout from "./components/layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/chapter" element={<Chapter />} />
          <Route path="/help" element={<Help />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
