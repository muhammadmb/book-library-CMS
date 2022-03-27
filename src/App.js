import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import RequireAuth from './Components/RequireAuth/RequireAuth';

function App() {

  return (
    <div className="container">
      <BrowserRouter>

        <Routes>
          <Route element={<RequireAuth />}>
            <Route exact path="/" element={<Layout> <Main /> </Layout>} />
            <Route path="/dashboard" element={<Layout> <Main /> </Layout>} />
            <Route exact path="/books-management" element={<Layout> <BooksManagement /> </Layout>} />
            <Route path="/books-management/add" element={<Layout> <AddBook header="add a new book" /> </Layout>} />
            <Route path="/books-management/edit-book/genre/:genreId/book/:bookId" element={<Layout> <AddBook header="edit the book" /> </Layout>} />
            <Route exact path="/authors-management" element={<Layout> <AuthorsManagement /> </Layout>} />
            <Route path="/authors-management/add" element={<Layout> <AddAuthor /> </Layout>} />
            <Route path="/reviews-management" element={<Layout> <ReviewsManagement /> </Layout>} />
            <Route path="/suggestions" element={<Layout> <SuggestionsPage /> </Layout>} />
            <Route path="/feedback" element={<Layout> <Feedback /> </Layout>} />
            <Route path="/user/information" element={<ProfileLayout> <Profile /> </ProfileLayout>} />
            <Route path="/user/my-team" element={<ProfileLayout> <MyTeam /> </ProfileLayout>} />
          </Route>

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/book-library-dashboard" element={<SignIn />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;