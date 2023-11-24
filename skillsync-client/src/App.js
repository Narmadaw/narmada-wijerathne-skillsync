import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import './App.css';
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import HomePage from './pages/HomePage/HomePage';
import UserProfile from "./components/UserProfile/UserProfile";
import SelectedJob from "./components/SelectedJob/SelectedJob";
import SearchJob from "./components/SearchJob/SearchJob";
import SampleCompo from "./components/samplecompo/SampleCompo";

function App() {

  return (
    
      <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/profile" element={<UserProfile />}/>
            <Route path="/:id/:title/:company/" element={<SelectedJob />}/>
            <Route path='/search' element={<SearchJob />}/>
            <Route path='/sample' element={<SampleCompo />} />
          </Routes>

      
      </BrowserRouter>
    
  );
}

export default App;
