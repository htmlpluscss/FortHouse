( gallery => {

	if( gallery ) {

		const modalBox = document.querySelector('#modal-gallery'),
			  links = gallery.querySelectorAll('.photo-gallery__item');

		[...links].forEach( (link,index) => {

			link.addEventListener('click', event => {

				event.preventDefault();

				const eventModalShow = new CustomEvent("modalShow", {
					detail: {
						selector: "gallery"
					}
				});

				window.modal.dispatchEvent(eventModalShow);

				const eventSetSlides = new CustomEvent("setSlides", {
					detail: {
						index
					}
				});

				modalBox.dispatchEvent(eventSetSlides);

			});

		});

	}

})(document.querySelector('.photo-gallery'));