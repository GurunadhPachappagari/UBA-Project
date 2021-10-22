import * as PieChart from './PieChart.js'
import * as Histogram from './Histogram.js'
import * as Data from './select_data.js'
import * as Helpers from './Helpers.js'


var data = Data.data

console.log(data.length)

for(var i = 0; i < data.length; i++){
    console.log("#", i)
    var file = data[i];
    console.log(file.file_path)
    var json_data = await Helpers.getData(file.file_path);
    for(var j = 0; j < file.cols.length; j++){
        var column = file.cols[j];
        var column_name = column.name;
        
        var canvas = document.createElement('canvas');
        var id = file.file_path + '/' + column_name;
        canvas.setAttribute('id', id);
        document.getElementById('plots').appendChild(canvas);

        if(column.plot_type == 'pie'){
            PieChart.drawPie(file.file_path, column_name, json_data);
        }
        else if(column.plot_type == 'histogram'){
            var bins = column.bins;
            Histogram.drawHist(file.file_path, column_name, bins, json_data)
        }
    }
    console.log("#", i)
}
