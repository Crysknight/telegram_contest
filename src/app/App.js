import Data from './Data';
import Chart from './Chart';

import { APP_CLASS_NAME } from 'constants';

import './app.scss';

export default class App {
    constructor(selector = '#app') {
        this.appElement = document.querySelector(selector);
        this.appElement.classList.add(APP_CLASS_NAME);
    }

    async run() {
        this.chartsData = await Data.get();
        this.initCharts();
    }

    initCharts() {
        this.charts = this.chartsData.map(data => {
            const chart = new Chart(data);
            chart.init();
            this.appElement.appendChild(chart.element);

            return chart;
        });
    }
};
