import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  return (
    
      <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/profile" element={<ProfilePage />}/>
          </Routes>

      
      </BrowserRouter>
    
  );
}

export default App;
