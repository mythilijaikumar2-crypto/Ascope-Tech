const http = require('http');

const options = {
  host: '127.0.0.1',
  port: 5002,
  path: '/api/courses',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk.slice(0, 100)}`);
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
  console.error(e);
});

req.end();
