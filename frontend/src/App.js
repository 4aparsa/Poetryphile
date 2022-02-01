import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RequiresAuth from './utils/RequiresAuth';
import { AuthProvider } from './context/AuthContext';

import AboutPage from './pages/AboutPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import MyPoemsPage from './pages/MyPoemsPage';
import PoemPage from './pages/PoemPage';
import EditPoemPage from './pages/EditPoemPage';
import Header from './components/Header';

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path='about' element={<AboutPage />} />
            <Route path='signup' element={<SignupPage />} />
            <Route path='login' element={<LoginPage />} />
            <Route element={<RequiresAuth />}>
              <Route path='my_poems' element={<MyPoemsPage />} />
            </Route>
            <Route path='poems/:poemId' element={<PoemPage />} />
            <Route element={<RequiresAuth />}>
              <Route path='poems/:poemId/edit' element={<EditPoemPage />} />
            </Route>
            <Route
              path="*"
              element={
                <h1>
                  Nothing is here.
                </h1>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
