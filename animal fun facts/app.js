import { animals } from './animals';
import React from 'react';
import ReactDOM from 'react-dom';

const displayFact = (e) => {
  const selectedAnimal = e.target.alt;
  const optionIndex = Math.floor(Math.random() * animals[selectedAnimal].facts.length);
  const funFact = animals[selectedAnimal].facts[optionIndex];
  document.getElementById('fact').innerHTML = funFact;
}

const title = "";
const background = <img className='background' alt='ocean' src='/images/ocean.jpg'/>
const images = [];
for (const animal in animals){
  images.push(<img key={animal} className='animal' alt={animal} src={animals[animal].image} onClick={displayFact} aria-label={animal} role='button'/>);
}
const animalFacts = (<div>
  <h1>{title === "" ? "Click an animal for a fun fact" : title}</h1>
  {background}
  <div className='animals'>
    {images}
  </div>
  <p id="fact"></p>
</div>);
ReactDOM.render(animalFacts, document.getElementById("root"));

