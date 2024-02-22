class Article{
    constructor(name, price, idCategory){
        this.name = name;
        this.price = price;
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
    constructor(articles, total){
        this.articles = articles;
        this.total = total;
    }
}