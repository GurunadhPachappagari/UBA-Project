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

export {getData}