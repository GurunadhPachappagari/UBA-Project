var data = [
    {
        file_path : "assets/survey_data/agricultural_survey.xlsx",
        cols : [ 
            {
                name : 'Crop 1',
                plot_type : 'pie'
            },
            {
                name : 'The area under the Crop in Prev. Year (Acre)',
                plot_type : 'histogram',
                bins : '50'
            }
        ]
    },
    {
        file_path : "assets/survey_data/Pudussery_Central.xlsx",
        cols : [ 
            {
                name : 'poverty_status',
                plot_type : 'pie'
            },
            {
                name : 'house_type',
                plot_type : 'pie'
            }
        ]
    }
]

export {data}