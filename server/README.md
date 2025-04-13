
# Travel Packages API

This is the backend API for the Travel Packages application, which connects to MongoDB Atlas.

## Setup Instructions

1. Create a MongoDB Atlas account and cluster if you don't have one already
2. Get your MongoDB connection string from Atlas
3. Create a `.env` file based on `.env.example` and add your MongoDB URI
4. Install dependencies:
   ```
   npm install
   ```
5. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

- `GET /api/packages` - Get all packages
- `GET /api/packages/:id` - Get a specific package
- `POST /api/packages` - Create a new package
- `PUT /api/packages/:id` - Update a package
- `DELETE /api/packages/:id` - Delete a package

## Environment Variables

- `MONGO_URI` - MongoDB Atlas connection string
- `PORT` - Server port (default: 5000)

## MongoDB Atlas Setup Guide

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (the free tier works fine)
3. Under Security → Database Access, create a database user
4. Under Security → Network Access, add your IP address or allow access from anywhere (`0.0.0.0/0`)
5. Under Clusters, click "Connect" and select "Connect your application"
6. Copy the connection string and update it in your `.env` file
