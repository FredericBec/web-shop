const categoryContainer = document.getElementById('category');
const categoryTitle = document.getElementById('category-title');
const articleContainer = document.getElementById('articles');
const cartContainer = document.getElementById('cart-container')
const plusButton = document.getElementById('plus');
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

function createArticle(){
    articles.push(new Article("MSI Katana 17", 1300.00, categories[1].id));
    articles.push(new Article("Windows 10", 150.00, categories[4].id));
    articles.push(new Article("Apple macBook", 2500.00, categories[0].id));
    articles.push(new Article("Galaxy S10", 1150.00, categories[5].id));
    articles.push(new Article("Carte mère ROG Strix X570-E", 600.00, categories[2].id));
    articles.push(new Article("Casque audio Corsair", 90.00, categories[3].id));
    articles.push(new Article("Mémoire PC DDR4 Kingston", 100.00, categories[2].id));
    articles.push(new Article("Ecran Iiyama 27 pouces", 250.00, categories[3].id));
}

function showArticles(){
    articles.forEach(article => {
        //console.log(article.idCategory);
        let card = document.createElement('div');
        card.setAttribute('class', "mt-4 flex flex-col justify-between");
        card.innerHTML += `<span class="text-sm text-gray-700">${article.name}</span>`;
        card.innerHTML += `<p class="text-sm font-medium text-gray-900">${article.price}€</p>`;
        card.innerHTML += `<button type="button" id="plus" class="rounded-md bg-blue-400 px-3 py-2 flex justify-end">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                           </button>`;
        articleContainer.appendChild(card);
    })
}

/**
 * Ecoute d'évènement sur l'ensemble des catégories
 */
categories.forEach(category => {
    const categoryLink = document.getElementById(`${category.id}`);
    categoryLink.addEventListener('click', () => {
        //console.log(category.id);
        showFilteredArticle(category.id);
    });
});

categoryTitle.addEventListener('click', () => {
    location.reload();
});

plusButton.addEventListener('click', () => {

});

/**
 * fonction permettant d'afficher les articles par la catégorie sélectionnée
 * @param {*} categoryId 
 */
function showFilteredArticle(categoryId){
    articleContainer.innerHTML = '';

    const filteredArticles = articles.filter(article => article.idCategory === categoryId);
    //console.log(filteredArticles);

    filteredArticles.forEach(article => {
            let card = document.createElement('div');
            card.setAttribute('class', "mt-4 flex flex-col justify-between");
            card.innerHTML += `<span class="text-sm text-gray-700">${article.name}</span>`;
            card.innerHTML += `<p class="text-sm font-medium text-gray-900">${article.price}€</p>`;
            card.innerHTML += `<button type="button" id="plus" class="rounded-md bg-blue-400 px-3 py-2 flex justify-end">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>`;
            articleContainer.appendChild(card);
        
    })
}

function createCart(){
    let cartDiv = document.createElement('div');
    cartDiv.setAttribute('class', "flex flex-col justify-center min-h-screen");
    cartDiv.innerHTML += `<div class="bg-gray-100 rounded-lg sadow-lg p-6">
                                <h1 class="font-bold">Panier :</h1>
                                <div id="cart-content" class="flex justify-between mb-4"></div>
                                <div class="flex justify-between items-center">
                                    <span class="font-bold">Total :</span>
                                    <span id="total" class="font-bold"></span>
                                </div>
                                <div>
                                    <button class"bg-blue-400 text-white font-bold py-2 px-4 rounded">Passer commande</button>
                                </div>                 
                          </div>`;
    cartContainer.appendChild(cartDiv);

}

function showCart(){
    cartContainer.removeAttribute('invisible');
}