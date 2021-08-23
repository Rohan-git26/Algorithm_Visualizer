import React,{useState, useEffect} from 'react'
import './PathFindingVisualizer.css'
import { Node } from './Node/Node'

const  START_NODE_ROW = 10
const START_NODE_COL = 15
const FINISH_NODE_COL = 30
const FINISH_NODE_ROW = 10

const PathFindingVisualizer = () => {
    const [grid,setGrid] = useState([]);
    const [mouseIsPressed,setMouseIsPressed] = useState(false)

    useEffect(() => {
        const grid = getInitialGrid();
        setGrid(grid);
    }, [])
    const getInitialGrid = () =>{
        const grid = []
        for(let row = 0; row<15; row++){
            const currentRow = []
            for(let col = 0; col<45; col++){
                currentRow.push(createNode(row,col))
            }
            grid.push(currentRow)
        }
        return grid
    }

    const createNode = (row,col) =>{
        return{
            col,row,
            isStart: row === START_NODE_ROW && col === START_NODE_COL,
            isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
            distance : Infinity,
            isVisited : false,
            isWall : false,
            previousNode: null,
        }
    }

    return (
        <div className="grid">
            {grid.map((row, rowIdx) =>{
                return(
                    <div key={rowIdx}>
                        {row.map((node,nodeIdx) =>{
                            const {row,col,isFinish,isStart,isWall} = node
                            return(
                                <Node 
                                    key={nodeIdx}
                                    col={col}
                                    isFinish={isFinish}
                                    isStart={isStart}
                                    isWall={isWall}
                                    mouseIsPressed={(row,col)=>console.log("somehin")}
                                    onMouseEnter={(row,col)=>console.log("ssontheting")}
                                    onMouseUp={()=>console.log("onMouseUp")}
                                    row={row}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    )
}
export default PathFindingVisualizer;
