( form => {

	if(form) {

		const productForm = document.querySelector('.product-buy'),
			  footer = document.querySelector('.footer');

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

	}

})(document.querySelector('.product-scroll'));