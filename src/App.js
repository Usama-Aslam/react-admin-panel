import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
        fname:'',
        lname:'',
        email:'',
        salary:'',
      btnCondition: false,
      editState: false,
      currentIndex:null,
      btnName: 'add',
      user: false,
      adminEmail: 'admin@gmail.com',
      adminPass: 12345,
      addForm: false,
      list: { fname: 'First Name', lname: 'Last Name', email: 'Email', salary: 'Salary', jobDate: 'Job Date' },
      employeeDetail: [
        {
          dates:"Sun Sep 02 2018 17:19:09 GMT+0500 (Pakistan Standard Time)",
          email:"abc@gmail.com",
          fname:"usama",
          lname:"aslam",
          salary:"1500"
        },
        {
          dates:"Sun Sep 02 2018 17:20:09 GMT+0500 (Pakistan Standard Time)",
          email:"cde@gmail.com",
          fname:"kashan",
          lname:"yousuf",
          salary:"2500"
        }
      ]
    }
  }

  login(form) {
    console.log(form[0].elements["email"].value)
    console.log(form[0].elements["password"].value)

    const userEmail = form[0].elements['email'].value;
    const userPassword = form[0].elements['password'].value;
    const { adminEmail, adminPass } = this.state;
    if (userEmail.match(adminEmail) && userPassword.match(adminPass)) {
      this.setState({
        user: true
      })
      return console.log("Successful Login")
    }
    else {
      console.log("Do not Match")
    }
  }

  addEmployeeDetail(forms) {
    const lname = forms[0].elements['lname'].value;
    const fname = forms[0].elements['fname'].value;
    const email = forms[0].elements['email'].value;
    const salary = forms[0].elements['salary'].value;
    const dates = new Date().toString();

    const { employeeDetail } = this.state;

    const obj = { fname, lname, email, salary, dates }

    employeeDetail.push(obj)

    console.log(employeeDetail)

    this.setState({
      employeeDetail,
      fname:'',
      lname:'',
      email:'',
      salary:'',
    })
  }

  update(forms) {
    const { employeeDetail,currentIndex } = this.state;

    const fname=forms[0].elements['fname'].value
    const lname=forms[0].elements['lname'].value
    const email=forms[0].elements['email'].value
    const salary=forms[0].elements['salary'].value
     
    const dates=employeeDetail[currentIndex].dates;

    const obj={fname,lname,email,salary,dates};

    employeeDetail[currentIndex]=obj;

    this.setState({
      employeeDetail,
      editState:!this.state.editState
    })
  }

  delete(index) {
    const {employeeDetail,currentIndex}=this.state;
    employeeDetail.splice(index,1)
    this.setState({
      employeeDetail,
      currentIndex:null
    })

  }

  editText(e){
    const {employeeDetail,currentIndex}=this.state;
    const name=e.target.name;
    const value=e.target.value;
    if(name.match('fname'))
    { employeeDetail[currentIndex].fname=value;
      this.setState({
        employeeDetail
      })
    }
    else if(name.match('lname'))
    { employeeDetail[currentIndex].lname=value;
      this.setState({
        employeeDetail
      })
    }
    else if(name.match('email'))
    { employeeDetail[currentIndex].email=value;
      this.setState({
        employeeDetail
      })
    }
    else if(name.match('salary'))
    { employeeDetail[currentIndex].salary=value;
      this.setState({
        employeeDetail
      })
    }
  }

  updateTexts(e){
    console.log(e.target.name)
    const name=e.target.name;
    const value=e.target.value;
    if(name.match('fname'))
      this.setState({
        fname:value
      })
    else if(name.match('lname'))
    this.setState({
      lname:value
    })
    else if(name.match('email'))
    this.setState({
      email:value
    })
    else if(name.match('salary'))
    this.setState({
      salary:value
    })
  }

  cancel(){
    this.setState({
      editState:!this.state.editState
    })
  }

  renderEditForm() {
    const {currentIndex,employeeDetail}=this.state;
    const values=employeeDetail[currentIndex]
    return <div>
      <form className="editForm">
        Name:<input type="text" placeholder="Enter Name" onChange={this.editText.bind(this)} name="fname" value={values.fname}/>
        F.Name:<input type="text" placeholder="Enter Last Name" onChange={this.editText.bind(this)} name="lname" value={values.lname}/>
        Email:<input type="email" placeholder="Enter Email"onChange={this.editText.bind(this)} name="email" value={values.email}/>
        Salary:<input type="number" placeholder="Enter Salary" onChange={this.editText.bind(this)} name="salary" value={values.salary}/>
      </form>
      <button className="updateBtn" onClick={this.update.bind(this, document.forms)}>Update</button>
      <button className="cancelBtn" onClick={this.cancel.bind(this, document.forms)}>Cancel</button>
    </div>
  }

  renderLoginForm() {
    return <div className="loginDiv">
      <h1>Sign In</h1>
      <form>
        <input type="email" placeholder="email" id="userEmail" name="email" />
        <br />
        <br />
        <input type="password" placeholder="password" id="userPass" name="password" />
      </form>
      <br />
      <br />
      <button onClick={this.login.bind(this, document.forms)}>Submit</button>
    </div>
  }

  renderEmployData() {
    const { list, employeeDetail } = this.state;
    return <div>
      <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
                <th scope="col">{list.fname}</th>
                <th scope="col">{list.lname}</th>
                <th scope="col">{list.email}</th>
                <th scope="col">{list.salary}</th>
                <th scope="col">{list.jobDate}</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
           
              {employeeDetail.map((value,index)=>{
                return ( <tr key={index}>
                <td>{value.fname}</td>
                <td>{value.lname}</td>
                <td>{value.email}</td>
                <td>{value.salary}</td>
                <td>{value.dates}</td>
                <td><button onClick={()=>{
                      this.setState({
                        editState:true,
                        currentIndex:index
                    })
                  }}>Edit</button></td>

                <td><button onClick={this.delete.bind(this, index)}>Delete</button></td>
                </tr>)
              })}
          </tbody>
      </table>
    </div>
  }

  renderAddEmployeeDetailForm() {

    return <div>
      <h1>EMPLOYEE DETAIL FORM</h1>
      <form className="employeeForm">
        <input type="text" placeholder="Enter Name" name="fname" onChange={this.updateTexts.bind(this)} value={this.state.fname}/>
        <input type="text" placeholder="Enter Last Name" name="lname" onChange={this.updateTexts.bind(this)} value={this.state.lname}/>
        <input type="email" placeholder="Enter Email" name="email" onChange={this.updateTexts.bind(this)} value={this.state.email}/>
        <input type="number" placeholder="Enter Salary" name="salary" onChange={this.updateTexts.bind(this)} value={this.state.salary}/>
      </form>
      <button className="submitBtn" onClick={this.addEmployeeDetail.bind(this, document.forms)}>Submit</button>
    </div>
  }

  renderAddButton() {
    return <button className="addBtn" onClick={() => {
      const { btnName } = this.state;

      if (btnName == "Show Table") {
        console.log('table showing')
      }
      this.setState({
        addForm: !this.state.addForm,
        btnName: !this.state.btnCondition ? 'back' : 'add',
        btnCondition: !this.state.btnCondition
      })
    }}>{this.state.btnName}</button>
  }

  renderBody() {
    const { user, addForm, editState } = this.state;
    return <div className="App-intro">
      {!user && this.renderLoginForm()}
      {user && !addForm && editState && this.renderEmployData() && this.renderEditForm()}
      {user && !addForm && this.renderEmployData()}
      {user && addForm && this.renderAddEmployeeDetailForm()}
    </div>
  }

  render() {
    const { user, addForm } = this.state;
    return (
      <div className="App">
        {this.renderBody()}
        {user && this.renderAddButton()}
      </div>
    );
  }
}

export default App;
