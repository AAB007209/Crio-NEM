const http = require("http");
const PORT = 8082;

const server = http.createServer((request, response) => {
    response.writeHead(200, { "Content-type": "application/json" })

    response.end(
        JSON.stringify({
            message: "Hello Node server",
        })
    );
});

server.listen(PORT, () => {
    console.log(`The server is listening to port: ${PORT}`)
});