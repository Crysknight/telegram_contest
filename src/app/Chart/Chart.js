import { CHART_CLASS_NAME } from 'constants';

import ChartWindow from './ChartWindow';
// import ChartOverview from './ChartOverview';
// import ChartFilters from './ChartFilters';

import html from './chart.html';

export default class Chart {
    constructor(data) {
        this.data = JSON.parse(JSON.stringify(data));
        this.element = document.createElement('div');
        this.element.classList.add(CHART_CLASS_NAME);
        this.element.innerHTML = html;
    }

    init() {
        this.parseData();
        this.chartWindow = new ChartWindow(this.element, this.lines);
    }

    parseData() {
        const { columns, names } = this.data;
        this.xAxis = columns.splice(0, 1)[0];
        this.xAxis.shift();

        this.lines = columns.map(column => {
            const [lineName] = column.splice(0, 1);
            const name = names[lineName];
            const points = column.map((y, index) => {
                return {
                    y,
                    x: this.xAxis[index]
                };
            });

            return { name, points };
        });
    }
};
