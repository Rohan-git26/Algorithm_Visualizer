import { insertionSort } from "../SortingAlgorithms/insertionSort";


const insertionSortAnimation = (array) =>{
    const animations = insertionSort(array)
    for(let i = 0; i<animations.length; i++){
        const arrayBars = document.getElementsByClassName("arraybar")
        const element = animations[i]
        const isColorChange = i%3 !== 0
        if(isColorChange){

        }
        else{
            if(element[0] === 1){
                const [,barOneIdx,barTwoIdx] = animations[i]
                const barOneStyle = arrayBars[barOneIdx].style
                const barTwoStyle = arrayBars[barTwoIdx].style
                setTimeout(() =>{
                    barOneStyle.height = barTwoStyle.height
                    console.log("height changed")
                },i*10)
            }
        }
    }
}

export default insertionSortAnimation