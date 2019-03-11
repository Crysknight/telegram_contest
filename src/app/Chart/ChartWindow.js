import {
    CHART_WINDOW,
    DEFAULT_STROKE_COLOR,
    CHART_MAX_WIDTH,
    CHART_WIDTH_PADDING,
    CHART_HEIGHT
} from 'constants';

import { clone } from 'utils';

export default class ChartWindow {
    constructor(chartElement) {
        // Binding context to be sure that 'this' is always a ChartWindow instance
        this.render = this.render.bind(this);
        this.destroy = this.destroy.bind(this);
        this.setSize = this.setSize.bind(this);
        this.setWidth = this.setWidth.bind(this);
        this.clear = this.clear.bind(this);
        this.drawLine = this.drawLine.bind(this);

        this.element = chartElement.querySelector(CHART_WINDOW);
        this.context = this.element.getContext('2d');

        this.setSize();
    }

    render(lines) {
        this.clear();
        this.context.strokeStyle = DEFAULT_STROKE_COLOR;
        lines.forEach(this.drawLine);
    }

    destroy() {
        this.clear();
        window.removeEventListener('resize', this.setWidth);
    }

    setSize() {
        this.setWidth();
        this.element.height = CHART_HEIGHT;
        window.addEventListener('resize', this.setWidth);
    }

    setWidth() {
        this.element.width = (window.innerWidth > (CHART_MAX_WIDTH + CHART_WIDTH_PADDING))
            ? CHART_MAX_WIDTH
            : window.innerWidth - CHART_WIDTH_PADDING;
    }

    clear() {
        this.context.clearRect(0, 0, this.element.width, this.element.height);
    }

    drawLine(line) {
        // Cloning the line because of further mutation of it's data
        const lineClone = clone(line);
        const { context } = this;
        const { points, color } = lineClone;
        const [initPoint] = points.splice(0, 1);

        context.beginPath();
        context.strokeStyle = color;
        context.moveTo(initPoint.x, initPoint.y);

        points.forEach(({ x, y }) => {
            context.lineTo(x, y);
        });

        context.stroke();
        context.strokeStyle = DEFAULT_STROKE_COLOR;
    }
};
