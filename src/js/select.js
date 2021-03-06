window.selects = select => {

	if(select.querySelector('.select__list')) {

		return;

	}

	const value = document.createElement('div');

	value.className = 'select__value';
	value.innerHTML = '<span class="select__value-inner"></span>';

	value.insertAdjacentHTML('beforeend', '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M7.2 9.2a.65.65 0 0 1 .91 0L12 13.12l3.89-3.94a.65.65 0 0 1 .92 0c.25.26.25.68 0 .94L12 15l-4.8-4.87a.67.67 0 0 1 0-.94Z"/></svg>');
	select.appendChild(value);

	const form = select.closest('form'),
		control = select.querySelector('select'),
		option = select.querySelectorAll('option'),
		valueText = select.querySelector('.select__value-inner'),
		list = document.createElement('div');

	list.className = 'select__list';

	let selected = control.querySelector('[value="' + control.value + '"]');

	// в мобиле системный контрол

	control.addEventListener("change", () => {

		valueText.textContent = control.querySelector('option[value="' + control.value + '"]').textContent;

		// d мобиле кнопки не нужены
		list.remove();

	});

	const valueDefault = selected.textContent;

	if( control.disabled || control.value === 'none' || control.value === '' ){

		select.classList.add('is-default');

	}

	if ( control.value !== '' ) {

		valueText.textContent = select.querySelector('option[value="' + control.value + '"]').textContent;

	}

	[...option].forEach( el => {

		const btn = document.createElement('label'),
			  label = document.createElement('span'),
			  input = document.createElement('input');

		btn.className = 'select__list-item';

		input.type = 'radio';
		input.className = 'visuallyhidden';
		input.name = control.name;
		input.value = el.value;

		label.textContent = el.textContent;

		if ( control.value === el.value ) {

			input.checked = true;

		}

		input.addEventListener('change', () => {

			valueText.textContent = el.textContent;
			select.classList.remove('is-open');

			// не мобиле системный контрол не нужен
			control.remove();

		});

		btn.appendChild(input);
		btn.appendChild(label);
		list.appendChild(btn);

	});

	select.appendChild(list);

	// возврат в дефолтное состояние, при резет формы

	form && form.addEventListener("reset", () => {

		select.classList.add('is-default');
		valueText.textContent = valueDefault;

	});

	select.classList.add('is-ready');

};

( () => {

	window.selectsCollection = document.querySelectorAll('.select');

	if(window.selectsCollection.length) {

		[...window.selectsCollection].forEach( select => window.selects(select));

	}

	window.addEventListener("click", event => {

		const isSelect = event.target.closest('.select');

		[...window.selectsCollection].forEach( select => {

			select.classList.toggle('is-open', select === isSelect && isSelect.classList.contains('is-open') === false);

		});

	});

})();