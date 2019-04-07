import { domElements } from "./base";
import {limitRecipeTitle} from "./SearchView";

export const toggleLikeButton = (isLiked) => {
    const iconString = isLiked ? 'icon-heart' :'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${iconString}`);
}

export const toggleLikeMenu = (numOfLikes) => {
    console.log(numOfLikes);
    if(numOfLikes<1){
        domElements.likesField.style.visibility='hidden';
    }else {
        domElements.likesField.style.visibility='visible';
    }
}


export const renderLikes = (like) => {

    const markUp=`
                         <li>
                            <a class="likes__link" href="#${like.id}">
                                <figure class="likes__fig">
                                    <img src="${like.image}" alt="${like.title}">
                                </figure>
                                <div class="likes__data">
                                    <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                                    <p class="likes__author">${like.author}</p>
                                </div>
                            </a>
                        </li>
    `;

    domElements.likesList.insertAdjacentHTML('beforeend',markUp);

}


export const deleteLike = (id) => {
   const el = document.querySelector(`.likes__link[href="#${id}"]`).parentElement;
   if(el) el.parentElement.removeChild(el);

}