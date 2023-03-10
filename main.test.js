/**
 * @jest-environment jsdom
 */
///////////////////////////////////////
// Add spaces in numbers 1000 -> 1 000  /  10000 -> 10 000. /JS/
function addSpaces(nStr){
	return String(nStr).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}

// Add spaces in numbers /JS/
describe("addSpaces between price", () => {
  // Add spaces in numbers 1000 -> 1 000 /JS/
  test('addSpaces 10000000 -> 10 000 000', () => {
    expect(addSpaces('10000000')).toBe('10 000 000');
  });
  // Add spaces in numbers 1000 -> 1 000 /JS/
  test('addSpaces 1000000 -> 1 000 000', () => {
    expect(addSpaces('1000000')).toBe('1 000 000');
  });
  // Add spaces in numbers 1000 -> 1 000 /JS/
  test('addSpaces 100000 -> 100 000', () => {
    expect(addSpaces('100000')).toBe('100 000');
  });
  // Add spaces in numbers 1000 -> 1 000 /JS/
  test('addSpaces 10000 -> 10 000', () => {
    expect(addSpaces('10000')).toBe('10 000');
  });
  // Add spaces in numbers 1000 -> 1 000 /JS/
  test('addSpaces 1000 -> 1 000', () => {
    expect(addSpaces('1000')).toBe('1 000');
  });
  // Add spaces in numbers 1000 -> 1 000 /JS/
  test('addSpaces 100 -> 100', () => {
    expect(addSpaces('100')).toBe('100');
  });
  // Add spaces in numbers 1000 -> 1 000 /JS/
  test('addSpaces 10 -> 10', () => {
    expect(addSpaces('10')).toBe('10');
  });
  // Add spaces in numbers 1000 -> 1 000 /JS/
  test('addSpaces 1 -> 1', () => {
    expect(addSpaces('1')).toBe('1');
  });
});
///////////////////////////////////////


///////////////////////////////////////
// Change textContent in Object. /JS/
function changeTxt(obj) {
	const slot = obj.querySelector('[slot]')
	const hideText = slot.getAttribute('slot')
	const showText = slot.textContent.trim()
	// Update content
	slot.textContent = hideText
	slot.setAttribute('slot', showText)
}

// TEST. Change textContent in Object. /JS/
describe("changeTxt object", () => {
  // HTML content
  document.body.innerHTML = `
    <div class="products__buttons">
      <a class="pdt__visible-button button-rotate button-link" title="Показать все">
        <i class="icon-reload"></i>
        <span slot="Скрыть">Показать все</span>
      </a>
    </div>
  `;
    
  // Object from content
  const button = document.querySelector('.pdt__visible-button')
  const hideText = button.querySelector('[slot]').getAttribute('slot')
  const showText = button.querySelector('[slot]').textContent.trim()

  // Test first click
  test('changeTxt first click Show', () => {
    button.addEventListener('click', changeTxt(button))
    const newHideText = button.textContent.trim()
    expect(newHideText).toBe(hideText);
  });

  // Test second click
  test('changeTxt second click Hide', () => {
    button.addEventListener('click', changeTxt(button))
    const newShowText = button.textContent.trim()
    expect(newShowText).toBe(showText);
  });

  // Test third click
  test('changeTxt third click Show', () => {
    button.addEventListener('click', changeTxt(button))
    const newHideText = button.textContent.trim()
    expect(newHideText).toBe(hideText);
  });

});
///////////////////////////////////////


///////////////////////////////////////
// Функция проверки активного класса у объекта
function isActived(obj, act = 'is-actived'){
	obj.matches('.'+act) ? obj.classList.remove(act) : obj.classList.add(act)
}

// TEST. Add class is-actived in object. /JS/
describe("Add class object", () => {
  // HTML content
  document.body.innerHTML = `
    <div class="products__buttons">
      <a class="button-primary">
        <i class="icon-reload"></i>
        <span>Показать все</span>
      </a>
    </div>
  `;
    
  // Object from content
  const button = document.querySelector('.button-primary')
  const act = 'is-actived'

  // Test first click
  test('add class is-actived first click', () => {
    button.addEventListener('click', isActived(button, act))
    const matches = button.matches('.'+act)
    expect(matches).toBe(true);
  });

  // Test second click
  test('remove class is-actived second click', () => {
    button.addEventListener('click', isActived(button, act))
    const matches = button.matches('.'+act)
    expect(matches).toBe(false);
  });

  // Test third click
  test('add class is-actived third click', () => {
    button.addEventListener('click', isActived(button, act))
    const matches = button.matches('.'+act)
    expect(matches).toBe(true);
  });

});


///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////