import React, { Component } from "react";
import moment from 'moment';
import { Form, FormGroup, Label, Button, Table } from "reactstrap";
import Select from "react-select";

import userService from "../../services/user.service";
import projectService from "../../services/project.service";
import { Bar } from "react-chartjs-2"; 
import {CategoryScale} from 'chart.js'; 
import Chart from "chart.js/auto";
Chart.register(CategoryScale);

// Statistic of one user for several projects
class StatisticsUser extends Component {
  dayFormat = "YYYY-MM-DD";

  constructor(props) {
    super(props);
    let date = moment();
    date.add(-84, "day");

    this.state = {
      dateStatStart: date,
      selectedProjects: [],
      allProjectsList: [],
			selectedUser: 0,
			allUsersList: [],
      data: [],
      chartData: { labels: [], datasets: [] }
    };

    this.setProjectList();
		this.setUsersList();
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  goBackFourWeeks = () => {
    this.addDaysToStartStatDate(-28);
  }

  goForwardFourWeeks = () => {
    this.addDaysToStartStatDate(28);
  }

  addDaysToStartStatDate = (days) => {
    let date = this.state.dateStatStart;
    date.add(days, "day");
    this.setState({ dateStatStart: date });
    this.setStatData();
  }

  // Submit an item
  handleSubmit = () => {
    this.setStatData();
  };

  setStatData = () => {
    let projectIDs = [];
    for (let i = 0; i < this.state.selectedProjects.length; i++) {
      projectIDs.push(this.state.selectedProjects[i].value);
    }

    projectService.getStatOneUserByWeeks(this.state.dateStatStart, projectIDs, this.state.selectedUser)
      .then(res => {
        this.state.data = res.data.workWeeks;
        this.calcChartData();
      })
      .catch(err => console.log(err));
  }

  calcChartData = () => {
    let amountDatasets = this.state.data.length / 12;

		let chartLabels = [];
		for (let i = 0; i < this.state.data.length; i += amountDatasets) {
			chartLabels.push(this.state.data[i].weekDate.substring(0, 10));
		}

		let chartDatasets = [];
		for (let numDS = 0; numDS < amountDatasets; numDS++) {
			let chartData = [];
			for (let i = numDS; i < this.state.data.length; i += amountDatasets) {
				chartData.push(this.state.data[i].workTime);
			}

			chartDatasets.push({
				data: chartData,
				label: this.state.data[numDS].projectName
			})
		}

    this.setState({ chartData: {
      labels: chartLabels,
      datasets: chartDatasets
    }});
  }

  renderDataTable = () => {
    if (this.state.chartData.labels && this.state.chartData.labels.length > 0) {
      return (
        <Table bordered> 
          <thead> 
            <tr>
              <th>Проект</th>
              {
                this.state.chartData.labels.map((label) => (
                  <th>{label}</th>
                ))
              }
            </tr> 
           </thead> 
          <tbody> 
            {this.renderItems()}
          </tbody> 
        </Table>
      );
    }
    return (<div></div>)
  }

  renderItems = () => {
    return this.state.chartData.datasets.map((dataset) => (
      <tr> 
        <td>{dataset.label}</td>
        {
          dataset.data.map((data) => {
            if (data === null || data === undefined) {
              return (<td>0</td>)
            }
            return (<td>{data}</td>);
          })
        }
      </tr>
    ));
  }
  
  handleChangeDate = e => {
    this.setState({[e.target.name]: moment(e.target.value).format(this.dayFormat)})
  }

	getValueUser = () => {
    let userId = this.state.selectedUser;
    return userId ? this.state.allUsersList.find(u => u.value === userId) 
      : this.state.allUsersList[0];
  }

  // Set list of all projects
  setProjectList = () => {
    projectService.getAllActiveProjects()
      .then(res => {
        let projects = res.data.map(proj => { return { value: proj.id, label: proj.name }});
        this.setState({ allProjectsList: projects });
      })
      .catch(err => console.log(err));
  };

	// Set list of all users
	setUsersList = () => {
    userService.getAllUsers()
      .then(res => {
        let users = res.data.map(user => { return { value: user.id, label: user.name }});
        this.setState({ allUsersList: users });
        if (users.length > 0) {
          this.setState({ selectedUser: users[0].value });
        }
      })
      .catch(err => console.log(err));
  };

  onChangeProject = (projects) => {
		this.setState({ selectedProjects: projects });
  }

	onChangeUser = (user) => {
		this.setState({ selectedUser: user.value });
	}
 
  render() {
    return (
      <div>
        <h3 className="text-success text-uppercase text-center my-4">
          Статистика пользователя
        </h3>
        <div className="row">
          <Form className="col-md-3 col-sm-10 mx-5 p-0">
						<FormGroup>
							<Label for="curProject">Проекты</Label>
							<Select 
								onChange={this.onChangeProject}
								value={this.state.selectedProjects}
								options={this.state.allProjectsList}
								isSearchable={true}
								isMulti
							/>
							<Label for="curUser">Работник</Label>
							<Select 
								onChange={this.onChangeUser}
								value={this.getValueUser()}
								options={this.state.allUsersList}
								isSearchable={true}
							/>
            </FormGroup>
						<Button color="success" onClick={this.handleSubmit}>
            	Показать статистику о сотрудникe
          	</Button>
            <Button className="m-2" onClick={this.goBackFourWeeks}>На 4 недели назад</Button>
						<Button onClick={this.goForwardFourWeeks}>На 4 недели вперед</Button>
          </Form>
          <div className="col-md-7 mx-5 p-0">
            <div className="card p-2">
							<Bar data={this.state.chartData}/>
            </div>
          </div>
        </div>
        <div className="row m-5" >
          {this.renderDataTable()}
        </div>
      </div>
    );
  }
}
export default StatisticsUser;