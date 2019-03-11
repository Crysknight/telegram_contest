import { CHART_CLASS_NAME } from 'constants';

import { clone } from 'utils';

import ChartWindow from './ChartWindow';
// import ChartOverview from './ChartOverview';
// import ChartFilters from './ChartFilters';

import html from './chart.html';
import './chart.scss';

export default class Chart {
    constructor(data) {
        this.data = clone(data);
        this.element = document.createElement('div');
        this.element.classList.add(CHART_CLASS_NAME);
        this.element.innerHTML = html;
    }

    init() {
        this.parseData();
        this.chartWindow = new ChartWindow({
            chartElement: this.element,
            lines: this.lines,
            xAxis: this.xAxis
        });
        this.chartWindow.render();
    }

    parseData() {
        const { columns, names, colors } = this.data;
        [this.xAxis] = columns.splice(0, 1);
        this.xAxis.shift();

        this.lines = columns.map(column => {
            const [lineName] = column.splice(0, 1);
            const name = names[lineName];
            const color = colors[lineName];
            const points = column.map((y, index) => {
                return {
                    y,
                    x: this.xAxis[index]
                };
            });

            return { name, color, points };
        });
    }
};
