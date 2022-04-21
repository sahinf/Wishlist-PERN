/*
    Structure of getStoredParameter motivated by user Imran on 
    stackoverflow.com/questions/53973798/getting-values-from-parameter-store-in-aws
    and by documentation provided by Amazon Web Services at 
    https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SSM.html#getParameter-property
*/

const awsSDK = require('aws-sdk');
awsSDK.config.update({ region: 'us-east-1' });

const { Client } = require('pg');

const sysManagerClient = new awsSDK.SSM();

let dbEndpoint = null;
let dbName = null;
let dbUsername = null;
let dbPass = null;

const getStoredParameter = (parameterName) => {
    return new Promise((resolve, reject) => {
        sysManagerClient.getParameter({
            Name: parameterName,
            WithDecryption: true,
        }, (error, data) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(data);
            }
        });
    });
};

const prefetchDBInfo = async () => {
    let paramResponse = null;
    
    /* The commented-out queries to parameter store below are better
      practice, but aren't viable under AWS free tier. Feel free
      to reinclude them and discontinue use of env variables if
      free tier restrictions become irrelevant. */
      
    // paramResponse = await getStoredParameter('/tias/prod/db-endpoint');
    // dbEndpoint = paramResponse.Parameter.Value;

    // paramResponse = await getStoredParameter('/tias/prod/db-name');
    // dbName = paramResponse.Parameter.Value;

    // paramResponse = await getStoredParameter('/tias/prod/db-username');
    // dbUsername = paramResponse.Parameter.Value;

    dbEndpoint = process.env.DB_ENDPOINT;
    dbName     = process.env.DB_NAME;
    dbUsername = process.env.DB_USERNAME;

    paramResponse = await getStoredParameter('/tias/prod/db-password');
    dbPass = paramResponse.Parameter.Value;
};

const queryDB = async (dbQuery, params) => {
  await prefetchDBInfo(dbQuery, params);
  
  const client = new Client({
    user: dbUsername,
    host: dbEndpoint,
    database: dbName,
    password: dbPass,
    port: 5432,
  });

  client.connect();
  
  return await client
    .query(dbQuery, params)
    .then((dbResponse) => {
        client.end();
        return dbResponse.rows;
    })
    .catch((error) => console.error(error));
};

const GenerateErrorResponseAndLog = (err, response, msg) => {
    console.error('error: ', err);
    console.error('trace: ', err.stack);
    response.statusCode = 500;
    response.body = JSON.stringify({err: msg});
};

module.exports = { prefetchDBInfo, queryDB, GenerateErrorResponseAndLog };