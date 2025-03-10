# cs628-pe05-SaiSathyakNallamalli.
# Input
The application manages recipes by accepting client HTTP inquiries. Data can be created, read, updated, and deleted by users sending it through several endpoints. Sent in JSON format via POST, GET, PUT, and DELETE requests, the input data comprises recipe specifics including name, ingredients, and directions.


# Process
The Express server answers a request by communicating with the MongoDB database. The server loads a fresh recipe document into the database for a POST request. It pulls recipe information from the database for GET inquiries. Based on the given ID, PUT requests updates to current recipe documents; DELETE requests remove the designated recipe document. These database activities are carried out by the server using the MongoDB client, therefore guaranteeing data integrity and consistency.

# Output
Every request the server answers with suitable JSON data. It returns generated, changed, or deleted recipe data for effective operations. Should mistakes arise, it provides an error message accompanied by a pertinent status code. The output guarantees that customers get instant comments on their activities, so enabling a flawless recipe control.
