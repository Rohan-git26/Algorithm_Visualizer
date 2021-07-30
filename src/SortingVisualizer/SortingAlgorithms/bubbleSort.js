export  function bubbleSort(arr){
    const animations = []
    for(let i = 0; i < arr.length -1 ; i++){
        let k = (arr.length - 2 )- i
        for(let j = 0; j < arr.length -i-1; j++){

            animations.push([0,j,j+1])
            
            if(i === arr.length - 2 && j === k){
                animations.push([3,j,j+1])
            }
            else if(j === k){
                animations.push([2,j,j+1])
            }
            else animations.push([0,j,j+1])

            
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


