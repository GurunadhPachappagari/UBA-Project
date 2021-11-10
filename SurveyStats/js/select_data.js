var data = [
    {
        file_path : "assets/survey_data/agricultural_survey.xlsx",
        cols : [ 
            {
                name : 'Crop 1',
                plot_type : 'pie',
                description: 'The distribution of crops which are sowed for crop 1'
            },
            {
                name : 'The area under the Crop in Prev. Year (Acre)',
                plot_type : 'histogram',
                bins : '50',
                description: 'The distribution of area under the crop from previous years (in acres)'
            }
        ]
    },
    {
        file_path : "assets/survey_data/Pudussery_Central.xlsx",
        cols : [ 
            {
                name : 'education',
                plot_type : 'pie',
                description : 'The distribution of educational status of citizens of Pudussery Central based on a survey'
            },
            {
                name : 'poverty_status',
                plot_type : 'pie',
                description : 'The distribution of poverty status based on survey conducted at Pudussery Central'
            },
            {
                name : 'house_type',
                plot_type : 'pie',
                description : 'The distribution of types of houses based on survey conducted at Pudussery Central'
            },

        ]
    }
]

export {data}