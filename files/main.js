console.time('time test');
console.time('start test');
///////////////////////////////////////
/// Общие функции ///
///////////////////////////////////////

// Установка cookie файлов на основном домене магазина, в случае если покупатель зашёл на другой домен магазина, например по старой ссылке
try{$(document).ajaxSuccess(function(i,l,h){try{if(-1<h.data.indexOf("ajax_q=1")){var d=$.parseJSON(l.responseText);if(null!=d&&typeof(d.setcookie)=="object"){for(var g in d.setcookie){var c=document.createElement("script");c.type="text/javascript";c.async=typeof(d.status)=="undefined"||d.status=="reload"?true:false;c.src=d.setcookie[g];var f=document.getElementsByTagName("script")[0];f.parentNode.insertBefore(c,f);}}}}catch(j){}});}catch(e){}
// Установка cookie файлов на основном домене магазина, в случае если покупатель зашёл на другой домен магазина, например по старой ссылке
try{$(document).ajaxSuccess(function(i,l,h){try{if(typeof(h.data)!="undefined"&&-1<h.data.indexOf("ajax_q=1")){var d=$.parseJSON(l.responseText);if(null!=d&&typeof(d.setcookie)=="object"){for(var g in d.setcookie){var c=document.createElement("script");c.type="text/javascript";c.async=typeof(d.status)=="undefined"||d.status=="reload"?true:false;c.src=d.setcookie[g];var f=document.getElementsByTagName("script")[0];f.parentNode.insertBefore(c,f);}}}}catch(j){}});}catch(e){}

// Отправляет ошибку на сервер, для того чтобы служба тех поддержки могла разобраться в проблеме как можно быстрее.
function sendError(desc, page, line) {
  let img = document.createElement('img');
  img.src = 'https://storeland.ru/error/js?desc='+encodeURIComponent(desc)+'&page='+encodeURIComponent(window.location)+'&line=0';
  img.style.position = 'absolute';
  img.style.top = '-9999px';
  try { document.getElementsByTagName('head').appendChild(img) } catch (e){}
  return false;
}

// Функция определения ширины экрана пользователя. /JS/
function getClientWidth() {
  return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientWidth:document.body.clientWidth;
}

// Функция определения браузера. /JS/
function userAgent(){
  const agent = detect.parse(navigator.userAgent).browser.family.replace(/\s+/g, '-');
	document.body.classList.add(agent)
}

// Добавляет пробел 1000 -> 1 000  /  10000 -> 10 000. /JS/
function addSpaces(nStr){
	return String(nStr).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}

// Предзагрузчик. /JS/
function preload() {
	document.querySelectorAll('.preloader').forEach((el) => {
		el.firstElementChild.style.opacity = '0'
		setTimeout(() => { el.style.display = 'none' }, 100);
	})
}

// Создать предзагрузчик. /JS/
function createLoader(position = '') {
	return `<div class="preloader ${position}"><div class="preloading"></div></div>`
}

// Ленивая загрузка. /JS/
function lazyload(){
	const observer = lozad()
	observer.observe()
}


///////////////////////////////////////
// Функция Наверх. /JS/
///////////////////////////////////////
function toTop() {
	const goto = document.getElementById('toTop')
	// Показать при скроле
  window.addEventListener('scroll', function () {
		window.pageYOffset > 99 ? goto.classList.remove('is-hidden') : goto.classList.add('is-hidden');
  })

	// Действие наверх
  goto.addEventListener('click', function () {
    window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		})

    return false;
  })
}


///////////////////////////////////////
// Уведомления
///////////////////////////////////////
function notyStart($content, $type) {
  new Noty({
    text: $content,
    layout: 'bottomRight',
    type: $type,
    theme: '',
    textAlign: 'center',
    animation: {
      open: 'animated fadeInUp',
      close: 'animated fadeOutDown',
      easing: 'swing',
      speed: 400
    },
    timeout: '2000',
    progressBar: true,
    closable: true,
    closeOnSelfClick: true,
    modal: false,
    dismissQueue: false,
    onClose: true,
    killer: false
  }).show();
}


///////////////////////////////////////
// Изменение текста в объкте. /JS/
///////////////////////////////////////
function changeTxt(obj) {
	const slot = obj.querySelector('[slot]')
	const hideTxt = slot.getAttribute('slot')
	const showTxt = slot.innerHTML
	// Обновляем данные
	slot.innerHTML = hideTxt
	slot.setAttribute('slot', showTxt)
}


///////////////////////////////////////
// Конструктор функции пароля
///////////////////////////////////////
class Password {	
	// Нажатие иконки Показать пароль. /JS/
	onClick() {
		const btnPass = document.querySelector('.password__icon')
		const btnReg = document.querySelector('#registration')

		// Если нет объекта
		if (!btnPass) {return false}

		// Действие нажатие Показать пароль
		btnPass.addEventListener('click', () => password.showPass(btnPass, btnPass.previousElementSibling))

		// Если нет объекта
		if (!btnReg) {return false}

		// Действие нажатие Регистрация
		btnReg.addEventListener('click', () => password.registration(btnReg))
	};

	// Превращает поле пароля в текстовое поле и обратно. /JS/
	showPass($btn, $input) {
		// Добавляем активный класс
		$btn.classList.toggle('is-actived')
		
		// Если не ввели пароль
		if ($input.value.length < 1) {return false}

		// Изменяем тип input поля с password на text
		$input.type == 'text' ? $input.type = 'password' : $input.type = 'text'
	};
		
	// Регистрация. /JS/
	registration(obj) {
		// console.log('registration', obj.checked)
		const email = document.querySelector('#sites_client_email')
		const pass = document.querySelector('.password')
		if (obj.checked) {
			obj.checked = true
			email.setAttribute('required', true)
			email.classList.add('required')
			email.previousElementSibling.classList.add('required')
			pass.style.display = ''
		} else {
			obj.checked = false
			email.setAttribute('required', false)
			email.classList.remove('required')
			email.previousElementSibling.classList.remove('required')
			pass.style.display = 'none'
		}
	};

	// Определения capslock в поле пароля. /JS/
	capsWarning() {
		const pass = document.querySelector('#sites_client_pass');
		pass.addEventListener('keyup', event => password.checkCapsWarning(event))
		pass.addEventListener('focusout', () => password.removeCapsWarning())		
	};

	// Показать ошибку. /JS/
	checkCapsWarning(event) {
		document.querySelector('#capslock').style.display = event.getModifierState('CapsLock') ? 'block' : 'none'
	};

	// Скрыть ошибку. /JS/
	removeCapsWarning() {
		document.querySelector('#capslock').style.display = 'none'
	};

}


///////////////////////////////////////
// Конструктор функции Сравнения товаров
///////////////////////////////////////
class Compare {
	constructor() {
		console.log('Compare start')
	}

	// Функции при клике
	onClick() {
		console.log('Compare onClick')
		const element = document.querySelector('.compare__table')
		// Если нет контента
		if (!element) {return false;}
		
		// Действия
		element.addEventListener('click', function(event){
			// Объявление переменных
			const btnSwitch = event.target.closest('.compare__switch');
			const btnSelected = event.target.closest('.compare__selected')
			const btnInput = event.target.closest('.compare__input')
			const btnShow = event.target.closest('.compare__showAll')

			// Сравнение товаров. Отображение всех и различающихся характеристик товара
			if (btnSwitch) {
				compare.onSwitch(btnSwitch)
			}
			// Скрытие характеристик товара, которые выделил пользователь
			else if (btnSelected) {
				compare.onSelected()
			}
			// Отображение скрытых характеристик товара
			else if (btnShow) {
				compare.onShow(btnShow)
			}
			// Отобразить скрытые при клике
			else if (btnInput) {
				document.querySelector('.compare__selected').classList.remove('is-hide')
			}
			// Выход из функции
			else {
				return false
			}

		})

	};

	// Скрытие характеристик товара, которые выделил пользователь
	onSelected() {
		// console.log('Compare onSelected')
		document.querySelector('.compare__showAll').classList.remove('is-hide')
		document.querySelectorAll('.compare__line').forEach((el) => {
			const сhecked = el.querySelector('.compare__input:checked')
			if (сhecked) { el.style.display = 'none' }
		})
	};

	// Показать отличия
	onSwitch(obj) {
		console.log('Compare onSwitch')
		// Обновляем текст
		changeTxt(obj)
		if (obj.classList.contains('switch-on')) {
			obj.classList.remove('switch-on')
			document.querySelector('.compare__showAll').classList.add('is-hide')
			document.querySelectorAll('.compare__line').forEach((el) => el.style.display = '')
		} else {
			obj.classList.add('switch-on')
			document.querySelector('.compare__showAll').classList.remove('is-hide')
			document.querySelectorAll('.compare__line').forEach((el) => el.style.display = el.classList.contains('is-same') ? 'none' : '')
		}
	}

	// Отображение скрытых характеристик товара
	onShow(obj) {
		obj.classList.add('is-hide')
		document.querySelector('.compare__switch').classList.remove('switch-on')
		document.querySelectorAll('.compare__line').forEach((el) => el.style.display = '')
	}

	// Слайдер сравнения
	onSlider() {
		// console.log('Compare onSlider')
		const swiper = new Swiper('.compare__line', {
			loop: false,
			autoplay: false,
			watchSlidesVisibility: true,
			slidesPerView: 4,
			spaceBetween: 16,
			simulateTouch: false,
			grabCursor: false,
			draggable: false,
			autoHeight: false,
			lazy: {
				enabled: false,
				loadPrevNext: true,
				loadOnTransitionStart: true,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				0: {
					slidesPerView: '1',
				},
				320: {
					slidesPerView: '2',
				},
				480: {
					slidesPerView: '2',
				},
				640: {
					slidesPerView: '3',
				},
				768: {
					slidesPerView: '3',
				},
				1024: {
					slidesPerView: '4',
				},
				1200: {
					slidesPerView: '4',
				}
			},
		})
	}

}

	
// Проверка вводимых значений в количестве товара
function keyPress(oToCheckField, oKeyEvent) {
	return oKeyEvent.charCode === 0 || /\d/.test(String.fromCharCode(oKeyEvent.charCode));
}


///////////////////////////////////////
/*** Кол-во ***/
///////////////////////////////////////
class Quantity {
	// Функция Плюс + для товара. //JS
	plus(obj) {
		// console.log('plus obj', obj)
		obj.value = parseInt(obj.value) + 1
		obj.setAttribute('value', obj.value)
		obj.dispatchEvent(new Event('input'));
		return false
	};

	// Функция Минус - для товара. //JS
	minus(obj) {
		// console.log('minus obj', obj)
		obj.value = parseInt(obj.value) - 1
		obj.setAttribute('value', obj.value)
		obj.dispatchEvent(new Event('input'));
		return false
	};

	// Проверка кол-ва. //JS
	check(obj) {
		// console.log('check obj', obj);
		// Количество
		let val = parseInt(obj.value);
		// Проверка максимальныго остатка
		const max = parseInt(obj.getAttribute('max'));

		// Если вводят 0 то заменяем на 1
		if (!val || val < 1) {
			obj.value = 1;
			val = 1;
			obj.previousElementSibling.classList.add('qty__disable');
			return false;
		} else {
			obj.previousElementSibling.classList.remove('qty__disable');
		}

		// Если товара нет в наличии
		if (max == 0) {
			obj.value = 1;
			obj.previousElementSibling.classList.add('qty__disable');
			obj.nextElementSibling.classList.add('qty__disable');
			// Сообщение пользователю
			const message = quantity.notyMessage('Внимание! Вы пытаетесь положить в корзину товар которого нет в наличии');
			notyStart(message, 'warning');
			return false;
		}

		// Если добавляют больше
		if (val > max) {
			obj.value = max;
			val = max;
			obj.nextElementSibling.classList.add('qty__disable');
			// Сообщение пользователю
			const message = quantity.notyMessage('Внимание! Вы пытаетесь положить в корзину товара больше, чем есть в наличии');
			notyStart(message, 'warning');
			return false;
		} else {
			obj.nextElementSibling.classList.remove('qty__disable');
		}		
	};

	// Сообщение пользователю
	notyMessage(message) {
		return `<div class="noty__addto"><div class="noty__message">${message}</div></div>`;
	};

}

// Кол-во в карточке
class QuantityGoods extends Quantity {
	// Статус запуска функции
	once = false;

	constructor () {
		super()
		console.log('QuantityGoods');
	};

	// Действия в карточке товара
	onGoods() {
		const qty = document.querySelector('.productView__qty')
		const qtyMinus = qty.querySelector('.qty__select-minus')
		const qtyPlus = qty.querySelector('.qty__select-plus')
		const qtyInput = qty.querySelector('.qty__input')

		// Если не карточка товара
		if (qty == null) return false;

		// Если функция уже запущена
		if (this.once) return false;

		// Минус
		qtyMinus.addEventListener('click', () => quantityGoods.minus(qtyInput))

		// Плюс
		qtyPlus.addEventListener('click', () => quantityGoods.plus(qtyInput))

		// Изменение
		qtyInput.addEventListener('input', function () {
			quantityGoods.check(qtyInput)
			quantityGoods.updGoods(qtyInput)
		})

		// Статус запуска функции
		this.once = true

	};

	// Изменение кол-ва в карточке. //JS
	updGoods(obj) {
		// console.log('goods obj', obj);
		const block = obj.closest('.productViewBlock');
		// Если не карточка товара
		if (block == null) return false;

		// Объявляем переменные цены
		const val = block.querySelector('.qty__input').value;
		block.querySelector('.goodsDataMainModificationId').value = val;

		// Обновление цены
		const blockNow = block.querySelector('.price__now');
		const priceNow = blockNow.getAttribute('data-price');
		const multiNow = parseInt(val * priceNow);
		blockNow.querySelector('.num').innerHTML = addSpaces(multiNow);

		// Обновление старой цены
		const blockOld = block.querySelector('.price__old');
		if (blockOld) {
			const priceOld = blockOld.getAttribute('data-price');
			const multiOld = parseInt(val * priceOld);
			blockOld.querySelector('.num').innerHTML = addSpaces(multiOld);
		}

		// console.log('goods val', val)
		// console.log('goods priceNow', priceNow)
		// console.log('goods priceOld', priceOld)
		// console.log('goods multiNow', multiNow)
		// console.log('goods multiOld', multiOld)
	};

}

// Кол-во в выпадающей корзине
class QuantityAddto extends Quantity {
	constructor () {
		super()
		console.log('QuantityAddto');
	}

	// Действия в выпадающей корзине
	onAddto() {
		const elements = document.querySelectorAll('.addto__qty');
		// Если нет элементов
		if (elements == null) return false;

		elements.forEach((el) => {
			const qtyMinus = el.querySelector('.qty__select-minus')
			const qtyPlus = el.querySelector('.qty__select-plus')
			const qtyInput = el.querySelector('.qty__input')

			// Минус
			qtyMinus.addEventListener('click', () => quantityAddto.minus(qtyInput))

			// Плюс
			qtyPlus.addEventListener('click', () => quantityAddto.plus(qtyInput))

			// Изменение
			qtyInput.addEventListener('input', function () {
				quantityAddto.check(this);
				quantityAddto.updAddto(this);
			})

		})
	};

	// Выпадающая корзина
	updAddto(obj) {
		// console.log('updAddto obj', obj);
		const item = obj.closest('.addto__item');
		const mod = item.getAttribute('data-mod-id');
		const priceNow = item.querySelector('.price__now');
		const form = item.closest('.addto__form');
		const data = new FormData(form);
		data.append('only_body', '1');

		// Обновить корзину
		setTimeout(() => {
			quantityAddto.getAddtoCart(data, mod, priceNow);				
		}, 100);

	};

	// Обновление выпадающей корзины
	async getAddtoCart($data, $mod, $priceNow) {
		await fetch('/cart', {
			method: "POST",
			body: $data
		})
		// Получаем ответ
		.then((response) => response.text())
		// Преобразуем в html
		.then((html) => {
			// Convert the HTML string into a document object
			const parser = new DOMParser();
			const doc = parser.parseFromString(html, 'text/html');
			quantityAddto.updAddtoContent(doc, $mod, $priceNow)

		})
		.catch((error) => console.error(error));
	};

	// Обновление выпадающей корзины
	updAddtoContent($doc, $mod, $priceNow) {
		// Обновить цену
		const price = $doc.querySelector('.cartTable__item[data-mod-id="' + $mod + '"] .cartTable__price');
		$priceNow.innerHTML = price.innerHTML;
		// Обновить кол-во
		const newCount = $doc.querySelector('.cart-count').innerHTML;
		quantityAddto.updAddtoCount(newCount);
		// Обновить сумму
		const newSum = $doc.querySelector('.cartSumTotal').innerHTML;
		quantityAddto.updAddtoSum(newSum);
		// console.log('updAddto newSum', newSum);
		// Обновить скидку
		const newDiscount = $doc.querySelector('.cartTotal__item-discount .cartTotal__price');
		const totalDiscount = document.querySelector('.addto__total-discount')
		if (newDiscount){
			// console.log('updAddto newDiscount1', newDiscount);
			totalDiscount.classList.remove('is-hidden')
			quantityAddto.updAddtoDiscount(newDiscount.innerHTML)
		} else {
			// console.log('updAddto newDiscount2', newDiscount);
			totalDiscount.classList.add('is-hidden')
		}

	};

	// Обновление счетчика кол-ва корзины
	updAddtoCount($count) {
		const elements = document.querySelectorAll('.cart-count');
		elements.forEach((el) => {
			el.innerHTML = $count;
			el.setAttribute('data-cart-count', $count);
		});
	};

	// Обновление итоговой цены
	updAddtoSum($sum) {
		const elements = document.querySelectorAll('.cartSumNowDiscount');
		elements.forEach((el) => el.innerHTML = $sum)
	};

	// Обновление итоговой скидки
	updAddtoDiscount($sum) {
		const element = document.querySelector('.addto__total-discount .addto__total-price');
		element.innerHTML = $sum;
	};
	
	// Отображаем скидку 
	updAddtoSale() {
		// console.log('updAddtoSale');
		const value = document.querySelector('.discountValue')
		// Если корзина пуста
		if (!value) return false
		// Если есть скидки
		const discount = value.closest('.addto__total-discount')
		value ? discount.classList.remove('is-hidden') : discount.classList.add('is-hidden')
	};

}

// Кол-во в корзине
class QuantityCart extends Quantity {
	constructor () {
		super()
		console.log('QuantityCart');
	}

	// Действия в выпадающей корзине
	onCart() {
		const elements = document.querySelectorAll('.cartTable__qty');
		// Если не карточка товара
		if (elements == null) return false;

		elements.forEach((el) => {
			const qtyMinus = el.querySelector('.qty__select-minus')
			const qtyPlus = el.querySelector('.qty__select-plus')
			const qtyInput = el.querySelector('.qty__input')

			// Минус
			qtyMinus.addEventListener('click', () => quantityCart.minus(qtyInput))

			// Плюс
			qtyPlus.addEventListener('click', () => quantityCart.plus(qtyInput))

			// Изменение
			qtyInput.addEventListener('input', function () {
				quantityCart.check(this);
				quantityCart.updCart(this);
			})

		})
	}

	// Корзина
	updCart(obj) {
		const item = obj.closest('.cartTable__item');
		const mod = item.getAttribute('data-mod-id');
		const priceNow = item.querySelector('.cartTable__price');
		const form = item.closest('.cartTable__form');
		const data = new FormData(form);
		data.append('only_body', '1');

		// Обновить корзину
		setTimeout(() => {
			quantityCart.getCart(data, mod, priceNow);		
		}, 100);

	};

	// Обновление в корзине
	async getCart($data, $mod, $priceNow) {
		await fetch('/cart', {
			method: "POST",
			body: $data
		})
		// Получаем ответ
		.then((response) => response.text())
		// Преобразуем в html
		.then((html) => {
			// Convert the HTML string into a document object
			const parser = new DOMParser();
			const doc = parser.parseFromString(html, 'text/html');
			quantityCart.updCartContent(doc, $mod, $priceNow)
			// console.log('getCart doc', doc);
		})
		.catch((error) => console.error(error));

	};

	// Обновление в корзине
	updCartContent($doc, $mod, $priceNow) {
		// console.log('doc2', $doc);
		// console.log('mod2', $mod);
		// console.log('priceNow2', $priceNow);
		// Обновить цену
		const price = $doc.querySelector('.cartTable__item[data-mod-id="' + $mod + '"] .cartTable__price');
		$priceNow.innerHTML = price.innerHTML;
		// Обновить кол-во
		const newCount = $doc.querySelector('.cart-count').innerHTML;
		quantityAddto.updAddtoCount(newCount);
		// Обновить итого
		const newTotal = $doc.querySelector('.cartTotal__items').innerHTML;
		document.querySelector('.cartTotal__items').innerHTML = newTotal;
		// Обновить минимальную сумму заказа
		cart.minSum();
		// console.log('price', price);
		// console.log('newCount', newCount);
		// console.log('newTotal', newTotal);
	};

}


///////////////////////////////////////
// Конструктор функции Товара
///////////////////////////////////////
class Product {
	constructor() {

		this.init = function () {
			$('.product__item').each(function () {
				product.hoverImage($(this))
				product.priceDiff(this)
			})
		}

		// Запуск функции активного класса товара в других категориях
		this.inCartAll = function (id, val) {
			$('.product__item').filter('[data-id="' + id + '"]').each(function () {
				const count = $(this).find('.inCart__count')
				const newCount = parseInt(count.text()) + parseInt(val)
				// Обновление данных
				$(this).addClass('product__inCart')
				count.text(newCount)
			})
		}

		// Разница цены в процентах. /JS/
		this.priceDiff = function (obj, type = 'percent') {
			// если есть старая цена
			const sales = obj.querySelector('.sticker__sales')
			const old = obj.querySelector('.price__old')

			if (old) {
				const priceOld = parseFloat(obj.querySelector('.price__old').getAttribute('data-price'))
				const priceNow = parseFloat(obj.querySelector('.price__now').getAttribute('data-price'))
				let diff = 0;
				if (type == 'percent') {
					const diffPercent = (((priceOld - priceNow) / priceOld) * 100).toFixed()
					sales.innerHTML = `- ${diffPercent} %`
				} else {
					diff = (priceOld - priceNow).toFixed()
					sales.innerHTML = `- ${addSpaces(diff)}`
				}
			} else {
				if (!sales) return false
				sales.style.display = 'none'
			}

		}

		// Смена изображений при наведении
		this.hoverImage = function (obj) {
			const imagesLen = obj.find('.product__imgID').length
			// если больше 2 изображений товара
			if (imagesLen > 2) {
				// Создаем элементы при наведении на которые будут меняться изображения
				obj.find('.product__imgID').each(function () {
					const image = $(this).attr('data-image')
					const id = $(this).attr('data-id')
					// Создаем элементы
					obj.find('.product__image-hover').append('<div class="product__hoverImage" data-image="' + image + '" data-id="' + id + '"></div>')
					// Добавляем активный класс на элемент навигации
					if (id == obj.find('.product__img').data('id')) {
						obj.find('.product__hoverImage').removeClass('is-actived')
						obj.find('.product__hoverImage[data-id="' + id + '"]').addClass('is-actived')
					}
				})

				// Ховер эффект изменения изображения
				obj.find('.product__hoverImage').hover($.debounce(50, function () {
					const image = $(this).attr('data-image')
					const id = $(this).attr('data-id')
					obj.find('.product__img').attr({
						'image': image,
						'data-id': id
					})

					obj.find('.product__img img').attr('src', image)
					obj.find('.product__hoverImage').removeClass('is-actived')
					$(this).addClass('is-actived')

				}))

			} else {
				return false
			}

		};

		// Добавление в Сравнение и Избранное
		this.addTo = function () {
			// Определяем заголовок уведомления
			function checkMessage(str){
				return str.indexOf('добавлен') != -1 ? 'Успешно добавлен!' : 'Успешно удалён!'				
			}

			// Создать сообщение действия
			function createNoty(title, message, status, link, link_name) {
				return `
					<div class="noty__addto ${status} flex">
						<div class="noty__content">
							<div class="noty__title">${title}</div>
							<div class="noty__message">${message}</div>
						</div>
						<div class="noty__buttons">
							<a class="button-primary" href="${link}" title="${link_name}"><span>${link_name}</span></a>
						</div>
					</div>
				`;
			}

			// Создать товара в списке
			function createItem(pDataid, pUrl, pName, pImg, pDataChar, pDataPrice, delUrl) {
				return `
					<div class="addto__item flex" data-id="${pDataid}">
						<a class="addto__image flex-center" href="${pUrl}" title="${pName}"><img src="${pImg}" alt="${pName}" /></a>
						<div class="addto__content flex">
							<div class="addto__price ${pDataChar}">
								<div class="price__now" data-price="${pDataPrice}"><span title="${pDataPrice} российских рублей"><span class="num">${pDataPrice}</span><span>р.</span></span></div>
							</div>
							<a class="addto__name" href="${pUrl}" title="${pName}"><span>${pName}</span></a>
							<a class="addto__remove button-rotate button-link" href="${delUrl}?id=${pDataid}" data-id="${pDataid}" title="Убрать товар из списка"><i class="icon-close"></i></a>
						</div>
					</div>
				`;
			}

			// Обновление ссылки
			function updateLink(a,from,to,newIsAddStatus,newTitle){
				// Обновляем ссылку, на которую будет уходить запрос и информацию о ней
				a.attr('href', a.attr('href').replace(new RegExp(from), to))
					.attr('title', newTitle)
					.attr('data-action-is-add', newIsAddStatus)
			}

			// Добавление/удаление товара Сравнение
			const blockCompare = '.compare'
			const addCompare = '.add-compare'
			const addtoComapre = '.addto__compare'

			$(addCompare).off('click').on('click', function () {
				// Объект ссылки, по которой кликнули
				const 
					a = $(this),
					isAdd = a.attr('data-action-is-add'),
					addUrl = a.attr('data-action-add-url'),
					delUrl = a.attr('data-action-delete-url'),
					addTitle = a.attr('data-action-add-title'),
					delTitle = a.attr('data-action-delete-title'),
					aText = a.find('span'),
					pName = a.attr('data-prodname'),
					pUrl = a.attr('data-produrl'),
					pImg = a.attr('data-prodimg'),
					pDataid = a.attr('data-id'),
					pDataPrice = a.attr('data-mod-price'),
					pDataChar = a.attr('data-char-code'),
					// addTooltip = a.attr('data-add-tooltip'),
					// delTooltip = a.attr('data-del-tooltip'),
					// pDataMod = a.attr('data-mod-id'),
					// actionUrl = a.attr('data-action-url'),
					requestUrl = a.attr('href');
				
				let flag = 0;

				// Проверка элемента в объекте
				$(addtoComapre).find('.addto__item').each(function () {
					if ($(this).attr('data-id') == pDataid) {
						flag = 1
					}
					
					if (flag == 1) {
						$(this).remove()
						return false
					}

					return flag
				})

				// Если есть информация о том какие URL адреса будут изменены, то можено не перегружать страницу и сделать запрос через ajax
				if (addUrl && delUrl) {
					$.ajax({
						url: requestUrl,
						type: 'POST',
						dataType: 'json',
						cache: false,
						data: {
							'ajax_q': 1
						},
						success: function (data) {							
							if ('ok' == data.status) {
								// Рендер элементов в список
								if (flag == 0) {
									if ($(addtoComapre).length) {
										$(addtoComapre).find('.addto__items').prepend(createItem(pDataid, pUrl, pName, pImg, pDataChar, pDataPrice, delUrl));
									}
								}

								// Если указано, что изменилось число товаров на сравнении
								const countCompare = data.compare_goods_count;
								if (typeof (countCompare) != 'undefined') {
									// Блок информации о том, что есть товары на сравнении
									const sidecount = $(blockCompare).find('[data-count]')
									// Указываем информацию о новом количестве товаров на сравнении
									sidecount.animate({ opacity: 0, display: 'none' }, 500, function () {
										sidecount.text(countCompare).attr('data-count', countCompare)
										if (countCompare > 0) {
											$(blockCompare).addClass('has-items')
										} else {
											$(blockCompare).removeClass('has-items')
											sidecount.attr('data-count', '0').text('0')
											$(addCompare).removeAttr('title').removeClass('is-added')
										}
									}).animate({ display: 'inline', opacity: 1 }, 500)
								}
								
								// Проверка статуса добавления товара
								if (isAdd == 1) {
									// Обновляем ссылку, на которую будет уходить запрос и информацию о ней
									updateLink(a,addUrl,delUrl,0,delTitle ? delTitle : '')
									a.addClass('is-added').parent().addClass('is-added')
									
									// Обновляем ссылку у всех товаров на странице
									$(addCompare).each(function () {
										if ($(this).attr('data-id') == pDataid) {
											$(this).addClass('is-added')
											updateLink($(this),addUrl,delUrl,0,delTitle ? delTitle : '')
										}
									})

								} else {
									// Обновляем ссылку, на которую будет уходить запрос и информацию о ней
									updateLink(a,delUrl,addUrl,1,addTitle ? addTitle : '')
									a.removeClass('is-added').parent().removeClass('is-added')
									
									// Обновляем ссылку у всех товаров на странице
									$(addCompare).each(function () {
										if ($(this).attr('data-id') == pDataid) {
											$(this).removeClass('is-added')
											updateLink($(this),delUrl,addUrl,1,addTitle ? addTitle : '')
										}
									})

								}

								// Обновление текстовой надписи с описанием действия
								if (aText.length) {
									aText.text(a.attr(isAdd == 1 ? 'data-del-tooltip' : 'data-add-tooltip'))
								}

								// Сообщение уведомления
								const content = createNoty(checkMessage(data.message), data.message, 'noty_good', '/compare', 'Перейти в Сравнение');
								
								// Если есть функция, которая отображает сообщения пользователю
								if (typeof (Noty) == 'function') {
									notyStart(content, 'success')
								}
							} else if ('error' == data.status) {
								// Сообщение уведомления
								const content = createNoty('Не удалось добавить!', data.message, 'noty_bad', '/compare', 'Перейти в Сравнение');
								
								// Если есть функция, которая отображает сообщения пользователю
								if (typeof (Noty) == 'function') {
									notyStart(content, 'warning')
								}
							}
						},
						error: function () {
							console.log('Error Ajax add-compare')
							notyStart('Error Ajax add-compare', 'warning')
						}
					});

					return false;
				}
			});

			// Добавление/удаление товара Избранное
			const blockFavorites = '.favorites'
			const addFavorites = '.add-favorites'
			const addtoFavorites = '.addto__favorites'

			$(addFavorites).off('click').on('click', function () {
				// Объект ссылки, по которой кликнули
				const 
					a = $(this),
					isAdd = a.attr('data-action-is-add'),
					addUrl = a.attr('data-action-add-url'),
					delUrl = a.attr('data-action-delete-url'),
					addTitle = a.attr('data-action-add-title'),
					delTitle = a.attr('data-action-delete-title'),
					aText = a.find('span'),
					pName = a.attr('data-prodname'),
					pUrl = a.attr('data-produrl'),
					pImg = a.attr('data-prodimg'),
					pDataid = a.attr('data-id'),
					pDataPrice = a.attr('data-mod-price'),
					pDataChar = a.attr('data-char-code'),
					// addTooltip = a.attr('data-add-tooltip'),
					// delTooltip = a.attr('data-del-tooltip'),
					// pDataMod = a.attr('data-mod-id'),
					// actionUrl = a.attr('data-action-url'),
					requestUrl = a.attr('href');
				
				let flag = 0;

				// Проверка элемента в объекте
				$(addtoFavorites).find('.addto__item').each(function () {
					if ($(this).attr('data-id') == pDataid) {
						flag = 1;
					}

					if (flag == 1) {
						$(this).remove();
						return false;
					}

					return flag;
				});

				// Если есть информация о том какие URL адреса будут изменены, то можено не перегружать страницу и сделать запрос через ajax
				if (addUrl && delUrl) {
					$.ajax({
						url: requestUrl,
						type: 'POST',
						dataType: 'json',
						cache: false,
						data: {
							'ajax_q': 1
						},
						success: function (data) {							
							if ('ok' == data.status) {
								// Рендер элементов в список
								if (flag == 0) {
									if ($(addtoFavorites).length) {
										$(addtoFavorites).find('.addto__items').prepend(createItem(pDataid, pUrl, pName, pImg, pDataChar, pDataPrice, delUrl));
									}
								}

								// Если указано, что изменилось число товаров в избранном
								const countFavorites = data.favorites_goods_count;
								if (typeof (countFavorites) != 'undefined') {
									// Блок информации о том, что есть товары в избранном
									const sidecount = $(blockFavorites).find('[data-count]')
									// Указываем информацию о новом количестве товаров в избранном
									sidecount.animate({ opacity: 0, display: 'none' }, 500, function () {
										sidecount.text(countFavorites).attr('data-count', countFavorites)
										if (countFavorites > 0) {
											$(blockFavorites).addClass('has-items');
										} else {
											$(blockFavorites).removeClass('has-items');
											sidecount.attr('data-count', '0').text('0');
											$(addFavorites).removeAttr('title').removeClass('is-added');
										}
									}).animate({ display: 'inline', opacity: 1 }, 500);
								}

								// Проверка статуса добавления товара
								if (isAdd == 1) {
									// Обновляем ссылку, на которую будет уходить запрос и информацию о ней
									updateLink(a, addUrl,delUrl,0,delTitle ? delTitle : '')
									a.addClass('is-added').parent().addClass('is-added')
									
									// Обновляем ссылку у всех товаров на странице
									$(addFavorites).each(function () {
										if ($(this).attr('data-id') == pDataid) {
											$(this).addClass('is-added')
											updateLink($(this),addUrl,delUrl,0,delTitle ? delTitle : '')
										}
									})
								} else {
									// Обновляем ссылку, на которую будет уходить запрос и информацию о ней
									updateLink(a, delUrl,addUrl,1,addTitle ? addTitle : '')
									a.removeClass('is-added').parent().removeClass('is-added')
									
									// Обновляем ссылку у всех товаров на странице
									$(addFavorites).each(function () {
										if ($(this).attr('data-id') == pDataid) {
											$(this).removeClass('is-added')
											updateLink($(this),delUrl,addUrl,1,addTitle ? addTitle : '')
										}
									})
								}

								// Обновление текстовой надписи с описанием действия
								if (aText.length) {
									aText.text(a.attr(isAdd == 1 ? 'data-del-tooltip' : 'data-add-tooltip'));
								}

								// Сообщение уведомления
								const content = createNoty(checkMessage(data.message), data.message, 'noty_good', '/user/favorites', 'Перейти в Избранное');

								// Если есть функция, которая отображает сообщения пользователю
								if (typeof (Noty) == 'function') {
									notyStart(content, 'success');
								}
							} else if ('error' == data.status) {
								// Сообщение уведомления
								const content = createNoty('Не удалось добавить!', data.message, 'noty_bad', '/user/login', 'Войти');
								
								// Если есть функция, которая отображает сообщения пользователю
								if (typeof (Noty) == 'function') {
									notyStart(content, 'warning');
								}
							}
						},
						error: function () {
							console.log('Error Ajax add-favorites');
							notyStart('Error Ajax add-favorites', 'warning');
						}
					});

					return false;
				}
			});
		};

		// Добавление товара в корзину
		this.addCart = function () {
			$('.product__form').off('submit').on('submit', function () {
				// Добавляем активные классы и обновлем счетчик товаров
				$('.cart').addClass('has-items');

				// Быстрый заказ
				if ($(this).attr('rel') === 'quick') {
					product.quickOrder(this);
					return false;
				}

				// Находим форму, которую отправляем на сервер, для добавления товара в корзину
				const formBlock = $($(this).get(0));
				const formData = formBlock.serializeArray();
				const t = $(this);
				const id = t.find('input[name="form[goods_id]"]').val();
				const val = t.find('.qty__input').val();

				// Проверка на существование формы отправки запроса на добавление товара в корзину
				if (1 > formBlock.length || formBlock.get(0).tagName != 'FORM') {
					alert('Не удалось найти форму добавления товара в корзину');
					return false;
				}

				// Получаем данные формы, которые будем отправлять на сервер
				// Сообщаем серверу, что мы пришли через ajax запрос
				formData.push({ name: 'ajax_q', value: 1 });
				// Так же сообщим ему, что нужно сразу отобразить форму быстрого заказа
				//formData.push({name: 'fast_order', value: 1});
				// Аяксом добавляем товар в корзину и вызываем форму быстрого заказа товара
				$.ajax({
					type: 'POST',
					cache: false,
					url: formBlock.attr('action'),
					data: formData,
					success: function (data) {
						// Анализ системного сообщения в коризне
						const content = $(data).html();
						// Проверяем текст сообщения на наличие ошибки
						if (content.indexOf('Не удалось') != -1) {
							// Сообщение с ошибкой
							if (typeof (Noty) == 'function') {
								notyStart(content, 'warning')
							}
						} else {
							// Сообщение с успешным добавлением
							if (typeof (Noty) == 'function') {
								notyStart(content, 'success')
							}

							// Проверяем все товары в других категориях
							val ? product.inCartAll(id, val) : product.inCartAll(id, 1)

						}
						// Скрытое обновление корзины
						$('.hiddenUpdate').html(data)
					}
				})

				return false
			})
		}

		// Функция выбора модификаций
		this.quickViewMod = function () {
			// Получение центральной разметки страницы (для быстрого просмотра)
			$(document).ready(function () {
				$.fn.getColumnContent = function () {
					const block = ($(this).length && $(this).hasClass('productViewBlock') ? $(this).filter('.productViewBlock') : $('.productViewBlock:eq(0)'));
					// Удаляем все блоки, которые не отображаются в быстром просмотре.
					block.each(function () {
						$(this).children().not('.productView').remove();
					});
					block.removeClass('productViewQuick');
					block.addClass('productViewMod');
					block.find('.productView__image img').attr('src', block.find('.productView__image img').data('src'));
					return block;
				};

				// При наведении на блок товара загружаем контент этого товара, который будет использоваться для быстрого просмотра, чтобы загрузка происходила быстрее.
				$('.product__has-mod').mouseover(function () {
					// Если в блоке нет ссылки на быстрый просмотр, то не подгружаем никаких данных
					const link = $(this).find('.add-mod');
					if (link.length < 1) {
						return true;
					}

					// Если массив с подгруженными заранее карточками товара для быстрого просмотра ещё не создан - создадим его.
					if (typeof (document.quickviewPreload) == 'undefined') {
						document.quickviewPreload = [];
					}

					let href = link.attr('href');
					href += (false !== href.indexOf('?') ? '&' : '?') + 'only_body=1';
					
					// Если контент по данной ссылке ещё не загружен
					if (typeof (document.quickviewPreload[href]) == 'undefined') {
						// Ставим отметку о том, что мы начали загрузку страницы товара
						document.quickviewPreload[href] = 1;
						// Делаем запрос на загрузку страницы товара
						$.get(href, function (content) {
							// Сохраняем контент, необходимый для быстрого просмотра в специально созданный для этого массив
							document.quickviewPreload[href] = $(content).getColumnContent();
						})
						// Если загрузить страницу не удалось, удаляем отметку о том, что мы подгрузили эту страницу
						.fail(function () {
							delete document.quickviewPreload[href];
						});
					}
				});

				// Действие при нажатии на кнопку быстрого просмотра.
				$('.add-mod').on('click', function () {
					let href = $(this).attr('href');
					href += (false !== href.indexOf('?') ? '&' : '?') + 'only_body=1';
					product.quickViewShowMod(href);
					lazyload();
					preload();
					return false;
				});

			});
		};

		// Быстрый просмотр модификаций
		this.quickViewShowMod = function (href, atempt) {
			// Если данные по быстрому просмотру уже подгружены
			if (typeof (document.quickviewPreload[href]) != 'undefined') {
				// Если мы в режиме загрузки страницы и ждём результата от другой функции, то тоже подождём, когда тот контент загрузится и будет доступен в этом массиве.
				if (1 == document.quickviewPreload[href]) {
					// Если попытки ещё не указывались, ставим 0 - первая попытка
					if (typeof (atempt) == 'undefined') {
						atempt = 0;
						// Иначе прибавляем счётчик попыток
					} else {
						atempt += 1;
						// Если больше 500 попыток, то уже прошло 25 секунд и похоже, что быстрый просмотр не подгрузится, отменяем информацию о том, что контент загружен
						if (atempt > 500) {
							delete document.quickviewPreload[href];
							// TODO сделать вывод красивой таблички
							alert('Не удалось загрузить страницу товара. Пожалуйста, повторите попытку позже.');
							return true;
						}
					}
					// Запустим функцию быстрого просмотра через 5 сотых секунды, вероятно запрошендная страница товара уже подгрузится.
					setTimeout('product.quickViewShowMod("' + href + '", ' + atempt + ')', 50);
					return true;
				} else {
					$.fancybox.close();
					$.fancybox.open({
						src: document.quickviewPreload[href],
						type: 'inline',
						transitionEffect: 'slide'
					});
					product.addCart();
					product.addTo();
					goods.goodsModification($('.fancybox-content.productViewBlock'));
					goods.onClick();
					quantityGoods.onGoods();
				}
			} else {
				$.get(href, function (content) {
					$.fancybox.close();
					$.fancybox.open({
						src: $(content).getColumnContent(),
						type: 'inline',
						transitionEffect: 'slide'
					});
					product.addCart();
					product.addTo();
					goods.goodsModification($('.fancybox-content.productViewBlock'));
					goods.onClick();
					quantityGoods.onGoods();
				});
			}
		};

		// Добавление товара в корзину
		this.onCart = function () {
			$('.add-cart').on('click', function () {
				const form = $(this).closest('form');
				if ($(this).hasClass('quick')) {
					form.attr('rel', 'quick');
				} else {
					const rel = form.attr('rel');
					if (rel) {
						form.attr('rel', rel.replace('quick', ''));
					}
				}
				form.trigger('submit');
				return false;
			});
		};

		// Уведомить при отсутствии товара
		this.onNotify = function () {
			$('.add-notify').on('click', function () {
				const formBlock = $(this).closest('.product__form');
				const goodsMod = formBlock.find('[name="form[goods_mod_id]"]').val();
				$('#fancy-notify-goods-mod').val(goodsMod);
			});
		};

		// Быстрый заказ
		this.quickOrder = function (formSelector) {
			// Находим форму, которую отправляем на сервер, для добавления товара в корзину
			const formBlock = $($(formSelector).get(0));
			// Проверка на существование формы отправки запроса на добавление товара в корзину
			if (1 > formBlock.length || formBlock.get(0).tagName != 'FORM') {
				alert('Не удалось найти форму добавления товара в корзину');
				return false;
			}
			// Получаем данные формы, которые будем отправлять на сервер
			const formData = formBlock.serializeArray();
			// Сообщаем серверу, что мы пришли через ajax запрос
			formData.push({ name: 'ajax_q', value: 1 });
			// Так же сообщим ему, что нужно сразу отобразить форму быстрого заказа
			formData.push({ name: 'fast_order', value: 1 });
			// Аяксом добавляем товар в корзину и вызываем форму быстрого заказа товара
			$.ajax({
				type: 'POST',
				cache: false,
				url: formBlock.attr('action'),
				data: formData,
				success: function (data) {
					$.fancybox.open(data, {
						keyboard: false,
						baseClass: 'fastOrder',
						afterShow: function () {
							password.onClick();
							password.capsWarning();
							order.onInit();
							order.onSelect();
							order.coupons();
							order.onValidate();
							preload();
							// Стили для новых селектов
							$('.form__phone').mask('+7 (999) 999-9999');
						}
					});

				}
			});

			return false;
		};

	}
}


///////////////////////////////////////
/*** Действия удаления из ... ***/
///////////////////////////////////////
class Remove {
	constructor() {
		console.log('Remove start');

		// Действия при клике
		this.onClick = function () {
			const content = document.querySelector('.addto')
			// Если нет контента
			if (!content) { return false }
			// Действия
			content.parentElement.addEventListener('click', function (event) {
				// Объявление переменных
				const removeCart = event.target.closest('.cart .addto__remove')
				const removeCartAll = event.target.closest('.cart .addto__removeAll')
				const removeCompare = event.target.closest('.compare .addto__remove')
				const removeCompareAll = event.target.closest('.compare .addto__removeAll')
				const removeFavorites = event.target.closest('.favorites .addto__remove')
				const removeFavoritesAll = event.target.closest('.favorites .addto__removeAll')

				// Удалить из корзины
				if (removeCart) {
					console.log('removeCart', event)
					event.preventDefault();
					remove.fromCart(removeCart)
				// Удалить из сравнения
				} else if (removeCartAll) {
					console.log('removeCartAll', event)
					event.preventDefault();
					remove.fromCartAll(removeCartAll)
				// Удалить все из сравнения
				} else if (removeCompare) {
					console.log('removeCompare', event)
					event.preventDefault();
					remove.fromCompare(removeCompare)
				// Удалить все из сравнения
				} else if (removeCompareAll) {
					console.log('removeCompareAll', event)
					event.preventDefault();
					remove.fromCompareAll(removeCompareAll)
				// Удалить из избранного
				} else if (removeFavorites) {
					event.preventDefault();
					remove.fromFavorites(removeFavorites)
				// Удалить все из избранного
				} else if (removeFavoritesAll) {
					console.log('fromFavoritesAll', event)
					event.preventDefault();
					remove.fromFavoritesAll(removeFavoritesAll)
				} else {
					return false
				}

			})

		}

		// Удаление товара из корзины без обновлении страницы
		this.fromCart = function (obj) {
			console.log('Remove fromCart', obj);
			if (confirm('Вы точно хотите удалить товар из корзины?')) {
				const href = $(obj).attr('href');
				const qty = $(obj).data('qty');
				const id = $(obj).data('id');
				const oldCount = $('.cart-count').attr('data-cart-count');
				$.ajax({
					cache: false,
					url: href,
					success: function (data) {
						const newCount = oldCount - qty;
						$('.cart-count').attr('data-cart-count', newCount).text(newCount);
						$('.cart-wordend').html($(data).find('.cart-wordend').html());
						$('.cartSumNow').attr('data-price', $(data).find('.cartSumNow').attr('data-price')).find('.num').text(addSpaces($(data).find('.cartSumNow').attr('data-price')));
						let flag = 0;
						if (newCount != 0) {
							$('.addto__cart .addto__item').each(function () {
								if (flag == 0) {
									if ($(this).css('display') == 'none') {
										$(this).css('display', 'flex');
										flag++;
									}
								}
							});
						} else {
							$('.cart').removeClass('has-items');
							$('.cart-count').attr('data-cart-count', '0').text('0');
							$('.cart .addto__item').remove();
						}

						// Скрываем и удаляем товар из корзины
						$(obj).parents().find('.addto__item[data-id="' + id + '"]').fadeOut().remove();
						// Удаляем класс добавленного товара в корзину
						$('.product__item[data-id="' + id + '"]').removeClass('product__inCart');
					}
				});
			}
		};

		// Удаление ВСЕХ товаров из Корзины без обновлении страницы
		this.fromCartAll = function (obj) {
			console.log('Remove fromCartAll');
			if (confirm('Вы точно хотите очистить корзину?')) {
				$.ajax({
					cache: false,
					url: $(obj).attr('href'),
					success: function (data) {
						$('.totalSum').html($(data).find('.totalSum').html());
						$('.cart').removeClass('has-items');
						$('.cart-count').attr('data-cart-count', '0').text('0');
						$('.addto__cart .addto__item').remove();
						$('.product__item').each(function () {
							$(this).removeClass('product__inCart').find('.inCart__count').text('0');
						});
					}
				});
			}
		};

		// Удаление товара из Сравнения без обновлении страницы
		this.fromCompare = function (obj) {
			console.log('fromCompare', obj)
			if (confirm('Вы точно хотите удалить товар из сравнения?')) {
				const href = $(obj).attr('href');
				const id = $(obj).attr('data-id');
				const oldCount = $('.compare-count').attr('data-count');
				// Скрываем и удаляем товар из корзины
				$(obj).parents().find('.addto__compare .addto__item[data-id="' + id + '"]').fadeOut().remove();

				$.ajax({
					cache: false,
					url: href,
					success: function (data) {
						const newCount = oldCount - 1;
						$('.compare-count').attr('data-count', newCount).text(newCount);
						let flag = 0;
						if (newCount != 0) {
							$('.addto__compare .addto__item').each(function () {
								if (flag == 0) {
									if ($(this).css('display') == 'none') {
										$(this).css('display', 'flex');
										flag++;
									}
								}
							});
						} else {
							$('.compare').removeClass('has-items');
							$('.compare-count').attr('data-count', '0').text('0');
						}

						const elem = $('.add-compare[data-id="' + id + '"]');
						if (elem.length) {
							elem.attr('data-action-is-add', '1')
								.removeAttr('title')
								.removeClass('is-added')
								.attr('href', elem.attr('href').replace(elem.attr('data-action-delete-url'), elem.attr('data-action-add-url')))
						}
					}
				});
			}
		};

		// Удаление ВСЕХ товаров из Сравнения без обновлении страницы
		this.fromCompareAll = function (obj) {
			console.log('fromCompareAll', obj)
			if (confirm('Вы точно хотите очистить сравнение?')) {
				$.ajax({
					cache: false,
					url: $(obj).attr('href'),
					success: function (data) {
						$('.compare').removeClass('has-items');
						$('.compare-count').attr('data-count', '0').text('0');
						$('.addto__compare .addto__item').remove();
						$('.add-compare').removeAttr('title').removeClass('is-added');
					}
				});
			}
		};

		// Удаление товара из Избранного без обновлении страницы
		this.fromFavorites = function (obj) {
			console.log('fromFavorites', obj)
			if (confirm('Вы точно хотите удалить товар из Избранного?')) {
				const href = $(obj).attr('href');
				const id = $(obj).attr('data-id');
				const oldCount = $('.favorites-count').attr('data-count');
				// Скрываем и удаляем товар из Избранного
				$(obj).parents().find('.addto__favorites .addto__item[data-id="' + id + '"]').fadeOut().remove();

				$.ajax({
					cache: false,
					url: href,
					success: function (data) {
						const newCount = oldCount - 1;
						$('.favorites-count').attr('data-count', newCount).text(newCount);
						let flag = 0;
						if (newCount != 0) {
							$('.addto__favorites .addto__item').each(function () {
								if (flag == 0) {
									if ($(this).css('display') == 'none') {
										$(this).css('display', 'flex');
										flag++;
									}
								}
							});
						} else {
							$('.favorites').removeClass('has-items');
							$('.favorites-count').attr('data-count', '0').text('0');
						}

						const elem = $('.add-favorites[data-id="' + id + '"]');
						if (elem.length) {
							elem.attr('data-action-is-add', '1')
								.removeAttr('title')
								.removeClass('is-added')
								.attr('href', elem.attr('href')
								.replace(elem.attr('data-action-delete-url'), elem.attr('data-action-add-url')));
						}
					}
				});
			}
		};

		// Удаление ВСЕХ товаров из Избранного без обновлении страницы
		this.fromFavoritesAll = function (obj) {
			console.log('fromFavoritesAll', obj)
			if (confirm('Вы точно хотите очистить Избранное?')) {
				$.ajax({
					cache: false,
					url: $(obj).attr('href'),
					success: function (d) {
						$('.favorites').removeClass('has-items');
						$('.favorites-count').attr('data-count', '0').text('0');
						$('.addto__favorites .addto__item').remove();
						$('.add-favorites').removeAttr('title').removeClass('is-added');
					}
				});
			}
		};

	}
}


///////////////////////////////////////
/*** Скрипты для Товары, Категории ***/
///////////////////////////////////////
class Catalog {
	constructor() {
		console.time('Catalog test');

		const content = document.querySelector('#main');

		// Функции при клике на фильтры
		this.onClick = function () {
			// Если нет контента
			if (!content) {return false;}

			content.addEventListener('click', function (event) {
				// Объявление переменных
				const filterInput = event.target.closest('.filter__item input');
				const filterTitle = event.target.closest('.filter__collapsible .filter__title');
				// const filterClear = event.target.closest('.filter__clear');
				const filterIcon = event.target.closest('.filters__icon');

				// Фильтры по товарам. При нажании на какую либо характеристику или свойство товара происходит фильтрация товаров
				if (filterInput) {
					event.target.form.submit();
				}

				// Открытие/Скрытие фильтров в сайдбаре
				else if (filterTitle) {
					event.preventDefault();
					if (filterTitle.classList.contains('is-actived')) {
						filterTitle.classList.remove('is-actived');
						$(filterTitle).next().slideDown(600);
					} else {
						filterTitle.classList.add('is-actived');
						$(filterTitle).next().slideUp(600);
					}

				}

				// Открыть фильтры по иконке
				else if (filterIcon) {
					event.preventDefault();
					filterIcon.classList.toggle('is-opened');
					document.querySelector('#filters').classList.toggle('is-opened');
					document.querySelector('#overlay').classList.toggle('is-opened');
					document.querySelector('#overlay').classList.toggle('transparent');
				}

				// Сборосить категорию фильтра
				// else if (filterClear) {
				// 	event.preventDefault();
				// 	const parent = event.target.closest('.filter__list')
				// 	const checkboxes = parent.querySelectorAll('[type="checkbox"]')
				// 	checkboxes.forEach((el) => {
				// 		el.checked = false
				// 	})
				// 	document.querySelector('.form__filters').submit();
				// }
			});

		};

		// Фильтр по ценам
		this.priceFilter = function () {

			const
				priceFilterMinAvailable = parseInt($('.filters-price__range .min').text()), // Минимальное значение цены для фильтра
				priceFilterMaxAvailable = parseInt($('.filters-price__range .max').text()), // Максимальное значение цены для фильтра
				priceSliderBlock = $('#goods-filter-price-slider'), // Максимальное значение цены для фильтра
				priceInputMin = $('#goods-filter-min-price'), // Поле ввода текущего значения цены "От"
				priceInputMax = $('#goods-filter-max-price'), // Поле ввода текущего значения цены 'До'
				priceSubmitButtonBlock = $('.filters-price__buttons'); // Блок с кнопкой, которую есть смысл нажимать только тогда, когда изменялся диапазон цен.


			// Слайдер, который используется для удобства выбора цены
			priceSliderBlock.slider({
				range: true,
				min: priceFilterMinAvailable,
				max: priceFilterMaxAvailable,
				values: [
					parseInt($('#goods-filter-min-price').val()),
					parseInt($('#goods-filter-max-price').val())
				],
				slide: function (event, ui) {
					priceInputMin.val(ui.values[0]);
					priceInputMax.val(ui.values[1]);
					priceSubmitButtonBlock.css('display', 'flex');
				}
			});

			// При изменении минимального значения цены
			priceInputMin.keyup(function () {
				let newVal = parseInt($(this).val());
				if (newVal < priceFilterMinAvailable) {
					newVal = priceFilterMinAvailable;
				}
				priceSliderBlock.slider('values', 0, newVal);
				priceSubmitButtonBlock.css('display', 'flex');
			});

			// При изменении максимального значения цены
			priceInputMax.keyup(function () {
				let newVal = parseInt($(this).val());
				if (newVal > priceFilterMaxAvailable) {
					newVal = priceFilterMaxAvailable;
				}
				priceSliderBlock.slider('values', 1, newVal);
				priceSubmitButtonBlock.css('display', 'flex');
			});

			// Активный фильтр цены
			if (priceInputMin.val() > priceFilterMinAvailable || priceInputMax.val() < priceFilterMaxAvailable) {
				$('.filters-price').addClass('has-filters');
				$('.toolbar').addClass('has-filters');
				$('#filters').addClass('has-filters');
			} else {
				$('.filters-price').removeClass('has-filters');
				$('.toolbar').removeClass('has-filters');
				$('#filters').removeClass('has-filters');
			}

		};

		console.timeEnd('Catalog test');

	}
}


///////////////////////////////////////
// Товар. Карточка товара
///////////////////////////////////////
class Goods {
	constructor() {
		// Слайдер доп. изображений
		this.swiperTumbs = function () {
			const id = '.thumblist';
			// Слайдер товаров
			const swiper = new Swiper(id + ' .swiper', {
				loop: false,
				autoplay: false,
				watchSlidesVisibility: true,
				simulateTouch: true,
				grabCursor: true,
				slidesPerView: '3',
				spaceBetween: 16,
				nested: true,
				preloadImages: false,
				lazy: {
					enabled: true,
					loadPrevNext: true,
					loadOnTransitionStart: true,
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				breakpoints: {
					0: {
						slidesPerView: '1',
					},
					320: {
						slidesPerView: '2',
					},
					480: {
						slidesPerView: '3',
					},
					640: {
						slidesPerView: '4',
					},
					768: {
						slidesPerView: '5',
					},
					1024: {
						slidesPerView: '3',
					},
					1200: {
						slidesPerView: '3',
					}
				}
			});
		};

		// Функции при инициализации товара
		this.onInit = function () {

			// Добавление отзыва о товаре. Рейтинг
			if ($('.goodsOpinionRating').length) {
				$('.goodsOpinionRating').rating();
			}

			// Выбор модификации
			$('.modifications-props').each(function () {
				const val = $(this).find('select option:selected').attr('value');
				$(this).find('.modifications-values__value[data-id="' + val + '"]').addClass('is-actived');
				$(this).find('select option:disabled').each(function () {
					const dis = $(this).attr('value');
					$('.modifications-values__value[data-id="' + dis + '"]').addClass('is-disabled');
				});

			});

			goods.hideOpinion();

		};

		// Скрываем отзывы если их много
		this.hideOpinion = function () {
			// $('.opinion__item').each(function (index) {
			// 	if (index > 3) {
			// 		$(this).addClass('is-hide');
			// 	} else {
			// 		$(this).addClass('is-show');
			// 	}

			// })
		}

		// Действия при клике
		this.onClick = function () {

			const content = document.querySelector('.productViewBlock');
			// Если нет контента
			if (!content) {
				return false;
			}

			content.addEventListener('click', function (event) {
				// console.log('event1', event)
				// console.log('event1.target', event.target)
				// Объявление переменных
				const generally = event.target.closest('.generally label');
				const opinionNav = event.target.closest('.opinion__nav');
				const opinionAdd = event.target.closest('.opinion__add');
				const opinionFormButton = event.target.closest('.opinion__form button');
				const opinionCaptcha = event.target.closest('.captcha__refresh');
				const opinionMoreButton = event.target.closest('.opinion__showAll');
				const modValue = event.target.closest('.modifications-values__value');

				// Переключение для Положительный и Отрицательный отзыв
				if (generally) {
					event.preventDefault();
					const id = $(event.target.parentElement).attr('for');
					const parents = $(event.target.offsetParent);

					parents.find('.generally input').prop('checked', false);
					parents.find('.generally input#' + id).prop('checked', true);

				}

				// Переключение для Положительный и Отрицательный отзыв
				else if (opinionNav) {
					const id = $(opinionNav).attr('data-nav');
					const parents = $(event.target.offsetParent);

					parents.find('[data-nav]').removeClass('is-actived');
					parents.find('[data-nav=' + id + ']').addClass('is-actived');
					parents.find('[data-nav-content]').removeClass('is-show').addClass('is-hide');
					parents.find('[data-nav-content=' + id + ']').removeClass('is-hide').addClass('is-show');
					parents.find('.opinion__buttons').addClass('is-hide');

					if (id == 'all') {
						parents.find('[data-nav-content]').removeClass('is-hide').addClass('is-show');
						parents.find('.opinion__buttons').removeClass('is-hide').addClass('is-show');
						goods.hideOpinion();
					}

				}

				// Ссылка на отображение формы для добавление отзыва о товаре
				else if (opinionAdd) {
					event.preventDefault();
					if ($(opinionAdd).hasClass('is-actived')) {
						$(opinionAdd).removeClass('is-actived');
						$('.opinion__addForm').slideUp(600);
					} else {
						$(opinionAdd).addClass('is-actived');
						$('.opinion__addForm').slideDown(600);
						$('html, body').animate({ scrollTop: $('.opinion__addForm').offset().top }, 500);
					}

				}

				// Валидация формы на странице оформления заказа, а так же формы на страницы связи с администрацией
				else if (opinionFormButton) {
					const form = $('.opinion__form');
					form.validate({
						errorPlacement: function (error, element) { }
					});
					form.submit();

				}

				// Иконка для обновления изображение капчи
				else if (opinionCaptcha) {
					goods.RefreshImageAction(event.target,1,1);
					$('.captcha__image').attr('src',$('.captcha__image').attr('src')+'&rand'+Math.random(0,10000));

				}

				// Функция показать больше для Отзывов
				else if (opinionMoreButton) {
					const button = $(opinionMoreButton);
					changeTxt(event.target.parentElement);
					if (button.hasClass('is-actived')) {
						button.removeClass('is-actived');
						$('.opinion__item').removeClass('is-show').addClass('is-hide');
						$('.opinion__item:nth-child(-n+3)').removeClass('is-hide').addClass('is-show');
						$('html, body').animate({ scrollTop: $('.productView__opinion').offset().top - 64 }, 500);
					} else {
						button.addClass('is-actived');
						$('.opinion__item').removeClass('is-hide').addClass('is-show');
					}

				}

				// Новый модификации
				else if (modValue) {
					event.preventDefault();
					goods.newModification($(event.target.parentElement));
				}

			});

		};

		// Крутит изображение при обновлении картинки защиты от роботов
		this.RefreshImageAction = function (img, num, cnt) {
			if (cnt > 13) { return false; }
			$(img).attr('src', $(img).attr('rel') + 'icon/refresh/' + num + '.gif');
			num = (num == 6) ? 0 : num;
			setTimeout(function () {
				goods.RefreshImageAction(img, num + 1, cnt + 1);
			}, 50);
		};


		// Инициализация табов на странице товара
		this.initTabs = function () {
			// Блок в котором находятся табы
			const tabs = $('.productView__tabs');
			if (!tabs.length) {
				return false;
			}
			// Добавляем аткивные классы на первый элемент
			tabs.find('[data-tab]').first().addClass('is-actived');
			tabs.find('[data-tab-content]').first().addClass('is-show');
			// Проверяет хэш и если по нему была открыта вкладка, то эта функция автоматически откроет её.
			goods.checkTabHash();
			// Если используется хеш, то скролим до контента
			if (document.location.hash !== '') {
				$('html, body').animate({ scrollTop: jQuery('.tabs__content').offset().top - 68 }, 600);
			}
			// Биндим изменение хэша - проверка какой таб нужно открыть.
			$(window).bind('hashchange', function () { goods.checkTabHash(); });
		};

		// Переключение табов
		this.tabSwitch = function (nb) {
			const tabs = $('.productView__tabs');
			const tab = tabs.find('[data-tab="' + nb + '"]');
			const content = tabs.find('[data-tab-content="' + nb + '"]');
			tabs.find('[data-tab]').removeClass('is-actived');
			tabs.find('[data-tab-content]').removeClass('is-show');
			tab.addClass('is-actived');
			content.addClass('is-show');
			document.location.hash = '#tab_' + nb;
		};

		// Проверяет хэш, переданый пользователем и открывает соответствующий раздел
		this.checkTabHash = function () {
			// Определяем текущий хэш страницы
			let hash = window.location.hash.substr(1);
			if (hash == 'goodsDataOpinionAdd') {
				hash = 'tab_4';
			}
			if (!hash.length || hash.indexOf('tab_') == -1) {
				return false;
			}
			// Открываем тот таб, который был указан в hash-е
			goods.tabSwitch(hash.replace('tab_', ''));
		};

		// Модификации select
		this.goodsModification = function ($container) {
			// Функция собирает свойства в строку, для определения модификации товара
			function getSlugFromGoodsDataFormModificationsProperties(obj) {
				const properties = new Array();
				$(obj).each(function (i) {
					properties[i] = parseInt($(this).val());
				});
				return properties.sort(function (a, b) {
					return a - b;
				}).join('_');
			}

			const $parentBlock = $container || $('#main .productViewBlock');

			const
				goodsDataProperties = $parentBlock.find('.modifications-props select[name="form[properties][]"]'), // Запоминаем поля выбора свойств, для ускорения работы со значениями свойств
				goodsDataModifications = $parentBlock.find('.goodsModificationsSlug'); // Запоминаем блоки с информацией по модификациям, для ускорения работы


			// Обновляет возможность выбора свойств модификации, для отключения возможности выбора по характеристикам модификации которой не существует.
			function updateVisibility(y) {
				// Проверяем в каждом соседнем поле выбора модификаций, возможно ли подобрать модификацию для указанных свойств
				goodsDataProperties.each(function (j) {
					// Если мы сравниваем значения свойства не с самим собой, а с другим списком значений свойств
					if (j != y) {
						// Проходим по всем значениям текущего свойства модификации товара
						$(this).find('option').each(function () {
							// Записываем временный массив свойств, которые будем использовать для проверки существования модификации
							const checkProperties = new Array();
							$(goodsDataProperties).each(function (i) {
								checkProperties[i] = parseInt($(this).val());
							});
							// Пытаемся найти модификацию соответствующую выбранным значениям свойств
							checkProperties[j] = parseInt($(this).attr('value'));
							// Собираем хэш определяющий модификацию по свойствам
							const slug = checkProperties.sort(function (a, b) { return a - b; }).join('_');
							// Ищем модификацию по всем выбранным значениям свойств товара. Если модификации нет в возможном выборе, отмечаем потенциальное значение выбора как не доступное для выбора, т.к. такой модификации нет.
							if (!goodsDataModifications.filter('[rel="' + slug + '"]').length) {
								$(this).attr('disabled', true);
								// Если выбрав данное значение свойства товара можно подобрать модификацию, то выделяем вариант выбора как доступный.
							} else {
								$(this).attr('disabled', false);
							}
						});
					}
				});
			}
			// Обновляем возможность выбора модификации товара по свойствам. Для тех свойств, выбор по которым не возможен, отключаем такую возможность.
			// Проверяем возможность выбора на всех полях кроме первого, чтобы отключить во всех остальных варианты, которые не возможно выбрать
			updateVisibility(0);
			// Проверяем возможность выбора на всех полях кроме второго, чтобы в первом поле так же отключилась возможность выбора не существующих модификаций
			updateVisibility(1);

			// Изменение цены товара при изменении у товара свойства для модификации
			goodsDataProperties.each(function (y) {
				function slugUpdate() {
					const 
						slug = getSlugFromGoodsDataFormModificationsProperties(goodsDataProperties), 
						goodsModView = $parentBlock.find('.productView'), 
						modificationBlock = goodsModView.find('.goodsModificationsSlug[rel="' + slug + '"]'), 
						modificationId = parseInt(modificationBlock.find('[name="id"]').val()), 
						modificationArtNumber = modificationBlock.find('[name="art_number"]').val(), 
						modificationPriceNow = parseInt(modificationBlock.find('[name="price_now"]').val()), 
						modificationPriceNowFormated = modificationBlock.find('.price_now_formated').html(), 
						modificationPriceOld = parseInt(modificationBlock.find('[name="price_old"]').val()), 
						modificationPriceOldFormated = modificationBlock.find('.price_old_formated').html(), 
						modificationRestValue = parseFloat(modificationBlock.find('[name="rest_value"]').val()), 
						modificationMeasure = modificationBlock.find('[name="measure_name"]').val(), 
						modificationDescription = modificationBlock.find('.description').html(), 
						modificationGoodsModImageId = modificationBlock.find('[name="goods_mod_image_id"]').val(), 
						goodsModificationId = goodsModView.find('.goodsModificationId'), 
						goodsPriceNow = goodsModView.find('.price__now'), 
						goodsPriceOld = goodsModView.find('.price__old'), 
						goodsAvailableQty = goodsModView.find('.productView__qty'), 
						goodsModQty = goodsModView.find('.qty__input'), 
						goodsArtNumberBlock = goodsModView.find('.productView__articles'), 
						goodsArtNumber = goodsModView.find('.productView__article'), 
						goodsModDescription = goodsModView.find('.modifications__description'), 
						productRestValue = goodsModView.find('.productRestValue');

					// Изменяем данные товара для выбранных параметров. Если нашлась выбранная модификация
					if (modificationBlock.length) {
						// Цена товара
						goodsPriceNow.html(modificationPriceNowFormated);
						goodsPriceNow.attr('data-price', modificationPriceNow).attr('data-price', modificationPriceNow);

						// Старая цена товара
						if (modificationPriceOld > modificationPriceNow) {
							goodsPriceOld.css({ 'display': 'inline-block' });
							goodsPriceOld.html(modificationPriceOldFormated);
						} else {
							goodsPriceOld.hide();
							goodsPriceOld.html('');
						}

						// Есть ли товар есть в наличии. Много Мало Отсутствует 
						if (modificationRestValue > 0) {
							goodsModView.removeClass('productView__empty');
							productRestValue.parent().removeClass('rest-alot').removeClass('rest-zero').addClass('rest-few');

							// Если остаток больше 9
							if (modificationRestValue > 9) {
								productRestValue.parent().removeClass('rest-few').removeClass('rest-zero').addClass('rest-alot');
							}

							// Если включено в настройках 'Отключить возможность класть в корзину больше товара, чем есть в наличии'
							if (goodsAvailableQty.hasClass('.has-max')) {
								goodsModQty.val('1').attr('max', modificationRestValue);
							} else {
								goodsModQty.val('1').attr('max', 99999);
							}

							// Обновляем кол-во и меру 
							productRestValue.find('b').text(modificationRestValue + ' ' + modificationMeasure);

						} else {
							// Нет в наличии
							goodsModView.addClass('productView__empty');
							productRestValue.parent().removeClass('rest-few').removeClass('rest-zero').addClass('rest-zero');
							productRestValue.attr('data-value', modificationRestValue);
							productRestValue.find('b').text('Нет');
							goodsModQty.val('1').attr('max', 1);
						}

						// Покажем артикул модификации товара, если он указан
						if (modificationArtNumber.length > 0) {
							goodsArtNumberBlock.show();
							goodsArtNumber.html(modificationArtNumber);
						} else {
							goodsArtNumberBlock.hide();
							goodsArtNumber.html('');
						}

						// Описание модификации товара. Покажем если оно есть, спрячем если его у модификации нет
						if (modificationDescription.length > 0) {
							goodsModDescription.show().html('<div>' + modificationDescription + '</div>');
						} else {
							goodsModDescription.hide().html();
						}

						// Идентификатор товарной модификации
						goodsModificationId.val(modificationId);
						goodsModView.find('.goodsDataMainModificationId').attr('name', 'form[goods_mod_id][' + modificationId + ']');
						const goodsDataMainImage = goodsModView.find('.productView__images');

						// Меняет главное изображение товара на изображение с идентификатором goods_mod_image_id
						function changePrimaryGoodsImage(goods_mod_image_id) {
							// Если не указан идентификатор модификации товара, значит ничего менять не нужно.
							if (1 > goods_mod_image_id) {
								return true;
							}
							const
								// Блок с изображением выбранной модификации товара
								goodsModImageBlock = goodsDataMainImage.find('[data-id="' + parseInt(goods_mod_image_id) + '"'),
								// Блок, в котором находится главное изображение товара
								MainImageBlock = goodsDataMainImage.find('.productView__image'),
								// Изображение модификации товара, на которое нужно будет изменить главное изображение товара.
								MediumImageUrl = goodsModImageBlock.attr('data-href'),
								// Главное изображение, в которое будем вставлять новое изображение
								MainImage = MainImageBlock.find('img');
							// Если изображение модификации товара найдено - изменяем главное изображение
							MainImage.attr('src', MediumImageUrl).parent().attr('href', MediumImageUrl);
							// Изменяем идентификатор главного изображения
							MainImageBlock.attr('data-id', parseInt(goods_mod_image_id));
							return true;
						}

						// Обновляем изображние модификации товара, если оно указано
						changePrimaryGoodsImage(modificationGoodsModImageId);
					} else {
						// Отправим запись об ошибке на сервер
						sendError('no modification by slug ' + slug);
						alert('К сожалению сейчас не получается подобрать модификацию соответствующую выбранным параметрам.');
					}
					// Обновляем возможность выбора другой модификации для текущих значений свойств модификации товара.
					updateVisibility(y);
				}

				$(this).change(function () {
					slugUpdate();
				});

			});

		};

		// Кнопки для модификаций
		this.newModification = function ($obj) {

			if ($obj.hasClass('is-disabled')) {return false;}

			$obj.parents().find('.modifications-values__value').removeClass('is-disabled is-actived');
			$obj.addClass('is-actived');
			const val = $obj.data('value');
			$obj.parents().find('.modifications-props__select option[value="' + val + '"]').prop('selected', true);
			$obj.parents().find('.modifications-props__select').trigger('change');

		};

	}
}


///////////////////////////////////////
// Корзина
///////////////////////////////////////
class Cart {
	constructor() {
		// Функции при клике
		this.onClick = function () {
			const content = document.querySelector('.page-cart');
			// Если нет контента
			if (!content) {
				return false;
			}

			content.addEventListener('click', function (event) {
				// console.log('event1', event)
				// console.log('event1.target', event.target)
				// Объявление переменных
				const remove = event.target.closest('.cartTable__remove');
				const start = event.target.closest('.startOrder');
				const close = event.target.closest('.closeOrder');
				const clear = event.target.closest('.cartTable__clear');
				const make = event.target.closest('.confirmOrder');

				if (remove) {
					cart.removeItem($(event.target.parentElement));
				} else if (start) {
					cart.orderStart();
				} else if (close) {
					cart.orderClose();
				} else if (make) {
					console.log('make', make);
					event.preventDefault();
					const form = $('.order-fast__form');
					form.validate({
						errorPlacement: function (error, element) { }
					});
					form.submit();
				} else if (clear) {
					const yep = confirm('Вы действительно хотите удалить все товары из корзины?');
					if (yep == true) {
						return true;
					} else {
						event.preventDefault();
						return false;
					}
				}
			});

		};

		// Удаление товара из корзины
		this.removeItem = function (event) {
			const yep = confirm('Вы точно хотите удалить товар из корзины?');
			if (yep == true) {
				event.closest('.cartTable__item').fadeOut();
				url = event.data('href');
				$.ajax({
					url: url,
					cache: false,
					success: function (data) {
						$('.page-cart').html($(data).find('.page-cart').html());
						// Вызов функции быстрого заказа в корзине
						cart.minSum();
					}
				});
			} else {
				return false;
			}
		};

		// Функция вычисления остатка до минимальной суммы заказа
		this.minSum = function () {
			if ($('.cartTotal__min').length) {
				const minPrice = parseInt($('.cartTotal__min-price').data('price'));
				const totalSum = parseInt($('.cartSumTotal').data('price'));
				if (minPrice > totalSum) {
					const diff = minPrice - totalSum;
					$('.cartTotal__min-price').find('.num').text(addSpaces(diff));
					$('.total__buttons button').attr('disabled', true).addClass('is-disabled');
					$('.cartTotal__min').show();
				} else {
					$('.total__buttons button').attr('disabled', false).removeClass('is-disabled');
					$('.cartTotal__min').hide();
				}
			}
		};

		// Функция быстрого оформления заказа в корзине
		this.orderStart = function () {
			const globalOrder = $('.cartTable__order');
			const pageCart = $('.page-cart');
			//объект блока куда будет выводиться форма быстрого заказа
			const OrderAjaxBlock = $('.cartTable__ajax');
			const urlQuickForm = '/cart/add'; // адрес страницы с формой

			// данные которые отарвятся на сервер чтобы получить только форму быстрого заказа без нижней части и верхней части сайта
			const quickFormData = [
				{ name: 'ajax_q', value: 1 },
				{ name: 'fast_order', value: 1 }
			];
			pageCart.addClass('is-started');
			$('.qty__input').attr('readonly', 'readonly');
			globalOrder.show('slow');
			$.ajax({
				type: 'POST',
				cache: false,
				url: urlQuickForm,
				data: quickFormData,
				success: function (data) {
					OrderAjaxBlock.html($(data).find('.order-fast__content').wrap('<div></div>').html()).show('slow');
					$('html, body').delay(400).animate({ scrollTop: globalOrder.offset().top }, 800);
					preload();
					password.onClick();
					password.capsWarning();
					order.onInit();
					order.onSelect();
					order.coupons();
					order.onValidate();

					// Стили для новых селектов
					$('.form__phone').mask('+7 (999) 999-9999');

					// Выключение кнопки оформления заказа если не все поля заполнены
				}
			});
			return false;
		};

		// Отменить заказ
		this.orderClose = function () {
			$('.page-cart').removeClass('is-started');
			$('.qty__input').removeAttr('readonly');
			$('.startOrder').removeClass('is-disabled');
			$('.cartTable__order').hide('slow');
			$('html, body').delay(400).animate({ scrollTop: jQuery('#main').offset().top }, 800);
		};

	}
}


///////////////////////////////////////
/* Скрипты для оформления заказов */
///////////////////////////////////////
class Order {
	constructor() {

		// Валидация формы в оформлении заказа
		this.onValidate = function () {
			console.log('onValidate');
			// Валидация формы
			$('.order-fast__form').validate({
				validClass: 'valid',
				errorPlacement: function (error, element) {
				}
			});

			// Выключение кнопки оформления заказа если не все поля заполнены
			$('.order-fast__form [required]').on('input', function () {
				if ($('.order-fast__form').valid()) {
					$('.total__buttons button').attr('title', 'Оформить заказ').removeClass('is-disabled');
				} else {
					$('.total__buttons button').attr('title', 'Заполните все поля').addClass('is-disabled');
				}
			});

			// Проверка обязательных полей
			if ($('.order-fast__form').valid()) {
				$('.total__buttons button').attr('title', 'Оформить заказ').removeClass('is-disabled');
			} else {
				$('.total__buttons button').attr('title', 'Заполните все поля').addClass('is-disabled');
				$('.order-fast__form input, .order-fast__form textarea, .order-fast__form select').removeClass('error');
			}

		};

		// Регистрация и выбор доставки
		this.onInit = function () {
			// Выбор даты доставки. Документация к плагину //t1m0n.name/air-datepicker/docs/index-ru.html
			$('#deliveryConvenientDate').datepicker({
				// Если true, то при активации даты, календарь закроется.
				autoClose: true,
				// Можно выбрать только даты, идущие за сегодняшним днем, включая сегодня
				minDate: new Date()
			});

			// Действия при выборе варианта доставки на этапе оформления заказа
			$('.order-delivery__radio').on('click', function (d) {
				// Отображение вариантов оплаты при выборе доставки
				const ID = $('input[name="form[delivery][id]"]:checked').val();
				$('.order-payment').hide();
				$('.order-payment[rel="' + ID + '"]').show();
				$('.order-payment[rel="' + ID + '"]').find('input:first').click();

				$('.order-delivery__radio').each(function () {
					$(this).prop('checked', false);
					$(this).parent().removeClass('is-actived');
				});

				$('.order-delivery-zone__radio').each(function () {
					$(this).prop('checked', false);
					$(this).parent().removeClass('is-actived');
				});

				const val = $(this).val();
				const fz = $($('.order-delivery-zone__radio[data-id=' + val + ']')[0]);
				$(this).prop('checked', true);
				fz.prop('checked', true);
				$(this).parent().addClass('is-actived');

				const price = $(this).attr('price');
				const priceBlock = $('.order-delivery__item[data-id=' + val + ']').find('.order-delivery__price').find('.num');
				// Обновление цены при наличии зоны
				const cartSumTotal = $('.cartSumDelivery .num');
				const zonePrice = $('.order-delivery-zone__radio:checked').attr('price');
				if (zonePrice > 0) {
					priceBlock.text(addSpaces(zonePrice));
					cartSumTotal.text(addSpaces(zonePrice));
				} else {
					priceBlock.text(price);
					cartSumTotal.text(addSpaces(price));
				}

				// Обновление цены с учетом доставки
				const cartSumDiscount = $('.cartSumDiscount:eq(0) .num').text().toString().replace(/\s/g, '');
				const newSum = parseInt(cartSumDiscount) + parseInt(priceBlock.text());
				$('.cartSumTotal .num').text(addSpaces(newSum));

				// Скрытие необязательных полей при выборе самовывоза
				if ($(this).data('name') == 'Самовывоз') {
					$('.order-fast__form').addClass('pickup');
					$('.address input, .address textarea').val('Самовывоз');
					$('#deliveryConvenientDate').val('01.01.2220');
					$('.total__buttons button').attr('title', 'Оформить заказ').removeClass('is-disabled');
				} else {
					$('.order-fast__form').removeClass('pickup');
					$('.address input, .address textarea').val('');
					$('#deliveryConvenientDate').val('');
				}

			});

			// Действия при выборе зоны внутри варианта доставки на этапе оформления заказа
			$('.order-delivery-zone__radio').on('click', function () {
				const val = $(this).attr('data-id');
				const price = $(this).attr('price');
				const priceBlock = $('.order-delivery__item[data-id=' + val + ']').find('.order-delivery__price').find('.num');
				// Обновление цены
				priceBlock.text(addSpaces(price));

				$('.order-delivery__radio').each(function () {
					$(this).prop('checked', false);
					if ($(this).val() == val) {
						$(this).prop('checked', true);
					} else {
						$(this).prop('checked', false);
					}
				});

				// Выбор варианта оплаты при выборе зоны доставки
				const ID = $('input[name="form[delivery][id]"]:checked').val();
				$('.order-payment').hide();
				$('.order-payment[rel="' + ID + '"]').show();
				$('.order-payment[rel="' + ID + '"]').find('input:first').click();

				// Обновление цены с учетом доставки
				const cartSumDiscount = $('.cartSumDiscount:eq(0) .num').text().toString().replace(/\s/g, '');
				const newSum = parseInt(cartSumDiscount) + parseInt(priceBlock.text());
				$('.cartSumTotal .num').text(addSpaces(newSum));
				$('.cartSumDelivery .num').text(addSpaces(price));
			});

			// Выбор оплаты по клику
			$('.order-payment__radio').on('click', function () {
				const paymentDescription = $('.order-payment__radio:checked').parent().find('.order-payment__desc').html();
				const payDesc = $('.order-payment__desc');
				payDesc.html(paymentDescription);
				if (paymentDescription == undefined) {
					payDesc.addClass('is-hide').removeClass('is-show');
				} else {
					payDesc.addClass('is-show').removeClass('is-hide');
				}
			});

			// Выбор оплаты по умолчанию
			$('.order-payment__radio').each(function () {
				console.log('each', $(this).parent());
				const paymentDescription = $('.order-payment__radio:checked').parent().find('.order-payment__desc').html();
				const payDesc = $('.order-payment__desc');
				payDesc.html(paymentDescription);
				if (paymentDescription == undefined) {
					payDesc.addClass('is-hide').removeClass('is-show');
				} else {
					payDesc.addClass('is-show').removeClass('is-hide');
				}
			});

			setTimeout(function () {
				$('.order-delivery__select').trigger('change');
			}, 100);

		};

		// Выбор доставки и оплаты
		this.onSelect = function () {
			// Выбор доставки
			$('.order-delivery__select').on('change', function () {
				const selectedDelId = $('.order-delivery__select').find('option:selected').attr('data-id');
				$('.order-delivery-zone__selectBox').addClass('is-hide').removeClass('is-show');
				$('.order-delivery-zone__selectBox[data-id="' + selectedDelId + '"]').addClass('is-show').removeClass('is-hide');
				$('.order-delivery-zone__selectBox option').attr('selected', false);
				$('.order-delivery-zone__selectBox[data-id="' + selectedDelId + '"] option:first-of-type').attr('selected', true);
				$('.order-delivery__radio[value="' + selectedDelId + '"]').click();
				const WithoutZone = $('.order-delivery__item[data-id=' + selectedDelId + '] .order-delivery__radio:checked').attr('pricewithoutzones');
				const WithZone = $('.order-delivery__item[data-id=' + selectedDelId + '] .order-delivery-zone__radio:checked').attr('price');
				
				let startprice = WithoutZone
				if (WithZone >= 0) {
					startprice = WithZone;
				}

				$('.order-delivery__changeprice').text(addSpaces(startprice));
				$('.cartSumDelivery .num').text(addSpaces(startprice));
				$('.order-payment').addClass('is-hide').removeClass('is-show');
				$('.order-payment[rel="' + selectedDelId + '"]').addClass('is-show').removeClass('is-hide');
				const startInputId = $('.order-delivery__radio:checked').attr('value');
				$('.order-payments_items .order-payment input').attr('checked', false);
				$('.order-payments_items .order-payment[rel="' + startInputId + '"] input').each(function () {
					$(this).click();
					return false;
				});

				$('.order-payment__select option:first-child').prop('selected', true);

				// Вывод описания доставки
				const delDesc = $('.order-delivery__desc')
				const deliveryDescription = $('.order-delivery__radio:checked').parent().find('.order-delivery__desc').html()
				delDesc.html(deliveryDescription)
				if (deliveryDescription == undefined) {
					delDesc.addClass('is-hide').removeClass('is-show')
				} else {
					delDesc.addClass('is-show').removeClass('is-hide')
				}

				// Вывод описания оплаты
				const paymentDescription = $('.order-payments_items .order-payment__radio:checked').parent().find('.order-delivery__desc').html();
				const payDesc = $('.order-payment__desc')
				payDesc.html(paymentDescription)
				if (paymentDescription == undefined) {
					payDesc.addClass('is-hide').removeClass('is-show')
				} else {
					payDesc.addClass('is-show').removeClass('is-hide')
				}

			});

			// Выбор зоны доставки
			$('.order-delivery-zone__select').on('change', function () {
				const optValue = $(this).find('option:selected').attr('value')
				$('.order-delivery-zone__radio[value="' + optValue + '"]').click()
				const WithZone = $('.order-delivery-zone__radio:checked').attr('price')
				$('.order-delivery__changeprice').text(addSpaces(WithZone))
				$('.cartSumDelivery .num').text(addSpaces(WithZone))
			})

			// Выбор оплаты
			$('.order-payment__select').on('change', function () {
				const selectedDelId = $(this).find('option:selected').attr('value')
				$('.order-payments_items .order-payment__radio[value="' + selectedDelId + '"]').click()
				const paymentDescription = $('.order-payments_items .order-payment__radio:checked').parent().find('.order-payment__desc').html()
				const payDesc = $('.order-payment__desc')
				payDesc.html(paymentDescription)
				if (paymentDescription == undefined) {
					payDesc.addClass('is-hide').removeClass('is-show')
				} else {
					payDesc.addClass('is-show').removeClass('is-hide')
				}
			})

		}

		// Отправка купона при оформлении заказа
		this.coupons = function () {
			const submitBtn = $('.coupon__button');
			const couponInput = $('.coupon__code');
			const couponParent = couponInput.parent();
			const resetBtn = $('.coupon__reset');
			const totalCouponBlock = $('.cartTotal__coupons');
			const totalDiscountBlock = $('.cartTotal__item-discount');

			// Отправка формы
			submitBtn.off('click').on('click', function () {
				const url = '/order/stage/confirm';
				const val = couponInput.val();
				const oldVal = couponInput.attr('data-value');
				couponInput.attr('data-value', val);

				// Если ничего не ввели
				if (val == '') {
					couponInput.addClass('error');
					return false;
				}

				// Если купон не изменился
				if (val == oldVal) {
					couponInput.removeClass('focus');
					return false;
				}

				// Получаем данные формы, которые будем отправлять на сервер
				const formData = $('#order_form').serializeArray()
				formData.push({ name: 'ajax_q', value: 1 })
				formData.push({ name: 'only_body', value: 1 })
				formData.push({ name: 'form[coupon_code]', value: val })

				$.ajax({
					type: 'POST',
					cache: false,
					url: url,
					data: formData,
					success: function (data) {
						// Получаем блок скидки
						const discountBlock = $(data).closest('#order_form').find('.order-discount')
						const discountName = discountBlock.find('.order-discount__name').text()
						const discountPrice = discountBlock.find('.order-discount__value').html()
						const discountPercent = discountBlock.find('.order-discount__percent').html()

						// Определяем наличие скидки в % или валюте
						let discountSum = 0
						if (discountPrice) {
							discountSum = discountPrice
						} else if (discountPercent) {
							discountSum = discountPercent
						} else {
							totalCouponBlock.hide()
						}

						// Записываем название и размер скидки по купону
						totalCouponBlock.find('.cartTotal__label span').html(discountName)
						totalCouponBlock.find('.cartSumCoupons').html(discountSum)
						totalCouponBlock.show()
						totalDiscountBlock.hide()

						// Получаем новую итоговую стоимость заказа
						const totalBlock = $(data).closest('#order_form').find('.order-total')
						const totalSum = totalBlock.find('.cartSumNowWithDiscount').data('price')
						const deliveryPrice = parseInt($('.cartSumDelivery:eq(0) .num').text())
						const newTotalSum = totalSum + deliveryPrice
						const cartSumTotal = $('.cartSumTotal:eq(0) .num').text().toString().replace(/\s/g, '')

						// Проверяем купон
						if (newTotalSum > cartSumTotal) {
							couponInput.val('').attr('placeholder', 'Купон неверен').removeClass('focus')
							couponParent.removeClass('success').addClass('error')
							totalCouponBlock.hide()
							totalDiscountBlock.show()
							$('.cartSumTotal .num').text(addSpaces(newTotalSum))
						} else if (newTotalSum == cartSumTotal) {
							if (discountName) {
								couponInput.addClass('focus')
								couponParent.addClass('success')
								totalCouponBlock.show()
							} else {
								couponInput.val('').addClass('error')
								couponParent.addClass('error')
								totalCouponBlock.hide()
							}
						} else {
							couponInput.addClass('focus')
							couponParent.removeClass('error').addClass('success')
							totalCouponBlock.show()
							// Обновляем значение итоговой стоимости
							$('.cartSumTotal').attr('data-price', newTotalSum)
							$('.cartSumTotal .num').text(addSpaces(newTotalSum))
							$('.cartSumCoupons').attr('data-value', newTotalSum)
							$('.cartSumDiscount').attr('data-value', totalSum)
							$('.cartSumDiscount .num').text(addSpaces(totalSum))
						}

						// Тестирование. Проверка переменных
						// console.log('---', )
						// console.log('discountName', discountName)
						// console.log('discountPrice', discountPrice)
						// console.log('discountPercent', discountPercent)
						// console.log('totalBlock', totalBlock)
						// console.log('totalSum', totalSum)
						// console.log('deliveryPrice', deliveryPrice)
						// console.log('newTotalSum', newTotalSum)
						// console.log('---', )
					},
					error: function (data) {
						console.log('Возникла ошибка: Невозможно отправить форму купона.')
					}
				})
			})

			// Сброс
			resetBtn.on('click', function () {
				couponInput.val('').trigger('input')
				setTimeout(function () {
					totalCouponBlock.hide()
					totalDiscountBlock.show()
					const cartSum = $('.cartSumDiscount').data('value')
					const deliveryPrice = parseInt($('.cartSumDelivery:eq(0) .num').text())
					const newTotalSum = cartSum + deliveryPrice
					// Возвращаем значение по умолчанию итоговой стоимости
					$('.cartSumTotal .num').text(addSpaces(newTotalSum))
					$('.cartSumTotal').attr('data-price', newTotalSum)
					$('.cartSumCoupons').attr('data-value', newTotalSum)
					$('.cartSumDiscount').attr('data-value', newTotalSum)
					$('.cartSumDiscount .num').text(addSpaces(newTotalSum))
					couponInput.val('').attr('placeholder', 'Введите купон').removeClass('focus').removeClass('error')
					couponParent.removeClass('error').removeClass('success')
				}, 500)
			})

			// Отображение кнопки Сброс
			couponInput.on('input', function () {
				if ($(this).val()) {
					resetBtn.addClass('focus')
				} else {
					resetBtn.removeClass('focus')
				}
			})

		}

		// Оформление заказа в выпадающей корзине
		this.orderCart = function () {
			const urlQuickForm = '/cart/add'; // адрес страницы с формой

			// данные которые отправятся на сервер чтобы получить только форму быстрого заказа 
			const quickFormData = [
				{ name: 'ajax_q', value: 1 },
				{ name: 'fast_order', value: 1 }
			]
			// Отправляем запрос
			$.ajax({
				type: 'POST',
				cache: false,
				url: urlQuickForm,
				data: quickFormData,
				success: function (data) {
					$.fancybox.open(data, {
						keyboard: false,
						baseClass: 'fastOrder',
						afterShow: function () {
							preload()
							password.onClick();
							password.capsWarning()
							order.onInit()
							order.onSelect()
							order.coupons()
							order.onValidate()
							// Стили для новых селектов
							$('.form__phone').mask('+7 (999) 999-9999')
						}
					})
				}
			})
		}

	}
}


// Объявляем конструктор функции пароля
const password = new Password();
// Объявляем конструктор Сравнения
const compare = new Compare();
// Объявляем конструктор Товара
const product = new Product();
// Объявляем конструктор Удаления
const remove = new Remove();
// Объявляем конструктор Товары
const catalog = new Catalog();
// Объявляем конструктор Товар
const goods = new Goods();
// Объявляем конструктор Корзины
const cart = new Cart();
// Объявляем конструктор Заказа
const order = new Order();
// Объявляем конструктор Счетчиков
const quantity = new Quantity();
// Объявляем конструктор Счетчиков Товара
const quantityGoods = new QuantityGoods();
// Объявляем конструктор Счетчиков Выпадающей корзины
const quantityAddto = new QuantityAddto();
// Объявляем конструктор Счетчиков Корзины
const quantityCart = new QuantityCart();


console.timeEnd('start test');























// $.event.special.inputchange = {
// 	setup: function () {
// 			var self = this, val;
// 			$.data(this, 'timer', window.setInterval(function () {
// 					val = self.value;
// 					if ( $.data( self, 'cache') != val ) {
// 							$.data( self, 'cache', val );
// 							$( self ).trigger( 'inputchange' );
// 					}
// 			}, 20));
// 	},
// 	teardown: function () {
// 			window.clearInterval( $.data(this, 'timer') );
// 	},
// 	add: function () {
// 			$.data(this, 'cache', this.value);
// 	}
// };



///////////////////////////////////////
// Дополнительные пункты меню в шапке Перенос пунктов меню
///////////////////////////////////////
function mainnav(id,rows,media){
	if(getClientWidth() > media){
		const mainNav = $(id);
		const overMenuExist = mainNav.find('.mainnav__overflow li').length;
		const mainNavList = mainNav.find('.mainnav__list');
		const mainNavOverflow = mainNav.find('.mainnav__overflow');
		const mainNavMore = $('.mainnav__more');

		// Восстановление классов для больших экранов
		mainNavOverflow.addClass('dropdown__content');
		mainNavMore.addClass('mainnav__more-hidden')

		if(overMenuExist){
			mainNavOverflow.find('li').removeClass('mainnav__replaced');
			mainNavMore.remove();
			mainNavOverflow.find('li').each(function () {
				mainNavList.append($(this));
			});
		}

		const menuHeight = rows;
		const menuWidth = mainNav.width() * menuHeight;
		const menuCount = mainNavList.find('li').length + 1;
		let nextCheck = 0;

		for(let i=1; i < menuCount; i++){
			const currentWidth = parseInt(Math.ceil(mainNavList.find('li:nth-child('+i+')').width())) + 16;
			nextCheck += currentWidth;

			if(nextCheck > menuWidth){
				let a = i;
				for(a;a < menuCount;a++){
					mainNavList.find('li:nth-child('+ a +')').addClass('mainnav__replaced');
				}

				mainNav.find('.mainnav__replaced').each(function () {
					mainNavOverflow.append($(this));
				});

				mainNavList.append('<li class="mainnav__more"><a class="mainnav__link flex"><span>Ещё</span><i class="icon-chevron_down"></i></a></li>');

				mainNav.find('.mainnav__more').on('click',function () {
					if($(this).hasClass('is-opened')){
						$(this).removeClass('is-opened');
						mainNav.removeClass('is-opened');
						mainNavOverflow.removeClass('is-opened');
						$('#overlay').removeClass('is-opened');
					} else{
						$(this).addClass('is-opened');
						mainNav.addClass('is-opened');
						mainNavOverflow.addClass('is-opened');
						$('#overlay').addClass('is-opened')
					}
					// Определение положения кнопки еще
					positionMore()
				});
				
				// Определение положения кнопки еще
				function positionMore(){
					const morePos = mainNav.find('.mainnav__more').position().left;
					const contentPos = parseInt(morePos) - mainNavOverflow.width() / 4;
					mainNavOverflow.css({'left' : contentPos})
				}

				return false;
			}
		}
	}else{
		// Удаление классов для маленьких экранов
		$('.mainnav__overflow').removeClass('dropdown__content');
		$('.mainnav__more').removeClass('mainnav__more-hidden');
	}
}


///////////////////////////////////////
// Функция показать все на главной
///////////////////////////////////////
function pdtVisible(id){
	const item = $(id).find('.product__item');
	const visible = $(id).find('.product__item:visible').length;

	// Кнопка показать все
	const button = $(id).find('.pdt__visible-button');
	
	// Скрываем кнопку показать все если мало товаров
	item.length > visible ? button.parent().show() : button.parent().hide()

	// Функция открытия скрытых товаров
	button.on('click', function (event){
		event.preventDefault();
		changeTxt(this)
		scrollContent(id, this)
		if($(this).hasClass('is-actived')){
			$(this, id).removeClass('is-actived')
			item.removeClass('is-show')
		}else{
			$(this, id).addClass('is-actived')
			item.addClass('is-show')
		}
	});
}


// Переход к контенту
function scrollContent($content, $obj){
	// const scrollTop = $content.offset().top + $content.height() - window.innerHeight;
	const scrollTop = document.querySelector($content).innerHeight
	console.log('scrollTop', scrollTop);
	if ($obj.matches('is-actived')) {
		console.log('matches');
		window.scrollTo({
			top: scrollTop,
			left: 0,
			behavior: 'smooth'
		})
	} else {
		console.log('not matches');
		window.scrollTo({
			top: scrollTop,
			left: 0,
			behavior: 'smooth'
		})
	}
}


///////////////////////////////////////
// Новости
///////////////////////////////////////
function swiperNews() {
	const id = '#news'
	// Свайпер слайдер новостей
	const swiper = new Swiper(id + ' .swiper', {
		loop: false,
		autoplay: false,
		watchSlidesVisibility: true,
		simulateTouch: true,
		grabCursor: true,
		slidesPerView: '4',
		spaceBetween: 32,
		nested: true,
		preloadImages: false,
		autoHeight: false,
		lazy: {
			enabled: false,
			loadPrevNext: true,
			loadOnTransitionStart: true,
		},
		navigation: {
			nextEl: id + ' .swiper-button-next',
			prevEl: id + ' .swiper-button-prev',
		},
		breakpoints: {
			0: {
				slidesPerView: '1',
			},
			320: {
				slidesPerView: '1',
			},
			480: {
				slidesPerView: '2',
			},
			640: {
				slidesPerView: '2',
			},
			768: {
				slidesPerView: '3',
			},
			1024: {
				slidesPerView: '4',
			},
			1200: {
				slidesPerView: '4',
			}
		}
	});
}

///////////////////////////////////////
// Отсчет даты до окончания акции
///////////////////////////////////////
function counterDate() {
	const id = $('.counter');
	// Если не найдет счетчик прекращаем работу функции
	if(!id.length){
		return false;
	}
	// Перебираем каждый счетчик
	id.each(function () {
		const t = $(this);
		// Устанавливаем дату обратного отсчета ММ-ДД-ГГ
		const expired = t.attr('data-expired');
		const countDownDate = new Date(expired).getTime();
		// Обновление счетчика каждую секунду
		const x = setInterval(function () {
			const now = new Date().getTime();
			const distance = countDownDate - now;
			const days = Math.floor(distance / (1000 * 60 * 60 * 24));
			const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);
			// Вывод
			t.find('.days span').text(days);
			t.find('.hours span').text(hours);
			t.find('.minutes span').text(minutes);
			t.find('.seconds span').text(seconds);
			// Счетчик завершен
			if (distance < 0) {
				clearInterval(x);
				t.hide();
			}else{
				t.css({'display':'flex'});
				t.prev().hide();
			}
		}, 1000);
	})
}


///////////////////////////////////////
// Открытие Контактов, Меню, Сравнения, Избранного
///////////////////////////////////////
function openMenu() {
	// Открытие каталога с сохранением вложенности
  $('.catalog__open').on('click', function(event){
    event.preventDefault();
    const parent = $(this).closest('.parent');
    const sub = $(this).parent().next('.catalog__sub');
    const open = $(this).closest('.catalog__open');
    if (parent.hasClass('is-opened')) {
      sub.slideUp(600);
      parent.removeClass('is-opened');
      open.removeClass('is-opened');
    } else {
      sub.slideDown(600);
      parent.addClass('is-opened');
      open.addClass('is-opened');
    }
  });

	// Закрытие всего при нажатии на темную часть
	$('#overlay').on('click', function(event){
		event.preventDefault();
		if($(this).hasClass('is-opened')){
			closeAll();
		}
	});

	// Открытие Меню
  $('.mainnav__icon').on('click', function (event){
    event.preventDefault();
		$(this).toggleClass('is-opened');
		$('#mobmenu').toggleClass('is-opened');
		$('#overlay').toggleClass('is-opened transparent');
		$('.mobmenu__menu').addClass('is-opened')
		$('.mobmenu__nav-item[data-open="menu"]').addClass('is-opened')
  });

	// Открытие элементов
  $('[data-open]').on('click', function(event){
    event.preventDefault();
    const value = $(this).data('open');
		$('[data-open]').removeClass('is-opened')
		$('[data-is-opened]').removeClass('is-opened')
    if ($('[data-is-opened="'+ value +'"]').hasClass('is-opened')){
      $(this).removeClass('is-opened').parent().removeClass('is-opened');
      $('#overlay').removeClass('is-opened');
      $('[data-is-opened="'+ value +'"]').removeClass('is-opened');
    }else{
      $(this).addClass('is-opened').parent().addClass('is-opened');
      $('#overlay').addClass('is-opened');
      $('[data-is-opened="'+ value +'"]').addClass('is-opened');
    }
  });
	

	// Открытие подвала
	$('.footer__title').on('click', function(event){
    event.preventDefault();
		if (getClientWidth() < 480){
			$(this).toggleClass('is-actived')
			$(this).next().slideToggle();
		}else{
			$(this).next().attr('style', '')
		}
	});

}

// Функция удаления классов всех активных элементов
function closeAll() {
	$('div, a, form, span, nav, ul, li').removeClass('is-opened');
	$('.overflowMenu').removeClass('is-actived');
	$('.search__reset').click();
	$('#overlay').click();
	setTimeout(function () {
		$('#overlay').removeClass('transparent');
		$('.search__reset').click();
		$('.search__input').blur(); 
		$('#overlay').click();
	},100)
}



///////////////////////////////////////
/* Аякс Отправка формы без обновления страницы */
///////////////////////////////////////
function ajaxForms(id,flag,successMessage,errorMessage){
  flag = false;
  //console.log('ajaxForms loaded ', id)
  const form = $(id).find('.form__callback');
  form.on('submit',function(event){
    event.preventDefault();
    if(!flag){
      t = $(this);
      const url = t.prop('action');
      const formData = t.serializeArray();
      formData.push({name: 'ajax_q', value: 1});
      formData.push({name: 'only_body', value: 1});
      $.ajax({
        method: 'POST',
        cache: false,
        url: url,
        data: formData,
        success: function(d){
          const serverCall = JSON.parse(d).status;
          if(serverCall =='ok'){
						setTimeout(function () {
							$.fancybox.close();
						},2000);
						// Функция, которая отображает сообщения пользователю
						const content = '<div class="noty__addto"><div class="noty__message">' + successMessage + '</div></div>';
						notyStart(content, 'success');
            flag = true;
          }
        },
				error: function(d){
					callbackError()
				}
      });
    }else{
			callbackError()
    }
  });
	
	function callbackError() {
		$(id).addClass('error')
		// Функция, которая отображает сообщения пользователю
		const content = '<div class="noty__addto"><div class="noty__message">' + errorMessage + '</div></div>';
		notyStart(content, 'warning');
	}
}

// 'Обратный звонок' в модальном окне.
ajaxForms('#fancybox__callback','fancyCallbackFlag','Запрос обратного звонка успешно отправлен администрации магазина','Вы уже отправляли запрос. Пожалуйста ожидайте звонка.')
// 'Обратная связь' в модальном окне.
ajaxForms('#fancybox__feedback','fancyFeedbackFlag','Запрос обратной связи успешно отправлен администрации магазина','Вы уже отправляли запрос. Пожалуйста ожидайте.')
// 'Уведомить' в модальном окне.
ajaxForms('#fancybox__notify','notifyFlag','Вы будете уведомлены о поступлении товара','Вы уже отправляли запрос. Пожалуйста ожидайте.')
// 'Обратная связь'.
ajaxForms('.form__feedback','feedbackFlag','Спасибо за обращение! Мы свяжемся с вами в ближайшее время','Вы уже отправляли запрос. Пожалуйста ожидайте.')
// Страница 'Обратный звонок'.
ajaxForms('.page-сallback','pageCallbackFlag','Спасибо за обращение! Мы перезвоним вам в ближайшее время','Вы уже отправляли запрос. Пожалуйста ожидайте звонка.')
// 'Обратный звонок'.
// ajaxForms('#callback','callbackFlag','Спасибо за обращение! Мы перезвоним вам в ближайшее время','Вы уже отправляли запрос. Пожалуйста ожидайте звонка.')
// 'Подписаться'.
//ajaxForms('#subscribe','subscribeFlag','Спасибо за обращение! Вы подписались на наши уведомления','Вы уже отправляли запрос. Пожалуйста ожидайте.')


// Слайдер на главной
function swiperShow(){
	const id = '#slideshow'

	const swiper = new Swiper(id + ' .swiper', {
		loop: false,
		preloadImages: false,
		watchSlidesVisibility: true,
		watchOverflow: true,
		hashNavigation: false,
		slidesPerView: '1',
		spaceBetween: 16,
		speed: 400,
		lazy: {
			enabled: true,
			loadPrevNext: true,
			loadOnTransitionStart: true,
		},
		pagination: {
			el: id + ' .swiper-pagination',
			type: 'bullets',
			dynamicBullets: false,
			clickable: true,
		},
		navigation: {
			enabled: false,
			nextEl: id + ' .swiper-button-next',
			prevEl: id + ' .swiper-button-prev',
		},
		on: {
			init: function(){
				updSlide(this)
			},
			slideChange: function(){
				updSlide(this)
			},
		}
	});

	// Обновление слайдов в навигации
	function updSlide(obj){
		const content = obj.slides[obj.activeIndex].querySelector('.slideshow__content-hidden').innerHTML
		document.querySelector('.slideshow__content').innerHTML = content
	}
}

// Функции стандартного слайдера
function swiperSales(){
	const id = '#pdt__sales'
	// Слайдер товаров
	const swiper = new Swiper(id + ' .swiper', {
		loop: false,
		autoplay: false,
		watchSlidesVisibility: true,
		simulateTouch: true,
		grabCursor: true,
		slidesPerView: '3',
		spaceBetween: 32,
		nested: true,
		preloadImages: false,
		lazy: {
			enabled: true,
			loadPrevNext: true,
			loadOnTransitionStart: true,
		},
		navigation: {
			nextEl: id + ' .swiper-button-next',
			prevEl: id + ' .swiper-button-prev',
		},
		breakpoints: {
			0: {
				slidesPerView: '1',
			},
			320: {
				slidesPerView: '1',
			},
			480: {
				slidesPerView: '1',
			},
			640: {
				slidesPerView: '2',
			},
			768: {
				slidesPerView: '2',
			},
			1024: {
				slidesPerView: '2',
			},
			1200: {
				slidesPerView: '3',
			}
		},
	});

}

// Функции стандартного слайдера
function swiperSlider(id){
	// Слайдер товаров
	const swiper = new Swiper(id + ' .swiper', {
		loop: false,
		autoplay: false,
		watchSlidesVisibility: true,
		simulateTouch: true,
		grabCursor: true,
		slidesPerView: '6',
		spaceBetween: 20,
		nested: true,
		preloadImages: false,
		lazy: {
			enabled: true,
			loadPrevNext: true,
			loadOnTransitionStart: true,
		},
		navigation: {
			nextEl: id + ' .swiper-button-next',
			prevEl: id + ' .swiper-button-prev',
		},
		breakpoints: {
			0: {
				slidesPerView: '1',
			},
			320: {
				slidesPerView: '1',
			},
			480: {
				slidesPerView: '2',
			},
			640: {
				slidesPerView: '3',
			},
			768: {
				slidesPerView: '3',
			},
			1024: {
				slidesPerView: '4',
			},
			1200: {
				slidesPerView: '6',
			}
		},
	});

}



// Переименование названий Месяца
// function monthNames() {
// 	if ($('.month').length){
// 		$('.month').each(function () {
// 			if ($(this).text() === 'Jan') {
// 				$(this).text('Января')
// 			}else if ($(this).text() === 'Feb') {
// 				$(this).text('Февраля')
// 			}else if ($(this).text() === 'Mar') {
// 				$(this).text('Марта')
// 			}else if ($(this).text() === 'Apr') {
// 				$(this).text('Апреля')
// 			}else if ($(this).text() === 'May') {
// 				$(this).text('Мая')
// 			}else if ($(this).text() === 'Jun') {
// 				$(this).text('Июня')
// 			}else if ($(this).text() === 'Jul') {
// 				$(this).text('Июля')
// 			}else if ($(this).text() === 'Aug') {
// 				$(this).text('Августа')
// 			}else if ($(this).text() === 'Sep') {
// 				$(this).text('Сентября')
// 			}else if ($(this).text() === 'Oct') {
// 				$(this).text('Октября')
// 			}else if ($(this).text() === 'Nov') {
// 				$(this).text('Ноября')
// 			}else if ($(this).text() === 'Dec') {
// 				$(this).text('Декабря')
// 			}
// 		});
// 	}
// }


///////////////////////////////////////
// Функция подгрузки товаров ajax при скроле
///////////////////////////////////////
// function ajaxProducts() {
// 	var pages = $('.pages');
// 	var status = $('.pages__ajax');

// 	if(pages.length && status.length){
// 		// Функция загрузки товаров со след страницы
// 		function loadItems(){
// 			var url = pages.find('.next a').attr('href');
// 			// Проверяем наличие след страницы
// 			if(url){
// 				// console.log('get goods from url', url)
// 				$.ajax({
// 					url:url + '&only_body=1',
// 					cache:false,
// 					dataType: 'html',
// 					success:function(data){
// 						// Получаем товары
// 						var items = $(data).find('.products__ajax').html();
// 						// Добавляем товары
// 						$('.products__ajax').append(items)
// 						// Обновляем изображение подргуженных товаров
// 						$('.products__ajax .product__item').each(function () {
// 							$(this).find('img').attr('src', $(this).find('img').data('src'))
// 						})
// 						// product.priceDiff('.products__ajax .product__item', 'percent');
// 						// Обновляем навигацию
// 						pages.html($(data).find('.pages').html())
// 						$('.pages__page').text($('.products__ajax .product__item:visible').length);
// 					}
// 				})
// 			}else{
// 				console.log('Загружены все товары')
// 				return false;
// 			}
// 		}

// 		// Проверка положения нижней границы контейнера
// 		function checkPosition() {
// 			var coords = $('.products__container')[0].getBoundingClientRect();
// 			var windowHeight = document.documentElement.clientHeight;
// 			// нижний край элемента виден?
// 			var bottomVisible = coords.bottom < windowHeight && coords.bottom > 100;
// 			return bottomVisible
// 		}

// 		// обрабатываем скролл на всей странице
// 		function throttle(func, limit){
// 			var lastFunc;
// 			var lastRan;
// 			return function () {
// 				var context = this;
// 				var args = arguments;
// 				if (!lastRan){
// 					func.apply(context, args);
// 					lastRan = Date.now();
// 				} else {
// 					clearTimeout(lastFunc);
// 					lastFunc = setTimeout(function () {
// 						if((Date.now() - lastRan) >= limit) {
// 							func.apply(context, args);
// 							lastRan = Date.now();
// 						}
// 					}, limit - (Date.now() - lastRan));
// 				}
// 			}
// 		}
		
// 		// код будет срабатывать раз в 1 секунду
// 		document.addEventListener('scroll', throttle(function () {
// 			if(checkPosition()){
// 				console.log('loadItems')
// 				return loadItems();
// 			} else {
// 				return false;
// 			}
// 		}, 1000));

// 	}

// }

///////////////////////////////////////
// Загрузка основных функций шаблона
///////////////////////////////////////
$(document).ready(function () {
	userAgent();
	openMenu();
	toTop();
  mainnav('header .mainnav', '1', 991);
	swiperSlider('#pdt__viewed');
	lazyload()
	remove.onClick()
	quantityAddto.onAddto()
	quantityAddto.updAddtoSale()

	// Удаление классов загрузки для элементов страницы
	$('.loading').addClass('loaded');
	$('div, section, ul').removeClass('loading');

	// Отправка формы по Ctrl+Enter
  $('form').bind('keypress', function(e){
    if((e.ctrlKey) && ((e.which==10)||(e.which==13))) {$(this).submit();}
    // Отправка данных формы по нажатию на Enter в случае если курсор находится в input полях (В некоторых браузерах при нажатии по enter срабатывает клик по первому submit полю, которое является кнопкой назад. Для этого написан этот фикс)
  }).find('input').bind('keypress', function(e){
    if(((e.which==10)||(e.which==13))) { try{$(this.form).submit();} catch(e){} return false; }
  });

  // Маска ввода телефона
  $('.form__phone').mask('+7 (999) 999-9999');

  // Возврашаем пользователя на страницу с которой был сделан обратный звонок
  $('.callbackredirect').val(document.location.href);

});

// Запуск функций при изменении экрана
$(window).resize(function () {
  if(getClientWidth() > 481 && window.outerHeight < 630){
    $('body').addClass('landscape');
  }else{
    $('body').removeClass('landscape');
  }
  mainnav('header .mainnav', '1', 991);
});

console.timeEnd('time test');