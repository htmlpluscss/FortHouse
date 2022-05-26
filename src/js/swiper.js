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
			  realty = swipe.classList.contains('swiper-container--realty'),
			  gallery = swipe.classList.contains('swiper-container--gallery'),
			  related = swipe.classList.contains('swiper-container--related');

		swipeNav.className = 'swiper-pagination';
		swipeControls.className = 'swiper-controls';

		swipeBtns.className = 'swiper-navigation';
		swipePrev.className = 'swiper-button-prev button';
		swipeNext.className = 'swiper-button-next button';

		swipePrev.setAttribute('aria-label','Previous slide');
		swipeNext.setAttribute('aria-label','Next slide');

		swipePrev.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16"><path d="m5.22 7.33 3.57-3.57-.94-.95L2.67 8l5.18 5.19.94-.95-3.57-3.57h8.11V7.33H5.22Z"/></svg>';
		swipeNext.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16"><path d="M10.78 7.33 7.21 3.76l.94-.95L13.33 8l-5.18 5.19-.94-.95 3.57-3.57H2.67V7.33h8.11Z"/></svg>';

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

		if (realty) {

			swipeNav.remove();

			toggleSwipe = () => {

				toggleSwipe = false;

				swipe.parentNode.parentNode.classList.add('swiper-container-style');
				swipe.parentNode.appendChild(swipeControls);

				new Swiper(swipe, {
					loop: true,
					slidesPerView: 3,
					slidesPerGroup: 1,
					spaceBetween: 36,
					navigation: {
						nextEl: swipeNext,
						prevEl: swipePrev
					},
					breakpoints: {
						320: {
							slidesPerView: 1
						},
						768: {
							slidesPerView: 2,
							spaceBetween: 24
						},
						1200: {
							slidesPerView: 3,
							spaceBetween: 36
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

							[...swiperContainer].forEach( swipe => swipe.dispatchEvent(new CustomEvent("swiperResize")) );

						}

					}

				}, 1000);

			}

		});

	});

	const script = document.createElement('script');

	script.src = '/js/swiper.min.js';

	script.onload = () => [...swiperContainer].forEach( swipe => swipe.dispatchEvent(new CustomEvent("swiperJsLoad")) );

	setTimeout( () => document.head.appendChild(script), localStorage.getItem('fastLoadScript') ? 0 : 10000);

})(document.querySelectorAll('.swiper-container'));