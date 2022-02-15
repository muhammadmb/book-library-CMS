import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Main from './Components/Main/Main';
import SignIn from './Components/SignIn/SignIn';
import BooksManagement from './Components/Pages/BooksManagement/BooksManagement';
import AddBook from './Components/Add Elements/AddBook/AddBook';
import AuthorsManagement from './Components/Pages/AuthorsManagement/AuthorsManagement';
import ReviewsManagement from './Components/Pages/ReviewsManagement/ReviewsManagement';
import SuggestionsPage from './Components/Pages/SuggestionsPage/SuggestionsPage';
import Feedback from './Components/Pages/Feedback/Feedback';
import AddAuthor from './Components/Add Elements/AddAuthor/AddAuthor';
import Profile from './Components/Pages/Profile/Profile';
import ProfileLayout from './Components/Pages/Profile/ProfileLayout/ProfileLayout';
import MyTeam from './Components/Pages/Profile/MyTeam/MyTeam';

function App() {

  return (
    <div className="container">
      <BrowserRouter>

        <Switch>
          <Route exact path="/" render={() => (<Layout> <Main /> </Layout>)} />
          <Route path="/dashboard" render={() => (<Layout> <Main /> </Layout>)} />
          <Route exact path="/books-management" render={() => (<Layout> <BooksManagement /> </Layout>)} />
          <Route path="/books-management/add" render={() => (<Layout> <AddBook header="add a new book" /> </Layout>)} />
          <Route path="/books-management/edit-book/genre/:genreId/book/:bookId" render={() => (<Layout> <AddBook header="edit the book" /> </Layout>)} />
          <Route exact path="/authors-management" render={() => <Layout> <AuthorsManagement /> </Layout>} />
          <Route path="/authors-management/add" render={() => <Layout> <AddAuthor /> </Layout>} />
          <Route path="/reviews-management" render={() => <Layout> <ReviewsManagement /> </Layout>} />
          <Route path="/suggestions" render={() => <Layout> <SuggestionsPage /> </Layout>} />
          <Route path="/feedback" render={() => <Layout> <Feedback /> </Layout>} />
          <Route path="/user/information" render={() => <ProfileLayout> <Profile /> </ProfileLayout>} />
          <Route path="/user/my-team" render={() => <ProfileLayout> <MyTeam /> </ProfileLayout>} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/book-library-dashboard" component={SignIn} />
        </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;