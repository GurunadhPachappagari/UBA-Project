import * as PieChart from './PieChart.js'
import * as Histogram from './Histogram.js'
import * as Data from './select_data.js'
import * as Helpers from './Helpers.js'
import * as WProcess from './WordProcessing.js'

var data = Data.data


for(var i = 0; i < data.length; i++){
    var file = data[i];
    var json_data = await Helpers.getData(file.file_path);
    for(var j = 0; j < file.cols.length; j++){
        var column = file.cols[j];
        var column_name = column.name;
        var description = column.description;
        if(WProcess.isSensetive(column_name)){
            continue;
        }
        
        var canvas = document.createElement('canvas');
        var id = file.file_path + '/' + column_name;
        canvas.setAttribute('id', id);
        document.getElementById('plots').appendChild(canvas);

        if(column.plot_type == 'pie'){
            PieChart.drawPie(file.file_path, column_name, json_data, description);
        }
        else if(column.plot_type == 'histogram'){
            var bins = column.bins;
            Histogram.drawHist(file.file_path, column_name, bins, json_data, description)
        }
    }
}
