import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './stylesheets/App.scss';
import Header from './new-components/Header';
// import SignIn from '...';
import RecipeSearch from './new-components/RecipeSearch';
import Recipe from './new-components/Recipe';
import RecipeDetails from './new-components/RecipeDetails';
// import GroceryList from '...';

//not too sure about the organization of the sign-in page vs the home page in regards to priority

const App = () => {
//create State here to pass down to the child components
  const [recipes, setRecipes] = useState();
  const [recipeList, setRecipeList] = useState([])
  const [recipeDetail, setRecipeDetail] = useState(null)
  const [groceries, setGroceries] = useState([]);
  const [user, setUser] = useState(false);
  
  //send request to server for recipes from API
  const getRecipes = (e) => {
    e.preventDefault();
      //req perams for the search
    console.log(e.target.recipe.value);
      //request recipes based on the client entry in the search bar
    fetch(`/recipes/search/?id=${e.target.recipe.value}`)
    .then(resp => resp.json())
    .then(data => {
      console.log(data); 
      //create an array of objects to display on the recipeSearch page
      const currRecipes = [];
      for (let key in data){
        console.log(key)
        currRecipes.push(<Recipe 
          key={key}
          img={data[key].image}
          name={data[key].name}
          ingredients={data[key].ingredients}
          url={data[key].url}
          setGroceries={setGroceries}
          />)
      }
      //updating the state to be equal to an object that contains the recipies as keys to utilize for the backend
      setRecipes(data);
      setRecipeList(currRecipes)
      getPricing(data);
    })
  }
  
  const fetchApi = (key, value) => {
    console.log("Running fetchApi")
    fetch('/recipes/ingredients', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({[key]: value}),
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
    })
  }

  //get pricing on all ingredients from each recipe
  const getPricing = (recipes) => {
    //grab each recipe from the recipes object
    console.log(`Get Pricing Running for...`);
    for (let key in recipes) {
      console.log(`${key}`)
      //create empty array to push all of the ingredients as a string into
      const ingredients = []
      //grab each ingredient from the list
      for (let i = 0; i < recipes[key].ingredientDetails.length; i++) {
        ingredients.push(recipes[key].ingredientDetails[i].food)
      }
      fetchApi(key, ingredients)
    }
    //send a request for each recipe to the backend for all recipes in the recipe Object
    //   await fetch('/recipe', {
    //     method: "GET",
    //     body: {[key]: ingredients},
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   })
    //   .then(resp => resp.json())
    //   .then(data => {
    //     console.log(data)
    //   })
    // }
    // console.log("getPricing done")
  }

  //onClick from the individual recipe tiles, this will then send the data from the recipe clicked so that the correct ingredients will be passed through
  const getRecipeDetails = (e) => {
    e.preventDefault();
    const newList = recipeDetail;
    let recipe = e.currentTarget.id
    setRecipeDetail({[recipe]: newList})
  }

  return (
    <Router>
      <Header 
      user={user}
      setUser={setUser}
      />
      <Routes>
        <Route path='/' element={<RecipeSearch
          recipes={recipes}
          recipeList={recipeList}
          getRecipes={getRecipes}
          getRecipeDetails={getRecipeDetails}
          />}
          />  
        <Route path='/recipes' element={<RecipeDetails
          recipes={recipes}
          setRecipes={setRecipes}
          setGroceries={setGroceries}
          />} 
          />
        {/* <Route path='/groceries' element={<GroceryList
          groceries={groceries}
          setGroceries={setGroceries}
          />} 
          />      */}
      </Routes>
    </Router>
  )
}

export default App;