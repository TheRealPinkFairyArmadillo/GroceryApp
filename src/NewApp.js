import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './stylesheets/App.scss';
import Header from '...';
import SignIn from '...';
import RecipeSearch from '...';
import RecipeDetails from '...';
import GroceryList from '...';

//not too sure about the organization of the sign-in page vs the home page in regards to priority

const App = () => {
//create State here to pass down to the child components
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [groceries, setGroceries] = useState([]);
  
  return (
    <Router>
      <Header />
      <Routes>
        {/* not quite sure on how to wrap our pages with authentication */}
        <Route element={<SignIn/>} /> 
        
        <Route path='/' element={<RecipeSearch/>}/>  
        <Route path='/recipes' element={<RecipeDetails
          recipeIngredients={recipeIngredients}
          setRecipeIngredients={setRecipeIngredients}
          setGroceries={setGroceries}
          />} 
          />
        <Route path='/groceries' element={<GroceryList
          groceries={groceries}
          setGroceries={setGroceries}
          />} 
          />     
      </Routes>
    </Router>
  )
}

export default App;