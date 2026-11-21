import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./components/SignUp";
import LoginPage from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;