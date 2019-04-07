import { domElements } from "./base";

export const getInput = () => {
  return domElements.searchInput.value;
};

export const clearInput = () => {
  domElements.searchInput.value = "";
};

export const clearResult = () => {
  domElements.searchResultList.innerHTML = "";
  domElements.searchPages.innerHTML ="";
};

const renderRecipe = recipe => {
  const markUp = `
        <li>
                <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(
                      recipe.title
                    )}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
  domElements.searchResultList.insertAdjacentHTML("beforeend", markUp);
};

export const limitRecipeTitle = (recipeTitle, limit = 17) => {
  if (recipeTitle.length > limit) {
    const tempArr = [];
    recipeTitle.split(" ").reduce((acc, curr) => {
      if (acc != 0 && acc + curr.length <= limit) {
        tempArr.push(curr);
      } else if (acc == 0) {
        tempArr.push(curr);
      }
      return acc + curr.length;
    }, 0);

    return `${tempArr.join(" ")}...`;
  }
  return recipeTitle;
};

const createButton = (currPage,type) => {
  return `
        <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? currPage-1 : currPage+1}">
            <span>Page ${type === 'prev' ? currPage-1 : currPage+1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
        </button>
            `;
};

const renderButtons = (currPage, resultList, resPerPage) => {
  const totalPages = Math.ceil(resultList / resPerPage);
  let button;
  if (currPage == 1 && totalPages > 1) {
    button=createButton(currPage,'next');
  } 
  else if (currPage == totalPages && totalPages > 1) {
   button= createButton(currPage,'prev');
  } 
  else {
   button= `${createButton(currPage,'prev')}
            ${createButton(currPage,'next')}`;
  }

  domElements.searchPages.insertAdjacentHTML("afterbegin",button);
};

export const renderResults = (recipeArr, page = 1, resultsPerPage = 10) => {
  const start = (page - 1) * resultsPerPage;
  const end = page * resultsPerPage;

  recipeArr.slice(start, end).forEach(renderRecipe);

  renderButtons(page, recipeArr.length ,resultsPerPage);

  //recipeArr.forEach(renderRecipe);
};


export const highlightSelected = (id) => {
  const highlightArr = Array.from(document.querySelectorAll('.results__link'));
  highlightArr.forEach((el)=>{
    el.classList.remove('results__link--active');
  })

  const el=document.querySelector(`.results__link[href="#${id}"]`);
  if(el) el.classList.add('results__link--active');
}