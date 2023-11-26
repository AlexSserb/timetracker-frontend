import React, { Component } from "react";
import moment from 'moment';
import { Form, FormGroup, Label, Button } from "reactstrap";
import Select from "react-select";

import userService from "../../services/user.service";
import projectService from "../../services/project.service";
import chartStatUser from "./chart-stat-user.component"

// Statistic of one user for several projects
class StatisticsUser extends Component {
  dayFormat = "YYYY-MM-DD";

  constructor(props) {
    super(props);
    let date = moment();
    date.set("date", 1);
    date.add(-3, "month");

    this.state = {
      dateWeekStart: date,
      selectedProjects: [],
      allProjectsList: [],
			selectedUser: 0,
			allUsersList: []
    };

    this.setProjectList();
		this.setUsersList();
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  // Submit an item
  handleSubmit = () => {
    // TODO
  };
  
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
    projectService.getAllProjects()
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
          <Form className="col-md-3 col-sm-10 mx-auto p-0">
						<Button className="mx-2">На 4 недели назад</Button>
						<Button>На 4 недели вперед</Button>
						<FormGroup>
							<Label for="curProject">Проекты</Label>
							<Select 
								onChange={this.onChangeProject}
								value={this.selectedProjects}
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
          </Form>
          <div className="col-md-6 mx-auto p-0">
            <div className="card p-2">
							<chartStatUser/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default StatisticsUser;