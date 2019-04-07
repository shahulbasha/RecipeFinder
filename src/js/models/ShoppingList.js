import uniqid from 'uniqid';


export default class ShoppingList {

    constructor(){
        this.items=[];
    }


    addItems(count,unit,ingredient){
        const item={
            id:uniqid(),
            count,
            unit,
            ingredient
        }

        this.items.push(item);
        return item;
    }

    deleteItems(id){
        const index= this.items.findIndex(el=>{
            el.id===id;
        })
        this.items.splice(index,1);
    }

    updateCount(id,newCount){
        this.items.find(el=>{
           return el.id===id;
        }).count=newCount;
    }
}