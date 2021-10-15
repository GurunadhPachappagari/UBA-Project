function drawPieUtil(labels, data){
    var ctx = document.getElementById("myChart").getContext('2d');
    var i;
    bg_colors = []
    for(i = 0; i < labels.length; i){
        clr = '#'+Math.floor(Math.random()*16777215).toString(16);
        if(!bg_colors.includes(clr)){
            bg_colors.push(clr);
             i++
        }
    }
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            "labels": labels,
            datasets: [{
            // backgroundColor: [
            //     '#'+Math.floor(Math.random()*16777215).toString(16),
            //     '#'+Math.floor(Math.random()*16777215).toString(16),
            //     '#'+Math.floor(Math.random()*16777215).toString(16),
            //     '#'+Math.floor(Math.random()*16777215).toString(16),
            //     '#'+Math.floor(Math.random()*16777215).toString(16),
            //     '#'+Math.floor(Math.random()*16777215).toString(16),
            //     '#'+Math.floor(Math.random()*16777215).toString(16)
            // ],
            backgroundColor: bg_colors,
            data: data
            }]
        }
    });
}


async function getData(file_path){
    const response = await fetch(file_path);
    const data = await response.arrayBuffer();
    var XL_row_object;
    var workbook = XLSX.read(new Uint8Array(data), {
        type: 'array'
    });
    workbook.SheetNames.forEach(function(sheetName) {
        XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        // json_object = JSON.stringify(XL_row_object);
      })
    return XL_row_object;
}


async function drawPie(file_path, column_name){
    const arr = await getData(file_path);
    // console.log(arr.length)
    // console.log(arr[10]['Crop 1'])
    var label_set = {}
    for(var i = 0; i < arr.length; i++){
        if(label_set[arr[i][column_name]] == undefined){
            label_set[arr[i][column_name]] = 1;
        }
        else{
            label_set[arr[i][column_name]] += 1;
        }
    }
    console.log(label_set)
    data = []
    labels = []
    for(var i in label_set){
        labels.push(i)
        data.push(label_set[i])
    }
    drawPieUtil(labels, data);


}

file_path = 'assets/survey_data/agricultural_survey.xlsx'
column_name = 'Crop 1'
drawPie(file_path, column_name);