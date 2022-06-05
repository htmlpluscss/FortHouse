( filter => {

	if(!filter) {

		return;

	}

	let windowScroll = window.pageYOffset,
		barResultTotalPositionTop = 0;

	const resultBox = document.querySelector('.catalog__list'),
		  barResultTotal = filter.querySelector('.filter__show-result'),
		  count = filter.querySelectorAll('.filter__counter-total'),
		  loadingLayer = document.createElement('div'),
		  sort = document.querySelector('.catalog__sort'),
		  ajaxBtn = document.querySelector('.catalog__ajax .btn'),
		  legends = filter.querySelectorAll('.filter__legend'),
		  mobileOpen = document.querySelector('.catalog-mobile-filter .btn'),
		  mobileClose = filter.querySelector('.filter__btn-close');

	loadingLayer.className = 'catalog__loading';

	// change

	filter.addEventListener('change', event => {

		let target = event.target;

		if ( event.detail && event.detail.target ) {

			target = event.detail.target;

		}

		console.log(target);

		if ( target.classList.contains('nouislider__track') ) {

			barResultTotalPositionTop = target.clientHeight / 2 + target.offsetTop;

		}

		if ( target.classList.contains('checkbox-filter__input') ||
			 target.classList.contains('checkbox__input') ||
			 target.classList.contains('input--border')
		) {

			barResultTotalPositionTop = target.parentNode.clientHeight / 2 + target.parentNode.offsetTop;

		}

		barResultTotal.style.top = barResultTotalPositionTop + 'px';

		barResultTotal.classList.add('is-show');

		const formData = new FormData(filter);

		const queryString = new URLSearchParams(formData).toString();

		history.pushState(undefined, '', '?' + queryString);

		// источник форма может быть только при клике по кнопке

		if ( target === filter ) {

			filter.elements.page.value = ajaxBtn.disabled === true ? parseInt( filter.elements.page.value ) + 1 : 1;

			resultBox.insertAdjacentElement('afterbegin', loadingLayer);

			barResultTotal.classList.remove('is-show');
			document.body.classList.remove('is-filter-show');

			fetch(filter.getAttribute('action'), {
				method: 'POST',
				body: formData
			})
			.then(response => response.text())
			.then(html => {

				loadingLayer.remove();

				// кнопка еще

				if ( ajaxBtn.disabled === true ) {

					ajaxBtn.disabled = false;

					resultBox.insertAdjacentHTML('beforeend', html);

					if ( resultBox.querySelectorAll('.catalog__item').length === parseInt(filter.elements.total.value) ) {

						ajaxBtn.classList.add('is-hide');

					}

					if( windowScroll !== window.pageYOffset ) {

						window.scrollTo(0,windowScroll);

					}

				} else {

					resultBox.innerHTML = html;

					resultBox.classList.toggle('is-row', filter.elements.view.value !== 'row');

				}

			});

		} else {

			formData.append('count', 'on');

			fetch(filter.getAttribute('action'), {
				method: 'POST',
				body: formData
			})
			.then(response => response.text())
			.then(html => {

				[...count].forEach( el => el.textContent = html );

				filter.elements.total.value = html;

				barResultTotal.style.top = barResultTotalPositionTop + 'px';

			});

		}

	});

	// submit

	filter.addEventListener('submit', event => {

		event.preventDefault();

		filter.dispatchEvent(new Event("change"));

	});

// ajax

	if (ajaxBtn) {

		ajaxBtn.addEventListener("click", () => {

			ajaxBtn.disabled = true;

			windowScroll = window.pageYOffset;

			filter.dispatchEvent(new Event("change"));

		});

	}

// sort

	if (sort) {

		sort.addEventListener("change", event => {

			console.log(event.target);

			if( event.target.name === 'sort' ) {

				filter.elements.sort.value = event.target.value;

			}

			if( event.target.name === 'view' ) {

				filter.elements.view.value = event.target.value;

			}

			filter.dispatchEvent(new Event("change"));

		});

	}

// legend toggle

	[...legends].forEach( btn => {

		btn.addEventListener("click", () => {

			barResultTotal.classList.remove('is-show');

			btn.classList.toggle('is-open');

		});

	})

// btn mobile toggle

	mobileOpen.addEventListener("click", () => {

		windowScroll = window.pageYOffset;

		document.documentElement.classList.add('scroll-behavior-off');

		setTimeout( () => {

			document.body.classList.add('is-filter-show');
			window.scrollTo(0,0);

		});

	});

	mobileClose.addEventListener("click", () => {

		document.body.classList.remove('is-filter-show');

		window.scrollTo(0,windowScroll);

		setTimeout( () => document.documentElement.classList.remove('scroll-behavior-off'), 500);

	});

})(document.querySelector('.filter'));