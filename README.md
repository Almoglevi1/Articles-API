# Articles API

## Description

Articles API is a RESTful API built with Node.js and Express, using MongoDB as the database.<br> It allows users to create, read, update, and delete articles, manage categories, and handle user authentication (signup and login).

## Features

- User authentication (signup and login)
- Create new articles
- Retrieve a list of all articles
- Retrieve a single article by ID
- Update an existing article
- Delete an article
- Manage article categories

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/articles-api.git
   cd articles-api
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add these environment variables:

   ```
   MONGO_USERNAME=your_mongodb_username
   MONGO_PASSWORD=your_mongodb_password
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```sh
   npm start
   ```

   The server will run on port 3000.

## Usage

### Endpoints

#### Authentication

- `POST /signup` - Create a new user account
- `POST /login` - Login and receive a JWT token

#### Articles

- `GET /articles` - Retrieve a list of all articles
- `GET /articles/:id` - Retrieve a single article by ID
- `POST /articles` - Create a new article (requires authentication)
- `PATCH /articles/:id` - Update an existing article (requires authentication)
- `DELETE /articles/:id` - Delete an article (requires authentication)

#### Categories

- `GET /categories` - Retrieve a list of all categories
- `POST /categories` - Create a new category (requires authentication)
- `PATCH /categories/:id` - Update an existing category (requires authentication)
- `DELETE /categories/:id` - Delete a category (requires authentication)
##
![articlesAPI](https://github.com/user-attachments/assets/bcd38c4e-1437-41fd-8275-399795e5a64e)

