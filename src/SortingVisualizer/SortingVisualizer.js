import React,{ useState, useEffect} from 'react';

import './SortingVisualizer.css';
import { mergeSort } from './SortingAlgorithms/mergeSort';
import { bubbleSort } from './SortingAlgorithms/bubbleSort';
import { quickSort } from './SortingAlgorithms/quickSort';


const ANIMATION_SPEED_MS = 5
const PRIMARY_COLOR = 'turquoise'
const SECONDARY_COLOR = 'red'
const NO_OF_BARS = 40

const SortingVisualizer = () =>{
    const [array, setArray] = useState([])

    useEffect(()=>{
        const {_height} = getWindowDimensions();

        const _resetArray = () =>{
            const temp = [];
            for(let i=0; i<NO_OF_BARS; i++){
                temp.push(randomIntFromInterval(5,_height-(_height/3)))
            }
            setArray(temp);
        }
        _resetArray();
    },[])



    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: _height } = window;
        return {
          width,
          _height
        };
      }
    
    const {_height} = getWindowDimensions();

    const resetArray = () =>{
        const temp = [];
        for(let i=0; i<NO_OF_BARS; i++){
            temp.push(randomIntFromInterval(5,_height-(_height/3)))
        }
        setArray(temp);
    }

    const randomIntFromInterval = (min,max) =>{
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    

    const _bubbleSort =  () =>{
        const animations = bubbleSort(array)
        for(let i = 0; i<animations.length; i++){
            const arrayBars = document.getElementsByClassName("arraybar")
            const child = animations[i]
            const isColorChange = i % 3 !== 2;
            if(isColorChange && child[0] === 0){
                const barOneStyle = arrayBars[child[1]].style
                const barTwoStyle = arrayBars[child[2]].style
                const color =  i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR
                setTimeout(()=>{
                    barOneStyle.backgroundColor = color
                    barTwoStyle.backgroundColor = color
                }, i*ANIMATION_SPEED_MS)
            }
            else if(child[0] === 1){
                setTimeout(() =>{
                    const [swap,barOneIdx, barTwoIdx] = animations[i]
                    const barOneStyle = arrayBars[barOneIdx].style
                    const barTwoStyle = arrayBars[barTwoIdx].style
                    console.log(barOneStyle.height)
                    let temp = barOneStyle.height
                    barOneStyle.height = barTwoStyle.height
                    barTwoStyle.height = temp

                },i*ANIMATION_SPEED_MS)
            }
        }
    }

    const _mergeSort = () =>{
        const animations = mergeSort(array);
        for(let i=0; i < animations.length; i++){
            const arrayBars = document.getElementsByClassName("arraybar")
            const isColorChange = i % 3 !== 2;
            if(isColorChange){
                const barIdx = animations[i]
                const barOneIdx = barIdx[0]
                const barTwoIdx = barIdx[1]
                const barOneStyle = arrayBars[barOneIdx].style
                const barTwoStyle = arrayBars[barTwoIdx].style
                const color =  i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR
                setTimeout(()=>{
                    barOneStyle.backgroundColor = color
                    barTwoStyle.backgroundColor = color
                }, i*ANIMATION_SPEED_MS)
            }
            else{
                setTimeout(() =>{
                    const [barOneIdx, newHeight] = animations[i]
                    const barOneStyle = arrayBars[barOneIdx].style
                    barOneStyle.height = `${newHeight}px`
                },i*ANIMATION_SPEED_MS)
            }
          
        }
    }

    const _quickSort = () =>{
        const animations = quickSort(array,0,array.length-1)
        
        for(let i = 0 ; i < animations.length; i++){
            const arrayBars = document.getElementsByClassName("arraybar")
            const isColorChange = i % 3 !== 2;
            const element = animations[i]
            if(isColorChange){
                const child = animations[i]
                const barOneStyle = arrayBars[child[1]].style
                const barTwoStyle = arrayBars[child[2]].style
                const color =  i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR
                setTimeout(()=>{
                    barOneStyle.backgroundColor = color
                    barTwoStyle.backgroundColor = color
                }, i*ANIMATION_SPEED_MS)
            }
            else if(element[0] === 1){
                setTimeout(() =>{
                    const [swap,barOneIdx, barTwoIdx] = animations[i]
                    const barOneStyle = arrayBars[barOneIdx].style
                    const barTwoStyle = arrayBars[barTwoIdx].style
                    let temp = barOneStyle.height
                    barOneStyle.height = barTwoStyle.height
                    barTwoStyle.height = temp

                },i*ANIMATION_SPEED_MS)
            }
        
        
        }
               
            

    }
    return(
        <div className="array-container">
            {array.map((value,index)=>
                <div 
                    className="arraybar"
                    key={index}
                    style={{ 
                        height : `${value}px`,
                        backgroundColor : PRIMARY_COLOR }}>
                </div>)}
            <button onClick={()=>resetArray()}>Generate new  Array</button>
            <button onClick={_bubbleSort}>bubbleSort</button>
            <button onClick={_mergeSort}>mergeSort</button>
            <button onClick={_quickSort}>quickSort</button>
        </div>
    );
}


export default SortingVisualizer;