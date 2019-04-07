import Search from "./models/Search";
import Recipe from "./models/Recipe";
import ShoppingList from "./models/ShoppingList";
import Likes from "./models/Likes";
import * as searchView from "./views/SearchView";
import * as recipeView from "./views/RecipeView";
import * as shoppingListView from "./views/ShoppingListView";
import * as likesView from "./views/LikesView";
import { domElements, renderLoader, clearLoader } from "./views/base";

//global state
/**
 * -Search object
 * -Current Recipe
 * - Shopping list object
 * - Liked Recipes
 */
const state = {};

/** SEARCH CONTROLLER */

const controlSearch = async () => {
  //get query from view
  const query = searchView.getInput(); 

  if (query) {
    //update state
    state.search = new Search(query);

    try {
      //Prepare UI for results
      searchView.clearInput();
      searchView.clearResult();
      renderLoader(domElements.searchLoader);

      //Search for Recipes
      await state.search.getRecipes();

      //render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (error) {
      alert(error);
      clearLoader();
    }
  }
};

domElements.searchForm.addEventListener("submit", event => {
  event.preventDefault();
  controlSearch();
});



domElements.searchPages.addEventListener("click", event => {
  const btn = event.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto);

    searchView.clearResult();
    searchView.renderResults(state.search.result, goToPage);
  }
});

/** RECIPE CONTROLLER */

const controlRecipe = async () => {
  const id = window.location.hash.replace("#", "");
  if (id) {
    //Prepare UI for Results
    recipeView.clearRecipe();
    renderLoader(domElements.recipeMain);

    //Highlight selected
    searchView.highlightSelected(id);
    //Create Recipe Object
    state.recipe = new Recipe(id);

    //Get Recipe data
    try {
      await state.recipe.getRecipe(id);
      // console.log(state.recipe.ingredients);
      state.recipe.parseIngredients();
      state.recipe.calcTime();
      state.recipe.calcServings();

      //Render Results on UI
      clearLoader();
      recipeView.renderRecipe(state.recipe,state.likes.isLiked(id));
      // console.log(state.recipe);
    } catch (err) {
      console.log(err);
    }
  }
  console.log(id);
};

const controlShoppingList = () => {
  //Create a new list if there is none yet
  if (!state.shoppingList) {
    state.shoppingList = new ShoppingList();
  }

  //Add each ingredient to the list
  state.recipe.ingredients.forEach(ingredient => {
    const item = state.shoppingList.addItems(
      ingredient.count,
      ingredient.unit,
      ingredient.ingredient
    );
    shoppingListView.renderItem(item);
  });
};

//Testing

const controlLikes = () => {

  if(!state.likes){
    state.likes=new Likes();
  }

  const currentId=state.recipe.id;

  if(!state.likes.isLiked(currentId)){

    //Add like to the state
    const newLike=state.likes.addLike(currentId,state.recipe.title,state.recipe.author,state.recipe.image);

    //Toggle the like button
    likesView.toggleLikeButton(true);

    //Add like to ui list
    likesView.renderLikes(newLike);
  }else{

    //Remove like from state
    state.likes.deleteLike(currentId);

    //Toggle like button
    likesView.toggleLikeButton(false);

    //Remove like from ui list
    likesView.deleteLike(currentId);

  }
  likesView.toggleLikeMenu(state.likes.getNumLikes());
};

//handle delete and update list item
domElements.shoppingList.addEventListener("click", event => {
  const itemId = event.target.closest('.shopping__item').dataset.itemid;

  //handel delete event
  if (event.target.matches(".shopping__delete ,.shopping__delete *")) {
    state.shoppingList.deleteItems(itemId);
    shoppingListView.deleteItems(itemId);
  } else if (event.target.matches(".shopping__count__value")) {
    const val = parseFloat(event.target.value, 10);
    if(val>1){
      state.shoppingList.updateCount(itemId, val);
    }
  }
});

// window.addEventListener('hashchange',controlRecipe);
// window.addEventListener('load',controlRecipe);

domElements.recipeMain.addEventListener("click", event => {
  if (event.target.matches(".btn-decrease , .btn-decrease *")) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      recipeView.updateCustomServings(state.recipe);
    }
  } else if (event.target.matches(".btn-increase , .btn-increase *")) {
    state.recipe.updateServings("inc");
    recipeView.updateCustomServings(state.recipe);
  } else if (event.target.matches(".recipe__btn-add , .recipe__btn-add *")) {
    controlShoppingList();
  } else if (event.target.matches(".recipe__love , .recipe__love *")){
    controlLikes();
  }
});

["hashchange", "load"].forEach(event => {
  window.addEventListener(event, controlRecipe);
});

window.addEventListener('load',()=> {
  state.likes=new Likes();
  state.likes.readFromLocalStorage();
  likesView.toggleLikeMenu(state.likes.getNumLikes());
  state.likes.likedList.forEach((like)=>{
    likesView.renderLikes(like);
  })

})
