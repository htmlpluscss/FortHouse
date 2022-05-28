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
			  preview = swipe.classList.contains('swiper-container--preview'),
			  gallery = swipe.classList.contains('swiper-container--gallery'),
			  related = swipe.classList.contains('swiper-container--related');

		swipeNav.className = 'swiper-pagination';
		swipeControls.className = 'swiper-controls';

		swipeBtns.className = 'swiper-navigation';
		swipePrev.className = 'swiper-button-prev button';
		swipeNext.className = 'swiper-button-next button';

		swipePrev.setAttribute('aria-label','Previous slide');
		swipeNext.setAttribute('aria-label','Next slide');

		swipePrev.innerHTML = '<svg width="20" height="20" viewBox="0 0 96 96"><path d="m39.38 48 30.47-25.39a6 6 0 0 0-7.7-9.22l-36 30a6 6 0 0 0 0 9.22l36 30a6 6 0 0 0 7.7-9.22Z"/></svg>';
		swipeNext.innerHTML = '<svg width="20" height="20" viewBox="0 0 96 96"><path d="m69.84 43.39-36-30a6 6 0 0 0-7.69 9.22L56.62 48 26.15 73.39a6 6 0 0 0 7.7 9.22l36-30a6 6 0 0 0 0-9.22Z"/></svg>';

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

			swipeBtns.remove();

			toggleSwipe = () => {

				toggleSwipe = false;
				swipe.closest('.billboard').classList.add('swiper-container-style');

				new Swiper(swipe, {
					loop: true,
					autoplay: {
						delay: 10000
					},
					effect: 'fade',
					fadeEffect: {
						crossFade: true
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

		if (related) {

			toggleSwipe = () => {

				resetSwipe();

				if ( window.innerWidth < 768 ) {

					swipe.parentNode.classList.add('swiper-container-style');
					swipeBtns.classList.remove('hide');
					swipeControls.classList.remove('hide');

					mySwipe = new Swiper(swipe, {
						loop: true,
						navigation: {
							nextEl: swipeNext,
							prevEl: swipePrev
						}
					});

				}

			}

			swipe.addEventListener('swiperResize', toggleSwipe);

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

			const current = swipe.querySelector('.swiper-container-counter__current')
				  modalBox = document.querySelector('#modal-gallery'),
				  desktopBox = document.querySelector('#desktop-gallery');

			swipeNav.remove();

			toggleSwipe = () => {

				if ( window.innerWidth < 768 ) {

					desktopBox.appendChild(swipe.parentNode);

				} else {

					modalBox.appendChild(swipe.parentNode);

				}

				if ( mySwipe === null ) {

					mySwipe = new Swiper(swipe, {
						loop: true,
						navigation: {
							nextEl: swipeNext,
							prevEl: swipePrev
						},
						on: {
							slideChange: () => {
								current.textContent = swipe.swiper.realIndex + 1;
							}
						}
					});

				}

			}

			swipe.addEventListener('swiperResize', toggleSwipe);

			modalBox.addEventListener('setSlides', event => {

				console.log(event.detail.index);

				mySwipe.slideTo(event.detail.index + 1, 0);
				current.textContent = event.detail.index + 1;

			});

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