import React from 'react';
import './App.css';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Redirect 
} from 'react-router-dom';
import WelcomePage from './components/WelcomePage/WelcomePage';
import PostersResultsPage from './components/PostersResultsPage/PostersResultsPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/welcome">
          <WelcomePage />
        </Route>
        <Route path="/posters">
          <PostersResultsPage />
        </Route>
        <Redirect from='/' to='/welcome'/>
      </Switch>
    </Router>
  );
}

export default App;
