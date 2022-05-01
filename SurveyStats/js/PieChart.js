function drawPieUtil(labels, freq, column_name, file_path, description) {
    var ctx = document.getElementById(file_path + "/" + column_name).getContext('2d');
    var i;
    var bg_colors = []
    for (i = 0; i < labels.length; i) {
        var clr = '#' + Math.floor(Math.random() * 16777215).toString(16);
        if (!bg_colors.includes(clr)) {
            bg_colors.push(clr);
            i++
        }
    }
    var myChart = new Chart(ctx, {
        type: 'pie',
        options: {
            title: {
                display: true,
                text: [description],
                position: 'bottom'
            },
            responsive: false
        },
        data: {
            labels: labels,
            datasets: [{
                backgroundColor: bg_colors,
                data: freq
            }]
        }
    });

}

// async function drawPie(file_path, column_name, arr, description = ""){
//     // console.log(arr.length)
//     // console.log(arr[10]['Crop 1'])
//     // REQ : labels, data
//     var label_set = {}
//     for(var i = 0; i < arr.length; i++){
//         var s = arr[i][column_name]
//         try {
//             var s = s.trim()
//         }
//         catch(err) {
//             console.log(err);
//             // console.log(s, column_name, i)
//             continue;
//         }
//         if(label_set[s] == undefined){
//             label_set[s] = 1;
//         }
//         else{
//             label_set[s] += 1;
//         }
//     }
//     // console.log(label_set)

//     var data = []
//     var labels = []
//     for(var i in label_set){
//         labels.push(i)
//         data.push(label_set[i])
//     }
//     drawPieUtil(labels, data, column_name, file_path, description);
// }

export { drawPieUtil }