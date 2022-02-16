function plot_type(arr, column_name){
    var histogram = 0, pie = 0;
    for(var i = 0; i < arr.length; i++){
        var value = parseFloat(arr[i][column_name]);
        if(Number.isNaN(value)){
            pie += 1;
        }
        else{
            histogram += 1;
        }
    }
    if(histogram > pie){
        return "histogram";
    }
    return "pie";
}

export {plot_type}