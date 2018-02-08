const app = require('./app');
const http = require('http');
const connectToDatabase = require('./database/index').connectToDatabase;

process.title = 'bank_client_system';
const port = process.env.PORT || 3001;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

server.on('listening', () => {
	console.log(`Listening on ${port}`);
});

