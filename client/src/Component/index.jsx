import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import swal from 'sweetalert2';
import Api from '../api/';
//import Dom from  './dom.js';

class Detail extends Component {
  state = {
    loading: true,
    details: '',
    redirect: false
  }

  getDetails = () => {
    let { redirect } = this.state;
    Api.getDetails()
     .then(data => data.json())
     .then(data => {
      console.log(data)
       if (data.error === true  && data.message.toLowerCase() == 'invalid token') {

        if(localStorage.getItem('username') !== null) {
          //request password through swal prompt and send login 
          //return 23;
        } else {
          redirect = true;
          
        }

       }

       this.setState({
         details: data.message,
         loading: false,
         redirect
       });

     })
     .catch(err => {
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'An error occurred'
        });
     })

  }
  componentDidMount = () => {
    this.getDetails();
  }

  render = () => {
    const { details,loading,redirect } = this.state;

    if(redirect === true) {
      return(
        <Redirect to="/signup" />
        );
    }

    if(typeof(details) === 'object' && details.length > 0) {
      console.log(details) 
    }else {
      return(
        <div>
          {(loading===true) ? 'loading' : details}
              
        </div>
      );
    }
  }

}

export default Detail; 