import axios from 'axios';
import {apiKey} from '../config';

export default class Recipe {

    constructor(id){
        this.id=id;
    }

    async getRecipe(){
        try{
            const result=await axios(`https://www.food2fork.com/api/get?key=${apiKey}&rId=${this.id}`);
            this.title= result.data.recipe.title;
            this.author=result.data.recipe.publisher;
            this.image=result.data.recipe.image_url;
            this.source=result.data.recipe.source_url;
            this.ingredients=result.data.recipe.ingredients;
            //console.log(this);
        }
        catch(error){
            console.log(error);
        }
    }

    calcTime(){
        this.time=Math.ceil(this.ingredients.length/3)*15;
    }

    calcServings(){
        this.servings=4;
    }

    parseIngredients(){

        const unitsLong=['tablespoon','tablespoons','ounces','ounce','teaspoons','teaspoon','pounds','cups'];
        const unitsShort=['tbsp','tbsp','oz','oz','tsp','tsp','pound','cup'];
        const units=[...unitsShort,'g','kg'];
        const newIngredients = this.ingredients.map((el)=>{
            //Uniform units
            let ingredient=el.toLowerCase();
            unitsLong.forEach((unit,index)=>{
                ingredient=ingredient.replace(unit,unitsShort[index]);
            })

            //remove parantheses
            ingredient= ingredient.replace(/ *\([^)]*\) */g, ' ');
          //  ingredient.replace(')','');

            //parse into count , unit ,ingredients
            let objIngredient = {};
            const ingArr=ingredient.split(' ');
            const unitIndex= ingArr.findIndex((elem)=>{
               return unitsShort.includes(elem);
            })
            if(unitIndex > -1){
              const countArr= ingArr.slice(0,unitIndex);
              if(countArr.length===1){
                  objIngredient.count=eval(countArr[0].replace('-','+'));
              }else{
                  objIngredient.count=eval(countArr.join('+'));
              }
              objIngredient.unit=ingArr[unitIndex];
              objIngredient.ingredient=ingArr.slice(unitIndex+1).join(' ');

            }else if(parseInt(ingArr[0],10)){
                objIngredient = {
                    count :parseInt(ingArr[0],10),
                    unit :'',
                    ingredient :ingArr.slice(1).join(' ')
                }

            }else if(unitIndex==-1){
                // objIngredient.count=1;
                // objIngredient.unit='';
                // objIngredient.ingredients=ingredient;
                objIngredient = {
                    count :1,
                    unit :'',
                    ingredient
                }

            }


            return objIngredient;
        })

        this.ingredients=newIngredients;
    }

    updateServings(type) {
        const newServings= type === 'dec' ? this.servings -1 : this.servings +1;

        this.ingredients.forEach((ing)=>{
            ing.count *= newServings/ this.servings;
        })

        this.servings=newServings;

    }

}