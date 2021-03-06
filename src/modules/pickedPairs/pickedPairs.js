import React from 'react';
import filterKeys from '../../lib/filterKeys';
import './pickedPairs.css';


function PickedPairs(props) {
  const { pickedPairs } = props;

  function savePairs() {
    const storedPairs = JSON.parse(localStorage.getItem('studentCombinations'));
    let index = 0;
    while (index < storedPairs.length) {
      console.log(storedPairs[index]);
      console.log(pickedPairs);
      if (storedPairs[index][0][1].name === pickedPairs[0][1].name) break;
      index += 1;
    }
    console.log(index);
    storedPairs.splice(index, 1);
    localStorage.setItem('studentCombinations', JSON.stringify(storedPairs));
  }

  return (
    <ul className="pairs">
      {pickedPairs
        && pickedPairs.map((pair) => {
          console.log(pair.reduce((a, c) => `${a} ${c.name},`, ''));
          
          return (
            <li key={pair[0].name}>{pair.reduce((a, c) => `${a} ${c.name},`, '').slice(0, -1)}</li>
          );
        })}
      <li 
        key="end" 
        onClick={savePairs} 
        onKeyDown={filterKeys(['enter'], savePairs)} 
        role="button" 
        tabIndex="0" 
        className="clicker"
      >
        Save pairs
      </li>
    </ul>
    
  );
}


export default PickedPairs;
