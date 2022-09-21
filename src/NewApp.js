import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './stylesheets/App.scss';
import Header from './new-components/Header';
// import SignIn from '...';
import RecipeSearch from './new-components/RecipeSearch';
// import RecipeDetails from '...';
// import GroceryList from '...';

//not too sure about the organization of the sign-in page vs the home page in regards to priority

const App = () => {
//create State here to pass down to the child components
  const [recipes, setRecipes] = useState([]);
  const [groceries, setGroceries] = useState([]);
  const [user, setUser] = useState(false);
  
  return (
    <Router>
      <Header 
      user={user}
      />
      <Routes>
        {/* not quite sure on how to wrap our pages with authentication */}
        {/* <Route element={<SignIn/>} />  */}
        
        <Route path='/' element={<RecipeSearch
          recipes={recipes}
          setRecipes={setRecipes}
          />}
          />  
        {/* <Route path='/recipes' element={<RecipeDetails
          recipes={recipes}
          setRecipes={setRecipes}
          setGroceries={setGroceries}
          />} 
          />
        <Route path='/groceries' element={<GroceryList
          groceries={groceries}
          setGroceries={setGroceries}
          />} 
          />      */}
      </Routes>
    </Router>
  )
}

export default App;