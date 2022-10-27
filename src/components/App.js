import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import RecipeContainer from "./RecipeContainer";
import AddRecipeForm from "./AddRecipeForm";
import Welcome from "./Welcome";

const API = "http://localhost:8001/recipes";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }, []);

  function postedRecipes(addedRecipes) {
    setRecipes([...recipes, addedRecipes]);
  }

  function removeRecipe(id) {
    const newRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(newRecipes);
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }
  console.log(search);
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <nav>
        <ul className="links">
          <li>
            <Link to="/Welcome">Welcome Page</Link>
          </li>
          <li>
            <Link to="/Recipes">Recipe List</Link>
          </li>
          {/* <li><Link to="/Search">Search Recipes</Link></li> */}
          <li>
            <Link to="/Change">Add Recipes</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/Welcome" element={<Welcome />} />
        <Route
          path="/Recipes"
          element={
            <RecipeContainer
              recipes={filteredRecipes}
              removeRecipe={removeRecipe}
              search={search}
              handleSearch={handleSearch}
            />
          }
        />
        {/* <Route path="/Search" element={<Search handleSearch={handleSearch} search={search}/>}/> */}
        <Route
          path="/Change"
          element={<AddRecipeForm postedRecipes={postedRecipes} />}
        />
      </Routes>
    </>
  );
}

export default App;
