export function quickSort(array){
    const animations = []
    quickSortHelper(array,0,array.length - 1,animations)
    return animations
}

export function quickSortHelper(array,start,end,animations){
    if(start<end){
        const pIndex = partition(array,start,end,animations)
        quickSortHelper(array,start,pIndex-1,animations)
        quickSortHelper(array,pIndex+1,end,animations)
    }
}

function partition(array,start,end,animations){
    const pivot = array[end]
    let i = start

    for(let j = start; j<=end - 1; j++){
        animations.push([0,j,end])
        animations.push([0,j,end])

        if(array[j]<=pivot){
            animations.push([1,i,j])
           
            swap(array,i,j)
            i++
            if(j === (end -1)){
                animations.push([0,i,end])
                animations.push([2,i,end])
                animations.push([1,i,end])
            }
        }
        else{
            animations.push([-1,i,j])
            if(j === (end -1)){
                animations.push([0,i,end])
                animations.push([2,i,end])
                animations.push([1,i,end])
            }
        }
    }
    swap(array,i,end)
    return i
}


function swap(array, i, j){
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
}