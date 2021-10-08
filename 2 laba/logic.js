var d = document,
    itemBox = d.querySelectorAll('.item_box'), // блок каждого товара
	cartCont = d.getElementById('cart_content'), // блок вывода данных корзины
	productContent = d.getElementById('product_content'); // подробное описание товара
	 
// Функция кроссбраузерная установка обработчика событий
function addEvent(elem, type, handler){
  if(elem.addEventListener){
    elem.addEventListener(type, handler, false);
  } else {
    elem.attachEvent('on'+type, function(){ handler.call( elem ); });
  }
  return false;
}

// Получаем данные из LocalStorage
function getCartData(){
	return JSON.parse(localStorage.getItem('cart'));
}
// Записываем данные в LocalStorage
function setCartData(o){
	localStorage.setItem('cart', JSON.stringify(o));
	return false;
}
// Добавляем товар в корзину
function addToCart(e){
	this.disabled = true; // блокируем кнопку на время операции с корзиной
	var cartData = getCartData() || {}, // получаем данные корзины или создаём новый объект, если данных еще нет
			parentBox = this.parentNode, // родительский элемент кнопки &quot;Добавить в корзину&quot;
			itemId = this.getAttribute('data-id'), // ID товара
			itemTitle = parentBox.querySelector('.item_title').innerHTML, // название товара
			itemPrice = parentBox.querySelector('.item_price').innerHTML; // стоимость товара
	if(cartData.hasOwnProperty(itemId)){ // если такой товар уже в корзине, то добавляем +1 к его количеству
		cartData[itemId][2] += 1;
	} else { // если товара в корзине еще нет, то добавляем в объект
		cartData[itemId] = [itemTitle, itemPrice, 1];
	}
	// Обновляем данные в LocalStorage
	if(!setCartData(cartData)){ 
		this.disabled = false; // разблокируем кнопку после обновления LS
		setTimeout(function(){
			cartCont.innerHTML = 'Продолжить покупки...';
		}, 500);
	}
	return false;
}

function showProduct(e) {
	var cartData = getCartData() || {}, // получаем данные корзины или создаём новый объект, если данных еще нет
			parentBox = this.parentNode, // родительский элемент кнопки &quot;Добавить в корзину&quot;
			itemId = this.getAttribute('data-id'), // ID товара
			itemTitle = parentBox.querySelector('.item_title').innerHTML, // название товара
			itemAuthor = parentBox.querySelector('.author').innerHTML, // автор
			itemPrice = parentBox.querySelector('.item_price').innerHTML, // цена
			totalItems = ''; // стоимость товара

	if(cartData !== null){
		totalItems += '<div class="item_box_desciption">';
		totalItems += '<h3 class="item_title">' + itemTitle + '</h3>';
		totalItems += '<p>Автор: <span class="author">' + itemAuthor + '</span></p>';
		totalItems += '<p>' + 'Цена:'  + '<span class="item_price">' + itemPrice + '</span>$</p>';
		totalItems += '</div>';


		document.writeln(totalItems);
		
	}

	return false;
}

// Устанавливаем обработчик события на каждую кнопку &quot;Добавить в корзину&quot;
for(var i = 0; i < itemBox.length; i++){
	addEvent(itemBox[i].querySelector('.add_item'), 'click', addToCart);
	addEvent(itemBox[i].querySelector('.more'), 'click', showProduct);
}

