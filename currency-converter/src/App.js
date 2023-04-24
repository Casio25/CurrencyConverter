import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { MainBlock } from './components/MainBlock';
import { ConverterBlock } from './components/Converter';
import { Empty } from './pages/Empty';
import { Home } from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <MainBlock />
        <ConverterBlock />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/empty" element={<Empty />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

