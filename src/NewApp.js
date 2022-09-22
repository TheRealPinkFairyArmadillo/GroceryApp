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
  //state that holds a single object of each query
  const [recipes, setRecipes] = useState();
  //state used to render the recipe tiles on recipeSearch page
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
  
  //calling this funciton for every recipe loaded on the recipeSearch page
  const fetchApi = (key, value) => {
    return new Promise(resolve => {
    console.log(`${key} = ${value}`)
    console.log("Running fetchApi")
    console.log({[key]: value})
    //sending the backend a post request that is an object, with the recipe as key and the array of ingredients as the value
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
      //!!logging each array that comes back (currently getting an array with the recipe, and then every ingredient with index number, name, and price)
      console.log('data', data)
      resolve(data);
    })
  })
  }

  //get pricing on all ingredients from each recipe
  const getPricing = async (recipes) => {
    //grab each recipe from the recipes object
    console.log(`Get Pricing Running for...`);
    //!!!get a single recipes ingredients ***testing***
    const firstRecipe = Object.keys(recipes)[0]
    const ingredients = [];
    for(let i = 0; i < recipes[firstRecipe].ingredientDetails.length; i++){
      ingredients.push(recipes[firstRecipe].ingredientDetails[i].food)
    }

    // for (let key in recipes) {
    //   console.log(`${key}`)
    //   //create empty array to push all of the ingredients as a string into
    //   const ingredients = []
    //   //grab each ingredient from the list
    //   for (let i = 0; i < recipes[key].ingredientDetails.length; i++) {
    //     ingredients.push(recipes[key].ingredientDetails[i].food)
    //   }
    //   //send a request to the server to get pricing on all items in the ingredients array
    const data = await fetchApi(firstRecipe, ingredients)
    const recipeName = Object.keys(data)[0];
    console.log(recipes);
    let detailedIngredients = recipes[recipeName].ingredientDetails
    //iterate through the ingredients
    let currentFood;
    let price = 0;
    for(let i = 0; i < detailedIngredients.length; i++){
      currentFood = detailedIngredients[i].food;
      detailedIngredients[i].food = data[recipeName][currentFood];
      price = price + data[recipeName][currentFood].price;
    }
    console.log(detailedIngredients);

    //make a copy of the recipe
    const newRecipes = JSON.parse(JSON.stringify(recipes));
    newRecipes[recipeName].ingredientDetails = detailedIngredients
    newRecipes[recipeName].price = price;
    setRecipes(newRecipes);
  }

  //onClick from the individual recipe tiles, this should populate the groceryList as well as the recipeDetail page
  const getRecipeDetails = (e) => {
    e.preventDefault();
    //!! didn't finish logic on this one
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