import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../stylesheets/Recipe.css';

const Recipe = ({img, name, url, price, setRecipeDetail}) => {

  
  //render individual recipes (flexbox with align centers, and space between)
    //display the name of the recipe with the total price below (flexbox with columns and space-around)
    //img of the recipe to be on the right side
    // console.log(price);
    let path = 'recipes/' + name
    const Navigate = useNavigate();

  return (  
    <div className="recipes">
      <div className="recipe-info">
        <p><strong>Recipe:</strong> <a href={url} target="_blank">{name}</a></p>
        {price ? (<p><strong>Price:</strong> ${Number(price).toFixed(2)}</p>) : (<p><strong>Price:</strong> Calculating... </p>)}
        <button id={name} onClick={e => {
          setRecipeDetail(e);
          Navigate('/recipes');
          }}>
          Get Ingredients
        </button>
      </div>
      <div></div>
      <div className="recipe-image">
        <img src={img} alt="Recipe image"/>
      </div>
    </div>
  )
}

export default Recipe;