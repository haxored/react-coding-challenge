import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <div className="myApp">
      <Router>
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="main-container">
          <div className="main-header">
            <h3 className="header-text">IMDB API Query Interface</h3>
          </div>
          <div className="main-content">
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/about' component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;