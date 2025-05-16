import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Mainboard from './components/Mainboard';
import unsplash from './api/unsplash';
import Login from './components/Login';
import Footer from './components/Footer';
import Profile from './components/Profile';

function App() {
  const [pins, setNewPins] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const handleRegister = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const handleUpdateProfile = (updatedUser) => {
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const handleLogin = (email) => {
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const getImages = (term) => {
    return unsplash.get("/search/photos", {
      params: {
        query: term,
      }
    });
  };

  const onSearchSubmit = (term) => {
    getImages(term).then((res) => {
      let results = res.data.results;
      let newPins = [...results, ...pins];
      newPins.sort(() => 0.5 - Math.random());
      setNewPins(newPins);
    }).catch((error) => {
      console.error('Search error:', error);
    });
  };

  const getNewPins = () => {
    const pinTerms = ['Spiderman', 'shoes', 'dogs', 'cats', 'city', 'buildings', 'cars', 'Tatoo'];
    
    Promise.all(
      pinTerms.map(pinTerm => 
        getImages(pinTerm).then(res => res.data.results)
      )
    )
      .then(results => {
        const pinData = results.flat().sort(() => 0.5 - Math.random());
        setNewPins(pinData);
      })
      .catch(error => {
        console.error('Error fetching pins:', error);
      });
  };

  useEffect(() => {
    getNewPins();
  }, []);

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="app">
        <Navbar onSubmit={onSearchSubmit} user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Mainboard pins={pins} />} />
          <Route path="/login" element={
            user ? <Navigate to="/" /> : <Login onLogin={handleLogin} onRegister={handleRegister} />
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile 
                user={user} 
                onUpdateProfile={handleUpdateProfile} 
                onLogout={handleLogout} 
              />
            </ProtectedRoute>
          } />
          <Route path="/following" element={<Mainboard pins={pins} />} />
          <Route path="/notifications" element={<Mainboard pins={pins} />} />
          <Route path="/messages" element={<Mainboard pins={pins} />} />
          <Route path="/search" element={<Mainboard pins={pins} />} />
          <Route path="/pin/:id" element={<Mainboard pins={pins} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;