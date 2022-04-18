import * as PieChart from './PieChart.js'
import * as Histogram from './Histogram.js'
import * as Helpers from './Helpers.js'
import * as WProcess from './WordProcessing.js'


const asyncPostCall = async (param, JSONbody = {}) => {
    try {
        const response = await fetch('http://61.0.251.140:8080/' + param, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
           },
           body: JSON.stringify(JSONbody)
         });
         const m_data = await response.json();
         console.log(m_data);
         return m_data;
    } 
    catch(error) {
          console.log(error);
    } 
}

var temp_data = await asyncPostCall('file_paths');
var filePaths = temp_data.files;
var columns, plotType;
var json_data;


// window.onload = function () {
    var dropDownContent = document.getElementById("Dataset");
    // for (var country in stateObject) {
    for(var i = 0; i < filePaths.length; i++){
        var file_path = filePaths[i];
        dropDownContent.options[dropDownContent.options.length] = new Option(file_path, i);
    }
    dropDownContent.onchange = async function () {
        var parentTbl = document.getElementById("columnsTable");
        var parentTbl2 = document.getElementById("columnsTable2");
        parentTbl.innerHTML = "<thead><tr><th>Pie Charts</th></tr></thead>";
        parentTbl2.innerHTML = "<thead><tr><th>Histograms</th></tr></thead>";
        if (this.selectedIndex < 1) return; // done   
        // REQ Column names of selected column
        var colPlot = await asyncPostCall('column', {file_path: filePaths[this.value]});
        columns = colPlot.columns; 
        plotType = colPlot.plotType;
        json_data = await Helpers.getData(filePaths[this.value]);
        for(var i = 0; i < plotType.length; i++){
            var column = columns[i];
            if(WProcess.isSensetive(column)){
                continue;
            }
            var row = document.createElement('tr');
            var check_id = (filePaths[this.value] + column).replace(/ /g, '_');
            var column_type = plotType[i];
            // REQ plot type of each column
            if(column_type == 'pie'){
                parentTbl.appendChild(row);
    
                var newel = document.createElement('td');
                
                newel.innerHTML = "<input type='checkbox' id=" + check_id + ">";
                
                newel.innerHTML += "<label for="+ check_id +">"+ column +"</label>";
                row.appendChild(newel);
                continue;
            }
            // var newel = document.createElement('td');
            parentTbl2.appendChild(row);
    
            var newel = document.createElement('td');
            newel.innerHTML = "<input type='checkbox' id=" + check_id + ">";
            newel.innerHTML += " " + "<label for="+ check_id +">"+ column +" with #</label> "
            newel.innerHTML += "<input type='number' min='1' max='100' step='5' value='20' id=" + "bins_" + column.replace(/ /g, '_') + ">";
            newel.innerHTML += "<label for="+ check_id +">"+ " Bins" +"</label>";
            
            row.appendChild(newel);
            // console.log(column);
        }
    }
// }


var form = document.getElementById("dSetFormSubmit")
form.addEventListener("click", async function(evt){
    document.getElementById('plots').innerHTML = ""
    for(var j = 0; j < filePaths.length; j++){
        var file_path = filePaths[j];
        var cols_len = Object.keys(json_data[0]).length;
        for(var i = 0; i < plotType.length; i++){
            var column_name = columns[i];
            var check_box = document.getElementById((file_path + column_name).replace(/ /g, '_'));
            if( check_box == null || check_box.checked == false){
                continue;
            }
            if(WProcess.isSensetive(column_name)){
                continue;
            }
            
            var canvas = document.createElement('canvas');
            var id = file_path + '/' + column_name;
            canvas.setAttribute('id', id);
            document.getElementById('plots').appendChild(canvas);
            var column_type = plotType[i];
            if(column_type == 'pie'){
                var description = "Pie chart showing the distribution of " + column_name + " from " + file_path.substring(19, file_path.length - 5);
                // get_stats
                var body = {"file_path": file_path, "column": column_name, "plotType" : column_type};
                var labelFreq = await asyncPostCall('get_stats', body);
                var label = labelFreq.label;
                var freq = labelFreq.freq;
                PieChart.drawPieUtil(label, freq, column_name, file_path, description);
            }
            else if(column_type == 'histogram'){
                var description = "Histogram showing the distribution of " + column_name + " from " + file_path.substring(19, file_path.length - 5);
                var bins = document.getElementById("bins_" + column_name.replace(/ /g, '_')).value;
                // get_stats
                var body = {"file_path": file_path, "column": column_name, "plotType" : column_type, "bins": bins};
                var labelFreq = await asyncPostCall('get_stats', body);
                var label = labelFreq.label;
                var freq = labelFreq.freq;
                Histogram.drawHistUtil(label, freq, column_name, file_path, description);
            }
        }
    }

})
