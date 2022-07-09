/*
( header => {

	if (header) {

		let resizeTimeout = null;

		window.addEventListener("scroll", () => {

			window.requestAnimationFrame( () => {

				if ( resizeTimeout === null ) {

					resizeTimeout = setTimeout( () => {

						resizeTimeout = null;

						header.classList.toggle('is-fixed', window.pageYOffset > 0);

					}, 100);

				}

			});

		});

	}

})(document.querySelector('.header'));*/