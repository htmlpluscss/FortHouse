( preview => {

	if( preview ) {

		const links = preview.querySelectorAll('.product-gallery__preview-link'),
			  gallery = document.querySelector('.product-gallery .swiper-container');

		[...links].forEach( (link,index) => {

			link.addEventListener('click', event => {

				if (gallery.swiper) {

					event.preventDefault();

					gallery.swiper.slideTo(index + 1);

				}

			});

		});

	}

})(document.querySelector('.product-gallery__preview'));

( gallery => {

	if( gallery ) {

		const modalBox = document.querySelector('#modal-gallery'),
			  appendSlide = [],
			  links = gallery.querySelectorAll('.product-gallery__link');

		[...links].forEach( link => {

			const slide = '<div class="swiper-slide"><img src="' + link.href + '"></div>';

			appendSlide.push(slide);

		});

		console.log(appendSlide);

		if ( modalBox.swiper ) {

			modalBox.swiper.appendSlide(appendSlide);

		} else {

			modalBox.querySelector('.swiper-wrapper').innerHTML = appendSlide.join('');

		}

		gallery.addEventListener('click', event => {

			if ( event.target.closest('.product-gallery__link') ) {

				event.preventDefault();

				const eventModalShow = new CustomEvent("modalShow", {
					detail: {
						selector: "gallery"
					}
				});

				window.modal.dispatchEvent(eventModalShow);

				if ( event.target.closest('.swiper-slide') ) {

					const index = parseInt(event.target.closest('.swiper-slide').getAttribute('data-swiper-slide-index'));

					const eventSetSlides = new CustomEvent("setSlides", {
						detail: {
							index
						}
					});

					modalBox.dispatchEvent(eventSetSlides);

				}

			}

		});

	}

})(document.querySelector('.product-gallery'));