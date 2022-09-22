import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Recipe.css';

const Recipe = ({img, name, ingredients, url, setGroceries}) => {
  //render individual recipes (flexbox with align centers, and space between)
    //display the name of the recipe with the total price below (flexbox with columns and space-around)
    //img of the recipe to be on the right side
  return (  
    <div className="recipes">
      <div className="recipe-info">
        <p><strong>Recipe:</strong> <a href={url} target="_blank">{name}</a></p>
        <p><strong>Price:</strong> TBD</p>
        <Link to="/recipes">
          <button id={name}>Get Ingredients</button>
        </Link>
      </div>
      <div></div>
      <div className="recipe-image">
        <img src={img} alt="Recipe image"/>
      </div>
    </div>
  )
}

export default Recipe;