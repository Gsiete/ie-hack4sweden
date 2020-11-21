import Chart from 'chart.js';
import React, { useEffect } from 'react';

interface Props {
    extremlyHighRisk: number;
    highRisk: number;
    mediumRisk: number;
    smallRisk: number;
    extremlySmallRisk: number;
}


const RiskGraph = (props: Props) => {
    const data = [props.extremlyHighRisk, props.highRisk, props.mediumRisk, props.smallRisk, props.extremlySmallRisk];
    useEffect(() => {
        const ctx = document.getElementById("myRiskGraph") as HTMLCanvasElement;
        new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["Extremly High", "High", "Medium", "Small", "Extremly Small"],
                datasets: [
                    {
                        data: data,
                        backgroundColor: [
                            "#410101",
                            "#6a1b0c",
                            "#a75c3c",
                            "#d8aa78",
                            "#faf7c4"
                        ],
                    }
                ]
            }
        });
    });
    return <canvas id="myRiskGraph" className="graph"></canvas>
}

export default RiskGraph;
