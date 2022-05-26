( elements => {

	if ( elements.length === 0 ) {

		return;

	}

	let windowScroll = window.pageYOffset;
	const wrapper = document.querySelector('.wrapper');

	[...elements].forEach( el => {

		el.addEventListener('mouseenter', () => {

			if ( window.innerWidth < 1250 ) {

				return;

			}

			el.classList.add('is-up');
			document.body.classList.add('overlay');

		});

		el.addEventListener('mouseleave', () => {

			el.classList.remove('is-up');
			document.body.classList.remove('overlay');

		});

	});

})(document.querySelectorAll('.js-accent'));