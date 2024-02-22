const categoryContainer = document.getElementById('category');
const categoryTitle = document.getElementById('category-title');
const articleContainer = document.getElementById('articles');
const cartContainer = document.getElementById('cart-container')

let articles = [];
let categories = [];
let cart = [];

function init(){
    createCategories();
    showCategories();
    createArticle();
    showArticles();
    createCart();
 
}

init();

/**
 * Gestion des évènements
 */
categories.forEach(category => {
    const categoryLink = document.getElementById(`${category.id}`);
    categoryLink.addEventListener('click', () => {
        showFilteredArticle(category.id);
    });
});

categoryTitle.addEventListener('click', () => {
    articleContainer.innerHTML = '';
    showArticles();
});

articles.forEach(article => {
    const plusButton = document.getElementById(`${article.name}`);
    plusButton.addEventListener('click', () => {
        addToCart(article);
    });
});

function cartEvent(){
    cart.forEach(article => {
        const plusCart = document.getElementById(`plus${article.id}`);
        plusCart.addEventListener('click', () => {
            addToCart(article);
        });

        const minusCart = document.getElementById(`minus${article.id}`);
        minusCart.addEventListener('click', () => {
            if(article.quantity > 0){
                article.quantity -= 1;
                if(article.quantity === 0) {
                    const index = cart.indexOf(article);
                    cart.splice(index, 1);
                    article.quantity = 1;
                }
                
                showCart();
            }
        });
    
    
    
        const deleteArticle = document.getElementById(`delete${article.id}`);
        deleteArticle.addEventListener('click', () => {
            const index = cart.indexOf(article);
            cart.splice(index, 1);
            showCart();
        });
    });
    
    setTimeout(() => {
        if(cart.length === 0){
            cartContainer.setAttribute('class', "invisible");
        }
    }, "500");


}

/**
 * Création des catégories
 */
function createCategories(){
    categories.push(new Category(1, "PC bureautique"));
    categories.push(new Category(2, "PC gamer"));
    categories.push(new Category(3, "Composants"));
    categories.push(new Category(4, "Périphériques"));
    categories.push(new Category(5, "Logiciels"));
    categories.push(new Category(6, "Tablette et smartphone"));
    categories.push(new Category(7, "Imprimantes"));
}

/**
 * Affichage de chaque catégorie
 */
function showCategories(){
    categories.forEach(category => {
        let li = document.createElement('li');
        li.innerHTML += `<a id="${category.id}" href="#" class="block px-2 py-3">${category.name}</a>`;
        categoryContainer.appendChild(li);
    })
}

/**
 * création des articles
 */
function createArticle(){
    articles.push(new Article(1, "MSI Katana 17", 1300.00, 1, categories[1].id));
    articles.push(new Article(2, "Windows 10", 150.00, 1, categories[4].id));
    articles.push(new Article(3, "Apple macBook", 2500.00, 1, categories[0].id));
    articles.push(new Article(4, "Galaxy S10", 1150.00, 1, categories[5].id));
    articles.push(new Article(5, "Carte mère ROG Strix X570-E", 600.00, 1, categories[2].id));
    articles.push(new Article(6, "Casque audio Corsair", 90.00, 1, categories[3].id));
    articles.push(new Article(7, "Mémoire PC DDR4 Kingston", 100.00, 1, categories[2].id));
    articles.push(new Article(8, "Ecran Iiyama 27 pouces", 250.00, 1, categories[3].id));
}

/**
 * Affichage des articles
 */
function showArticles(){
    articles.forEach(article => {
        let card = document.createElement('div');
        card.setAttribute('class', "mt-4 flex flex-col justify-between");
        card.innerHTML += `<span class="text-sm text-gray-700">${article.name}</span>`;
        card.innerHTML += `<p class="text-sm font-medium text-gray-900">${article.price}€</p>`;
        card.innerHTML += `<button type="button" id="${article.name}" class="rounded-md bg-blue-400 px-3 py-2 flex justify-end">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                           </button>`;
        articleContainer.appendChild(card);
    })
}

/**
 * fonction permettant d'afficher les articles par la catégorie sélectionnée
 * @param {*} categoryId 
 */
function showFilteredArticle(categoryId){
    articleContainer.innerHTML = '';

    const filteredArticles = articles.filter(article => article.idCategory === categoryId);

    filteredArticles.forEach(article => {
            let card = document.createElement('div');
            card.setAttribute('class', "mt-4 flex flex-col justify-between");
            card.innerHTML += `<span class="text-sm text-gray-700">${article.name}</span>`;
            card.innerHTML += `<p class="text-sm font-medium text-gray-900">${article.price}€</p>`;
            card.innerHTML += `<button type="button" id="${article.name}" class="rounded-md bg-blue-400 px-3 py-2 flex justify-end">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>`;
            articleContainer.appendChild(card);
        
    })
}

/**
 * création du panier
 */
function createCart(){
    let cartDiv = document.createElement('div');
    cartDiv.setAttribute('class', "flex flex-col justify-center min-h-screen");
    cartDiv.innerHTML += `<div class="bg-gray-100 rounded-lg shadow-lg p-6">
                                <h1 class="font-bold">Panier :</h1>
                                <div id="cart-content" class="flex flex-col mb-4"></div>
                                <div class="flex justify-between items-center">
                                    <span class="font-bold">Total :</span>
                                    <span id="total" class="font-bold"></span>
                                </div>
                                <div>
                                    <button class="bg-blue-400 text-white font-bold py-2 px-4 rounded">Passer commande</button>
                                </div>                 
                          </div>`;
    cartContainer.appendChild(cartDiv);

}

function addToCart(article){
    if(!cart.includes(article)){
        cart.push(article);
    }else {
        article.quantity += 1;
    };
    showCart();
}

function totalCart(){
    let total = 0;
    cart.forEach(article => {
        total += (article.price * article.quantity);
    });

    return total;
}

/**
 * Affichage du panier
 */
function showCart(){
    cartContainer.setAttribute('class', "visible");
    const newCart = new Cart(cart, totalCart());
    const cartContent = document.getElementById('cart-content');
    cartContent.innerHTML = '';
    cart.forEach(article => {
        let content = document.getElementById('cart-content');
        content.innerHTML += `<div class="flex flex-col">
                                <span class="">${article.name}</span>
                                <span class="">${article.price}€</span>
                                <div class="flex flex-row">
                                    <button type="button" id="minus${article.id}" class="rounded-md bg-blue-400 px-3 py-2 flex justify-end">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                                        </svg>                          
                                    </button>
                                    <input id="quantity" type="text" value="${article.quantity}" class="w-4 text-center">
                                    <button type="button" id="plus${article.id}" class="rounded-md bg-blue-400 px-3 py-2 flex justify-end">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </button>
                                    <button type="button" id="delete${article.id}" class="rounded-md bg-blue-400 px-3 py-2 flex justify-end">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>`;
        
    });

    cartEvent();

    let total = document.getElementById('total');
    total.innerHTML = `${totalCart()}`;
}