  import React, { Component } from "react";
  import { Link } from 'react-router-dom';
  import swal from 'sweetalert2';
  import Api from '../api/';
  import Dom from  './dom.js';


  class Signup extends Component {
    state = {
      username: "",
      password: "",
      e: {},
      errors: [
        'username',
        'password',
        'password2'
      ]
    };

    //sets user input to state
    setInput = (e) => {
      this.setState({
        [e.target.name]: [e.target.value]
      });
    }

    //validate name
    validateName = (e) => {
      this.setState({ 
        e: [e.target.name]
      });
      this.setInput(e);
      const eat = e;
      const { value } = e.target;

      if ( value.length >= 3 ) {
        this.removeErrors(e); 
         Dom.get(`#${e.target.name}`).textContent = "";


      }else {
        this.inputError(eat);
        Dom.get(`#${e.target.name}`)
          .textContent ="Field must be atleast 3 characters long"

      }
    }

    //
    checkUsername = e => {
      const { username } = this.state;
      e.persist();

      Api.checkUsernameExists(String(username))
        .then(data => data.json())
        .then(data => {
          if ( data.error === false ) {
            this.removeErrors(e);
            Dom.get(`#${e.target.name}`)
              .textContent = '';

          } else {
            this.inputError(e);
            Dom.get(`#${e.target.name}`)
              .textContent = data.message;
          }

        })
        .catch(err => {
          swal({
            type: 'error',
            title: 'Oops...',
            text: 'An error occurred'
          });
        });

    }

    //validates password
    validatePassword = (e) => {
      this.setInput(e);
      const { value } = e.target;
      if ( value.length > 6 ) {
        this.removeErrors(e);
        Dom.get(`#${e.target.name}`).textContent = ""
      }else {
        this.inputError(e);
        Dom.get(`#${e.target.name}`)
          .textContent ="Password Must Be Atleast 6 characters long"
      }

    }

    //check if passwords match
    checkPasswordsMatch = (e) => {
      this.setInput(e);
      const { password } = this.state;
      const { value } = e.target;
      if ( String(password) !== value ) {
        this.inputError(e);
        //error message
        Dom.get(`#${e.target.name}`)
          .textContent ="Passwords Do Not Match"
      }else {
        this.removeErrors(e);
        Dom.get(`#${e.target.name}`)
          .textContent =""
        //success icon
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

    //submit data
    submit = (e) => {
      e.preventDefault();
      const { username, password } = this.state;
      Api.signupForm(username,password)
        .then(data => data.json())
        .then(data => {
          //console.log(data);
          if (data.error === true) {
            return swal({
              type: 'error',
              title: 'Oops...',
              text: 'Your account could not be created... please try again later'
            });
          }
    
          swal({
              type: 'success',
              title: 'Congrat...',
              text: 'Your account was created successfully'
            });
          localStorage.setItem('token',data.token);
          localStorage.setItem('name',data.username)


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
      document.title = 'Password Manager | Signup';
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

                <div className="input-field">
                  <i className="material-icons prefix">person</i>
                  <input
                   name="username"
                   type="text"
                   autoComplete = "off"
                   onChange={this.validateName}
                   onBlur={this.checkUsername}
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

                <div className="input-field">
                  <i className="material-icons prefix">lock_outline</i>
                  <input
                   name="password2"
                   type="Password"
                   onChange={this.checkPasswordsMatch}
                   placeholder="Confirm Password"
                  />
                  <i className="material-icons prefix"></i>
                  <span className="error" id="password2"></span>
                </div>
                

                <input
                  type="submit"
                  id="submit"
                  value="Create Account"
                  className={button}
                />
              </form>
              <br /><br />
              <div className="left">
                  <i>Already Have an Acount?</i>
                    <Link to="/login">
                      <i> Login</i>   
                    </Link>
                </div>

             
              <br /><br /><br />
              
            </div>
          </div>
        </div>
        );
    }
  }

  export default Signup;