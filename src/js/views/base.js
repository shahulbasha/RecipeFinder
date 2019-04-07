export const domElements = {
    searchInput : document.querySelector('.search__field'),
    searchForm : document.querySelector('.search'),
    searchResultList : document.querySelector('.results__list'),
    searchLoader:document.querySelector('.results'),
    searchPages:document.querySelector('.results__pages'),
    recipeMain:document.querySelector('.recipe'),
    shoppingList:document.querySelector('.shopping__list'),
    likesField:document.querySelector('.likes__field'),
    likesList:document.querySelector('.likes__list')
}

export const dynamicDOMElements = {
    iconLoader : 'loader'
}

export const renderLoader =(parent)=>{
    const loader=
    `
    <div class="${dynamicDOMElements.iconLoader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;

    parent.insertAdjacentHTML("afterbegin",loader);

}

export const clearLoader = () => {
    const loader=document.querySelector(`.${dynamicDOMElements.iconLoader}`);
    if(loader) loader.parentElement.removeChild(loader);
}