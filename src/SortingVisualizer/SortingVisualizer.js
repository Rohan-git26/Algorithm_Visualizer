import React,{ useState, useEffect} from 'react';

import './SortingVisualizer.css';
import { mergeSort } from './SortingAlgorithms/mergeSort';
import bubbleSortAnimation from './SortingAnimations/bubbleSortAnimation'
import quickSortAnimation from './SortingAnimations/quickSortAnimation'



const ANIMATION_SPEED_MS = 1
const PRIMARY_COLOR = 'turquoise'
const SECONDARY_COLOR = 'red'
const NO_OF_BARS = 50

const SortingVisualizer = () =>{
    const [array, setArray] = useState([])

    //Run this during first render
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


    //Getting dimensions of window
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: _height } = window;
        return {
          width,
          _height
        };
      }
    
    //Calling getWindowDimensions method(destructering)
    const {_height} = getWindowDimensions();

    //creating new random array
    const resetArray = () =>{
        const temp = [];
        for(let i=0; i<NO_OF_BARS; i++){
            temp.push(randomIntFromInterval(5,_height-(_height/3)))
        }
        setArray(temp);
        console.log(array)
    }
    
    //Creating random Integer
    const randomIntFromInterval = (min,max) =>{
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    
    //BubbleSort animation
    const _bubbleSort =  () =>{
        bubbleSortAnimation(array)
    }

    //MergeSort Animation
    const _mergeSort = () =>{
        const animations = mergeSort(array);
        for(let i=0; i < animations.length; i++){
            const arrayBars = document.getElementsByClassName("arraybar")
            const isColorChange = i % 3 !== 1;
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

    //QuickSort Animation
    const _quickSort = () =>{
        quickSortAnimation(array)
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