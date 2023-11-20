import React, { Component } from "react";
import axios from 'axios'; 
import moment from 'moment';
import { Input, Form, FormGroup, Label, Button } from "reactstrap";
import Select from "react-select";


// List of projects editor
class Statistics extends Component {
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
      <li
        key={ userData.user.id }
        className="list-group-item d-flex justify-content-between"
      >
        <span className="mt-2">{ userData.user.name }</span>
				<span className="mt-2">{ userData.user.job.name }</span>
        <div className="card">
          <ul className="list-group list-group-flush">
				    {
			  		  userData.projectTimeList.map((project) => (
						    <li
						  		key={ project.projectName }
						  	  className="list-group-item d-flex justify-content-between align-items-center"
						  	  >
					  			<span className="mx-4">{ project.projectName }</span>
								  <span className="mx-4">{ project.time } ч.</span>
	  					  </li>
		  			  ))
					  }
		  	  </ul>
        </div>
      </li>
    ));
  };

  renderUsersWithOneProject = () => {
    return this.state.usersList.map((userData) => (
      <li
        key={ userData.user.id }
        className="list-group-item d-flex justify-content-between"
      >
        <span className="mt-1">{ userData.user.name }</span>
			  <span className="mt-1">{ userData.user.job.name }</span>
        <span className="mt-1">{ userData.projectTimeList[0].projectName }</span>
			  <span className="mt-1">{ userData.projectTimeList[0].time } ч.</span>
      </li>
    ));
  };
 
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
 
  // Submit an item
  handleSubmit = () => {
    axios
      .get(`http://127.0.0.1:8080/statistic/${this.state.dateStart}/${this.state.dateEnd}` + 
        (this.state.curProject !== 0 ? `/${this.state.curProject}` : ''))
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
    axios
      .get(`http://127.0.0.1:8080/dictionary/project`)
      .then(res => {
        let projects = res.data.map(proj => { return { value: proj.id, label: proj.name }});
        projects.unshift({ value: 0, label: "Все проекты" });
        this.setState({ allProjectsList: projects });
      })
      .catch(err => console.log(err));
  };

  onChange = (newValue) => {
    this.setState({ curProject: newValue.value });
  }
 
  render() {
    return (
      <div>
        <h3 className="text-success text-uppercase text-center my-4">
          Статистика
        </h3>
        <div className="row">
          <Form className="col-md-3 col-sm-10 mx-auto p-0">
						<FormGroup>
              <Label for="dateStart">Период</Label>
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
              <Label for="curProject">Проект</Label>
              <Select 
                onChange={this.onChange}
                value={this.getValue()}
                options={this.state.allProjectsList}
              />
            </FormGroup>
						<Button color="success" onClick={this.handleSubmit}>
            	Показать статистику о сотрудниках
          	</Button>
          </Form>
          <div className="col-md-6 mx-auto p-0">
            <div className="card p-2">
              <ul className="list-group list-group-flush">
                { 
                  this.state.usersList.length > 0 ? 
                  ( 
                    this.state.curProject === 0 ?
                    this.renderUsersWithProjectList()
                    : this.renderUsersWithOneProject()
                  )
                  : <div>Нет таймшитов за данный период</div>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Statistics;