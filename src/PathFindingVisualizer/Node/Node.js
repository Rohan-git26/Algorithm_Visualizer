import React from 'react'
import './Node.css'

export const Node = (props) => {
    const {col,isFinish,isStart,isWall,onMouseDown,onMouseEnter,onMouseUp,row} = props;
    const extraClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : isWall ? 'node-wall' : '';
    return (
        <div id={`node-${row}-${col}`}
            className={`node ${extraClassName}`}
            onMouseDown={()=>onMouseDown()}
            onMouseEnter={()=>onMouseEnter()}
            onMouseUp={()=>onMouseUp()}>
        </div>
    )
}
