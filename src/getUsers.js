const helper_functions = require("./helper_functions");

let params = [];
let paramIndex = 1;

const constructDBQuery = (userId, userPassword) => {
    let baseQuery = `
        SELECT users_id, user_password
            FROM users`;
    
    let whereClause = " WHERE ";
    let conditions = [];
    
    if (userId) {
        conditions.push(`person_id = $${paramIndex}`);
        paramIndex++;
        params.push(userId);
    }
    
    if (userPassword) {
        conditions.push(`password = $${paramIndex}`);
        paramIndex++;
        params.push(userPassword);
    }
    
    
    
    for(let i = 0; i < conditions.length; i++) {
        if (i !== 0) {
            whereClause += " AND ";
        }
        
        whereClause += conditions[i];
    }
    
    let fullQuery = null;
    if (whereClause.length === 7) {
        fullQuery = baseQuery;
    }
    else {
        fullQuery = baseQuery + whereClause;
    }
     
    return fullQuery;
};

exports.handler = async (event) => {
    let userId        = event?.pathParameters?.userId;
    let userPassword  = event?.queryStringParameters?.userPassword;
    
    const response = {
        "isBase64Encoded": false,
        "statusCode": 200,
        "headers": { "Content-Type": "application/json", 
                     "Access-Control-Allow-Origin": "http://localhost:3000" },
    };
    
    params = [];
    let dbQuery = constructDBQuery(userId, userPassword);
    
    let dbRows = await helper_functions.queryDB(dbQuery, params).catch((err) => {
        helper_functions.GenerateErrorResponseAndLog(err, response, "Unable to retrieve specified user.");
        return response;
    });
    
    const responseBody = {
        "users": dbRows
    };

    response.body = JSON.stringify(responseBody);
    return response;
};