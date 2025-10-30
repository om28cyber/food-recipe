import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRecipe } from '../utils';
import Header from '../components/Header';
import Spinner from '../components/Spinner';

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getRecipe = async (rid) => {
      setLoading(true);
      const data = await fetchRecipe(rid);
      setRecipe(data);
      setLoading(false);
    };
    if (id) getRecipe(id);
  }, [id]);

  const toggleFavourite = () => {
    if (!recipe) return;
    const stored = JSON.parse(localStorage.getItem('favourites') || '[]');
    const exists = stored.find((r) => r.uri === recipe.uri);
    let updated;
    if (exists) {
      updated = stored.filter((r) => r.uri !== recipe.uri);
    } else {
      updated = [recipe, ...stored];
    }
    localStorage.setItem('favourites', JSON.stringify(updated));
    setRecipe({ ...recipe });
  };

  const isFavourite = () => {
    const stored = JSON.parse(localStorage.getItem('favourites') || '[]');
    return !!stored.find((r) => r.uri === (recipe && recipe.uri));
  };

  if (loading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <Spinner size={64} />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="w-full p-6">
        <Header title="Recipe not found" subtitle="Try searching for something else" />
        <div className="text-center py-10">No recipe information available.</div>
      </div>
    );
  }

  const { label, image, ingredientLines = [], instructions = '', calories, totalTime, servings } =
    recipe;

  const cleanInstructions = Array.isArray(instructions)
    ? instructions.join('\n')
    : instructions || '';

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Header title={label} subtitle="" />
      <div className="bg-white dark:bg-[#0b1224] rounded-2xl shadow-lg overflow-hidden mt-6">
        <img loading="lazy" src={image} alt={label} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-3">{label}</h2>
          <div className="text-sm text-gray-400 mb-4">
            <span className="mr-4">⏱ {totalTime || 30} mins</span>
            <span className="mr-4">🍽 Serves: {servings || 1}</span>
            <span>🔥 Calories: {Math.round(calories) || 250}</span>
          </div>

          <h3 className="text-lg font-medium mt-4 mb-2">Ingredients</h3>
          <ul className="list-disc list-inside space-y-1">
            {ingredientLines.length > 0 ? (
              ingredientLines.map((ing, i) => <li key={i}>{ing}</li>)
            ) : (
              <li>No ingredients listed.</li>
            )}
          </ul>

          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={toggleFavourite}
              className="px-3 py-2 rounded-md bg-red-500 text-white hover:opacity-90 transition"
            >
              {isFavourite() ? 'Remove from Favourites ❤' : 'Add to Favourites ❤'}
            </button>
          </div>

          <h3 className="text-lg font-medium mt-6 mb-2">Instructions</h3>
          <div className="prose max-w-none text-sm whitespace-pre-line">
            {cleanInstructions
              ? showMore
                ? cleanInstructions
                : cleanInstructions.slice(0, 400) +
                  (cleanInstructions.length > 400 ? '...' : '')
              : 'No instructions available.'}
          </div>

          {cleanInstructions.length > 400 && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="mt-3 px-4 py-2 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition"
            >
              {showMore ? 'Show Less' : 'Show More'}
            </button>
          )}

          <Link to="/" className="inline-block mt-6 text-sm underline">
            ← Back to search
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
