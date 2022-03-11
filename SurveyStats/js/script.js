import * as PieChart from './PieChart.js'
import * as Histogram from './Histogram.js'
import * as Helpers from './Helpers.js'
import * as WProcess from './WordProcessing.js'
import * as PType from './PlotType.js'

// var data = Data.data;

const asyncPostCall = async () => {
    try {
        const response = await fetch('http://localhost:8080/file_paths', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
           },
           body: JSON.stringify({
     // your expected POST request payload goes here
            //  title: "My post title",
            //  body: "My post content."
            column:"Agricultural Data"
            })
         });
         const m_data = await response.json();
      // enter you logic when the fetch is successful
         console.log(m_data);
         return m_data;
       } catch(error) {
     // enter your logic for when there is an error (ex. error toast)

          console.log(error)
         } 
    }

var temp_data = await asyncPostCall();
var data = temp_data.files;
// REQ list of file paths

var json_data;


// window.onload = function () {
    var dropDownContent = document.getElementById("Dataset");
    // for (var country in stateObject) {
    for(var i = 0; i < data.length; i++){
        var file_path = data[i];
        dropDownContent.options[dropDownContent.options.length] = new Option(file_path, i);
    }
    dropDownContent.onchange = async function () {
        var parentTbl = document.getElementById("columnsTable");
        var parentTbl2 = document.getElementById("columnsTable2");
        parentTbl.innerHTML = "<thead><tr><th>Pie Charts</th></tr></thead>";
        parentTbl2.innerHTML = "<thead><tr><th>Histograms</th></tr></thead>";
        if (this.selectedIndex < 1) return; // done   
        // REQ Column names of selected column
        json_data = await Helpers.getData("assets/survey_data/" + data[this.value]);
        for(var col in json_data[0]){
            // for(var j = 0; j < cols_len; j++){
            if(!json_data[0].hasOwnProperty(col)){
                continue;
            }
            // console.log(col + "hi")
            if(WProcess.isSensetive(col)){
                continue;
            }
            var column = col;

            var row = document.createElement('tr');
            // row.setAttribute('id', "table_row");
            // parentTbl.appendChild(row);
    
            // var newel = document.createElement('td');
            // newel.innerHTML = "<input type='checkbox' id=" + (data[this.value].file_path + column).replace(/ /g, '_') + ">";
            var check_id = (data[this.value] + column).replace(/ /g, '_');
            var column_type = PType.plot_type(json_data, col);
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

        // var parentTbl = document.getElementById("binsTable");
        // var row = document.createElement('tr');
        // row.setAttribute('id', "bin_row");
        // parentTbl.innerHTML = "";
        // parentTbl.appendChild(row);
        // for(var col in json_data[0]){
        //     if(!json_data[0].hasOwnProperty(col)){
        //         continue;
        //     }
            // console.log(col + "hi")
            // var column = col;
            // var column_type = PType.plot_type(json_data, col);
            // if(column_type == 'pie'){
            //     continue;
            // }
            // var newel = document.createElement('td');
            // newel.innerHTML = column + "<input type='number' min='1' max='100' step='5' value='20' id=" + "bins_" + column.replace(/ /g, '_') + ">";
            // row.appendChild(newel);
            // console.log(column);
        // }
    }
// }


var form = document.getElementById("dSetFormSubmit")
form.addEventListener("click", async function(evt){
    document.getElementById('plots').innerHTML = ""
    for(var i = 0; i < data.length; i++){
        var file_path = data[i];
        // var json_data = await Helpers.getData(file_path);
        var cols_len = Object.keys(json_data[0]).length;
        // console.log(json_data[0], Object.keys(json_data[0]).length);
        for(var col in json_data[0]){
        // for(var j = 0; j < cols_len; j++){
            if(!json_data[0].hasOwnProperty(col)){
                continue;
            }
            // console.log(col + "hi")
            var column_name = col;
            var check_box = document.getElementById((file_path + column_name).replace(/ /g, '_'));
            if( check_box == null || check_box.checked == false){
                // console.log("not selected " + column_name)
                continue;
            }
            if(WProcess.isSensetive(column_name)){
                continue;
            }
            
            var canvas = document.createElement('canvas');
            var id = file_path + '/' + column_name;
            canvas.setAttribute('id', id);
            document.getElementById('plots').appendChild(canvas);
            var column_type = PType.plot_type(json_data, col);
            if(column_type == 'pie'){
                var description = "Pie chart showing the distribution of " + col + " from " + file_path.substring(19, file_path.length - 5);
                PieChart.drawPie(file_path, column_name, json_data, description);
            }
            else if(column_type == 'histogram'){
                var description = "Histogram showing the distribution of " + col + " from " + file_path.substring(19, file_path.length - 5);
                // var bins = column.bins;
                var bins = document.getElementById("bins_" + column_name.replace(/ /g, '_')).value;
                // console.log(nBins);
                Histogram.drawHist(file_path, column_name, bins, json_data, description);
            }
        }
    }

})
