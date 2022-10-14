import React from 'react';
import Recipe from './Recipe';
import '../stylesheets/RecipeSearch.css'



const RecipeSearch = ({ recipes, getRecipes, setRecipeDetail }) => {  
  // console.log(recipes);
  //create an array of objects to display on the recipeSearch page
  const currRecipes = [];
  for (let key in recipes){
    currRecipes.push(<Recipe 
      key={key}
      img={recipes[key].image}
      name={recipes[key].name}
      ingredients={recipes[key].ingredients}
      url={recipes[key].url}
      price={recipes[key].price}
      setRecipeDetail={setRecipeDetail}
      />)
  }


  return (
    <div className="recipe-search">
      <div className='search-area'>
        <form className='message-form' onSubmit={e => getRecipes(e)}>
          <input className='search-box'
            type='text'
            name='recipe'
            placeholder='Search for recipes'
            autoComplete='off'
            />
          <button type='submit' className='recipe-button'>
            Search
          </button>
        </form>
      </div>
      <div className="recipe-tiles">
        {currRecipes}
      </div>
    </div>
  );
}

export default RecipeSearch