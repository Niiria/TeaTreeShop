export default function generateCartLi(name, price, amount) {
  const LI = document.createElement('li');
  const P1 = document.createElement('p');
  P1.className = 'card_itemList-name';
  P1.textContent = name;
  const P2 = document.createElement('p');
  P2.className = 'card_itemList-price';
  P2.textContent = `${price}$`;
  const P3 = document.createElement('p');
  P3.textContent = '*';
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'card_itemList-amount';
  input.value = amount;
  const P4 = document.createElement('p');
  P4.textContent = '=';
  const P5 = document.createElement('p');
  P5.className = 'card_itemList-total';
  P5.textContent = `${amount * price}$`;
  const img = document.createElement('img');
  img.src = '../src/assets/img/card/remove.png';
  img.className = 'card_itemList-buy';

  LI.append(P1, P2, P3, input, P4, P5, img);
  return LI;
}
