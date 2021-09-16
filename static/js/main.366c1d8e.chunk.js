(this["webpackJsonppathfinder-visualizer"]=this["webpackJsonppathfinder-visualizer"]||[]).push([[0],{20:function(t,e,s){},22:function(t,e,s){"use strict";s.r(e);var i=s(1),a=s.n(i),n=s(14),r=s.n(n),h=(s(4),s(5)),c=s(6),d=s(9),l=s(8),o=s(12),u=s(2),j=s.n(u),b=s(3),p=s(7),g=(s(20),s(0)),x=function(t){Object(d.a)(s,t);var e=Object(l.a)(s);function s(t){var i;return Object(h.a)(this,s),(i=e.call(this,t)).gridheight=14,i.dx=[0,1,0,-1],i.dy=[-1,0,1,0],i.state={playing:!1,algorithm:"Dijkstra",tile:"Start",playError:!1,startPlaced:[!1,0,0],endPlaced:[!1,0,0],gridlength:parseInt(window.innerWidth/35),grid:i.updateGrid([],parseInt(window.innerWidth/35),i.gridheight)},i.updateWidth=i.updateWidth.bind(Object(p.a)(i)),i}return Object(c.a)(s,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.updateWidth)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.updateWidth)}},{key:"updateGrid",value:function(t,e,s){if(0===t.length)for(var i=0;i<s;i++)t.push([]);for(;t[t.length-1].length!==e;)if(t[t.length-1].length<e)for(var a=0;a<s;a++)t[a].push("Empty");else for(var n=0;n<s;n++)"Start"===t[n][t[n].length-1]&&this.setState({startPlaced:[!1,0,0]}),"End"===t[n][t[n].length-1]&&this.setState({endPlaced:[!1,0,0]}),t[n].splice(-1,1);return t}},{key:"updateWidth",value:function(){if(!1===this.state.playing){this.setState({gridlength:parseInt(window.innerWidth/35)});var t=this.state.gridlength,e=this.state.grid;this.setState({grid:this.updateGrid(e,t,this.gridheight)})}}},{key:"changeAlgorithm",value:function(t){this.setState({algorithm:t})}},{key:"changeTile",value:function(t){this.setState({tile:t})}},{key:"updateCell",value:function(t,e){var s=this.state.tile,i=this.state.grid;!0===this.state.startPlaced[0]&&this.state.startPlaced[1]===t&&this.state.startPlaced[2]===e&&this.setState({startPlaced:[!1,0,0]}),!0===this.state.endPlaced[0]&&this.state.endPlaced[1]===t&&this.state.endPlaced[2]===e&&this.setState({endPlaced:[!1,0,0]}),"Start"===s&&(!1===this.state.startPlaced[0]||(i[this.state.startPlaced[1]][this.state.startPlaced[2]]="Empty"),this.setState({startPlaced:[!0,t,e]})),"End"===s&&(!1===this.state.endPlaced[0]||(i[this.state.endPlaced[1]][this.state.endPlaced[2]]="Empty"),this.setState({endPlaced:[!0,t,e]})),i[t][e]=s,this.setState({grid:i})}},{key:"clearGrid",value:function(){for(var t=this.state.grid,e=0;e<this.gridheight;e++)for(var s=0;s<t[e].length;s++)t[e][s]="Empty";this.setState({grid:t,startPlaced:[!1,0,0],endPlaced:[!1,0,0],playError:!1})}},{key:"clearPath",value:function(){for(var t=this.state.grid,e=0;e<this.gridheight;e++)for(var s=0;s<t[e].length;s++)"Visited"!==this.state.grid[e][s]&&"Path"!==this.state.grid[e][s]||(t[e][s]="Empty");this.setState({grid:t})}},{key:"componentDidUpdate",value:function(){}},{key:"createGrid",value:function(){var t=this;return Object(g.jsx)("table",{children:Object(g.jsx)("tbody",{children:this.state.grid.map((function(e,s){return Object(g.jsx)("tr",{children:e.map((function(e,i){return Object(g.jsx)("td",{className:e,onClick:t.state.playing?void 0:t.updateCell.bind(t,s,i)},i)}))},s)}))})})}},{key:"playAlgorithm",value:function(){if(!0===this.state.startPlaced[0]&&!0===this.state.endPlaced[0])switch(this.clearPath(),this.setState({playError:!1,playing:!0}),this.state.algorithm){case"Dijkstra":this.dijkstra();break;case"A*":this.aStar();break;case"BFS":this.bfs();break;case"DFS":this.dfs()}else this.setState({playError:!0})}},{key:"updateVisited",value:function(t){var e=this.state.grid;e[t[0]][t[1]]="Visited",e[this.state.startPlaced[1]][this.state.startPlaced[2]]="Start",e[this.state.endPlaced[1]][this.state.endPlaced[2]]="End",this.setState({grid:e})}},{key:"setPath",value:function(t){var e=this.state.grid;e[t[0]][t[1]]="Path",e[this.state.startPlaced[1]][this.state.startPlaced[2]]="Start",e[this.state.endPlaced[1]][this.state.endPlaced[2]]="End",this.setState({grid:e})}},{key:"validCoord",value:function(t,e){return!(t[0]+this.dy[e]<0||t[1]+this.dx[e]<0||t[0]+this.dy[e]===this.gridheight||t[1]+this.dx[e]===this.state.gridlength)&&("Path"!==this.state.grid[t[0]+this.dy[e]][t[1]+this.dx[e]]&&"Obstacle"!==this.state.grid[t[0]+this.dy[e]][t[1]+this.dx[e]]&&"Visited"!==this.state.grid[t[0]+this.dy[e]][t[1]+this.dx[e]]&&"Start"!==this.state.grid[t[0]+this.dy[e]][t[1]+this.dx[e]])}},{key:"dijkstra",value:function(){var t=Object(b.a)(j.a.mark((function t(){var e,s,i,a,n,r,h,c,d,l,o,u,b,p,g,x;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(e=new Set,s=0;s<this.gridheight;s++)for(i=0;i<this.state.gridlength;i++)"Obstacle"!==this.state.grid[s][i]&&e.add(s.toString()+", "+i.toString());for(a=[],n=[],r=0;r<this.gridheight;r++)for(n.push([]),a.push([]),h=0;h<this.state.gridlength;h++)n[r].push(void 0),a[r].push(1/0);a[this.state.startPlaced[1]][this.state.startPlaced[2]]=0,c=!0,d=[],l=[],o=1/0;case 10:if(0===e.size){t.next=25;break}if(o=1/0,c)d=[this.state.startPlaced[1],this.state.startPlaced[2]],o=0,c=!1;else for(u=0;u<a.length;u++)for(b=0;b<a[u].length;b++)a[u][b]<o&&"Visited"!==this.state.grid[u][b]&&"Start"!==this.state.grid[u][b]&&(d=[u,b],o=a[u][b]);if(d[0]!==l[0]||d[1]!==l[1]){t.next=15;break}return t.abrupt("break",25);case 15:return this.updateVisited(d),t.next=18,new Promise((function(t){return setTimeout(t,25)}));case 18:if(e.delete(d[0].toString()+", "+d[1].toString()),d[0]!==this.state.endPlaced[1]||d[1]!==this.state.endPlaced[2]){t.next=21;break}return t.abrupt("break",25);case 21:for(p=0;p<4;p++)this.validCoord(d,p)&&(g=a[d[0]][d[1]]+1)<a[d[0]+this.dy[p]][d[1]+this.dx[p]]&&(a[d[0]+this.dy[p]][d[1]+this.dx[p]]=g,n[d[0]+this.dy[p]][d[1]+this.dx[p]]=d);l=[d[0],d[1]],t.next=10;break;case 25:if(x=[this.state.endPlaced[1],this.state.endPlaced[2]],void 0===n[x[0]][x[1]]){t.next=34;break}case 27:if(void 0===x){t.next=34;break}return this.setPath(x),t.next=31,new Promise((function(t){return setTimeout(t,5)}));case 31:x=n[x[0]][x[1]],t.next=27;break;case 34:return this.setState({playing:!1}),t.next=37,new Promise((function(t){return setTimeout(t,5)}));case 37:this.updateWidth();case 38:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"bfs",value:function(){var t=Object(b.a)(j.a.mark((function t(){var e,s,i,a,n,r,h;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(e=[],s=[],i=0;i<this.gridheight;i++)for(s.push([]),a=0;a<this.state.gridlength;a++)s[i].push(void 0);e.push([this.state.startPlaced[1],this.state.startPlaced[2]]);case 4:if(0===e.length){t.next=21;break}if((n=e.shift())[0]!==this.state.endPlaced[1]||n[1]!==this.state.endPlaced[2]){t.next=8;break}return t.abrupt("break",21);case 8:r=0;case 9:if(!(r<4)){t.next=19;break}if(!this.validCoord(n,r)){t.next=16;break}return e.push([n[0]+this.dy[r],n[1]+this.dx[r]]),this.updateVisited([n[0]+this.dy[r],n[1]+this.dx[r]]),s[n[0]+this.dy[r]][n[1]+this.dx[r]]=n,t.next=16,new Promise((function(t){return setTimeout(t,25)}));case 16:r++,t.next=9;break;case 19:t.next=4;break;case 21:if(h=[this.state.endPlaced[1],this.state.endPlaced[2]],void 0===s[h[0]][h[1]]){t.next=30;break}case 23:if(void 0===h){t.next=30;break}return this.setPath(h),t.next=27,new Promise((function(t){return setTimeout(t,5)}));case 27:h=s[h[0]][h[1]],t.next=23;break;case 30:return this.setState({playing:!1}),t.next=33,new Promise((function(t){return setTimeout(t,5)}));case 33:this.updateWidth();case 34:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"dfs",value:function(){var t=Object(b.a)(j.a.mark((function t(){var e,s,i,a,n,r;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(e=[],s=[],i=0;i<this.gridheight;i++)for(s.push([]),a=0;a<this.state.gridlength;a++)s[i].push(void 0);e.push([this.state.startPlaced[1],this.state.startPlaced[2]]);case 4:if(0===e.length){t.next=16;break}if(void 0!==(n=e.pop())){t.next=8;break}return t.abrupt("break",16);case 8:return this.updateVisited(n),t.next=11,new Promise((function(t){return setTimeout(t,25)}));case 11:if(n[0]!==this.state.endPlaced[1]||n[1]!==this.state.endPlaced[2]){t.next=13;break}return t.abrupt("break",16);case 13:this.validCoord(n,0)?(s[n[0]+this.dy[0]][n[1]+this.dx[0]]=n,e.push([n[0]+this.dy[0],n[1]+this.dx[0]])):this.validCoord(n,1)?(s[n[0]+this.dy[1]][n[1]+this.dx[1]]=n,e.push([n[0]+this.dy[1],n[1]+this.dx[1]])):this.validCoord(n,2)?(s[n[0]+this.dy[2]][n[1]+this.dx[2]]=n,e.push([n[0]+this.dy[2],n[1]+this.dx[2]])):this.validCoord(n,3)?(s[n[0]+this.dy[3]][n[1]+this.dx[3]]=n,e.push([n[0]+this.dy[3],n[1]+this.dx[3]])):e.push(s[n[0]][n[1]]),t.next=4;break;case 16:if(r=[this.state.endPlaced[1],this.state.endPlaced[2]],void 0===s[r[0]][r[1]]){t.next=25;break}case 18:if(void 0===r){t.next=25;break}return this.setPath(r),t.next=22,new Promise((function(t){return setTimeout(t,5)}));case 22:r=s[r[0]][r[1]],t.next=18;break;case 25:return this.setState({playing:!1}),t.next=28,new Promise((function(t){return setTimeout(t,5)}));case 28:this.updateWidth();case 29:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"aStar",value:function(){var t=Object(b.a)(j.a.mark((function t(){var e,s,i,a,n,r,h,c,d,l,u,b,p;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for((e=new Set).add([this.state.startPlaced[1],this.state.startPlaced[2]]),s=[],i=[],a=[],n=0;n<this.gridheight;n++)for(s.push([]),i.push([]),a.push([]),r=0;r<this.state.gridlength;r++)s[n].push(void 0),i[n].push(1/0),a[n].push(1/0);i[this.state.startPlaced[1]][this.state.startPlaced[2]]=0,a[this.state.startPlaced[1]][this.state.startPlaced[2]]=this.manhattan([this.state.startPlaced[1],this.state.startPlaced[2]]);case 8:if(0===e.size){t.next=28;break}h=void 0,c=1/0,d=Object(o.a)(e);try{for(d.s();!(l=d.n()).done;)u=l.value,a[u[0]][u[1]]<c&&(c=a[u[0]][u[1]],h=u)}catch(j){d.e(j)}finally{d.f()}if(h[0]!==this.state.endPlaced[1]||h[1]!==this.state.endPlaced[2]){t.next=21;break}return t.next=16,this.reconstructPath(s);case 16:return this.setState({playing:!1}),t.next=19,new Promise((function(t){return setTimeout(t,5)}));case 19:return this.updateWidth(),t.abrupt("return",!0);case 21:return e.delete(h),t.next=24,new Promise((function(t){return setTimeout(t,25)}));case 24:for(this.updateVisited(h),b=0;b<4;b++)this.validCoord(h,b)&&(p=i[h[0]][h[1]]+1)<i[h[0]+this.dy[b]][h[1]+this.dx[b]]&&(s[h[0]+this.dy[b]][h[1]+this.dx[b]]=h,i[h[0]+this.dy[b]][h[1]+this.dx[b]]=p,a[h[0]+this.dy[b]][h[1]+this.dx[b]]=i[h[0]+this.dy[b]][h[1]+this.dx[b]]+this.manhattan([h[0]+this.dy[b],h[1]+this.dx[b]]),this.listNotWithinSet(e,[h[0]+this.dy[b],h[1]+this.dx[b]])&&e.add([h[0]+this.dy[b],h[1]+this.dx[b]]));t.next=8;break;case 28:return this.setState({playing:!1}),t.next=31,new Promise((function(t){return setTimeout(t,5)}));case 31:return this.updateWidth(),t.abrupt("return",!1);case 33:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"listNotWithinSet",value:function(t,e){var s,i=Object(o.a)(t);try{for(i.s();!(s=i.n()).done;){var a=s.value;if(a[0]===e[0]&&a[1]===e[1])return!1}}catch(n){i.e(n)}finally{i.f()}return!0}},{key:"reconstructPath",value:function(){var t=Object(b.a)(j.a.mark((function t(e){var s;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:s=[this.state.endPlaced[1],this.state.endPlaced[2]];case 1:if(void 0===s){t.next=8;break}return this.setPath(s),t.next=5,new Promise((function(t){return setTimeout(t,5)}));case 5:s=e[s[0]][s[1]],t.next=1;break;case 8:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"manhattan",value:function(t){return Math.abs(t[0]-this.state.endPlaced[1])+Math.abs(t[1]-this.state.endPlaced[2])}},{key:"render",value:function(){return Object(g.jsxs)("div",{className:"visualizer",children:[Object(g.jsx)("div",{className:"visualizer-nav",children:Object(g.jsxs)("ul",{className:"algorithms",children:[Object(g.jsx)("li",{children:Object(g.jsx)("span",{className:"Dijkstra"===this.state.algorithm?"selected":"unselected",onClick:this.changeAlgorithm.bind(this,"Dijkstra"),children:" Dijkstra "})}),Object(g.jsx)("li",{children:Object(g.jsx)("span",{className:"A*"===this.state.algorithm?"selected":"unselected",onClick:this.changeAlgorithm.bind(this,"A*"),children:" A* Search "})}),Object(g.jsx)("li",{children:Object(g.jsx)("span",{className:"BFS"===this.state.algorithm?"selected":"unselected",onClick:this.changeAlgorithm.bind(this,"BFS"),children:" BFS Search "})}),Object(g.jsx)("li",{children:Object(g.jsx)("span",{className:"DFS"===this.state.algorithm?"selected":"unselected",onClick:this.changeAlgorithm.bind(this,"DFS"),children:" DFS Search "})})]})}),Object(g.jsxs)("div",{className:"visualizer-grid",children:[Object(g.jsxs)("div",{className:"grid-options",children:[Object(g.jsxs)("ul",{className:"tiles",children:[Object(g.jsx)("li",{children:Object(g.jsx)("span",{className:"Start"===this.state.tile?"selected":"unselected",onClick:this.changeTile.bind(this,"Start"),children:" Start "})}),Object(g.jsx)("li",{children:Object(g.jsx)("span",{className:"End"===this.state.tile?"selected":"unselected",onClick:this.changeTile.bind(this,"End"),children:" End "})}),Object(g.jsx)("li",{children:Object(g.jsx)("span",{className:"Obstacle"===this.state.tile?"selected":"unselected",onClick:this.changeTile.bind(this,"Obstacle"),children:" Wall "})}),Object(g.jsx)("li",{children:Object(g.jsx)("span",{className:"Empty"===this.state.tile?"selected":"unselected",onClick:this.changeTile.bind(this,"Empty"),children:" Blank "})})]}),Object(g.jsxs)("ul",{className:"grid-controls",id:this.state.playing?"controls-disabled":"controls-enabled",children:[Object(g.jsx)("li",{children:Object(g.jsx)("span",{onClick:this.state.playing?void 0:this.playAlgorithm.bind(this),children:" Play "})}),Object(g.jsx)("li",{children:Object(g.jsx)("span",{onClick:this.state.playing?void 0:this.clearPath.bind(this),children:" Clear path "})}),Object(g.jsx)("li",{children:Object(g.jsx)("span",{onClick:this.state.playing?void 0:this.clearGrid.bind(this),children:" Clear grid "})})]}),!0===this.state.playError&&Object(g.jsx)("div",{className:"playError",children:" Place the start and end tiles before playing "})]}),Object(g.jsx)("div",{className:"grid",children:this.createGrid()})]})]})}}]),s}(a.a.Component),f=x;var m=function(){return Object(g.jsxs)("div",{className:"info-page",children:[Object(g.jsx)("h1",{children:" What is a Pathfinding Algorithm "}),Object(g.jsx)("p",{children:" A pathfinding algorithm is an algorithm that explores a graph by starting at one node and then exploring it's neighbours "}),Object(g.jsx)("p",{children:" The algorithms in this visualization try and find a path on the graph that is the shortest/most efficient path from one point to the next "}),Object(g.jsx)("h2",{children:" Weighted vs Unweighted "}),Object(g.jsx)("p",{children:" Unlike unweighted algorithms, weighted algorithms can calculate the shortest path in a graph where the cost of exploring each node can be different "}),Object(g.jsx)("p",{children:" Both Dijkstra's algorithm and A* algorithm are wieghted while BFS search and DFS search are both unweighted algorithms "}),Object(g.jsx)("p",{children:" This visualization doesnt have weights so each node is treated as having a cost of 1. "}),Object(g.jsx)("h2",{children:" How They Work "}),Object(g.jsx)("h3",{children:" Dijstra "}),Object(g.jsx)("p",{children:" This algorithm works by first storing the distance each node is from the source node. If the distance is unknown, it is set to Infinity. The algorithm chooses which node to explore based on which node is the closest to the source node and hasn't been explored. As shorter paths are found, the distance values are updated "}),Object(g.jsx)("h3",{children:" A* "}),Object(g.jsx)("p",{children:" This algorithm works by determining which direction to extend it's path. It does this by calculating the distance a node is from the source + the estimated distance the node is from the goal. This algorithm is more efficient than dijkstra's algorithm and has to explore less nodes "}),Object(g.jsx)("h3",{children:" BFS "}),Object(g.jsx)("p",{children:" This algorithm works by exploring nodes connected to the source node in a breadth-first manner. Due to the nature of the algorithm, when the algorithm reaches the goal node, the path taken is the shortest "}),Object(g.jsx)("h3",{children:" DFS "}),Object(g.jsx)("p",{children:" This algorithm works by first choosing a direction to explore. The direction chosen is determined by an order of directions. If no direction can be explored, the algorithm backtracks. The path this algorithm finds may not be the shortest "})]})},O=s(13);var v=function(){var t=Object(i.useState)(0),e=Object(O.a)(t,2),s=e[0],a=e[1],n=Object(i.useState)(0),r=Object(O.a)(n,2),h=r[0],c=r[1];return Object(g.jsxs)("div",{className:"help-page",children:[Object(g.jsx)("h1",{children:" How to Visualize "}),Object(g.jsx)("h2",{children:" 1 "}),Object(g.jsx)("p",{children:" Select an algorithm "}),Object(g.jsx)("div",{className:"visualizer-nav",children:Object(g.jsxs)("ul",{className:"algorithms",children:[Object(g.jsx)("li",{children:Object(g.jsx)("span",{children:" Dijkstra "})}),Object(g.jsx)("li",{children:Object(g.jsx)("span",{children:" A* Search "})}),Object(g.jsx)("li",{children:Object(g.jsx)("span",{children:" BFS Search "})}),Object(g.jsx)("li",{children:Object(g.jsx)("span",{children:" DFS Search "})})]})}),Object(g.jsx)("h2",{children:" 2 "}),Object(g.jsx)("p",{children:" Select tiles using the buttons on the top left of the grid and place the tiles by pressing a grid cell "}),Object(g.jsxs)("div",{className:"grid-options",children:[Object(g.jsxs)("ul",{className:"tiles",children:[Object(g.jsx)("li",{children:Object(g.jsx)("span",{onClick:a.bind(this,"Start"),children:" Start "})}),Object(g.jsx)("li",{children:Object(g.jsx)("span",{onClick:a.bind(this,"End"),children:" End "})}),Object(g.jsx)("li",{children:Object(g.jsx)("span",{onClick:a.bind(this,"Obstacle"),children:" Wall "})}),Object(g.jsx)("li",{children:Object(g.jsx)("span",{onClick:a.bind(this,"Empty"),children:" Blank "})})]}),Object(g.jsxs)("ul",{className:"grid-controls",children:[Object(g.jsx)("li",{children:Object(g.jsx)("span",{onClick:c.bind(this,"Visited"),children:" Play "})}),Object(g.jsx)("li",{children:Object(g.jsx)("span",{onClick:"Visited"===h?c.bind(this,"Empty"):void 0,children:" Clear path "})}),Object(g.jsx)("li",{children:Object(g.jsx)("span",{onClick:c.bind(this,"Empty"),children:" Clear grid "})})]})]}),Object(g.jsx)("span",{className:h,id:"example-tile",onClick:c.bind(this,s),children:" "}),Object(g.jsx)("p",{children:' Use the "clear grid" button to remove all tiles and use the "clear path" button to remove the path tiles generated by the algorithms '}),Object(g.jsx)("p",{children:" Use the play button to watch the algorithm in action "})]})},k=function(t){Object(d.a)(s,t);var e=Object(l.a)(s);function s(t){var i;return Object(h.a)(this,s),(i=e.call(this,t)).state={page:"Main"},i}return Object(c.a)(s,[{key:"changePage",value:function(t){this.setState({page:t})}},{key:"render",value:function(){return Object(g.jsxs)("div",{className:"page",children:[Object(g.jsxs)("div",{className:"navbar",children:[Object(g.jsx)("div",{className:"content",id:"title",onClick:this.changePage.bind(this,"Main"),children:Object(g.jsx)("h1",{children:"Pathfinder Visualizer"})}),Object(g.jsx)("div",{className:"content",id:"pages",children:Object(g.jsxs)("ul",{children:[Object(g.jsx)("li",{children:Object(g.jsx)("span",{className:"Main"===this.state.page?"selected":"unselected",onClick:this.changePage.bind(this,"Main"),children:" Visualize "})}),Object(g.jsx)("li",{children:Object(g.jsx)("span",{className:"Info"===this.state.page?"selected":"unselected",onClick:this.changePage.bind(this,"Info"),children:" Info "})}),Object(g.jsx)("li",{children:Object(g.jsx)("span",{className:"Help"===this.state.page?"selected":"unselected",onClick:this.changePage.bind(this,"Help"),children:" Help "})})]})})]}),"Main"===this.state.page&&Object(g.jsx)(f,{}),"Info"===this.state.page&&Object(g.jsx)(m,{}),"Help"===this.state.page&&Object(g.jsx)(v,{})]})}}]),s}(a.a.Component);r.a.render(Object(g.jsx)(k,{}),document.getElementById("root"))},4:function(t,e,s){}},[[22,1,2]]]);
//# sourceMappingURL=main.366c1d8e.chunk.js.map