import Chart from 'chart.js';
import React, { useEffect } from 'react';

const RiskGraph = () => {
    useEffect(() => {
        const ctx = document.getElementById("myChart") as HTMLCanvasElement;
        new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [
                    {
                        label: "# of Votes",
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            "Red",
                            "Blue",
                            "Yellow",
                            "Green",
                            "Purple",
                            "Orange"
                        ],
                        borderColor: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                        borderWidth: 1
                    }
                ]
            }
        });
    });
    return <canvas id="myChart" width="400" height="400"></canvas>
}

export default RiskGraph;
