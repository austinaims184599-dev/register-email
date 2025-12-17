# Email Registration System

A simple web application that allows visitors to register their email addresses for contact purposes.

## Features

- Clean and modern user interface
- Email validation
- Duplicate email prevention
- Email storage in JSON format
- RESTful API endpoints

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`

## How It Works

- Users can enter their email address in the form
- Emails are validated and stored in `emails.json`
- Each registration includes a timestamp
- Duplicate emails are prevented

## Viewing Registered Emails

You can view all registered emails in two ways:

1. **Admin Page (Recommended):**
   - Visit `http://localhost:3000/admin` (or `https://your-domain.com/admin` when deployed)
   - Beautiful interface showing all emails in a table
   - Shows total count, registration dates, and allows CSV export
   - Auto-refreshes every 30 seconds

2. **API Endpoint:**
   - Visit `http://localhost:3000/api/emails`
   - Returns JSON data with all registered emails

## API Endpoints

- `POST /api/register` - Register a new email address
  - Body: `{ "email": "user@example.com" }`
  - Returns: Success message or error

- `GET /api/emails` - View all registered emails (for admin purposes)
  - Returns: List of all registered emails with timestamps

## Data Storage

All registered emails are stored in `emails.json` file in the project root. The file is automatically created when the server starts.

## Requirements

- Node.js (v12 or higher)
- npm

## Deploying to the Internet

This application can be easily deployed to various cloud platforms. Here are the recommended options:

### Option 1: Render (Recommended - Free Tier Available)

1. **Create a Render account** at [render.com](https://render.com)

2. **Create a new Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository (or use manual deploy)
   - Configure:
     - **Name:** email-registration (or your choice)
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Plan:** Free (or paid)

3. **Deploy:**
   - Render will automatically deploy your app
   - You'll get a URL like: `https://your-app-name.onrender.com`

### Option 2: Railway

1. **Create a Railway account** at [railway.app](https://railway.app)

2. **Deploy:**
   - Click "New Project"
   - Select "Deploy from GitHub repo" (or upload files)
   - Railway auto-detects Node.js and deploys
   - You'll get a URL automatically

### Option 3: Heroku

1. **Install Heroku CLI** and login:
   ```bash
   heroku login
   ```

2. **Create and deploy:**
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

3. **Your app will be available at:** `https://your-app-name.herokuapp.com`

### Option 4: Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

### Quick Deploy with Render (Easiest)

1. Push your code to GitHub
2. Go to [render.com](https://render.com)
3. Click "New +" → "Web Service"
4. Connect your GitHub repo
5. Use these settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Click "Create Web Service"
7. Wait for deployment (2-3 minutes)
8. Your app is live!

**Note:** The `Procfile` is included for Heroku/Railway compatibility. The server automatically uses the `PORT` environment variable provided by hosting platforms.

