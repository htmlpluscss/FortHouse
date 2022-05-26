( btn => {

	if(btn) {

		btn.addEventListener('click', () => {

			document.body.classList.toggle('overlay');
			document.body.classList.toggle('menu-show');

		});

	}

})(document.querySelector('.btn-menu-toggle'));