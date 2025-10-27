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
      <div className='w-full h-[80vh] flex items-center justify-center'>
        <Spinner size={64} />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className='w-full p-6'>
        <Header title='Recipe not found' subtitle='Try searching for something else' />
        <div className='text-center py-10'>No recipe information available.</div>
      </div>
    );
  }

  const { label, image, ingredientLines = [], instructions = '', calories, totalTime, servings } =
    recipe;

 
  const cleanInstructions = Array.isArray(instructions)
    ? instructions.join('\n')
    : instructions || '';

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <Header title={label} subtitle={recipe.source || ''} />
      <div className='bg-white dark:bg-[#0b1224] rounded-2xl shadow-lg overflow-hidden mt-6'>
        <img loading='lazy' src={image} alt={label} className='w-full h-64 object-cover' />
        <div className='p-6'>
          <div className='flex flex-col md:flex-row md:space-x-6'>
            <div className='md:w-2/3'>
              <h2 className='text-2xl font-semibold mb-3'>{label}</h2>
              <div className='text-sm text-gray-400 mb-4'>
                <span className='mr-4'>⏱ {totalTime || 30} mins</span>
                <span className='mr-4'>🍽 Serves: {servings || 1}</span>
                <span>🔥 Calories: {Math.round(calories) || 250}</span>
              </div>

              <h3 className='text-lg font-medium mt-4 mb-2'>Ingredients</h3>
              <ul className='list-disc list-inside space-y-1'>
                {ingredientLines.length > 0 ? (
                  ingredientLines.map((ing, i) => <li key={i}>{ing}</li>)
                ) : (
                  <li>No ingredients listed.</li>
                )}
              </ul>

              <div className='flex items-center gap-3 mt-6'>
                <button
                  onClick={toggleFavourite}
                  className='px-3 py-2 rounded-md bg-red-500 text-white hover:opacity-90 transition'
                >
                  {isFavourite() ? 'Remove from Favourites ❤' : 'Add to Favourites ❤'}
                </button>
                <a
                  href={recipe.url || '#'}
                  target='_blank'
                  rel='noreferrer'
                  className='px-3 py-2 rounded-md bg-gray-100 dark:bg-[#071023] text-sm underline'
                >
                  View Full Recipe ↗
                </a>
              </div>

              {/* 🟢 Instructions with Show More / Less */}
              <h3 className='text-lg font-medium mt-6 mb-2'>Instructions</h3>
              <div className='prose max-w-none text-sm whitespace-pre-line'>
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
                  className='mt-3 px-4 py-2 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition'
                >
                  {showMore ? 'Show Less' : 'Show More'}
                </button>
              )}
            </div>

            <aside className='md:w-1/3 mt-6 md:mt-0'>
              <div className='p-4 bg-gray-50 dark:bg-[#071023] rounded-lg'>
                <h4 className='font-semibold mb-2'>Details</h4>
                <p className='text-sm mb-1'>
                  <strong>Source:</strong> {recipe.source || 'TheMealDB'}
                </p>
                <p className='text-sm mb-1'>
                  <strong>URL:</strong>{' '}
                  {recipe.url ? (
                    <a
                      href={recipe.url}
                      target='_blank'
                      rel='noreferrer'
                      className='underline break-all'
                    >
                      {recipe.url}
                    </a>
                  ) : (
                    '—'
                  )}
                </p>
              </div>
              <Link to='/' className='inline-block mt-4 text-sm underline'>
                ← Back to search
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
