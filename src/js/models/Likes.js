

export default class Likes {

    constructor(){
        this.likedList=[];
    }


    addLike(id,title,author,image){
        const likedItem= {
            id,
            title,
            author,
            image
        }

        this.likedList.push(likedItem);
        this.persistToLocalStorage();
        return likedItem;
    }

    deleteLike(id){
        const index=this.likedList.findIndex((el)=>{
            return el.id==id;
        })
        this.persistToLocalStorage();
        this.likedList.splice(index,1);
    }

    isLiked(id){
       return this.likedList.find((element)=>{
            return element.id===id; 
        });
    }

    getNumLikes(){
        return this.likedList.length;
    }

    persistToLocalStorage(){
        localStorage.setItem('likes',JSON.stringify(this.likedList));
    }

    readFromLocalStorage(){
        const el=JSON.parse(localStorage.getItem('likes'));
        if(el) this.likedList=el;
    }
}