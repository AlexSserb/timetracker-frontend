import React, { Component } from "react";
import axios from 'axios'; 
import moment from 'moment';
import { Input, Form, FormGroup, Label, Button } from "reactstrap";

// List of projects editor
class Statistics extends Component {
  dayFormat = "YYYY-MM-DD";

  constructor(props) {
    super(props);
    this.state = {
      dateStart: moment().format(this.dayFormat),
      dateEnd: moment().format(this.dayFormat),
      usersList: [
				{
					user: {
						id: "1",
						name: "Сербин Александр Алексеевич",
						job: {
							id: "1",
							name: "TeamLead"
						},
					},
					projects: [
						{
							id: "1",
							name: "Проект 1",
							workTime: 24
						},
						{
							id: "2",
							name: "Проект 2",
							workTime: 47
						}
					]
				}
			]
    };
  }
 
  renderItems = () => {
    return this.state.usersList.map((userData) => (
      <li
        key={ userData.user.id }
        className="list-group-item d-flex justify-content-between"
      >
        <span className="mt-2">{ userData.user.name }</span>
				<span className="mt-2">{ userData.user.job.name }</span>
				<div>
          <div className="card">
            <ul className="list-group list-group-flush">
							{
								userData.projects.map((project) => (
									<li
										key={ project.id }
										className="list-group-item d-flex justify-content-between align-items-center"
									>
										<span>{ project.name }</span>
										<span>{ project.workTime } ч.</span>
									</li>
								))
							}
						</ul>
          </div>
        </div>
      </li>
    ));
  };
 
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
 
  // Submit an item
  handleSubmit = (item) => {
    axios
      .get(`http://127.0.0.1:8080/dictionary/project`)
      .then(res => this.setState({ usersList: res.data }))
      .catch(err => console.log(err));
  };
  
  handleChangeDate = e => {
    this.setState({[e.target.name]: moment(e.target.value).format(this.dayFormat)})
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
            </FormGroup>
						<Button color="success" onClick={this.handleSubmit}>
            	Показать статистику о сотрудниках
          	</Button>
          </Form>
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-2">
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Statistics;