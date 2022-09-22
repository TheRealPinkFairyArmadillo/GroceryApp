import React from 'react';
// import '../stylesheets/Ingredients.css';

const Ingredients = ({name, quantity, price}) => {
   
  return (  
    <div className="ingredients">
      <div>
        <div>{quantity}</div>
        <div>{name}</div>
        <div>{price}</div>
      </div>
      <div>
        <button className='Grocery Button' onClick={e => addToGroceryList(e)}>Add to Grocery List</button>
      </div>
    </div>
  )
}

export default Ingredients;