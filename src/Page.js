import React from 'react';
import './Page.css';
import MainPage from './Pages/mainPage'
import InfoPage from './Pages/infoPage'
import HelpPage from './Pages/helpPage'

class Page extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {page: "Main"};
      }
    
    changePage(newPage) {
        this.setState({page: newPage})
    }

    render() {
        return (
          <div className="page">
            <div className="navbar">
              <div className="content" id = "title" onClick={this.changePage.bind(this, "Main")}>
                <h1>Pathfinder Visualizer</h1>
              </div>
              <div className="content" id = "pages">
                <ul>
                  <li><span className = {this.state.page === "Main" ? "selected" : "unselected"} onClick={this.changePage.bind(this, "Main")}> Visualize </span></li>
                  <li><span className = {this.state.page === "Info" ? "selected" : "unselected"} onClick={this.changePage.bind(this, "Info")}> Info </span></li>
                  <li><span className = {this.state.page === "Help" ? "selected" : "unselected"} onClick={this.changePage.bind(this, "Help")}> Help </span></li>
                </ul>
              </div>
            </div>
            { this.state.page === "Main" && <MainPage/>}
            { this.state.page === "Info" && <InfoPage/>}
            { this.state.page === "Help" && <HelpPage/>}
          </div>
        );
    }
}








export default Page