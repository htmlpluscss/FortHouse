( items => {

	if(!items.length) {

		return;

	}

	[...items].forEach( form => {

		const btn = form.querySelector('.form__submit');

		form.addEventListener('submit', event => {

			event.preventDefault();

			btn.disabled = true;

			fetch(form.getAttribute('action'), {
				method: 'POST',
				body: new FormData(form)
			})
			.then(response => response.json())
			.then(result => {

				console.log(result);

				btn.disabled = false;

			// info modal

				if(result.type === 'ok') {

					document.querySelector('.modal__item--ok .modal__title').innerHTML = result.title;
					document.querySelector('.modal__item--ok .modal__text').innerHTML = result.text;

					const eventModalShow = new CustomEvent("modalShow", {
						detail: {
							selector: "ok"
						}
					});

					window.modal.dispatchEvent(eventModalShow);

				}

			// reset

				if(result.reset) {

					form.reset();

				}

			});

		});

	});

})(document.querySelectorAll('.form'));