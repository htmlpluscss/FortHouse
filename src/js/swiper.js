( swiperContainer => {

	if(!swiperContainer.length) {

		return;

	}

	Array.from(swiperContainer, swipe => {

		let mySwipe = null,
			toggleSwipe = null,
			resetSwipe = null;

		const swipeControls = document.createElement('div'),
			  swipeNav = document.createElement('div'),
			  swipeBtns = document.createElement('div'),
			  swipeNext = document.createElement('button'),
			  swipePrev = document.createElement('button'),
			  scrollbar = swipe.parentNode.querySelector('.swiper-scrollbar'),
			  items = swipe.querySelectorAll('.swiper-slide'),
			  count = items.length,
			  cardAuto = swipe.classList.contains('swiper-container--card-auto'),
			  billboard = swipe.classList.contains('swiper-container--billboard'),
			  productGalleryPreview = swipe.classList.contains('swiper-container--gallery-preview');

		swipeNav.className = 'swiper-pagination';
		swipeControls.className = 'swiper-controls';

		swipeBtns.className = 'swiper-navigation';
		swipePrev.className = 'swiper-button-prev button';
		swipeNext.className = 'swiper-button-next button';

		swipePrev.setAttribute('aria-label','Previous slide');
		swipeNext.setAttribute('aria-label','Next slide');

		if ( productGalleryPreview ) {

			swipePrev.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24"><path d="m13 9 4.6 4.6a1 1 0 1 1-1.4 1.4l-3.9-3.9L8.4 15A.99.99 0 0 1 7 13.6L11.59 9A1 1 0 0 1 13 9Z"/></svg>';
			swipeNext.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M13 15a1 1 0 0 1-1.4 0L7 10.4A.99.99 0 0 1 8.4 9l3.9 3.9L16.2 9a.99.99 0 0 1 1.4 1.4L13 15Z"/></svg>';

		} else {

			swipePrev.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M8.41 11.5H18a1 1 0 0 1 0 2H8.41l3.8 3.8a1 1 0 0 1-1.42 1.4l-5.5-5.5a1 1 0 0 1 0-1.4l5.5-5.5a1 1 0 0 1 1.42 1.4l-3.8 3.8Z"/></svg>';
			swipeNext.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M11.8 5.8a1 1 0 0 0 0 1.4l3.79 3.8H6a1 1 0 0 0 0 2h9.59l-3.8 3.8a1 1 0 1 0 1.42 1.4l5.5-5.5a1 1 0 0 0 .29-.67v-.06a1 1 0 0 0-.3-.68l-5.5-5.5a1 1 0 0 0-1.4 0Z"/></svg>';

		}

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

			swipeControls.classList.add('center');
			swipeNav.classList.remove('hide');
			swipeBtns.classList.add('hide');
			swipeControls.classList.remove('hide');

			toggleSwipe = () => {

				toggleSwipe = false;
				swipe.parentNode.classList.add('swiper-container-style');

				new Swiper(swipe, {
					loop: true,
					autoplay: {
						delay: 5000
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

		if (cardAuto) {

			resetSwipe();

			toggleSwipe = () => {

				resetSwipe();

				if (window.innerWidth >= 1250) {

					swipeBtns.classList.remove('hide');
					swipeControls.classList.remove('hide');

					swipe.parentNode.parentNode.appendChild(swipeControls);

					swipePrev.classList.add('swiper-button-disabled');

					swipe.parentNode.parentNode.classList.add('swiper-container-style');

					mySwipe = new Swiper(swipe, {

						slidesPerView: "auto",
						navigation: {
							nextEl: swipeNext,
							prevEl: swipePrev
						}

					});

				}

			}

		}

		if (productGalleryPreview) {

			toggleSwipe = () => {

				resetSwipe();

				swipeControls.classList.remove('hide');

				if (window.innerWidth < 768) {

					if ( count === 1 ) {

						return;

					}

					swipeNav.classList.remove('hide');
					swipeBtns.classList.add('hide');

					swipe.parentNode.classList.add('swiper-container-style');

					mySwipe = new Swiper(swipe, {
						loop: true,
						pagination: {
							el: swipeNav,
							clickable: true,
							bulletClass: 'button',
							bulletActiveClass: 'is-active'
						},
						on: {
							slideChange : () => {

								if ( swipe.querySelectorAll('video') ) {

									Array.from(swipe.querySelectorAll('video'), video => {

										video.parentNode.classList.add('is-video');
										video.pause();

									});

								}

							}
						}
					});

				} else if ( count > 5 ) {

					swipeNav.classList.add('hide');
					swipeBtns.classList.remove('hide');

					let initialSlide = 0,
						slidesPerView = 5,
						spaceBetween = 15;

					swipe.parentNode.appendChild(swipeControls);

					Array.from(items, (el,index) => {

						if(el.classList.contains('is-current')) {

							initialSlide = index;

						}

					});

					swipe.parentNode.classList.add('swiper-container-style');

					const box = swipe.closest('.swiper-gallery-preview'),
						  big = box.querySelectorAll('.swiper-gallery-preview__big-item');

					mySwipe = new Swiper(swipe, {
						loop: true,
						slideActiveClass: 'is-current',
						direction: 'vertical',
						slidesPerView : slidesPerView,
						spaceBetween: spaceBetween,
						slideToClickedSlide: true,
						initialSlide: initialSlide,
						navigation: {
							nextEl: swipeNext,
							prevEl: swipePrev
						},
						on: {
							slideChange : () => {

								Array.from(big, (item,index) => {

									item.classList.toggle('is-hide', swipe.swiper.realIndex !== index);

									if(item.querySelector('video')){

										item.querySelector('video').pause();

									}

								});

							}
						},
						breakpoints: {
							320: {
								slidesPerView: 3,
								spaceBetween: 8
							},
							768: {
								slidesPerView: slidesPerView,
								spaceBetween: spaceBetween
							}
						}
					});

				}

			}

		}

		PubSub.subscribe('windowWidthResize', () => {

			if (window.Swiper && toggleSwipe) {

				toggleSwipe();

			}

		});

		PubSub.subscribe('swiperJsLoad', () => {

			swipe.appendChild(swipeControls);

			// eager
			Array.from(swipe.querySelectorAll('[loading="lazy"]'), img => img.setAttribute('loading','eager'));

			// hide
			Array.from(items, el => el.classList.remove('hide'));

			toggleSwipe();

		});

	});

	const script = document.createElement('script');

	script.src = '/js/swiper.min.js';

	script.onload = () => PubSub.publish('swiperJsLoad');

	setTimeout( () => document.head.appendChild(script), Cookies.get('fastLoadScript') ? 0 : 10000);

})(document.querySelectorAll('.swiper-container'));