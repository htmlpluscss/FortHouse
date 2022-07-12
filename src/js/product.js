( form => {

	if(form) {

		const productForm = document.querySelector('.product-buy'),
			  footer = document.querySelector('.footer'),
			  scrollHeight = form.querySelector('.product-scroll__inner');

		window.product.insertAdjacentElement('afterbegin', form);

		window.addEventListener("scroll", () => {

			window.requestAnimationFrame( () => {

				if (window.innerWidth < 1250) {

					form.classList.toggle('is-show', footer.getBoundingClientRect().top > document.documentElement.clientHeight);

				} else {

					form.classList.toggle('is-show', window.isInViewport(productForm) === false);

				}

			});

		});

		// hash

		window.addEventListener('hashchange', () => {

			document.querySelector(location.hash).dispatchEvent(new Event("toggle"));

		});

		// resize

		window.addEventListener("resize", () => {

			window.requestAnimationFrame( () => {

				document.documentElement.style.setProperty('--heightProductScroll', scrollHeight.clientHeight + 'px');

			});

		});

		document.documentElement.style.setProperty('--heightProductScroll', scrollHeight.clientHeight + 'px');

	}

})(document.querySelector('.product-scroll'));