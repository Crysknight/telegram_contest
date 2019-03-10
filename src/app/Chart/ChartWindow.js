import { CHART_WINDOW } from 'constants';

export default class ChartWindow {
    constructor(chartElement, lines) {
        this.chartWindow = chartElement.querySelector(CHART_WINDOW);
    }
};
