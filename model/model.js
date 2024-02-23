class Article{
    constructor(id, name, price, quantity, img, idCategory){
        this.id =id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.img = img;
        this.idCategory = idCategory;
    }
}

class Category{
    constructor(id, name){
        this.id = id;
        this.name = name;
    }
}

class Cart{
    articles = [];
    constructor(articles, total){
        this.articles = articles;
        this.total = total;
    }
}