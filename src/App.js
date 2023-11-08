import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
// import{ BrowserRouter ,Routes ,Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  pageSize = 5;
  // apiKey=process.env.NEWS_API

  state = {
    progress : 0
  }

  setProgress = (progress)=>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>

        <Navbar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
        />
        <News  setProgress= {this.setProgress} key="general" pageSize={5} country='in' category="general"/>
      
      </div>
    )
  }
}
