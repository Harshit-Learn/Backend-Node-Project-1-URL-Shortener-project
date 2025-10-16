# URL Shortener

Simple URL shortener built with Node.js, Express, and MongoDB.

## Overview

This project provides a tiny service to shorten long URLs and redirect users to the original URL using a short code. It includes a minimal web UI and backend API.

Tech stack
- Node.js + Express
- MongoDB (Mongoose)
- EJS views for a simple front-end

## Prerequisites

- Node.js (v14+ recommended)
- npm (comes with Node.js)
- MongoDB (local or Atlas)

## Environment variables

| Variable | Description | Example |
|---|---|---|
| MONGO_URI | Connection string for MongoDB | mongodb://localhost:27017/url_shortener |
| PORT | Port to run the server on (optional) | 5000 |
| BASE_URL | Base URL used when returning shortened links (optional) | http://localhost:5000 |

Create a `.env` file in the project root (if the app uses dotenv) and add the variables above. If the project does not use dotenv, set these variables in your environment.

## Install

Open a terminal in the project root and run:

```powershell
npm install
```

## Run

Start the server with one of the commands below:

```powershell
node server.js
# or, if package.json defines a start script
npm start
```

The server will listen on `PORT` (default 5000). Visit `http://localhost:2000` (or your `BASE_URL`) to open the web UI.

## Endpoints

- GET /
  - Returns the web UI (EJS view) where you can submit a URL to shorten.
- POST /shorten (or similar — check `Controllers/url.js` for exact route)
  - Accepts a long URL (form or JSON) and returns a shortened URL/code.
- GET /:shortId
  - Redirects to the original long URL for the given `shortId`.

Note: The exact route names and payloads are implemented in `server.js` and `Controllers/url.js` — check those files if you need to adapt commands below.

## Example usage (curl)

Shorten a URL (example JSON API — adapt if your app expects form data):

```powershell
curl -Method POST -Uri http://localhost:5000/shorten -ContentType "application/json" -Body '{"longUrl":"https://example.com/very/long/path"}'
```

Then open the returned shortened URL in a browser. Or simply visit the short path directly:

```powershell
Invoke-RestMethod -Method GET -Uri http://localhost:5000/abc123
```

## Project structure

- `server.js` — application entrypoint, Express app and route wiring
- `Controllers/url.js` — controller logic for creating and redirecting short URLs
- `Models/Url.js` — Mongoose model for URL documents
- `views/index.ejs` — a simple EJS page to submit URLs and show results
- `package.json` — project dependencies and scripts

## Notes & troubleshooting

- If you see MongoDB connection errors, confirm `MONGO_URI` is correct and MongoDB is running or accessible.
- If short links do not redirect, confirm route registration in `server.js` and check `Controllers/url.js` implementation.

## Next steps / improvements

- Add request validation and rate limiting
- Add analytics (click counts with timestamps)
- Add tests for controller and model

---

If you'd like, I can:
- Add a `.env.example` file with the variables shown above
- Add `npm` scripts (`start`, `dev`) to `package.json` if missing
- Create a small Postman collection or automated tests for the endpoints

License: MIT
