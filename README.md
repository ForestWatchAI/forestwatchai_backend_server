# ForestWatchAi - Website Build and Deployment Guide

Welcome to the ForestWatchAi project repository! This guide will walk you through the steps to build, deploy, and use our website. Please follow these instructions carefully.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Building the Website](#building-the-website)
- [Deployment](#deployment)


## Prerequisites

Before you begin, make sure you have the following prerequisites installed:

- **Node.js and npm**: Install Node.js and npm (Node Package Manager) on your machine.
- **Git**: Install Git for version control.
- **Modern Web Browser**: Ensure you have any modern web browser.

React.js packages  to be included in your project's package.json:
```
{
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.2",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  }
}

```
## Getting Started :-

1. Clone all the repository to your local machine from https://github.com/ForestWatchAI
2. Install project dependencies:
```
npm install
```
## Building the Website:-

To build the ForestWatchAi website locally and preview it, follow these steps:

1. Navigate to the project directory:
```
cd path/to/ForestWatchAi/

```
2. Build the website:
```
npm run build

```
3. The built files will be located in the dist/ directory. You can now open the index.html file in your web browser to preview the      ForestWatchAi website.

## Deployment:-

We use Vercel for deploying our ForestWatchAi website. Additionally, you'll deploy the Node.js and FastAPI files to Render. Follow these steps:

Deploying the Website to Vercel:

1. Sign up or log in to Vercel.
2. Import your ForestWatchAi repository on Vercel.
3. Configure your deployment settings as needed.
4. Deploy the website. Vercel will provide you with a URL to access the deployed website.

Deploying Node.js to Render:

1. Sign up or log in to Render.
2. Create a new service and configure it for your Node.js application.
3. Upload your Node.js code to the service.
4. Deploy the service on Render. Render will provide you with a URL to access your deployed application.
