( forms => {

	if ( forms.length === 0 ) {

		return;

	}

	document.addEventListener('submit', event => {

		const form = event.target.closest('.form-buy');

		if (form) {

			event.preventDefault();

			if ( form.elements.modal ) {

				// Запрос цены или Купить в 1 клик

				const modalForm = form.elements.modal.value === 'get-price' ?
					document.querySelector('#modal-get-price') :
					document.querySelector('#modal-buy-one-click');

				let name = form.elements.name.value;

				if ( form.elements.price ) {

					name += '<br><small>' + form.elements.price.value + '</small>';

				}

				modalForm.elements.id.value = form.elements.id.value;
				modalForm.querySelector('.modal-product__name').innerHTML = name;
				modalForm.querySelector('.modal-product__photo').innerHTML = `<img src="${form.elements.img.value}" width="90" height="90" alt="${form.elements.name.value}">`;

				const eventModalShow = new CustomEvent("modalShow", {
					detail: {
						selector: form.elements.modal.value
					}
				});

				window.modal.dispatchEvent(eventModalShow);

				setTimeout( ()=> modalForm.querySelector('.input').focus(), 1);

				return;

			}

			const btnSubmit = form.querySelector('.form-buy__submit');

			btnSubmit.disabled = true;

			fetch(form.getAttribute('action'), {
				method: 'POST',
				body: new FormData(form)
			})
			.then(response => response.json())
			.then(result => {

				console.log(result);

				btnSubmit.disabled = false;

				// в шапке

				[...document.querySelectorAll('.js-set-cart-counter')].forEach( el => el.setAttribute('data-counter', result.totalCart) );

				alert('модалка успеха. с результатом?')

			// info modal

				if(false) {

					document.querySelector('.modal__item--ok .modal__title').innerHTML = result.title;
					document.querySelector('.modal__item--ok .modal__text').innerHTML = result.text;

					const eventModalShow = new CustomEvent("modalShow", {
						detail: {
							selector: "ok"
						}
					});

					window.modal.dispatchEvent(eventModalShow);

				}

			});

		}

	});

})(document.querySelectorAll('.form-buy'));