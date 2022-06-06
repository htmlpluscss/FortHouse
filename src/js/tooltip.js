( tooltips => {

	if(tooltips.length){

		let observer = new MutationObserver(mutationRecords => {

			const t = mutationRecords[0].target,
				  inner = t.querySelector('.tooltip__inner');

			if(t.open) {

				const rect = inner.getBoundingClientRect();

				if(document.documentElement.clientWidth < rect.right) {

					// левее

					inner.style.marginLeft = document.documentElement.clientWidth - rect.right + 'px';

				} else if(rect.left < 0) {

					// правее

					inner.style.marginLeft = -rect.left + 'px';

				}

			} else {

				inner.removeAttribute('style');

			}

		});

		[...tooltips].forEach( tooltip => {

			const btn = tooltip.querySelector('.tooltip__btn');

			observer.observe(tooltip, {

				attributes : true

			});

			tooltip.addEventListener('mouseenter', () => {

				if ( window.innerWidth >= 1250 ) {

					tooltip.open = true;

				}

			});

			tooltip.addEventListener('mouseleave', () => {

				if ( window.innerWidth >= 1250 ) {

					tooltip.open = false;

				}

			});

		});

		window.addEventListener("click", event => {

			const target = event.target.closest('.tooltip');

			[...tooltips].forEach( tooltip => {

				if(target !== tooltip) {

					tooltip.open = false;

				}

			});

		});

	}

})(document.querySelectorAll('.tooltip'));