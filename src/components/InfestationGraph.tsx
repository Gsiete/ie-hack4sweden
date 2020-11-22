import Chart from 'chart.js';
import React, { useEffect } from 'react';


const InfestationGraph = () => {
    useEffect(() => {
        const ctx = document.getElementById("infestationGraph") as HTMLCanvasElement;
        new Chart(ctx, {
            type: "line",
            data: {
                labels: ['Jan 20', 'Feb 20', 'Mar 20', 'Ap 20', 'May 20', 'Jun 20', 'Jul 20', 'Aug 20', 'Sep 20', 'Oct 20'],
                datasets: [{
                    label: 'Infestation Index',
                    data: [20, 21, 23, 24, 25, 25, 23, 12, 32, 21],
                    fill: true,
                    pointBackgroundColor: '#410101',
                    borderColor: '#410101',
                    backgroundColor: '#a75c3c',
                    pointStyle: 'rect',
                    lineTension: 0.3
                }],


            },

        });
    });
    return <canvas id="infestationGraph" className="graph"></canvas>
}

export default InfestationGraph;
