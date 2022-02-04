
function drawHistUtil(labels, data, column_name, file_path, description){
    const ctx = document.getElementById(file_path + '/' + column_name).getContext('2d');
    var i;
    var bg_colors = []
    for(i = 0; i < labels.length; i){
        var clr = '#'+Math.floor(Math.random()*16777215).toString(16);
        if(!bg_colors.includes(clr)){
            bg_colors.push(clr);
             i++
        }
    }
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
            // label: column_name,
            data: data,
            backgroundColor: bg_colors,
            }]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: "frequency"
                  }
                }],
                xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: column_name
                    }
                }]
            },
            title: {
              display: true,
              text: [description], 
              position : 'bottom'
            },
            responsive : false,
            // maintainAspectRatio: false
        },
    });
}

async function drawHist(file_path, column_name, bins = 20, arr, description = ""){
    // console.log(arr.length)
    // console.log(arr[10][column_name])
    var samples = []
    for(var i = 0; i < arr.length; i++){
        var value = parseFloat(arr[i][column_name]);
        if(Number.isNaN(value)){
            continue;
        }
        samples.push(value);
    }
    var high = Math.ceil(Math.max.apply(Math, samples));
    var low = Math.floor(Math.min.apply(Math, samples));
    // console.log(high, low)
    var gap = Math.ceil((high - low)/bins)
    // console.log(gap)
    var data = {}
    for(var i = 0; i < samples.length; i++){
        var window_num = Math.floor((samples[i] - low)/gap);
        data[window_num] = (data[window_num] || 0) + 1;
    }
    // console.log(data)
    var labels = [low.toString() + "-" + (low + gap).toString()]
    // var labels = [low]
    var ind = 0
    var freq = [(data[ind++] || 0)]
    for(var i = low + gap; i <= high; i += gap){
        labels.push((i).toString() + "-" + (i + gap).toString());
        freq.push((data[ind++] || 0))
    }
    drawHistUtil(labels, freq, column_name, file_path, description);
}


export {drawHist, drawHistUtil}
