(function() {
    let tmpl = document.createElement('template');
    const parseMetadata = metadata => {
    const { dimensions: dimensionsMap, mainStructureMembers: measuresMap } = metadata;
    const dimensions = [];
    for (const key in dimensionsMap) {
        const dimension = dimensionsMap[key];
        dimensions.push({ key, ...dimension });
    }
    const measures = [];
    for (const key in measuresMap) {
        const measure = measuresMap[key];
        measures.push({ key, ...measure });
    }
    return { dimensions, measures, dimensionsMap, measuresMap };
};
    tmpl.innerHTML = `
   <style>
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start; 
        }

        #chart {
            width: 100%;
            height: calc(100% - 100px); // Adjust the chart height to leave space for other elements
            flex-grow: 1;
        }

        .image-container {
            z-index: 2;
            width: 100%;
            height: 100px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }

        .bar {
            fill: steelblue; // Default bar color, can be customized or made dynamic
        }

        .bar:hover {
            fill-opacity: 0.7;
        }

        .label {
            font-size: 12px;
            font-family: 'Helvetica Neue', sans-serif;
            fill: #555; 
        }

        #tooltip {
            position: absolute;
            opacity: 0;
            pointer-events: none;
            background-color: #f8f8f8;
            border: 1px solid #ccc;
            padding: 10px;
            border-radius: 4px;
        }

        .follow-link {
            font-family: 'Helvetica Neue', sans-serif;
            color: #007aff; 
            text-decoration: none;
            font-size: 12px;
            margin-top: 10px;
            display: inline-block;
        }

        .follow-link:hover {
            text-decoration: underline;
        }
    </style>

    <div class="image-container"></div>    
    <div id="chart"></div>
    <div id="tooltip"></div>
    <a href="https://www.linkedin.com/company/planifyit" target="_blank" class="follow-link">Follow us on Linkedin - Planifyit</a>
`;

    class BarChartRaceWidget extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.appendChild(tmpl.content.cloneNode(true));

            this._props = {};
            this._data = [];
            this._ready = false;
            
            // Load D3.js
            this._loadD3();
        }

        async _loadD3() {
            if (typeof d3 === 'undefined') {
                await import('https://d3js.org/d3.v7.min.js').then(() => {
                    console.log('D3.js loaded successfully');
                    this._ready = true;
                    this._render();
                }).catch(err => console.error('Error loading D3.js:', err));
            } else {
                this._ready = true;
                this._render();
            }
        }

        set data(value) {
            this._data = value;
            this._render();
        }

        _render() {
            if (!this._ready || !this._data.length) return;

            // Clear existing content
            const chartContainer = this.shadowRoot.querySelector('#chart');
            chartContainer.innerHTML = '';

            const svg = d3.select(chartContainer).append('svg')
                .attr('width', '100%')
                .attr('height', '100%')
                .style('background-color', 'white');

            // Define bar chart race rendering logic here
            console.log('Data for rendering:', this._data);

            // Example: Draw bars
            svg.selectAll('.bar')
                .data(this._data)
                .enter().append('rect')
                .attr('class', 'bar')
                .attr('x', 0)
                .attr('y', (d, i) => i * 30)
                .attr('width', d => d.value)
                .attr('height', 20)
                .attr('fill', 'steelblue');

            // Implement dynamic update and animation logic
        }

        // Implement methods to dynamically update properties and respond to data changes
    }

    customElements.define('bar-chart-race-widget', BarChartRaceWidget);
})();
