import React, { Component } from 'react';
import Api from '../api/';
import '../assets/spinner.svg';

class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      details: []
    },
  }

  render = () => {
    const { loading, details } = this.state;

    <div className="container" style={{paddingLeft: '10%', paddingTop: '5%' }}>
        <div className="row">
          <div className="content col s9 m5 l6 center lighten-3">
            <div className="header">

            </div>
            {
              if (loading === true) {
                <div>
                  <p>loading</p>
                </div>
              }else if (loading == false && details.length < 1) {
                <div>
                  <p>You have No Login Detail Avaliable click The bellow Button To create one </p>
                  <button
                   onClick="{}"
                   > 
                   + 
                   <button>
                </div>
              }else if (loading === false && details.length > 1 ) {
                
              }
          }
          </div>
        </div>
      </div>
  }
}