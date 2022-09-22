import React from 'react';
// import '../stylesheets/Ingredients.css';

const Ingredients = ({name, price, picture}) => {
   
  return (  
    <div className="ingredients">
      <div>
        <img src={picture} alt='ingredient image'/>
        <div>{name}</div>
        <div>{price}</div>
      </div>
    </div>
  )
}

export default Ingredients;