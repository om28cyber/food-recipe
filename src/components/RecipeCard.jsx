import React from 'react'
import { Link } from 'react-router-dom'

const RecipeCard = ({ recipe }) => {
    const r = recipe?.recipe ? recipe.recipe : recipe || {};
    const { image = 'https://via.placeholder.com/400x300?text=No+Image', label='Untitled', uri='' } = r;

    
    const id = uri ? uri.split('#').pop() : r.uri || r.idMeal || '';

    return (
        <Link to={`/recipes/${id}`} className='w-full md:w-[220px]'>
            <div className='bg-_gradient shadow w-full rounded-lg overflow-hidden hover:scale-[1.01] transition-transform duration-150'>
                <img loading="lazy" src={image} alt={label} className='w-full object-cover h-[200px] md:h-[150px]' />

                <div className='p-3'>
                    <p className='text-white font-semibold truncate'>{label}</p>
                </div>
            </div>
        </Link>
    )
}

export default RecipeCard
