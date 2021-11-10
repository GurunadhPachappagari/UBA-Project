
function drawHistUtil(labels, data, column_name, file_path){
    const ctx = document.getElementById(file_path + '/' + column_name).getContext('2d');

    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
            label: column_name,
            data: data,
            backgroundColor: 'orange',
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Custom Chart Title',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                }
            },
            scales: {
            xAxes: [{
                display: false,
            }, {
                display: true,
                ticks: {
                autoSkip: false,
                }
            }],
            yAxes: [{
                ticks: {
                beginAtZero: true
                }
            }]
            }
        }
    });
}

async function drawHist(file_path, column_name, bins = 20, arr){
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
    var labels = [low]
    var ind = 0
    var freq = [(data[ind++] || 0)]
    for(var i = low; i <= high; i += gap){
        labels.push(i + gap);
        freq.push((data[ind++] || 0))
    }
    drawHistUtil(labels, freq, column_name, file_path);
}


export {drawHist, drawHistUtil}
