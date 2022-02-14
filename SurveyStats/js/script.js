import * as PieChart from './PieChart.js'
import * as Histogram from './Histogram.js'
import * as Data from './select_data.js'
import * as Helpers from './Helpers.js'
import * as WProcess from './WordProcessing.js'

var data = Data.data;



// window.onload = function () {
    var dropDownContent = document.getElementById("Dataset");
    // for (var country in stateObject) {
    for(var i = 0; i < data.length; i++){
        var file = data[i];
        var file_path = file.file_path;
        dropDownContent.options[dropDownContent.options.length] = new Option(file_path, i);
    }
    dropDownContent.onchange = function () {
        var parentTbl = document.getElementById("columnsTable");
        var row = document.createElement('tr');
        row.setAttribute('id', "table_row");
        parentTbl.innerHTML = "";
        parentTbl.appendChild(row);
        if (this.selectedIndex < 1) return; // done   
        for(var j = 0; j < data[this.value].cols.length; j++){
            var column = data[this.value].cols[j].name;
            var newel = document.createElement('td');
            newel.innerHTML = "<input type='checkbox' id=" + column.replace(/ /g, '_') + ">" + column;
            row.appendChild(newel);
            // console.log(column);
        }

        var parentTbl = document.getElementById("binsTable");
        var row = document.createElement('tr');
        row.setAttribute('id', "bin_row");
        parentTbl.innerHTML = "";
        parentTbl.appendChild(row);
        for(var j = 0; j < data[this.value].cols.length; j++){
            var column = data[this.value].cols[j].name;
            var column_type = data[this.value].cols[j].plot_type;
            if(column_type == 'pie'){
                continue;
            }
            var newel = document.createElement('td');
            newel.innerHTML = column + "<input type='number' min='1' max='100' step='5' value='20' id=" + "bins_" + column.replace(/ /g, '_') + ">";
            row.appendChild(newel);
            // console.log(column);
        }
    }
// }


var form = document.getElementById("dSetFormSubmit")
form.addEventListener("click", async function(evt){
    document.getElementById('plots').innerHTML = ""
    for(var i = 0; i < data.length; i++){
        var file = data[i];
        var json_data = await Helpers.getData(file.file_path);
        for(var j = 0; j < file.cols.length; j++){
            var column = file.cols[j];
            var column_name = column.name;
            var description = column.description;
            var check_box = document.getElementById(column_name.replace(/ /g, '_'));
            if( check_box == null || check_box.checked == false){
                // console.log("not selected " + column_name)
                continue;
            }
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
                // var bins = column.bins;
                var bins = document.getElementById("bins_" + column_name.replace(/ /g, '_')).value;
                // console.log(nBins);
                Histogram.drawHist(file.file_path, column_name, bins, json_data, description);
            }
        }
    }

})