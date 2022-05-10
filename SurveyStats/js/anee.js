document.getElementById("m1").innerHTML = "Map Visualization";
document.getElementById("m2").innerHTML = "The maps are only shown for the pie chart columns ";

var colNAMES = [];
var file_name;

function map_show(final_arr, centre_lat, centre_long, col_name, file_path) {
    var colorScale; // accessible in d3.csv() and makeCrimeMap()
    // Load some data and add it to the map!
    // d3.csv('./store_files/poverty_status.csv', function(error, crimeData) {
    colorScale = d3.scale.category10();
    var radiusScale = d3.scale.linear()
        .domain([0, d3.max(final_arr, function(data) { return +data.count; })])
        .range([1, 20]);
    var geoJSONdataFeatures = [];

    final_arr.forEach(function(data, p) {
        var info = "<span style='color:" + colorScale(data[col_name]) + "'><b>" +
            data[col_name] + "</b></span><br/>" +
            "count: <b>" + data.count + "</b>, " +
            "village_name: <b>" + data.village_name + "</b> "


        var geoJSONFeature = {
            "type": "Feature",
            "properties": { // used to style marker below
                "color": colorScale(data[col_name]),
                "radius": radiusScale(+data.count * 3),
                "info": info
            },
            "geometry": {
                "type": "Point",
                "coordinates": [+data.longitude, +data.latitude] // note long lat!
            }
        };
        geoJSONdataFeatures.push(geoJSONFeature);
        // console.log("heyyyyyyyy");
        // console.log(geoJSONdataFeatures);
    });

    // var ctx = document.getElementById(file_path + "/" + col_name+" for_map");

    var map = L.map(file_path + "/" + col_name + " for_map"),
        bwOsmURL = "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        osmAttrs = "Map data © <a href='http://openstreetmap.org'>OpenStreetMap</a>";

    var osmTiles = new L.TileLayer(bwOsmURL, {
        minZoom: 1,
        maxZoom: 20,
        attribution: osmAttrs
    });

    var nycCoord = new L.LatLng(centre_lat, centre_long);
    map.setView(nycCoord, 14); // latlng, zoom level
    map.addLayer(osmTiles);
    L.geoJson(geoJSONdataFeatures, {
        style: function(feature) {
            return {
                color: '#000',
                opacity: 0.8,
                radius: feature.properties.radius,
                fillColor: feature.properties.color,
                fillOpacity: 0.3
            };
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup(feature.properties.info);
        },
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        }

    }).addTo(map);

    // console.log("workkkk");

    // map.invalidateSize();

    var legendWidth1 = 250,
        legendHeight1 = 300;

    var i_l = document.getElementById(file_path + "/" + col_name + " for_legend");

    var legend1 = d3.select(i_l).append('svg')
        .attr('width', legendWidth1)
        .attr('height', legendHeight1);

    var legends1 = legend1.selectAll(".legend")
        .data(colorScale.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    //draw legend colored rectangles
    legends1.append("rect")
        .attr("x", legendWidth1 - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", colorScale);

    //draw legend text
    legends1.append("text")
        .attr("x", legendWidth1 - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return [col_name + " map", d.toLowerCase()]; })

    // map.off();
}





function visualized_map(file_path, col_name) {
    colNAMES.push(col_name);
    file_name = file_path;
}
export { visualized_map, map_show };