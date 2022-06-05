( tabs => {

	if ( tabs.length > 0 ) {

		[...tabs].forEach( tab => {

			const btn = tab.querySelectorAll('.tabs__btn'),
				  item = tab.querySelectorAll('.tabs__item'),
				  nav = document.createElement('div');

			[...btn].forEach( (btn,index) => {

				const _btn = document.createElement('button');

				_btn.setAttribute('type','button');

				_btn.className = index === 0 ? 'btn btn--grey' : 'btn btn--outline';

				_btn.textContent = btn.textContent;

				nav.appendChild(_btn);

				_btn.addEventListener('click', () => {

					[...nav.querySelectorAll('.btn')].forEach( (btn,index) => {

						btn.classList.toggle('btn--grey', _btn === btn);
						btn.classList.toggle('btn--outline', _btn !== btn);

						item[index].classList.toggle('visuallyhidden', _btn !== btn);

					});

				});

				btn.remove();

			});

			nav.classList.add('tabs__nav');
			tab.insertAdjacentElement('afterbegin', nav);

		});

	}

})(document.querySelectorAll('.tabs'));