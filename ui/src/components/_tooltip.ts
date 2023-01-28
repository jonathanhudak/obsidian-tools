// popper core version relies on node's 'process.env' - umd does not
// see https://popper.js.org/docs/v2/#distribution-targets
import { computePosition } from '@floating-ui/dom';

export function tooltip(container) {
	let tt, popperInstance, componentInstance;

	container.addEventListener('mousemove', move);
	container.addEventListener('mouseout', hide);

	function setPosition(e) {
		// console.log(e);
		const { clientX: x, clientY: y } = e;
		const tooltip = document.querySelector('#tooltip');
		// console.log(tooltip);
		computePosition(container, tooltip).then(() => {
			const style = {
				left: `${x}px`,
				top: `${y}px`
			};

			// console.log(style);
			Object.assign(tooltip.style, style);
		});
	}

	function move(e) {
		setPosition(e);
		const tooltip = document.querySelector('#tooltip');
		tooltip.style.display = 'block';
	}

	function hide() {
		const tooltip = document.querySelector('#tooltip');
		tooltip.style.display = 'none';
	}

	return {
		destroy() {
			container.removeEventListener('mouseover', setPosition);
			container.removeEventListener('mousemove', setPosition);
			// container.removeEventListener('mouseout', hide);
		}
	};
}
