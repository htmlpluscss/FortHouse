( menu => {

	if ( menu === null ) {

		return;

	}

	let windowScroll = window.pageYOffset;
	const wrapper = document.querySelector('.wrapper');

// open

	( btn => {

		if(btn) {

			btn.addEventListener('click', () => {

				windowScroll = window.pageYOffset;

				document.documentElement.classList.add('scroll-behavior-off');

				setTimeout( () => {

					wrapper.style.top = -windowScroll + 'px';
					document.body.classList.add('menu-show');
					window.scrollTo(0,0);

				});

			});

		}

	})(document.querySelector('.btn-menu-open'));


// close

	( btn => {

		if(btn) {

			btn.addEventListener('click', () => {

				document.body.classList.remove('menu-show');
				wrapper.style.top = 0;
				window.scrollTo(0,windowScroll);

				setTimeout( () => document.documentElement.classList.remove('scroll-behavior-off'));

			});

		}

	})(document.querySelector('.btn-menu-close'));

// menu

	menu.addEventListener('click', event => {

		if ( event.target.closest('a') && event.target.closest('a').href.includes('#') || event.target === menu ) {

			document.body.classList.remove('menu-show');
			window.scrollTo(0,windowScroll);

			setTimeout( () => document.documentElement.classList.remove('scroll-behavior-off'));

		}

	});

})(document.querySelector('.mobile-menu'));