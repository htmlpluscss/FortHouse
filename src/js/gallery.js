( img => {

	if(img) {

		const big = img.querySelectorAll('.swiper-gallery-preview__big-item');

		img.addEventListener('click', event => {

			if( event.target.tagName === 'VIDEO' && window.innerWidth < 768 ) {

				event.target.parentNode.classList.remove('is-video');
				event.target.paused ? event.target.play() : event.target.pause();

			}

			if(event.target.closest('.swiper-gallery-preview__link')) {

				event.preventDefault();

			}

			if( event.target.closest('.swiper-container-style') === null ){

				const item = event.target.closest('.swiper-gallery-preview__item');

				Array.from(img.querySelectorAll('.swiper-gallery-preview__item'), (el,index) => {

					el.classList.toggle('is-current', item === el);
					big[index].classList.toggle('is-hide', item !== el);

					if(big[index].querySelector('video')){

						big[index].querySelector('video').pause();

					}

				});

			}

		});

	}

})(document.querySelector('.swiper-gallery-preview'));