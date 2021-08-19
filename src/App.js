import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Main from './Components/Main/Main';
import SignIn from './Components/SignIn/SignIn';
import BooksManagement from './Components/Pages/BooksManagement/BooksManagement';
import AddBook from './Components/AddBook/AddBook';
function App() {

  return (
    <div className="container">
      <BrowserRouter>

        <Switch>
          <Route path="/dashboard" render={() => (<Layout> <Main /> </Layout>)} />
          <Route exact path="/books-management" render={() => (<Layout> <BooksManagement /> </Layout>)} />
          <Route path="/books-management/add" render={() => (<Layout> <AddBook header="add a new book" /> </Layout>)} />
          <Route path="/books-management/edit-book/genre/:genreId/book/:bookId" render={() => (<Layout> <AddBook header="edit the book" /> </Layout>)} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/book-library-dashboard" component={SignIn} />
        </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;