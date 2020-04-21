import React from 'react';
import Table from './components/Table/Table';
import './App.css';

function App(props) {
  return (
    <div className="container">
      <div className="header">
        Ck12 TOC
      </div>
      <Table subject="maths" />
    </div>
  );
}

export default App;
