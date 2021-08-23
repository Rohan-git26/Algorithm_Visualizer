import React, { useState, useEffect } from "react";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";

import "./SortingVisualizer.css";
import { mergeSort } from "./SortingAlgorithms/mergeSort";
import bubbleSortAnimation from "./SortingAnimations/bubbleSortAnimation";
import quickSortAnimation from "./SortingAnimations/quickSortAnimation";
import selectionSortAnimation from "./SortingAnimations/selectionSortAnimation";
import insertionSortAnimation from "./SortingAnimations/insertionSortAnimation";
const useStyles = makeStyles({
  root: {
    width: 200,
  },
});
const PRIMARY_COLOR = "turquoise";
const SECONDARY_COLOR = "red";

const SortingVisualizer = () => {
  const classes = useStyles();
  const [array, setArray] = useState([]);
  const [value, setValue] = useState(30);
  const [ANIMATION_SPEED_MS, setANIMATION_SPEED_MS] = useState(2);

  //Run this during first render
  useEffect(() => {
    const { _height } = getWindowDimensions();

    const _resetArray = () => {
      const temp = [];
      for (let i = 0; i < value; i++) {
        temp.push(randomIntFromInterval(5, _height - _height / 3));
      }
      setArray(temp);
    };
    _resetArray();
  }, []);

  //Getting dimensions of window
  function getWindowDimensions() {
    const { innerWidth: _width, innerHeight: _height } = window;
    return {
      _width,
      _height,
    };
  }

  //Calling getWindowDimensions method(destructering)
  const { _height, _width } = getWindowDimensions();
  const newWidth = _width - _width / 8;

  //creating new random array
  const resetArray = (NO_OF_ARRAY_BAR) => {
    const temp = [];
    for (let i = 0; i < NO_OF_ARRAY_BAR; i++) {
      temp.push(randomIntFromInterval(5, _height - _height / 3));
    }
    setArray(temp);
    const allBars = document.querySelectorAll(".arraybar");
    for (let i = 0; i < allBars.length; i++) {
      const barStyle = allBars[i].style;
      barStyle.backgroundColor = "turquoise";
    }
  };

  //Creating random Integer
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  //BubbleSort animation
  const _bubbleSort = () => {
    bubbleSortAnimation(array, ANIMATION_SPEED_MS);
  };

  //MergeSort Animation
  const _mergeSort = () => {
    const animations = mergeSort(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("arraybar");
      const isColorChange = i % 3 !== 1;
      if (isColorChange) {
        const barIdx = animations[i];
        const barOneIdx = barIdx[0];
        const barTwoIdx = barIdx[1];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };

  //QuickSort Animation
  const _quickSort = () => {
    quickSortAnimation(array, ANIMATION_SPEED_MS);
  };

  const _selectionSort = () => {
    selectionSortAnimation(array, ANIMATION_SPEED_MS);
  };
  const _insertionSort = () => {
    insertionSortAnimation(array);
  };
  const handleChange = (event, value) => {
    setValue(value);
    resetArray(value);
  };
  const handleChangeSpeed = (event, value) => {
    setANIMATION_SPEED_MS(value);
    console.log(value);
  };

  return (
    <div className="array-container">
      <div className="infoBar-container">
        <div className="slider-container">
         
            <Slider
              className={classes.root}
              value={ANIMATION_SPEED_MS}
              min={2}
              max={250}
              onChange={handleChangeSpeed}
              aria-labelledby="continuous-slider"
            />
         
     
            <Slider
              className={classes.root}
              value={value}
              min={10}
              max={newWidth / 5}
              onChange={handleChange}
              aria-labelledby="continuous-slider"
            />
        
        </div>
        <div>
          {/* Button 3 */}
          <button onClick={() => resetArray(value)}>Generate new Array</button>
          <button onClick={_bubbleSort}>bubbleSort</button>
          <button onClick={_mergeSort}>mergeSort</button>
        </div>
        <div>
          {/* Graph or Index */}
          <button onClick={_bubbleSort}>bubbleSort</button>
          <button onClick={_mergeSort}>mergeSort</button>
        </div>
      </div>

      {/* Array Bars */}
      <div className="arraybar-container">
        {array.map((_value, index) => (
          <div
            className="arraybar"
            key={index}
            style={{
              height: `${_value}px`,
              width: newWidth / value - 2,
              paddingLeft: 0,
              backgroundColor: PRIMARY_COLOR,
            }}
          ></div>
        ))}
      </div>

      <button onClick={() => resetArray(value)}>Generate new Array</button>
      <button onClick={_bubbleSort}>bubbleSort</button>
      <button onClick={_mergeSort}>mergeSort</button>
      <button onClick={_quickSort}>quickSort</button>
      <button onClick={_selectionSort}>selectionSort</button>
      <button onClick={_insertionSort}>insertionSort</button>
    </div>
  );
};

export default SortingVisualizer;
