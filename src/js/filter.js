( filter => {

	if(!filter) {

		return;

	}

	let windowScroll = window.pageYOffset,
		barResultTotalPositionTop = 0,
		page = parseInt( filter.elements.page.value ),
		limit = parseInt( filter.elements.limit.value );

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

		page = ajaxBtn.disabled ? page + limit : 0;

		filter.elements.page.value = page;

		const formData = new FormData(filter);

		[...formData].forEach( el => {

			if ( el[1] === 'auto' ) {

				formData.delete(el[0]);

			}

		});

		let queryString = new URLSearchParams(formData);

		queryString.delete('ajax');
		queryString.delete('limit');
		queryString.delete('total');

//		history.pushState(undefined, '', window.location.href.split('?')[0] + '?' + queryString.toString());
		history.pushState(undefined, '', 'catalogue.php?' + queryString.toString());

		// источник форма может быть только при клике по кнопке

		if ( target === filter ) {

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

					if( windowScroll !== window.pageYOffset ) {

						window.scrollTo(0,windowScroll);

					}

				} else {

					resultBox.innerHTML = html;

					resultBox.classList.toggle('is-row', filter.elements.view.value !== 'row');

				}

				ajaxBtn.classList.toggle('is-hide', resultBox.querySelectorAll('.catalog__item').length === parseInt(filter.elements.total.value));

			});

		} else {

			formData.append('ajaxFilter',true);
			formData.delete('ajax');

			fetch(filter.getAttribute('action'), {
				method: 'POST',
				body: formData
			})
			.then(response => response.json())
			.then(data => {

				[...count].forEach( el => el.textContent = data.count );

				filter.elements.total.value = data.count;

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