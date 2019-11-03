import Server from './server';

let httpPort = process.env.PORT || 8080;
let server = new Server();
server.bootstrap(httpPort);
