import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Mainboard from './components/Mainboard';
import unsplash from './api/unsplash';

function App() {
  const [pins, setNewPins] = useState([]);

  const getImages = (term) => {
    return unsplash.get("/search/photos", {
      params: {
        query: term,
      }
    });
  };

  const onSearchSubmit = (term) => {
    console.log("Searching for images with term:", term);
    getImages(term).then((res) => {
      let results = res.data.results;

      let newPins = [
        ...results,
        ...pins,
      ];

      newPins.sort(function(a, b) {
        return 0.5 - Math.random();  // shuffle array elements
      });

      setNewPins(newPins);
    });
  };

  const getNewPins = () => {
    let promises = [];
    let pinData = [];

    let pinTerms = ['Spiderman', 'shoes', 'dogs', 'cats', 'city', 'buildings', 'cars'];

    pinTerms.forEach((pinTerm) => {
      promises.push(
        getImages(pinTerm).then((res) => {
          let results = res.data.results;
          console.log(results)
          pinData = pinData.concat(results);
          pinData.sort(function(a, b) {
            return 0.5 - Math.random();  // shuffle array elements
          });
          })
        );
    });

    Promise.all(promises).then(() => {
      setNewPins(pinData);
    });
  };

  useEffect(() => {
    getNewPins();
  }, []);

  return (
    <div className="app">
      <Header onSubmit={onSearchSubmit} />
      <Mainboard pins={pins} />
    </div>
  );
}

export default App;
