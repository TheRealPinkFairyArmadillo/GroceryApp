import React from 'react';
// import '../../../stylesheets/stretchinfo.scss';

const Recipe = props => {
    console.log(props)
  //render individual recipes (flexbox with align centers, and space between)
    //display the name of the recipe with the total price below (flexbox with columns and space-around)
    //img of the recipe to be on the right side
  return (  
    <div className="recipes">
      <div className="recipe-info">
        <p><strong>Recipe:</strong> <a href={props.url}>{props.recipe}</a></p>
        <p><strong>Price:</strong> {props.price}</p>
      </div>
      <div className="instructions">
        <img src={props.img} alt="Recipe image"/>
      </div>
    </div>
  )
}

export default Recipe;