# VAST Scheduler

A modern employee scheduling web app for VAST Point of Sale. This repository contains the backend Express API written in TypeScript.

## Features
- JWT based login
- REST API endpoints for schedules, employees and time off requests
- SQL Server database using the `mssql` package

## Development

1. Copy `.env.example` to `.env` and fill in your SQL Server credentials.
2. Install dependencies with `npm install`.
3. Start the dev server:

```bash
npm run dev
```

The server listens on `PORT` from `.env` (default `3001`).

## Build

Compile TypeScript and run the compiled server:

```bash
npm run build
npm start
```
