const pg = require('pg');

const client = new Client();
await.client.connect();

const result = await client.query(`Select $1::text as message`, ['Hello World']);
console.log(res.rows[0].message);
await client.end();