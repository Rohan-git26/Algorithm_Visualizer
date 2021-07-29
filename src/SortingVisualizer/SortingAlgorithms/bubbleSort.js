export  function bubbleSort(arr){
    const animations = []
    for(let i = 0; i < arr.length-1 ; i++){
        for(let j = 0; j < arr.length -i- 1; j++){

            animations.push([0,j,j+1])
            animations.push([0,j,j+1])

            
            if(arr[j] > arr[j+1]){
                animations.push([1,j,j+1])
                const temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
                
            }
            else{
                animations.push([-1,j,j+1])
            }
        }
    }
    return animations;
}


