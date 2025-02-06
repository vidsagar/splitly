// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CookingTracker from "./components/CookingTracker";
import NotFoundPage from "./pages/NotFoundPage";
import Home from "./pages/Home";
import FallbrookeLayout from "layouts/FallbrookeLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/cooking" 
          element={
            <FallbrookeLayout>
              <CookingTracker />
            </FallbrookeLayout>
          } 
        />
        <Route 
          path="/split" 
          element={
            
            <FallbrookeLayout>
              <Home />
            </FallbrookeLayout>
          } 
        />
        <Route 
          path="*" 
          element={
            <NotFoundPage />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
