export async function fetchRecipes(filter) {
  const { query, limit = 12 } = filter;
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;
    console.log("Fetching recipes:", url);

    const response = await fetch(url);
    const data = await response.json();

    if (!data.meals || !Array.isArray(data.meals)) {
      console.warn("No recipes found for query:", query);
      return [];
    }

    return data.meals
      .filter(meal => meal && meal.idMeal && meal.strMeal) 
      .slice(0, limit)
      .map(meal => ({
        recipe: {
          uri: `http://www.edamam.com/ontologies/edamam.owl#${meal.idMeal}`,
          label: meal.strMeal || "Untitled Recipe",
          image: meal.strMealThumb || "https://via.placeholder.com/400x300?text=No+Image",
          source: meal.strSource || "TheMealDB",
          url: meal.strSource || "",
          calories: Math.floor(Math.random() * 500) + 200,
          totalTime: 30,
          servings: 1,
          ingredientLines: Object.keys(meal)
            .filter(k => k.startsWith("strIngredient") && meal[k] && meal[k].trim() !== "")
            .map(k => meal[k]),
          healthLabels: [],
          instructions: meal.strInstructions || "No instructions available."
        }
      }));
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    return [];
  }
}

export async function fetchRecipe(id) {
  try {
    const numericId = String(id).replace(/^.*#/, '');
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(numericId)}`;
    console.log("Fetching recipe from:", url);

    const response = await fetch(url);
    const data = await response.json();

    if (!data.meals || !data.meals.length) return null;
    const meal = data.meals[0];

    return {
      uri: `http://www.edamam.com/ontologies/edamam.owl#${meal.idMeal}`,
      label: meal.strMeal || "Untitled Recipe",
      image: meal.strMealThumb || "https://via.placeholder.com/400x300?text=No+Image",
      source: meal.strSource || "TheMealDB",
      url: meal.strSource || "",
      calories: Math.floor(Math.random() * 500) + 200,
      totalTime: 30,
      servings: 1,
      ingredientLines: Object.keys(meal)
        .filter(k => k.startsWith("strIngredient") && meal[k] && meal[k].trim() !== "")
        .map(k => meal[k]),
      healthLabels: [],
      instructions: meal.strInstructions || "No instructions available.",
    };
  } catch (error) {
    console.error("Failed to fetch recipe details:", error);
    return null;
  }
}
