// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CookingTracker from "./components/CookingTracker";
import NotFoundPage from "./components/NotFoundPage";
import Home from "./containers/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cooking" element={<CookingTracker />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
