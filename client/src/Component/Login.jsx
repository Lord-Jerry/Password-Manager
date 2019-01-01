import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert2';
import Api from '../api/';
import Dom from  './dom.js';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errors: [
        'username',
        'password'

      ] 
    };
  }

  //sets input to state
  setInput = e => {
    this.setState({
      [e.target.name]: [e.target.value]
    });
  }

  //validate name
  validateName = e => {
    const { value } = e.target;
    this.setInput(e);

    if (value.length > 3 ) {
      this.removeErrors(e);
      Dom.get(`#${e.target.name}`).textContent = "";
    } else {
      this.inputError(e);
      Dom.get(`#${e.target.name}`)
        .textContent = "Field must be atleast 3 characters long";
    }

  }

  //validate Password
  validatePassword = e => {
    const { value } = e.target;
    this.setInput(e);

    if ( value.length > 6 ) {
      this.removeErrors(e);
      Dom.get(`#${e.target.name}`).textContent = "";
    } else {
      this.inputError(e);
      Dom.get(`#${e.target.name}`)
        .textContent = "Password Must Be Atleast 6 characters long";
    }

  }

  //
  inputError = e => {
    const { errors } = this.state;
    const index = errors.indexOf(e.target.name);

    if (index === -1) {
      errors.push(e.target.name);
    }

    this.setState({ errors });
  };

  //
  removeErrors = e => {
    const { errors } = this.state;
    const index = errors.indexOf(e.target.name);

    if (index !== -1) {
      errors.splice(index, 1);
    }

    this.setState({ errors });
  };

  submit = (e) => {
    const { username, password } = this.state;
    e.preventDefault();
    Dom.get(`.errors`).textContent='';

    Api.loginForm(username,password)
      .then(data => data.json())
      .then(data => {

        if ( data.error === true) {
          Dom.get(`.errors`)
           .textContent= data.message;
           return;
        }

        localStorage.setItem('token',data.token);
        localStorage.setItem('name',data.username);
        return (
          <Redirect
            to='/' />
        );
      })
      .catch(err => {
        swal({
            type: 'error',
            title: 'Oops...',
            text: 'An error occurred'
          });
      });
  }


  componentDidMount = () => {
    document.title = 'Password Manager | Login';
  }

  render = () => {
    const button =
      this.state.errors.length === 0
        ? "btn btn-submit btn-medium effect waves-effect gold right"
        : "disabled btn-submit btn btn-medium right";
    return(
      <div className="container" style={{paddingLeft: '10%', paddingTop: '5%' }}>
        <div className="row">
          <div className="content col s9 m5 l6 center lighten-3">
            <div className="header">

            </div>
            <form className="container" onSubmit={this.submit}>
              <span className="errors"></span>

              <div className="input-field">
                <i className="material-icons prefix">person</i>
                <input
                 name="username"
                 type="text"
                 autoComplete = "off"
                 onChange={this.validateName}
                 placeholder="Username"
                />
                <i className="material-icons prefix"></i>
                <span className="error" id="username"></span>
              </div>

              <div className="input-field">
                <i className="material-icons prefix">lock_outline</i>
                <input
                 name="password"
                 type="Password"
                 onChange={this.validatePassword}
                 placeholder="Password"
                />
                <i className="material-icons prefix"></i>
                <span className="error" id="password"></span>
              </div>

              <input
                type="submit"
                id="submit"
                value="Login"
                className={button}
              />
              <br /><br /><br />
            </form>
            <div className="left">
              <Link to="/reset">
                <i>Forgot Password?</i>   
              </Link>
            </div>
            <br /><br />
          </div>
        </div>
      </div>
    );
  }
}
export default Login