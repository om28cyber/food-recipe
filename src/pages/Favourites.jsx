import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard"; 

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("favourites");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavourites(parsed);
        } else {
          console.warn("Invalid favourites format:", parsed);
          setFavourites([]);
        }
      } else {
        setFavourites([]);
      }
    } catch (error) {
      console.error("Error reading favourites:", error);
      setFavourites([]);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white">
        <p>Loading favourites...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">
        ❤️ Your Favourite Recipes
      </h1>

      {favourites.length === 0 ? (
        <p className="text-center text-gray-400">
          No favourites yet. Add some recipes to your list!
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-8">
          {favourites.map((item, index) => {
            const recipe = item?.recipe || item;
            if (!recipe?.label) return null;

            return <RecipeCard key={index} recipe={recipe} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Favourites;
