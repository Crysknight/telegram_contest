import { CHART_CLASS_NAME } from 'constants';

import { clone } from 'utils';

import ChartWindow from './ChartWindow';
// import ChartOverview from './ChartOverview';
// import ChartFilters from './ChartFilters';

import html from './chart.html';
import './chart.scss';

export default class Chart {
    constructor(data) {
        // Cloning the data because of further mutation of it
        this.data = clone(data);
        this.element = document.createElement('div');
        this.element.classList.add(CHART_CLASS_NAME);
        this.element.innerHTML = html;

        this.fraction = 1;
        this.padding = 0;
    }

    init() {
        this.parseData();
        this.chartWindow = new ChartWindow(this.element);
    }

    parseData() {
        const { columns, names, colors } = this.data;
        [this.xAxis] = columns.splice(0, 1);
        // Get rid of the "x" identificator
        this.xAxis.shift();

        this.rawLines = columns.map(column => {
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
