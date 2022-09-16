( catalog => {

	if(catalog) {

		const template = document.querySelector('#btn-in-cart-template').innerHTML;

		window.addEventListener("submit", event => {

			const formAdd = event.target.closest('.js-add-cart');

			if ( formAdd ) {

				console.log(formAdd.id.value);

				event.preventDefault();

				formAdd.insertAdjacentHTML('afterend', Mustache.render(template));

				formAdd.remove();

				const url = formAdd.getAttribute('action'),
					  formData = new FormData(formAdd);

				formData.append('ajax',1);

				fetch(formAdd.getAttribute('action'), {
					method: 'POST',
					headers: {
						'Content-Type' : 'application/json',
						'X-Requested-With' : 'XMLHttpRequest'
					},
					body: formData
				})
				.then(response => response.json())
				.then(result => {

					console.log(result);

					// в шапке

					[...document.querySelectorAll('.js-set-cart-counter')].forEach( el => el.setAttribute('data-counter', result.totalCart) );

				});

			}

		});

	}

})(document.querySelector('.catalog'));