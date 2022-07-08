( brands => {

	if ( brands.length > 0 ) {

		window.addEventListener("click", event => {

			const isBrand = event.target.closest('.brand-service');

			if ( event.target.closest('.brand-service__more') ) {

				return;

			}

			[...brands].forEach( brand => {

				brand.classList.toggle('is-open', brand === isBrand && isBrand.classList.contains('is-open') === false && event.target.closest('.brand-service__main'));

			});

		});

	}

})(document.querySelectorAll('.brand-service'));