import Data from './Data';
import Chart from './Chart';

export default class App {
    constructor(selector = '#app') {
        this.appElement = document.querySelector(selector);
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
