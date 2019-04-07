import axios from 'axios';
import {apiKey} from '../config'

export default class Search{

    constructor(query){
        this.query=query;
    }

    async getRecipes(){

        try{
            const res=await axios(`https://www.food2fork.com/api/search?key=${apiKey}&q=${this.query}`);
            this.result=res.data.recipes;
            
        }
        catch(error){
            console.log(error);
        }
    }
}