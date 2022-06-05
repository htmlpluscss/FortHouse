( modalCart => {

	if ( !modalCart ) {

		return;

	}

	document.addEventListener('submit', event => {

		const form = event.target.closest('.form-buy');

		if (form) {

			const btnSubmit = form.querySelector('.form-buy__submit');

			btnSubmit.disabled = true;

			event.preventDefault();

			if ( form.elements.modal.value === 'get-price' ) {

				// показать модалку

				modalCart.elements.modal.value = form.elements.modal.value;
				modalCart.querySelector('.modal-get-price__name').textContent = form.elements.name.value;
				modalCart.querySelector('.modal-get-price__photo').innerHTML = `<img src="${form.elements.img.value}" width="110" height="110" alt="${form.elements.name.value}">`;

				const eventModalShow = new CustomEvent("modalShow", {
					detail: {
						selector: "get-price"
					}
				});

				window.modal.dispatchEvent(eventModalShow);

				return;

			}

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

			});

		}

	});

})(document.querySelector('.modal-get-price'));