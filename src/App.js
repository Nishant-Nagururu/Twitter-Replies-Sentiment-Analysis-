import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CommentAnalysis from './pages/CommentAnalysis';
import NavBar from './NavBar';
import LogIn from './pages/LogIn';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import mongoose from 'mongoose';

function App() {

  function handleSubmit(inputUsername, inputPostURL) {
    // const post = new Post ({
    //   username: inputUsername,
    //   postURL: inputPostURL
    // })
    // post.save()
    console.log(inputPostURL,inputUsername)
  }

  return (
    <div className="App">
      <BrowserRouter> 
        <div className="App">
          <div id="page-body">
            <Routes>
              <Route path="/" element={<LogIn onSubmit = {handleSubmit} />} />
              <Route path="/commentanalysis" element={<CommentAnalysis/>} />
              <Route
                    path="/redirect"
                    element={ <Navigate to="/commentanalysis" /> }
                />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
