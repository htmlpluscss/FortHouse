( modalCart => {

	if ( !modalCart ) {

		return;

	}

	document.addEventListener('submit', event => {

		const form = event.target.closest('.form-buy');

		if (form) {

			event.preventDefault();

			if ( form.elements.modal && form.elements.modal.value === 'get-price' ) {

				// показать модалку

				modalCart.elements.id.value = form.elements.modal.value;
				modalCart.querySelector('.modal-get-price__name').textContent = form.elements.name.value;
				modalCart.querySelector('.modal-get-price__photo').innerHTML = `<img src="${form.elements.img.value}" width="90" height="90" alt="${form.elements.name.value}">`;

				const eventModalShow = new CustomEvent("modalShow", {
					detail: {
						selector: "get-price"
					}
				});

				window.modal.dispatchEvent(eventModalShow);

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

					document.querySelector('.modal__item--ok .modal__head').innerHTML = result.title;
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

})(document.querySelector('.modal-get-price'));