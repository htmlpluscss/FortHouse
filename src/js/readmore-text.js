( blocks => {

	if(blocks.length) {

		[...blocks].forEach( block => {

			const btn = block.querySelector('.readmore-text__btn'),
				  textClose = btn.textContent;

			const toggle = () => {

				if ( block.classList.contains('is-open') ) {

					block.classList.remove('is-open');
					btn.textContent = textClose;

				} else {

					block.classList.add('is-open');
					btn.textContent = btn.getAttribute('data-alt');

				}

			}

			btn.addEventListener('click', toggle);
			block.addEventListener('toggle', toggle);

		});

	}

})(document.querySelectorAll('.readmore-text'));