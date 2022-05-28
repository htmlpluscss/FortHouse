( nouislider => {

	if(!nouislider.length) {

		return;

	}

	const noUiSliderInit = () => {

		[...nouislider].forEach( slider => {

			const track = slider.querySelector('.nouislider__track'),
				  form = slider.closest('form'),
				  minInput = slider.querySelector('.nouislider__min'),
				  maxInput = slider.querySelector('.nouislider__max'),
				  minInputName = slider.querySelector('.nouislider__min-name'),
				  maxInputName = slider.querySelector('.nouislider__max-name'),
				  min   = parseInt(slider.getAttribute('data-min')),
				  max   = parseInt(slider.getAttribute('data-max')),
				  step  = slider.getAttribute('data-step') ? parseInt(slider.getAttribute('data-step')) : 1,
				  thousands  = slider.hasAttribute('data-thousands');

			noUiSlider.create(track, {
				start: [min,max],
				step: step,
				connect: true,
				range: {
					'min': min,
					'max': max
				},
				format: {
					to: value => parseInt(value),
					from: value => parseInt(value)
				}
			});

			track.noUiSlider.on('slide', values => {

				if( thousands ) {

					minInput.value = window.sepNumber(values[0]);
					maxInput.value = window.sepNumber(values[1]);

				} else {

					minInput.value = parseInt(values[0]);
					maxInput.value = parseInt(values[1]);

				}

			});

			track.noUiSlider.on('end', values => {

				minInputName.value = values[0];
				maxInputName.value = values[1];

				form.dispatchEvent(new CustomEvent('change', {
					detail: {
						target: track
					}
				}));

			});

			track.noUiSlider.on('update', values => {

				minInputName.value = values[0];
				maxInputName.value = values[1];

			});

			form.addEventListener("reset", () => {

				track.noUiSlider.set([min,max]);

			});

			slider.addEventListener("reset", () => {

				track.noUiSlider.set([min,max]);

			});

			form.addEventListener("input", event => {

				if(event.target === maxInput || event.target === minInput) {

					track.noUiSlider.set([
						parseInt(window.strToNumber(minInput.value)),
						parseInt(window.strToNumber(maxInput.value))
					]);

					minInputName.value = minInput.value;
					maxInputName.value = maxInput.value;

				}

			});

			minInput.addEventListener('focus', () => {

				minInput.value = track.noUiSlider.get()[0];
				minInput.setSelectionRange(0,99);

			});

			maxInput.addEventListener('focus', () => {

				maxInput.value = track.noUiSlider.get()[1];
				maxInput.setSelectionRange(0,99);

			});

			minInput.addEventListener('blur', () => {

				if( thousands ) {

					minInput.value = window.sepNumber(track.noUiSlider.get()[0]);

				}

			});

			maxInput.addEventListener('blur', () => {

				if( thousands ) {

					maxInput.value = window.sepNumber(track.noUiSlider.get()[1]);

				}

			});

			minInput.addEventListener('keydown', event => {

				if(event.key === "Enter" || event.key === "Escape") {

					event.preventDefault();

					minInput.blur();

				}

			});

			maxInput.addEventListener('keydown', event => {

				if(event.key === "Enter" || event.key === "Escape") {

					event.preventDefault();

					maxInput.blur();

				}

			});

			if (
				min !== parseInt(window.strToNumber(minInput.value)) ||
				max !== parseInt(window.strToNumber(maxInput.value))
			) {

				track.noUiSlider.set([
					parseInt(window.strToNumber(minInput.value)),
					parseInt(window.strToNumber(maxInput.value))
				]);

			}

		});

	};

	// load
	const script = document.createElement('script');
	script.src = '/js/nouislider.min.js';
	script.onload = noUiSliderInit;
	setTimeout( () => document.head.appendChild(script), localStorage.getItem('fastLoadScript') ? 0 : 10000);

})(document.querySelectorAll('.nouislider'));