const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const root = path.resolve(__dirname);
const port = Number(process.env.PORT || 4174);
const appPassword = process.env.APP_PASSWORD || "";
const authCookie = "otaku_room_auth=ok";

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
};

function parseBody(request) {
  return new Promise((resolve) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 2048) request.destroy();
    });
    request.on("end", () => resolve(new URLSearchParams(body)));
  });
}

function safeEquals(a, b) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function hasAccess(request) {
  if (!appPassword) return true;
  return (request.headers.cookie || "").split(";").map((item) => item.trim()).includes(authCookie);
}

function sendLogin(response, hasError = false) {
  response.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(`<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Private Room</title>
  <style>
    * { box-sizing: border-box; }
    body {
      min-height: 100vh;
      margin: 0;
      display: grid;
      place-items: center;
      color: #fff8f1;
      background:
        radial-gradient(circle at 20% 18%, rgba(255, 111, 157, .24), transparent 28%),
        radial-gradient(circle at 82% 14%, rgba(88, 215, 255, .2), transparent 26%),
        linear-gradient(145deg, #111522, #26182f 54%, #102a36);
      font-family: "Segoe UI", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
    }
    form {
      width: min(88vw, 360px);
      padding: 26px;
      border: 1px solid rgba(255, 255, 255, .14);
      border-radius: 14px;
      background: rgba(30, 26, 45, .86);
      box-shadow: 0 24px 70px rgba(0, 0, 0, .38);
    }
    h1 { margin: 0 0 8px; font-size: 24px; }
    p { margin: 0 0 18px; color: #b7afd0; line-height: 1.5; }
    input, button {
      width: 100%;
      min-height: 48px;
      border-radius: 8px;
      font: inherit;
    }
    input {
      padding: 0 13px;
      border: 1px solid rgba(255, 255, 255, .16);
      outline: 0;
      color: #fff8f1;
      background: rgba(255, 255, 255, .08);
    }
    button {
      margin-top: 10px;
      border: 0;
      background: #58d7ff;
      color: #071b24;
      font-weight: 850;
      cursor: pointer;
    }
    .error { color: #ff9fbd; font-size: 14px; }
  </style>
</head>
<body>
  <form method="post" action="/login">
    <h1>비공개 방</h1>
    <p>비밀번호를 입력하면 앱이 열려요.</p>
    ${hasError ? '<p class="error">비밀번호가 달라요.</p>' : ""}
    <input name="password" type="password" autocomplete="current-password" placeholder="비밀번호" autofocus>
    <button type="submit">입장</button>
  </form>
</body>
</html>`);
}

http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (url.pathname === "/login" && request.method === "POST") {
    parseBody(request).then((body) => {
      const password = body.get("password") || "";
      if (appPassword && safeEquals(password, appPassword)) {
        response.writeHead(303, {
          "Location": "/",
          "Set-Cookie": `${authCookie}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=2592000`,
        });
        response.end();
        return;
      }
      sendLogin(response, true);
    });
    return;
  }

  if (!hasAccess(request)) {
    sendLogin(response);
    return;
  }

  const requested = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const filePath = path.resolve(root, `.${requested}`);

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": types[path.extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    response.end(data);
  });
}).listen(port, "0.0.0.0", () => {
  console.log(`http://127.0.0.1:${port}`);
});
