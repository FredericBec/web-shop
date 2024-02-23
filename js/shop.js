const categoryContainer = document.getElementById('category');
const categoryTitle = document.getElementById('category-title');
const articleContainer = document.getElementById('articles');
const cartContainer = document.getElementById('cart-container');
const modal = document.getElementById('modal');
const modalForm = document.getElementById('modal-form');
const modalOrder = document.getElementById('modal-order');
const continueShop = document.getElementById('continue');
const takeOrder = document.getElementById('takeOrder');
const cancelForm = document.getElementById('cancel');
const validForm = document.getElementById('valid');
const orderContainer = document.getElementById('order-container');

let articles = [];
let categories = [];
let cart = [];
let orders = [];
let customers = [];

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

continueShop.addEventListener('click', () => {
    modal.classList.add('hidden');
});

takeOrder.addEventListener('click', () => {
    modal.classList.add('hidden');
    modalForm.classList.remove('hidden');
});

cancelForm.addEventListener('click', () => {
    document.getElementById('customer').reset();
    modalForm.classList.add('hidden');
});

validForm.addEventListener('click', () => {
    order();
});


function addArticle(){
    articles.forEach(article => {
        const plusButton = document.getElementById(`${article.name}`);
        plusButton.addEventListener('click', () => {
            addToCart(article);
        });
    });
}

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
    }, 500);
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
    articles.push(new Article(1, "MSI Katana 17", 1300.00, 1,"../images/katana17.png", categories[1].id));
    articles.push(new Article(2, "Windows 10", 150.00, 1,"../images/windows-10-home.jpg", categories[4].id));
    articles.push(new Article(3, "Apple macBook", 2500.00, 1,"../images/macbook-air-silver.jpg", categories[0].id));
    articles.push(new Article(4, "Galaxy S10", 1150.00, 1,"../images/samsung-galaxy-s10.jpg", categories[5].id));
    articles.push(new Article(5, "Carte mère ROG Strix X570-E", 600.00, 1,"../images/rogstrix.jpg", categories[2].id));
    articles.push(new Article(6, "Casque audio Corsair", 90.00, 1,"../images/corsair.jpg", categories[3].id));
    articles.push(new Article(7, "Mémoire PC DDR4 Kingston", 100.00, 1,"../images/kingston.jpg", categories[2].id));
    articles.push(new Article(8, "Ecran Iiyama 27 pouces", 250.00, 1,"../images/ecraniiyama.jpg", categories[3].id));
}

/**
 * Affichage des articles
 */
function showArticles(){
    articles.forEach(article => {
        let card = document.createElement('div');
        card.setAttribute('class', "mt-4 flex flex-col justify-between bg-white rounded-xl shadow-lg");
        card.innerHTML += `<img src="${article.img}" class="h-48 w-48 object-cover object-center" alt="${article.name}" />`;
        card.innerHTML += `<span class="my-4 mx-2 font-semibold text-sm text-gray-700">${article.name}</span>`;
        card.innerHTML += `<p class="my-2 mx-2 text-sm font-medium text-gray-900">${article.price} €</p>`;
        card.innerHTML += `<div class="flex justify-end">
                                <button type="button" id="${article.name}" class="w-10 rounded-xl bg-blue-400 px-3 py-2 flex items-end justify-end">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                           </div>`;
        articleContainer.appendChild(card);
        
    });
    addArticle();
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
            card.setAttribute('class', "mt-4 flex flex-col justify-between bg-white rounded-xl shadow-lg");
            card.innerHTML += `<span class="my-4 mx-2 font-semibold text-sm text-gray-700">${article.name}</span>`;
            card.innerHTML += `<p class="my-2 mx-2 text-sm font-medium text-gray-900">${article.price}€</p>`;
            card.innerHTML += `<div class="flex justify-end">
                                    <button type="button" id="${article.name}" class="w-10 rounded-xl bg-blue-400 px-3 py-2 flex items-end justify-end">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </button>
                                </div>`;
            articleContainer.appendChild(card);
            const plusButton = document.getElementById(`${article.name}`);
            plusButton.addEventListener('click', () => {
                addToCart(article);
            });
    });
}

/**
 * création du panier
 */
function createCart(){
    let cartDiv = document.createElement('div');
    cartDiv.setAttribute('class', "flex flex-col justify-center min-h-screen");
    cartDiv.innerHTML += `<div class="bg-gray-100 rounded-lg shadow-lg p-6 min-h-screen">
                                <h1 class="font-bold">Panier :</h1>
                                <div id="cart-content" class="flex flex-col my-4 mb-4"></div>
                                <div class="flex justify-between items-center my-4">
                                    <span class="font-bold">Total :</span>
                                    <span id="total" class="font-bold"></span>
                                </div>
                                <div class="flex justify-end">
                                    <button type="button" id="orderButton" class="bg-blue-400 text-white font-bold my-4 py-2 px-4 rounded">Passer commande</button>
                                </div>                 
                          </div>`;
    cartContainer.appendChild(cartDiv);

    const orderButton = document.getElementById('orderButton');
    orderButton.addEventListener('click', () => {
        const modal = document.getElementById('modal');
        modal.classList.remove('hidden');
    });

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

let newCart = new Cart(totalCart());
/**
 * Affichage du panier
 */
function showCart(){
    cartContainer.setAttribute('class', "visible");

    const cartContent = document.getElementById('cart-content');
    cartContent.innerHTML = '';
    cart.forEach(article => {
        let content = document.getElementById('cart-content');
        content.innerHTML += `<div class="flex flex-col my-4 rounded-md bg-gray-200 shadow-lg">
                                <span class="mb-4 font-semibold text-gray-700">${article.name}</span>
                                <span class="mb-2 text-gray-700">${article.price} €</span>
                                <div class="flex flex-row w-10">
                                    <button type="button" id="minus${article.id}" class="w-10 rounded-md bg-gray-400 px-2 py-2 flex justify-end">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                                        </svg>                          
                                    </button>
                                    <input id="quantity" type="text" value="${article.quantity}" class="w-10 text-center">
                                    <button type="button" id="plus${article.id}" class="w-10 rounded-md bg-gray-400 px-2 py-2 flex justify-end">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </button>
                                    <button type="button" id="delete${article.id}" class="w-10 rounded-md bg-pink-400 mx-4 px-2 py-2 flex justify-end">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>`;
        
    });

    cartEvent();

    let total = document.getElementById('total');
    total.innerHTML = `${totalCart()} €`;
    newCart.articles = [];
    cart.forEach(article => {
        newCart.articles.push(article);
    });
    newCart.total = totalCart();
}

function order(){
    let name = document.getElementById('name').value;
    let address = document.getElementById('address').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;

    let customer = {name, address, email, phone};
    customers.push(customer);

    orders.push(newCart);

    cart.forEach(article => {
        const index = cart.indexOf(article);
        cart.splice(index, cart.length);
    });
    setTimeout(() => {
        if(cart.length === 0){
            cartContainer.setAttribute('class', "invisible");
        }
    }, 500);

    let orderCard = document.createElement('div');
    orderCard.setAttribute('class', "my-2 mx-3 border-t border-solid border-blueGray-200");
    orders.forEach(order => {
        let orderDiv = document.createElement('div');
        orderDiv.setAttribute('class', "flex flex-col bg-white mt-2");
        order.articles.forEach(article => {
            let articleSpan = document.createElement('span');
            articleSpan.setAttribute('class', "font-semibold text-gray-700")
            articleSpan.textContent = `${article.name} - ${article.price} €/u - ${article.quantity}`;
            orderDiv.appendChild(articleSpan);
        });
        let totalSpan = document.createElement('span');
        totalSpan.setAttribute('class', "font-semibold text-gray-700")
        totalSpan.textContent = `Total : ${order.total}`;
        orderDiv.appendChild(totalSpan);
        orderCard.appendChild(orderDiv);
    });

    let customerdiv = document.createElement('div');
    customerdiv.setAttribute('class', "flex flex-col bg-white");
    customerdiv.innerHTML += `<div class="grid grid-cols-2 gap-1">
                                    <span class="font-semibold text-gray-700">${customer.name}</span>
                                    <span class="font-semibold text-gray-700">${customer.address}</span>
                                    <span class="font-semibold text-gray-700">${customer.email}</span>
                                    <span class="font-semibold text-gray-700">${customer.phone}</span>
                                </div>`;
    orderCard.appendChild(customerdiv);
    orderContainer.appendChild(orderCard);

    document.getElementById('customer').reset();
    modalForm.classList.add('hidden');
    modalOrder.classList.remove('hidden');
}