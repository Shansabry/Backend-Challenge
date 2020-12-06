# Backend-Challenge

Endpoints URL & conditions
----------------

1) Provide Average Website visit for a given date

      http://localhost:4000/sites?from=2020-05-14
      
2) Provide Average website visit for a given date range

      http://localhost:4000/sites?from=2020-05-14&to=2020-08-14
      
3) Provide Key Value pair for a given date range

      http://localhost:4000/sites?from=2020-05-14&to=2020-08-14&isInfoRequired=true
      
Error Handlings
---------------

1) When no conditions are given to the url (Message: "Specify the start date to proceed")
      http://localhost:4000/sites
      
2) When wrong date format is given (Message: ""Ooopppss.., Something went wrong with the URL!!!!!"")
      http://localhost:4000/sites?from=202012/22
      
3) When end date is greater than start date (Message: "The end date is greater than start date")
      http://localhost:4000/sites?from=2020-05-14&to=2019-08-14&isInfoRequired=true
      
4) When date.json schema is changed. The error is handled as below

{
     "errors": [
        {
           "keyword": "required",
           "dataPath": "/286",
           "schemaPath": "#/items/required",
           "params": {
               "missingProperty": "date"
             },
           "message": "should have required property 'date'"
        }
    ]
}
