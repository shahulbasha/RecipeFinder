import {domElements} from './base';

export const renderItem= (item)=> {

    const markUp = `                
    <li class="shopping__item" data-itemid=${item.id}>
        <div class="shopping__count">
            <input type="number" value="${item.count}" step="${item.count}" class="shopping__count__value">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
    
    `;

    domElements.shoppingList.insertAdjacentHTML('beforeend',markUp);
}


export const deleteItems= (id)=> {

    const item=document.querySelector(`[data-itemId="${id}"]`);
   // domElements.
   item.parentElement.removeChild(item);
}