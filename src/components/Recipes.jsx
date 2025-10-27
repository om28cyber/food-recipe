import React, { useEffect, useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import Loading from './Loading';
import Searchbar from './SearchBar';
import RecipeCard from './RecipeCard';
import { fetchRecipes } from '../utils';
import Button from './Button';

const Recipes = () => {
  const [allResults, setAllResults] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('Chicken'); 
  const [limit, setLimit] = useState(6);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setQuery(e.target.value);

  const fetchRecipeData = async (q = query) => {
    try {
      setLoading(true);
      const data = await fetchRecipes({ query: q, limit: 50 });
      setAllResults(data);
      setRecipes(data.slice(0, limit));
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLimit(6);
    fetchRecipeData(query);
  };

  const handleShowMore = () => {
    const newLimit = limit + 6;
    setLimit(newLimit);
    setRecipes(allResults.slice(0, newLimit));
  };

  useEffect(() => {
    fetchRecipeData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="w-full">
      {/* 🔍 Search bar */}
      <div className="w-full flex items-center justify-center pt-10 pb-5 px-0 md:px-10">
        <form className="w-full lg:w-2/4" onSubmit={handleSearch}>
          <Searchbar
            placeholder="eg. Cake, Vegan, Chicken"
            handleInputChange={handleChange}
            rightIcon={<BiSearchAlt2 className="text-gray-600" onClick={handleSearch} />}
          />
        </form>
      </div>

      {/* 🧁 Recipes list */}
      {recipes?.length > 0 ? (
        <>
          <div className="w-full flex flex-wrap gap-10 px-0 lg:px-10 py-10 justify-center">
            {recipes.map((item, index) => (
              <RecipeCard
                key={index}
                recipe={item.recipe ? item.recipe : item}
              />
            ))}
          </div>

          {/* 🟢 Always show the button if API gives more than 0 results */}
          {allResults.length > 0 && (
            <div className="flex w-full items-center justify-center py-10">
              <Button
                title={
                  recipes.length >= allResults.length
                    ? 'No More Recipes'
                    : 'Show More'
                }
                containerStyle={`${
                  recipes.length >= allResults.length
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-green-800 hover:bg-green-700'
                } text-white px-5 py-2 rounded-full text-sm transition`}
                handleClick={
                  recipes.length >= allResults.length ? null : handleShowMore
                }
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-white w-full flex items-center justify-center py-10">
          <p className="text-center">No Recipe Found</p>
        </div>
      )}
    </div>
  );
};

export default Recipes;
