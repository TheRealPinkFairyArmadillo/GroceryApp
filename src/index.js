import React from "react";
import ReactDOM from "react-dom/client";
// import './index.css'; //update stylesheets and locations?
import './stylesheets/Recipe.css'
import './stylesheets/RecipeSearch.css'
import App from './NewApp';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);