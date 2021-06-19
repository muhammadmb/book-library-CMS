import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Main from './Components/Main/Main';
import SignIn from './Components/SignIn/SignIn';
function App() {

  return (
    <div className="container">
      <BrowserRouter>

        <Switch>
          <Route path="/dashboard" render={() => (<Layout> <Main /> </Layout>)} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/book-library-dashboard" component={SignIn} />
        </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;