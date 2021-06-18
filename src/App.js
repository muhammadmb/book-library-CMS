import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Main from './Components/Main/Main';
function App() {

  return (
    <div className="container">
      <BrowserRouter>

        <Switch>
          <Route path="/dashboard" render={() => (<Layout> <Main /> </Layout>)} />
        </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;