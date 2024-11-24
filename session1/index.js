const http = require("http");
const currenciesJson = require("./currencies.json");
const PORT = 8082;

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { "Content-type": "application/json" })

//     res.end(
//         JSON.stringify({
//             message: "Hello Node server",
//         })
//     );

//     const serverInfo = {
//         serverName: "Crio Server",
//         version: "1.0.0",
//         currentDate: new Date().toDateString(),
//         currentTime: new Date().toTimeString(),
//     };

//     if (req.url === "/status") {
//         res.writeHead(200, { "Content-Type": "application/json" }); //Adding Headers
//         res.write(JSON.stringify(serverInfo));
//         res.end();
//     } else {
//         res.writeHead(200, { "Content-Type": "text/html" }); //Adding Headers
//         res.write(`<h1>Hello from server</h1>`);
//         res.end();
//     }
// });

const server = http.createServer((req, res) => {
    console.log(req.url);
    switch (req.url) {
        case "/":
            res.writeHead(200, { "content-type": "text/html" })
            res.end(`<h1>Currency Database</h1>`);
            break;

        case "/currencies":
            res.writeHead(200, { "content-type": "text/html" });
            res.end(JSON.stringify(currenciesJson.data));
            break;

        default:
            res.writeHead(404, { "content-type": "application/json" });
            res.end(
                JSON.stringify({
                    message: "Requested route not found!",
                })
            );
    }
})

server.listen(PORT, () => {
    console.log(`The server is listening to port: ${PORT}`)
});