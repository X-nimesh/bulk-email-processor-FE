# Frontend Application for Bulk Email Processor

## Overview

This repository contains the frontend application for the project. It communicates with the backend service, which is hosted separately.

**Please run Backend service first**: -> [Backend repo Link]('https://github.com/X-nimesh/bulk-email-processor-ekbana.git)

## Prerequisites

- Docker
- Docker Compose

## Setup and Running

1. **Clone the Repository**

   ```bash
   git clone https://github.com/X-nimesh/bulk-email-processor-FE
   cd <FRONTEND_DIRECTORY>
   ```

2. **Create .env File**

   ```bash
    REACT_APP_API_URL= http://localhost:3000
   ```

3. **Excute docker build command**

   ```bash
   docker-compose up -d --build
   ```

4. **Access the Frontend**

   ```bash
   You can browse the frontend application at http://localhost:7070.
   ```

   http://localhost:7070

5. **Stopping the Frontend**

   ```bash
   docker-compose down
   ```
