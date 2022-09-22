import React from 'react';
import Recipe from './Recipe';
import '../stylesheets/RecipeSearch.css'



const RecipeSearch = ({recipes, recipeList, getRecipes}) => {  

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
        {recipeList}
      </div>
    </div>
  );
}

export default RecipeSearch