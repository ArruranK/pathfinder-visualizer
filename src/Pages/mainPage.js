import React from 'react';
import './mainPage.css';

class MainPage extends React.Component{
    
  constructor(props) {
      super(props);
      this.gridheight = 14;
      this.dx = [0,1,0,-1]; // direction matrix 
      this.dy = [-1,0,1,0];
      this.state = {playing: false, algorithm: "Dijkstra", tile: "Start", playError: false, startPlaced: [false,0,0], endPlaced: [false,0,0], gridlength: parseInt(window.innerWidth/35), grid: this.updateGrid([],parseInt(window.innerWidth/35),this.gridheight)};
      this.updateWidth = this.updateWidth.bind(this);
    }
  componentDidMount() {
    window.addEventListener("resize", this.updateWidth); // event listener to check if window is resized
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }
  updateGrid(prevGrid, gridlength, gridheight) { // function to update the grid
    if (prevGrid.length === 0) { // runs if the grid has not been created yet
      for (let i=0; i<gridheight; i++) {
        prevGrid.push([]);
      }
    }
    while (prevGrid[prevGrid.length-1].length !== gridlength) { // runs while the length of the grid and the value of the state "gridlength" are not the same 
      if (prevGrid[prevGrid.length-1].length < gridlength) { // lengthens the width of the grid
        for (let i=0; i<gridheight; i++) {
          prevGrid[i].push("Empty");
        }   
      } else { // shortens the length of the grid and changes the states, "startplaced" and "endplaced", if the start or end tiles are removed 
        for (let i=0; i<gridheight; i++) {
          if (prevGrid[i][prevGrid[i].length-1] === "Start") {
            this.setState({startPlaced: [false,0,0]});
          }
          if (prevGrid[i][prevGrid[i].length-1] === "End") {
            this.setState({endPlaced: [false,0,0]});
          }
          prevGrid[i].splice(-1,1)
        }
      }
    }
    return prevGrid;
  }

  updateWidth() { // updates the width of the grid if the window is resized
    if (this.state.playing === false) {
      this.setState({gridlength: parseInt(window.innerWidth/35)});
      let gridlength = this.state.gridlength;
      let prevGrid = this.state.grid;
      this.setState({grid: this.updateGrid(prevGrid,gridlength,this.gridheight)});
    }
  }
  changeAlgorithm(algorithm) { // updates algorithm state
    this.setState({algorithm: algorithm})
  }
  changeTile(tile) { // updates the tile state
    this.setState({tile: tile})
  }
  updateCell(row, column) { // changes the value of a tile within the grid if the tile is pressed
    let tile = this.state.tile;
    let grid = this.state.grid;
    if (this.state.startPlaced[0] === true) { // these checks make sure that the startplaced and endplaced states are updated if the start or end tiles are placed, moved, or removed
      if(this.state.startPlaced[1] === row && this.state.startPlaced[2] === column) {
        this.setState({startPlaced: [false,0,0]});
      }
    }
    if (this.state.endPlaced[0] === true) {
      if(this.state.endPlaced[1] === row && this.state.endPlaced[2] === column) {
        this.setState({endPlaced: [false,0,0]});
      }
    }
    if (tile === "Start") {
      if(this.state.startPlaced[0]===false) {
        this.setState({startPlaced:[true,row,column]});
      } else {
        grid[this.state.startPlaced[1]][this.state.startPlaced[2]] = "Empty";
        this.setState({startPlaced:[true,row,column]});
      }
    }
    if (tile === "End") {
      if(this.state.endPlaced[0]===false) {
        this.setState({endPlaced:[true,row,column]});
      } else {
        grid[this.state.endPlaced[1]][this.state.endPlaced[2]] = "Empty";
        this.setState({endPlaced:[true,row,column]});
      }
    }
    grid[row][column] = tile;
    this.setState({grid: grid});
  }

  clearGrid() { // sets all tiles in the grid to "empty" 
    let grid = this.state.grid;
    for (let i = 0; i < this.gridheight; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j] = "Empty";
      }
    }
    this.setState({grid: grid, startPlaced: [false,0,0], endPlaced: [false,0,0], playError: false});
  }

  clearPath() { // clears all path related tiles by setting them to "empty"
    let grid = this.state.grid;
    for (let i = 0; i < this.gridheight; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (this.state.grid[i][j] === "Visited" || this.state.grid[i][j] === "Path") {
          grid[i][j] = "Empty";
        }
      }
    }
    this.setState({grid: grid});
  }

  componentDidUpdate() {
  }

  createGrid() { // creates html for the grid 
    return (
      <table>
        <tbody>
          {this.state.grid.map((row,row_index) => <tr key = {row_index}>{row.map((tile,index) => <td className = {tile} onClick={!this.state.playing ? this.updateCell.bind(this,row_index,index) : undefined} key = {(row_index,index)}></td>)}</tr>)}
        </tbody>
      </table>
    );
  }  

  playAlgorithm() { // plays an algorithm based on the state "algorithm"
    if (this.state.startPlaced[0] === true && this.state.endPlaced[0] === true) { // makes sure if the start and end tiles are placed
      this.clearPath();
      this.setState({playError: false, playing: true});
      switch(this.state.algorithm) {
        case "Dijkstra":
          this.dijkstra();
          break;
        case "A*":
          this.aStar();
          break;
        case "BFS":
          this.bfs();
          break;
        case "DFS":
          this.dfs();
          break;
        default:
          break;
      }
    } else {
      this.setState({playError: true});
    }
  }
  
  updateVisited(coord) { // sets tile in grid as "visited" if the algorithm visits the tile
    let grid = this.state.grid;
    grid[coord[0]][coord[1]] = "Visited";
    grid[this.state.startPlaced[1]][this.state.startPlaced[2]] = "Start";
    grid[this.state.endPlaced[1]][this.state.endPlaced[2]] = "End";
    this.setState({grid:grid});
  }

  setPath(path) { // sets tile in grid as "path" if the tile is part of the path found by the algorithm 
    let grid = this.state.grid;
    grid[path[0]][path[1]] = "Path";
    grid[this.state.startPlaced[1]][this.state.startPlaced[2]] = "Start";
    grid[this.state.endPlaced[1]][this.state.endPlaced[2]] = "End";
    this.setState({grid:grid});
  }

  validCoord(coord,index) { // checks if the coordinates are valid on the grid
    if (coord[0] + this.dy[index] < 0 || coord[1] + this.dx[index] < 0 || coord[0] + this.dy[index] === this.gridheight || coord[1] + this.dx[index] === this.state.gridlength) {
      return false;
    }
    if (this.state.grid[coord[0] + this.dy[index]][coord[1] + this.dx[index]] === "Path" || this.state.grid[coord[0] + this.dy[index]][coord[1] + this.dx[index]] === "Obstacle" || this.state.grid[coord[0] + this.dy[index]][coord[1] + this.dx[index]] === "Visited" || this.state.grid[coord[0] + this.dy[index]][coord[1] + this.dx[index]] === "Start") {
      return false;
    }
    return true;
  }

  async dijkstra() {
    
    let Q = new Set(); // creates a queue
    for (let i = 0; i < this.gridheight; i++) {
      for (let j = 0; j < this.state.gridlength; j++) {
        if (this.state.grid[i][j] !== "Obstacle") {
          Q.add(i.toString()+", "+ j.toString());
        }
      }
    }

    let dist = []; // initialize the distance and previous node arrays
    let prev = [];
    for (let i = 0; i<this.gridheight; i++) {
      prev.push([]);
      dist.push([]);
      for (let j = 0; j < this.state.gridlength; j++) {
        prev[i].push(undefined);
        dist[i].push(Infinity);
      }
    }

    dist[this.state.startPlaced[1]][this.state.startPlaced[2]] = 0; // sets distance of start tile to 0
    let firstRun = true;
    let u = [];
    let prevU = [];
    let min = Infinity;
    while (Q.size !== 0) {
      min = Infinity; //  while loop starts by finding tile with minimum distance from the start tile
      if (firstRun) {
        u = [this.state.startPlaced[1], this.state.startPlaced[2]];
        min = 0;
        firstRun = false;
      } else {
        for (let i = 0; i < dist.length; i++) {
          for (let j = 0; j < dist[i].length; j++) {
            if (dist[i][j] < min && this.state.grid[i][j] !== "Visited" && this.state.grid[i][j] !== "Start") {
              u = [i,j];
              min = dist[i][j];
            }
          }
        }
      }

      if (u[0] === prevU[0] && u[1] === prevU[1]) { // function ends if no new tile is found (algorithm could not find path)
        break;
      }

      this.updateVisited(u); // sets u as visited
      await new Promise(r => setTimeout(r, 25)); // delay function

      Q.delete(u[0].toString()+", "+u[1].toString()); // removes u from the queue
      if (u[0] === this.state.endPlaced[1] && u[1] === this.state.endPlaced[2]) {
        break;
      }
      
      for (let i = 0; i < 4; i++) { // checks each direction (up, down, right, left) for a valid tile/neighbour
        if (this.validCoord(u,i)) {
          let alt = dist[u[0]][u[1]] + 1; // the +1 should be substituted for the weight of the node (since there are no weights in this visualization, each node is weighted as 1)
          if (alt < dist[u[0]+this.dy[i]][u[1]+this.dx[i]]) { // updates the distance and previous node of u's nieghbour if a faster route is found
            dist[u[0]+this.dy[i]][u[1]+this.dx[i]] = alt;
            prev[u[0]+this.dy[i]][u[1]+this.dx[i]] = u;
          }
        }
      }
      prevU = [u[0],u[1]];
    }
    let path = [this.state.endPlaced[1],this.state.endPlaced[2]]; // code to display path
    if (prev[path[0]][path[1]] !== undefined) {
      while (path !== undefined) {
        this.setPath(path);
        await new Promise(r => setTimeout(r, 5));
        path = prev[path[0]][path[1]];
      }
    }
    this.setState({playing: false});
    await new Promise(r => setTimeout(r, 5));
    this.updateWidth();
  }

  async bfs() { 
    let Q = []; // initialize arrays
    let prev = [];
    
    for (let i = 0; i<this.gridheight; i++) {
      prev.push([]);
      for (let j = 0; j < this.state.gridlength; j++) {
        prev[i].push(undefined);
      }
    }

    Q.push([this.state.startPlaced[1],this.state.startPlaced[2]]); // adds start tile to queue
    while (Q.length !== 0) { // runs while the queue is not empty
      let currNode = Q.shift(); // sets currnode to first element in the queue
      if (currNode[0] === this.state.endPlaced[1] && currNode[1] === this.state.endPlaced[2]) {
        break;
      }
      for (let i = 0; i < 4; i++) { // checks the neighbours of currnode and adds them to the queue
        if (this.validCoord(currNode,i)) {
          Q.push([currNode[0]+this.dy[i],currNode[1]+this.dx[i]]);
          this.updateVisited([currNode[0]+this.dy[i],currNode[1]+this.dx[i]]);
          prev[currNode[0]+this.dy[i]][currNode[1]+this.dx[i]] = currNode;
          await new Promise(r => setTimeout(r, 25));
        }
      }
    }
    let path = [this.state.endPlaced[1],this.state.endPlaced[2]]; // code to display path
    if (prev[path[0]][path[1]] !== undefined) {
      while (path !== undefined) {
        this.setPath(path);
        await new Promise(r => setTimeout(r, 5));
        path = prev[path[0]][path[1]];
      }
    }
    this.setState({playing: false});
    await new Promise(r => setTimeout(r, 5));
    this.updateWidth();
  }

  async dfs() {
    let Q = []; // initialize arrays
    let prev = [];
    for (let i = 0; i<this.gridheight; i++) {
      prev.push([]);
      for (let j = 0; j < this.state.gridlength; j++) {
        prev[i].push(undefined);
      }
    }

    Q.push([this.state.startPlaced[1],this.state.startPlaced[2]]); // adds start tile to queue

    while (Q.length !== 0) { // runs while the queue is not empty
      let current = Q.pop(); // sets current to first element in the queue
      if (current === undefined) {
        break;
      } 
      this.updateVisited(current);
      await new Promise(r => setTimeout(r, 25));
      if (current[0] === this.state.endPlaced[1] && current[1] === this.state.endPlaced[2]) {
        break;
      }

      if (this.validCoord(current,0)) { // each if statement is to determine the next direction taken by the algorithm in the order: up, right, down, left.
        prev[current[0]+this.dy[0]][current[1]+this.dx[0]] = current;
        Q.push([current[0]+this.dy[0],current[1]+this.dx[0]]);

      } else if (this.validCoord(current,1)) {
        prev[current[0]+this.dy[1]][current[1]+this.dx[1]] = current;
        Q.push([current[0]+this.dy[1],current[1]+this.dx[1]]);

      } else if (this.validCoord(current,2)) {
        prev[current[0]+this.dy[2]][current[1]+this.dx[2]] = current;
        Q.push([current[0]+this.dy[2],current[1]+this.dx[2]]);

      } else if (this.validCoord(current,3)) {
        prev[current[0]+this.dy[3]][current[1]+this.dx[3]] = current;
        Q.push([current[0]+this.dy[3],current[1]+this.dx[3]]);
      } else { // if no move is possible, the previous node of current is pushed onto the queue 
        Q.push(prev[current[0]][current[1]]);
      }
    }

    let path = [this.state.endPlaced[1],this.state.endPlaced[2]]; // code to display path
    if (prev[path[0]][path[1]] !== undefined) {
      while (path !== undefined) {
        this.setPath(path);
        await new Promise(r => setTimeout(r, 5));
        path = prev[path[0]][path[1]];
      }
    }

    this.setState({playing: false});
    await new Promise(r => setTimeout(r, 5));
    this.updateWidth();
  }

  async aStar() {
    let Q = new Set();
    Q.add([this.state.startPlaced[1],this.state.startPlaced[2]]);

    let cameFrom = [];
    let gScore = []; // distance from start to tile
    let fScore = []; // estimated distance from tile to end
    for (let i = 0; i<this.gridheight; i++) {
      cameFrom.push([]);
      gScore.push([]);
      fScore.push([]);
      for (let j = 0; j < this.state.gridlength; j++) {
        cameFrom[i].push(undefined);
        gScore[i].push(Infinity);
        fScore[i].push(Infinity);
      }
    }
    gScore[this.state.startPlaced[1]][this.state.startPlaced[2]] = 0;
    fScore[this.state.startPlaced[1]][this.state.startPlaced[2]] = this.manhattan([this.state.startPlaced[1],this.state.startPlaced[2]]);

    while (Q.size !== 0) {
      let current = undefined;
      let min = Infinity;
      for (let node of Q) { // finds node with minimum fscore
        if (fScore[node[0]][node[1]] < min) {
          min = fScore[node[0]][node[1]];
          current = node;
        }
      }

      if (current[0] === this.state.endPlaced[1] && current[1] === this.state.endPlaced[2]) {
        await this.reconstructPath(cameFrom);
        this.setState({playing: false});
        await new Promise(r => setTimeout(r, 5));
        this.updateWidth();
        return true;
      }

      Q.delete(current);

      await new Promise(r => setTimeout(r, 25));
      this.updateVisited(current);
      for (let i = 0; i<4; i++) { // checks neighbours of current and updates the information related to them 
        if (this.validCoord(current,i)) {
          let tentativeGScore = gScore[current[0]][current[1]] + 1; // the 1 should be replaced with the weight of the edge for weighted graphs
          if (tentativeGScore < gScore[current[0]+this.dy[i]][current[1]+this.dx[i]]) {
            cameFrom[current[0]+this.dy[i]][current[1]+this.dx[i]] = current;
            gScore[current[0]+this.dy[i]][current[1]+this.dx[i]] = tentativeGScore;
            fScore[current[0]+this.dy[i]][current[1]+this.dx[i]] = gScore[current[0]+this.dy[i]][current[1]+this.dx[i]] + this.manhattan([current[0]+this.dy[i],current[1]+this.dx[i]]);
            if (this.listNotWithinSet(Q,[current[0]+this.dy[i],current[1]+this.dx[i]])) {
              Q.add([current[0]+this.dy[i],current[1]+this.dx[i]]);
            }
          }  
        }
      }

    }
    this.setState({playing: false});
    await new Promise(r => setTimeout(r, 5));
    this.updateWidth();
    return false;
  }

  listNotWithinSet(Q, coord) { // checks to see if coord is not within the queue
    for (let node of Q) {
      if (node[0] === coord[0] && node[1] === coord[1]) {
        return false;
      }
    }
    return true;
  }


  async reconstructPath(cameFrom) { // code to display path
    let current = [this.state.endPlaced[1], this.state.endPlaced[2]];
    while (current !== undefined) {
      this.setPath(current);
      await new Promise(r => setTimeout(r, 5));
      current = cameFrom[current[0]][current[1]];
    }
  }

  manhattan(coord) { // used to estimate distance from a tile to the end tile
    return Math.abs(coord[0]-this.state.endPlaced[1]) + Math.abs(coord[1]-this.state.endPlaced[2]);
  }

  render() {
      return (
        <div className="visualizer">
          <div className="visualizer-nav">
            <ul className="algorithms">
              <li><span className = {this.state.algorithm === "Dijkstra" ? "selected" : "unselected"} onClick={this.changeAlgorithm.bind(this, "Dijkstra")}> Dijkstra </span></li>
              <li><span className = {this.state.algorithm === "A*" ? "selected" : "unselected"} onClick={this.changeAlgorithm.bind(this, "A*")}> A* Search </span></li>
              <li><span className = {this.state.algorithm === "BFS" ? "selected" : "unselected"} onClick={this.changeAlgorithm.bind(this, "BFS")}> BFS Search </span></li>
              <li><span className = {this.state.algorithm === "DFS" ? "selected" : "unselected"} onClick={this.changeAlgorithm.bind(this, "DFS")}> DFS Search </span></li>
            </ul>
          </div>
          <div className="visualizer-grid">
            <div className="grid-options">
              <ul className="tiles">
                <li><span className = {this.state.tile === "Start" ? "selected" : "unselected"} onClick={this.changeTile.bind(this, "Start")}> Start </span></li>
                <li><span className = {this.state.tile === "End" ? "selected" : "unselected"}  onClick={this.changeTile.bind(this, "End")}> End </span></li>
                <li><span className = {this.state.tile === "Obstacle" ? "selected" : "unselected"} onClick={this.changeTile.bind(this, "Obstacle")}> Wall </span></li>
                <li><span className = {this.state.tile === "Empty" ? "selected" : "unselected"} onClick={this.changeTile.bind(this, "Empty")}> Blank </span></li>
              </ul>
              <ul className="grid-controls" id = {!this.state.playing ? "controls-enabled" : "controls-disabled"}>
                <li><span onClick={!this.state.playing ? this.playAlgorithm.bind(this) : undefined}> Play </span></li>
                <li><span onClick={!this.state.playing ? this.clearPath.bind(this) : undefined}> Clear path </span></li>
                <li><span onClick={!this.state.playing ? this.clearGrid.bind(this) : undefined}> Clear grid </span></li>
              </ul>
              {this.state.playError === true && <div className="playError"> Place the start and end tiles before playing </div>}
            </div>
            <div className="grid">
              {this.createGrid()}
            </div>
          </div>
        </div>
      );
  }
}

export default MainPage