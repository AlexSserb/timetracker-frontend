import React, { Component } from "react";
import moment from 'moment';
import { Input, Form, FormGroup, Label, Button, Table } from "reactstrap";
import Select from "react-select";
import projectService from "../../services/ProjectService";
import statisticsService from "../../services/StatisticsService";

// Statistics of all users for one/all projects
class StatisticsAllUsers extends Component {
  dayFormat = "YYYY-MM-DD";

  constructor(props) {
    super(props);

    this.state = {
      dateStart: moment().format(this.dayFormat),
      dateEnd: moment().format(this.dayFormat),
      curProject: 0,
      usersList: [],
      allProjectsList: []
    };

    this.setProjectList();
  }

  renderUsersWithProjectList = () => {
    return this.state.usersList.map((userData) => (
      <tr> 
        <td>{userData.user.name}</td>
				<td>{userData.user.job.name}</td>
        <td>
          {
            userData.projectTimeList &&  userData.projectTimeList.length > 0 ?
            (
              <div className="card">
              <ul className="list-group list-group-flush">
                {
                  userData.projectTimeList.map((project) => (
                    <li
                      key={ project.projectName }
                      className="list-group-item d-flex justify-content-between align-items-center"
                      >
                      <span className="mx-4">{ project.projectName }</span>
                      <span className="mx-4">{ project.time } h.</span>
                    </li>
                  ))
                }
              </ul>
            </div>
            )
            : <div>There are no linked projects</div>
          }
        </td>
      </tr>
    ));
  };

  renderUsersWithOneProject = () => {
    return this.state.usersList.map((userData) => (
      <tr> 
        <td>{userData.user.name}</td>
				<td>{userData.user.job.name}</td>
				<td>{userData.projectTimeList[0].time}</td>
      </tr>
    ));
  };
 
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
 
  // Submit an item
  handleSubmit = () => {
    statisticsService.getStatAllUsers(this.state.dateStart, this.state.dateEnd, this.state.curProject)
      .then(res => this.setState({ usersList: res.data }))
      .catch(err => this.setState({ usersList: [] }));
  };
  
  handleChangeDate = e => {
    this.setState({[e.target.name]: moment(e.target.value).format(this.dayFormat)})
  }

  getValue = () => {
    let projId = this.state.curProject;
    return projId ? this.state.allProjectsList.find(p => p.value === projId) 
      : this.state.allProjectsList[0];
  }

  // Set list of all projects
  setProjectList = () => {
    projectService.getAllActiveProjects()
      .then(res => {
        let projects = res.data.map(proj => { return { value: proj.id, label: proj.name }});
        projects.unshift({ value: 0, label: "All projects" });
        this.setState({ allProjectsList: projects });
      })
      .catch(err => console.log(err));
  };

  onChange = (newValue) => {
    this.setState({ curProject: newValue.value });
  }

  createTable = () => {
    return (
      <Table className="mt-4"> 
        <thead> 
          <tr> 
            <th>Name</th> 
            <th>Position at work</th>
            {
              this.state.curProject === 0 ?
              <th>Projects and hours worked</th>
              : <th>Hours worked</th>
            }
          </tr> 
        </thead> 
        <tbody> 
          { 
            this.state.curProject === 0 ? 
            this.renderUsersWithProjectList()
            : this.renderUsersWithOneProject()
          }
        </tbody> 
      </Table> 
    )
  }
 
  render() {
    return (
      <div>
        <h3 className="text-success text-uppercase text-center my-4">
          Statistics of all users
        </h3>
        <div className="row">
          <Form className="col-md-3 col-sm-10 mx-auto p-0">
						<FormGroup>
              <Label for="dateStart">Period</Label>
              <Input
                type="date"
                name="dateStart"
                value={this.state.dateStart}
                onChange={this.handleChangeDate}
              />
							<Input
                type="date"
                name="dateEnd"
                value={this.state.dateEnd}
                onChange={this.handleChangeDate}
              />
              <Label for="curProject">Project</Label>
              <Select 
                onChange={this.onChange}
                value={this.getValue()}
                options={this.state.allProjectsList}
                isSearchable={true}
              />
            </FormGroup>
						<Button color="success" onClick={this.handleSubmit}>
              Show statistics about employees
          	</Button>
          </Form>
          <div className="col-md-6 mx-auto p-0">
            <div className="card p-2">
              <ul className="list-group list-group-flush">
                { 
                  this.state.usersList.length > 0 ? 
                  this.createTable()
                  : <div>There are no timesheets for this period</div>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default StatisticsAllUsers;