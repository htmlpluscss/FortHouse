( swiperContainer => {

	if(!swiperContainer.length) {

		return;

	}

	[...swiperContainer].forEach( swipe => {

		let mySwipe = null,
			toggleSwipe = null,
			resetSwipe = null;

		const swipeControls = document.createElement('div'),
			  swipeNav = document.createElement('div'),
			  swipeBtns = document.createElement('div'),
			  swipeNext = document.createElement('button'),
			  swipePrev = document.createElement('button'),
			  items = swipe.querySelectorAll('.swiper-slide'),
			  count = items.length,
			  billboard = swipe.classList.contains('swiper-container--billboard'),
			  brand = swipe.classList.contains('swiper-container--brand'),
			  preview = swipe.classList.contains('swiper-container--preview'),
			  gallery = swipe.classList.contains('swiper-container--gallery'),
			  galleryModal = swipe.classList.contains('swiper-container--gallery-modal');

		swipeNav.className = 'swiper-pagination';
		swipeControls.className = 'swiper-controls';

		swipeBtns.className = 'swiper-navigation';
		swipePrev.className = 'swiper-button-prev button';
		swipeNext.className = 'swiper-button-next button';

		swipePrev.setAttribute('aria-label','Previous slide');
		swipeNext.setAttribute('aria-label','Next slide');

		swipePrev.innerHTML = '<svg width="36" height="36" viewBox="0 0 36 36"><path d="m13.5 16.5 6.9-6.9a1.49 1.49 0 1 1 2.1 2.1l-5.85 5.85 5.85 5.85a1.48 1.48 0 0 1-2.1 2.1l-6.9-6.88a1.5 1.5 0 0 1 0-2.13Z"/></svg>';
		swipeNext.innerHTML = '<svg width="36" height="36" viewBox="0 0 36 36">><path d="m22.5 16.5-6.9-6.9a1.49 1.49 0 1 0-2.1 2.1l5.85 5.85-5.85 5.85a1.48 1.48 0 0 0 2.1 2.1l6.9-6.88a1.5 1.5 0 0 0 0-2.13Z"/></svg>';

		swipeBtns.appendChild(swipePrev);
		swipeBtns.appendChild(swipeNext);
		swipeControls.appendChild(swipeBtns);
		swipeControls.appendChild(swipeNav);

		resetSwipe = () => {

			if(mySwipe) {

				mySwipe.destroy(false,true);
				mySwipe = undefined;

			}

			swipeNav.classList.add('hide');
			swipeBtns.classList.add('hide');
			swipeControls.classList.add('hide');

			if ( swipe.closest('.swiper-container-style') ) {

				swipe.closest('.swiper-container-style').classList.remove('swiper-container-style');

			}

		}

		if (billboard) {

			toggleSwipe = () => {

				toggleSwipe = false;
				swipe.closest('.billboard').classList.add('swiper-container-style');
				swipe.parentNode.appendChild(swipeControls);

				new Swiper(swipe, {
					loop: true,
					autoplay: {
						delay: 5000
					},
					effect: 'fade',
					fadeEffect: {
						crossFade: true
					},
					navigation: {
						nextEl: swipeNext,
						prevEl: swipePrev
					},
					pagination: {
						el: swipeNav,
						clickable: true,
						bulletClass: 'button',
						bulletActiveClass: 'is-active'
					}
				});

			}

		}

		if (brand) {

			toggleSwipe = () => {

				toggleSwipe = false;

				swipe.parentNode.classList.add('swiper-container-style');
				swipe.parentNode.appendChild(swipeControls);

				new Swiper(swipe, {
					loop: true,
					slidesPerView: 4,
					slidesPerGroup: 1,
					navigation: {
						nextEl: swipeNext,
						prevEl: swipePrev
					},
					breakpoints: {
						320: {
							slidesPerView: 2,
							slidesPerGroup: 2
						},
						768: {
							slidesPerView: 3,
							slidesPerGroup: 1
						},
						1250: {
							slidesPerView: 4,
							slidesPerGroup: 1
						}
					},
					pagination: {
						el: swipeNav,
						clickable: true,
						bulletClass: 'button',
						bulletActiveClass: 'is-active'
					}
				});

			}

		}

		if (preview) {

			swipeNav.remove();

			toggleSwipe = () => {

				toggleSwipe = false;

				swipe.parentNode.classList.add('swiper-container-style');
				swipe.parentNode.appendChild(swipeControls);

				new Swiper(swipe, {
					loop: true,
					slidesPerView: 7,
					slidesPerGroup: 7,
					navigation: {
						nextEl: swipeNext,
						prevEl: swipePrev
					},
					breakpoints: {
						320: {
							slidesPerView: 2,
							slidesPerGroup: 2
						},
						768: {
							slidesPerView: 4,
							slidesPerGroup: 4
						},
						1250: {
							slidesPerView: 7,
							slidesPerGroup: 7
						}
					}
				});

			}

		}

		if (gallery) {

			toggleSwipe = () => {

				swipe.parentNode.classList.add('swiper-container-style');
				swipe.appendChild(swipeNav);

				mySwipe = new Swiper(swipe, {
					loop: true,
					navigation: {
						nextEl: swipeNext,
						prevEl: swipePrev
					},
					pagination: {
						el: swipeNav,
						clickable: true,
						bulletClass: 'button',
						bulletActiveClass: 'is-active'
					}
				});

			}

		}

		if (galleryModal) {

			swipeNav.remove();

			toggleSwipe = () => {

				toggleSwipe = false;

				swipe.parentNode.classList.add('swiper-container-style');

				mySwipe = new Swiper(swipe, {
					loop: true,
					navigation: {
						nextEl: swipeNext,
						prevEl: swipePrev
					},
					on: {
						init: () => {

							swipe.addEventListener('setSlides', event => {

								console.log(event.detail.index);
								swipe.swiper.slideTo(event.detail.index + 1, 0);

							});

						}
					}
				});

				if ( count <= 1 ) {

					resetSwipe();

				}

			}

		}

		swipe.addEventListener('swiperJsLoad', () => {

			swipe.appendChild(swipeControls);

			// eager
			[...swipe.querySelectorAll('[loading="lazy"]')].forEach( img => img.setAttribute('loading','eager') );

			// hide
			[...items].forEach( el => el.classList.remove('hide') );

			toggleSwipe();

		});

	});

	let resizeTimeout = null,
		windowWidthOLd = window.innerWidth;

	window.addEventListener("resize", () => {

		window.requestAnimationFrame( () => {

			if (resizeTimeout === null) {

				resizeTimeout = setTimeout( () => {

					resizeTimeout = null;

					if(windowWidthOLd !== window.innerWidth) {

						windowWidthOLd = window.innerWidth;

						if (window.Swiper) {

							[...swiperContainer].forEach( swipe => swipe.dispatchEvent(new Event("swiperResize")) );

						}

					}

				}, 1000);

			}

		});

	});

	const script = document.createElement('script');

	script.src = '/js/swiper.min.js';

	script.onload = () => [...swiperContainer].forEach( swipe => swipe.dispatchEvent(new Event("swiperJsLoad")) );

	setTimeout( () => document.head.appendChild(script), localStorage.getItem('fastLoadScript') ? 0 : 10000);

})(document.querySelectorAll('.swiper-container'));