( tabs => {

	if ( tabs.length > 0 ) {

		[...tabs].forEach( tab => {

			const nav = tab.querySelectorAll('.tabs__btn'),
				  item = tab.querySelectorAll('.tabs__item');

			[...nav].forEach( btn => {

				btn.addEventListener('change', () => {

					[...item].forEach( el => el.classList.toggle('visuallyhidden', el.getAttribute('data-tab') !== btn.value) );

				});

			});

		});

	}

})(document.querySelectorAll('.tabs'));