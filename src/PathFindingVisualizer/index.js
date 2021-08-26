import React, { useState, useEffect } from "react";
import "./PathFindingVisualizer.css";
import { Node } from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "./Algorithms/Dijkstra";

const START_NODE_ROW = 5;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 9;
const FINISH_NODE_COL = 10;

const PathFindingVisualizer = () => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  // const [startNode,setStartNode] = useState([])

  useEffect(() => {
    const InitialGrid = _getInitialGrid();
    setGrid(InitialGrid);
  }, []);

  const _getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 10; row++) {
      const currentRow = [];
      for (let col = 0; col < 30; col++) {
        currentRow.push(createNode(row, col));
      }
      grid.push(currentRow);
    }
    return grid;
  };

  function handleMouseDown(row, col) {
    document.getElementById(`node-${row}-${col}`).className =
    "node node-wall";
    // const newGrid = getNewGridWithWallToggled(grid, row, col);
    // setGrid(newGrid);
    setMouseIsPressed(true);
  }

  function handleMouseEnter(row, col) {
    if (!mouseIsPressed) return;
    document.getElementById(`node-${row}-${col}`).className =
    "node node-wall";
      // const newGrid = getNewGridWithWallToggled(grid, row, col);
      //setGrid(newGrid);
    
  }


  function handleMouseUp() {
    setMouseIsPressed(false);
  }

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (
          (node.col === START_NODE_COL && node.row === START_NODE_ROW) ||
          (node.col === FINISH_NODE_COL && node.row === FINISH_NODE_ROW)
        ) {
        }
        else{
          document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
        }
        
      }, 50 * i);
    }
  };
  function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder){
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (
          (node.col === START_NODE_COL && node.row === START_NODE_ROW) ||
          (node.col === FINISH_NODE_COL && node.row === FINISH_NODE_ROW)
        ) {
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }
      }, 10 * i);
    }
  };

  const clearGrid = () => {
    const newGrid = clearGridHelper();
    setGrid(newGrid);
  }

function visualizeDijkstra(){
    const array = grid;
    const startNode = array[START_NODE_ROW][START_NODE_COL];
    const finishNode = array[FINISH_NODE_ROW][FINISH_NODE_COL];
    updateGrid()
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    console.log(visitedNodesInOrder)
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }


  function updateGrid(){
    const newGrid = grid
    for(let row = 0; row < 10; row++){
      for(let col =0; col<30; col++){
        const Node = document.getElementById(`node-${row}-${col}`)
        if(Node.className === "node node-wall"){
          const node = newGrid[row][col]
          node.isWall = true
          newGrid[row][col] = node
        }
      }
    }
    setGrid(newGrid)
   }

  const createNode = (row, col) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid;
    const node = newGrid[row][col];
    node.isWall = true;
    newGrid[row][col] = node;
    return newGrid;
  };

  const clearGridHelper = () => {
    const newGrid = grid;
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 30; col++) {
        if (
          (col === START_NODE_COL && row === START_NODE_ROW) ||
          (col === FINISH_NODE_COL && row === FINISH_NODE_ROW)
        ) {
        } else {
          const node = newGrid[row][col];
          document.getElementById(`node-${row}-${col}`).className =
            "node node-clear";
          node.isWall = false;
          node.isVisited = false;
          newGrid[row][col] = node;
        }
      }
    }
    return newGrid;
  };

  return (
    <>
      <button onClick={()=>visualizeDijkstra()}>
        Visualize Dijkstra's Algorithm
      </button>
      <button onClick={clearGrid}>Clear Grid</button>
      <button onClick={updateGrid}>update Grid</button>

      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={() => handleMouseDown(row, col)}
                    onMouseEnter={() => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                    row={row}/>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default PathFindingVisualizer;
