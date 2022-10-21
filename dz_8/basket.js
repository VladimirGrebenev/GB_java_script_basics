'use strict';

const basketDivEl = document.querySelector('.basket');
const basketIcon = document.querySelector('.cartIconWrap');
const basketCountEl = document.querySelector('.cartIconWrap span');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketTotalRow = document.querySelector('.basketTotal');
const basket = {};

function handlerBasket() {
    if (basketDivEl.classList.contains('hidden')) {
        basketDivEl.classList.remove('hidden');
    } else {
        basketDivEl.classList.add('hidden');
    }
}

basketIcon.addEventListener('click', handlerBasket);

function addToCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = {id, name, price, count: 0};
    }
    basket[id].count++;
    basketCountEl.textContent = getTotalBasketCount();
    basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
    renderProductInBasket(id);
}

function getTotalBasketCount() {
    return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

function getTotalBasketPrice() {
    return Object.values(basket)
        .reduce((acc, product) => acc + product.count * product.price, 0);
}

function renderProductInBasket(id) {
    const basketRowEl = basketDivEl.querySelector(`.basketRow[data-productID="${id}"]`);

    if (!basketRowEl) {
        renderNewProductInBasket(id);
        return;
    }
    basketRowEl.querySelector('.productCount').textContent = basket[id].count;
    basketRowEl.querySelector('.productTotalRow').textContent = basket[id].count * basket[id].price;
}

function renderNewProductInBasket(productId) {
    const productRow = `
        <div class="basketRow" data-productId="${productId}">
            <div>${basket[productId].name}</div>
            <div>
                <span class="productCount">${basket[productId].count}</span> шт.
            </div>
            <div>$ ${basket[productId].price}</div>
            <div>
                $<span class="productTotalRow">${(basket[productId].price * basket[productId].count)}</span></div>        
        </div>
    `;
    basketTotalRow.insertAdjacentHTML('beforebegin', productRow);
}

document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.closest('.addToCart')) {
        return;
    }

    const featuredItemEl = event.target.closest('.featuredItem');
    const id = +featuredItemEl.dataset.id;
    const name = featuredItemEl.dataset.name;
    const price = +featuredItemEl.dataset.price;
    addToCart(id, name, price);
});
