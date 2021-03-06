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

// Открываем корзину со списком добавленных товаров
function openCart(e){
	
	var cartData = getCartData(), // вытаскиваем все данные корзины
			totalItems = '',
			totalCount = 0,
			totalSum = 0;
	// если что-то в корзине уже есть, начинаем формировать данные для вывода
	if(cartData !== null){
		totalItems = '<table class="shopping_list"><tr><th>Наименование</th><th>Цена</th><th>Кол-во</th><th></th></tr>';
		for(var items in cartData){
			totalItems += '<tr>';
			for(var i = 0; i < cartData[items].length; i++){
				totalItems += '<td>' + cartData[items][i] + '</td>'; 
			}
			totalSum += cartData[items][1] * cartData[items][2];
			totalCount += cartData[items][2];
			totalItems += '<td><span class="del_item" data-id="'+ items +'">X</span></td>';
			totalItems += '</tr>';
		}
		totalItems += '<tr><td><strong>Итого</strong></td><td><span id="total_sum">'+ totalSum +'</span> $</td><td><span id="total_count">'+ totalCount +'</span> шт.</td><td></td></tr>';
		totalItems += '<table>';
		cartCont.innerHTML = totalItems;
	} else {
		// если в корзине пусто, то сигнализируем об этом
		cartCont.innerHTML = 'В корзине пусто!';
	}
	return false;
}
// функция для нахождения необходимого ближайшего родительского элемента
function closest(el, sel) {
	if (el !== null)
	return el.matches(sel) ? el : (el.querySelector(sel) || closest(el.parentNode, sel));
}

/* Открыть корзину */
addEvent(d.getElementById('checkout'), 'click', openCart);
/* Удаление из корзины */
addEvent(d.body, 'click', function(e){
	if(e.target.className === 'del_item') {
		var itemId = e.target.getAttribute('data-id'),
		cartData = getCartData();
		if(cartData.hasOwnProperty(itemId)){
			var tr = closest(e.target, 'tr');
			tr.parentNode.removeChild(tr); // Удаляем строку товара из таблицы
			// пересчитываем общую сумму и цену
			var totalSumOutput = d.getElementById('total_sum'),
			totalCountOutput = d.getElementById('total_count');
			totalSumOutput.textContent = +totalSumOutput.textContent - cartData[itemId][1] * cartData[itemId][2];
			totalCountOutput.textContent = +totalCountOutput.textContent - cartData[itemId][2];
			delete cartData[itemId]; // удаляем товар из объекта
			setCartData(cartData); // перезаписываем измененные данные в localStorage
		}
	}
}, false);
/* Очистить корзину */
addEvent(d.getElementById('clear_cart'), 'click', function(e){
	localStorage.removeItem('cart');
	cartCont.innerHTML = 'Корзина очишена.';	
});