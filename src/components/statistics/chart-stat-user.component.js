import React, { Component } from 'react';
import Chart from 'chart.js/auto';

class ChartStatUser extends Component {

	chartRef = React.createRef();

	componentDidMount() {
		const ctx = this.chartRef.current.getContext("2d");
		
		new Chart(ctx, {
			type: "bar",
			data: {
				labels: ["30.10.2023", "6.11.2023", "13.11.2023", "20.11.2023", "27.11.2023", "4.12.2023", "11.12.2023",
						 "18.12.2023", "25.12.2023", "02.01.2024", "09.01.2024", "16.01.2024"],
				datasets: [{ 
					data: [86,114,106,106,107,111,133],
					label: "Проект 1",
					borderColor: "#3e95cd",
					backgroundColor: "#7bb6dd",
					fill: false,
				}, { 
					data: [70,90,44,60,83,90,100],
					label: "Проект 2",
					borderColor: "#3cba9f",
					backgroundColor: "#71d1bd",
					fill: false,
				}, { 
					data: [10,21,60,44,17,21,17],
					label: "Проект 3",
					borderColor: "#ffa500",
					backgroundColor:"#ffc04d",
					fill: false,
				}, { 
					data: [6,3,2,2,7,0,16],
					label: "Проект 4",
					borderColor: "#c45850",
					backgroundColor:"#d78f89",
					fill: false,
				}
				]
			},
		});
	}
	render() {
		return (
			<div>
				<canvas
				id="myChart"
				ref={this.chartRef}
				/>
			</div>
			)
	}
}

export default ChartStatUser;