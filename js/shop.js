const categoryContainer = document.getElementById('category');
const articleContainer = document.getElementById('articles');
const plusButton = document.getElementById('plus');
let articles = [];
let categories = [];
let cart = [];

function init(){
    createCategories();
    showCategories();
    createArticle();
    showArticles();
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
        li.innerHTML += `<a class="block px-2 py-3">${category.name}</a>`;
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

plusButton.addEventListener('click', () => {

})

function showCart(){
    let cartDiv = document.createElement('div');
    cartDiv.setAttribute('class', "bg-white-400 rounded-md")
    cartDiv.innerHTML += `<`;
}