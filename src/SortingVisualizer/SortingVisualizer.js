import React, { useState, useEffect } from "react";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import "./SortingVisualizer.css";
import bubbleSortAnimation from "./SortingAnimations/bubbleSortAnimation";
import quickSortAnimation from "./SortingAnimations/quickSortAnimation";
import selectionSortAnimation from "./SortingAnimations/selectionSortAnimation";
import insertionSortAnimation from "./SortingAnimations/insertionSortAnimation";
import mergeSortAnimation from "./SortingAnimations/mergeSortAnimation";
const useStyles = makeStyles({
  root: {
    width: 165,
    position : "relative",
    bottom : 8,
  },
  label:{
    fontSize : 14,
    position : "relative",
    top : 2,
    color : "white",
    fontWeight : "bold"
  }
});
const PRIMARY_COLOR = "turquoise";
const SortingVisualizer = () => {
  const classes = useStyles();
  const [array, setArray] = useState([]);
  const [value, setValue] = useState(30);
  const [ANIMATION_SPEED_MS, setANIMATION_SPEED_MS] = useState(2);
  const [currentSort, setCurrentSort] = useState("Algorithms");

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
    mergeSortAnimation(array, ANIMATION_SPEED_MS);
  };

  //QuickSort Animation
  const _quickSort = () => {
    quickSortAnimation(array, ANIMATION_SPEED_MS);
  };

  const _selectionSort = () => {
    selectionSortAnimation(array, ANIMATION_SPEED_MS);
  };
  const _insertionSort = () => {
    insertionSortAnimation(array, ANIMATION_SPEED_MS);
  };
  const handleChange = (event, value) => {
    setValue(value);
    resetArray(value);
  };
  const handleChangeSpeed = (event, value) => {
    setANIMATION_SPEED_MS(value);
  };
  const handleChangeCurrentSort = (event) => {
    setCurrentSort(event.target.value);
  };
  const visualizeAlgorithm = () => {
    switch (currentSort) {
      case "bubbleSort":
        _bubbleSort();
        break;
      case "insertionSort":
        _insertionSort();
        break;
      case "quickSort":
        _quickSort();
        break;
      case "mergeSort":
        _mergeSort();
        break;
      case "selectionSort":
        _selectionSort();
        break;
      default:
        break;
    }
  };

  return (
    <div className="array-container">
      <div className="infoBar-container">
        <div className="slider-container">
        <Typography className={classes.label} gutterBottom>
              SPEED
          </Typography>          
          <Slider
            className={classes.root}
            value={ANIMATION_SPEED_MS}
            min={2}
            max={230}
            onChange={handleChangeSpeed}
            aria-labelledby="continuous-slider"
          />
          <Typography className={classes.label}>
            BARS
          </Typography>
          <Slider
            className={classes.root}
            value={value}
            min={10}
            max={newWidth / 5}
            onChange={handleChange}
            aria-labelledby="continuous-slider"
          />
        </div>
        <div className="button-container">
          {/* Button 3 */}
          <button onClick={() => resetArray(value)}>Generate new Array</button>
          <select onChange={handleChangeCurrentSort} className="dropdown-list">
            <option selected value="bubbleSort">
              Bubble Sort
            </option>
            <option value="insertionSort">Insertion Sort</option>
            <option value="quickSort">Quick Sort</option>
            <option value="mergeSort">Merge Sort</option>
            <option value="selectionSort">SelectionSort</option>
          </select>
          <button onClick={visualizeAlgorithm}>Visuaize Algorithm</button>
        </div>
        <div className="grap-container">{/* Graph or Index */}
            <button>Button</button>
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
    </div>
  );
};

export default SortingVisualizer;
