import { itemCounter } from '../js/functions.js';
import { cardAddLi } from '../js/functions.js';
import { teasData } from '../js/functions.js';

// Catching required DOMmater

const CARD_TOTAL = document.querySelector('#main_card-right-total');
const CARD_PAY = document.querySelector('.card_pay');
let CARD_ITEMLIST_UL = document.querySelector('#card_itemList-ul');
let CARD_ITEMLIST_AMOUNT = document.querySelectorAll('.card_itemList-amount');

let CARD_ITEMLIST_TOTAL = document.querySelectorAll('.card_itemList-total');

// let CARD_ITEMLIST_BUY = document.querySelectorAll(".card_itemList-buy");

let card = new teasData();

card = JSON.parse(localStorage.getItem('teasShoppingCard'));

/**















 * // Display the ul on the middle of website















 */

function display() {
    for (let i = 0; i < card.database.length; i++) {
        CARD_ITEMLIST_UL.appendChild(
            cardAddLi(
                card.database[i].name,

                card.database[i].price,

                card.database[i].amount
            )
        );
    }
}

/**















 * // Display the ul on the middle of website

 */

function total() {
    const CARD_ITEMLIST_TOTAL = document.querySelectorAll(
        '.card_itemList-total'
    );

    let total = 0;

    CARD_ITEMLIST_TOTAL.forEach(e => {
        e.textContent.substring(0, e.textContent.length - 1);

        total += parseInt(e.textContent);
    });

    CARD_TOTAL.textContent = total + '$';
}

/**















 * // Display the ul on the middle of website















 */

function getIndex(e) {
    const li = e.target.closest('li');

    const nodes = Array.from(CARD_ITEMLIST_UL.children);

    const index = nodes.indexOf(li);

    return index;
}

if (itemCounter() != 0) {
    display();

    total();
}

// Temporaty that hold the value of previous amount

let temp;

CARD_ITEMLIST_UL.addEventListener('click', e => {
    // Remove an item

    if (e.target.className === 'card_itemList-buy') {
        const index = getIndex(e);

        localStorage.setItem(
            'itemCount',

            itemCounter() - card.database[index].amount
        );

        itemCounter();

        card.database.splice(getIndex(e), 1);

        CARD_ITEMLIST_UL.removeChild(e.target.parentElement);

        CARD_ITEMLIST_UL = document.querySelector('#card_itemList-ul');

        localStorage.setItem('teasShoppingCard', JSON.stringify(card));

        total();
    }

    if (e.target.className === 'card_itemList-amount') {
        CARD_ITEMLIST_AMOUNT = document.querySelectorAll(
            '.card_itemList-amount'
        );

        CARD_ITEMLIST_TOTAL = document.querySelectorAll('.card_itemList-total');

        e.target.addEventListener('input', c => {
            const index = getIndex(e);

            if (isNaN(parseInt(c.data))) {
                CARD_ITEMLIST_AMOUNT[index].value = CARD_ITEMLIST_AMOUNT[
                    index
                ].value.substring(
                    0,
                    CARD_ITEMLIST_AMOUNT[index].value.length - 1
                );
            }

            if (CARD_ITEMLIST_AMOUNT[index].value != null) {
                if (
                    CARD_ITEMLIST_AMOUNT[index].value > 999 ||
                    CARD_ITEMLIST_AMOUNT[index].value <= 0
                ) {
                    if (CARD_ITEMLIST_AMOUNT[index].value != '') {
                        CARD_ITEMLIST_AMOUNT[index].value = temp;
                    }
                }

                CARD_ITEMLIST_TOTAL[index].textContent =
                    card.database[index].price *
                        CARD_ITEMLIST_AMOUNT[index].value +
                    '$';

                card.database[index].amount = CARD_ITEMLIST_AMOUNT[index].value;

                total();

                localStorage.setItem('teasShoppingCard', JSON.stringify(card));

                let temp_itemCount = 0;

                for (let i = 0; i < card.database.length; i++) {
                    temp_itemCount += parseInt(card.database[i].amount);
                }

                localStorage.setItem('itemCount', temp_itemCount);

                itemCounter();

                temp = CARD_ITEMLIST_AMOUNT[index].value;
            }
        });
    }
});

CARD_PAY.addEventListener('click', () => {
    if (itemCounter() > 0) {
        if (document.getElementById('payment_paypal').checked) {
            alert('Kupiono za ' + CARD_TOTAL.textContent + ' zaplata: Paypal');
        } else if (document.getElementById('payment_mastercard').checked) {
            alert(
                'Kupiono za ' + CARD_TOTAL.textContent + ' zaplata: Mastercard'
            );
        } else if (document.getElementById('payment_visa').checked) {
            alert('Kupiono za ' + CARD_TOTAL.textContent + ' zaplata: Visa');
        } else {
            alert('Wybierz sposob zaplaty');

            return;
        }

        card.database = [];

        localStorage.setItem('teasShoppingCard', JSON.stringify(card));

        localStorage.setItem('itemCount', 0);

        CARD_ITEMLIST_UL.innerHTML = '';

        total();

        itemCounter();
    }
});
