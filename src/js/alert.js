( alert => {

	if (alert) {

		const id = alert.getAttribute('data-id');

		alert.querySelector('.alert__close').addEventListener('click', ()=> {

			document.cookie = "alert=" + id +"; path=/; max-age=31536000";

			alert.classList.add('hide');

		});

		if (document.cookie.split(';').filter((item) => item.includes('alert=' + id)).length) {

			alert.classList.add('hide');

		}

	}

})(document.querySelector('.alert'));