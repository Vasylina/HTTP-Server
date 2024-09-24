import http from "node:http";
import {
  generateJson,
  generateText,
  generateHtml,
  generate404,
  generateForm,
  postData,
} from "./api.mjs";

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    return generateHtml(req, res);
  }

  if (req.method === "GET" && req.url === "/text") {
    return generateText(req, res);
  }

  if (req.method === "GET" && req.url === "/json") {
    return generateJson(req, res);
  }

  if (req.method === "GET" && req.url === "/todos") {
    return generateJson(req, res);
  }

  if (req.method === "GET" && req.url === "/form") {
    return generateForm(req, res);
  }

  if (req.method === "POST" && req.url === "/todos") {
    return postData(req, res);
  }

  generate404(req, res);
});

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
