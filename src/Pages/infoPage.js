import React from 'react';
import '../Page.css';


function InfoPage() {
    return (
      <div className="info-page">
        <h1> What is a Pathfinding Algorithm </h1>
          <p> A pathfinding algorithm is an algorithm that explores a graph by starting at one node and then exploring it's neighbours </p>
          <p> The algorithms in this visualization try and find a path on the graph that is the shortest/most efficient path from one point to the next </p>
        <h2> Weighted vs Unweighted </h2>
          <p> Unlike unweighted algorithms, weighted algorithms can calculate the shortest path in a graph where the cost of exploring each node can be different </p>
          <p> Both Dijkstra's algorithm and A* algorithm are wieghted while BFS search and DFS search are both unweighted algorithms </p>
          <p> This visualization doesnt have weights so each node is treated as having a cost of 1. </p>
        <h2> How They Work </h2>
          <h3> Dijstra </h3>
          <p> This algorithm works by first storing the distance each node is from the source node. If the distance is unknown, it is set to Infinity. The algorithm chooses which node to explore based on which node is the closest to the source node and hasn't been explored. As shorter paths are found, the distance values are updated </p>
          <h3> A* </h3>
          <p> This algorithm works by determining which direction to extend it's path. It does this by calculating the distance a node is from the source + the estimated distance the node is from the goal. This algorithm is more efficient than dijkstra's algorithm and has to explore less nodes </p>
          <h3> BFS </h3>
          <p> This algorithm works by exploring nodes connected to the source node in a breadth-first manner. Due to the nature of the algorithm, when the algorithm reaches the goal node, the path taken is the shortest </p>
          <h3> DFS </h3>
          <p> This algorithm works by first choosing a direction to explore. The direction chosen is determined by an order of directions. If no direction can be explored, the algorithm backtracks. The path this algorithm finds may not be the shortest </p>
      </div>
    );
  }

export default InfoPage