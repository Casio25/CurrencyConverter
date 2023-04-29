import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { MainBlock } from './components/MainBlock';
import { ConverterBlock } from './components/Converter';
import { Empty } from './pages/Empty';
import { Home } from './pages/Home';
import {FooterMain} from "./components/Footer"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <MainBlock />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/empty" element={<Empty />} />
          <Route exact path="/converter" element={<ConverterBlock />} />
        </Routes>
        <FooterMain />
      </div>
    </BrowserRouter>
  );
}

export default App;

