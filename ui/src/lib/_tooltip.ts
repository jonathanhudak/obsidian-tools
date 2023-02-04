// popper core version relies on node's 'process.env' - umd does not
// see https://popper.js.org/docs/v2/#distribution-targets
import type { ReferenceElement } from '@floating-ui/core';
import { computePosition } from '@floating-ui/dom';

interface TooltipData {
	text?: string;
}
interface TooltipOptions {
	showTooltipForPosition: (e: MouseEvent) => TooltipData;
}

export function tooltip(container: Node, { showTooltipForPosition }: TooltipOptions) {
	let tt, popperInstance, componentInstance;

	container.addEventListener('mousemove', move as EventListener);
	container.addEventListener('mouseout', hide);

	function setPosition(e: MouseEvent) {
		// console.log(e);
		const { clientX: x, clientY: y } = e;
		const tooltip = document.querySelector('#tooltip') as HTMLElement;
		const tooltipData = showTooltipForPosition(e);
		if (!tooltipData.text || !tooltip) return;

		tooltip.innerText = tooltipData.text;
		tooltip.style.display = 'block';

		// console.log(tooltip);
		computePosition(container as ReferenceElement, tooltip as HTMLElement).then(() => {
			const style = {
				left: `${x}px`,
				top: `${y}px`
			};

			// console.log(style);
			Object.assign(tooltip.style, style);
		});
	}

	function move(e: MouseEvent) {
		setPosition(e);
	}

	function hide() {
		const tooltip = document.querySelector('#tooltip') as HTMLElement;
		if (tooltip) {
			tooltip.style.display = 'none';
		}
	}

	return {
		destroy() {
			container.removeEventListener('mouseout', hide);
			container.removeEventListener('mousemove', move as EventListener);
			// container.removeEventListener('mouseout', hide);
		}
	};
}
