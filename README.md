# User List Management Backend

This is the backend component of the User List Management project. It provides functionality for managing user lists and sending emails to users.

## Technologies Used

This application is built using the following technologies:

- Node.js
- Express.js
- MongoDB
- Mongoose
- RabbitMQ
- Nodemailer
- dotenv

## Setup RabbitMQ

1. **Install RabbitMQ:**
   - Download and install RabbitMQ from the [official website](https://www.rabbitmq.com/download.html) or using a package manager.

2. **Run RabbitMQ:**
   - Start the RabbitMQ server by running the following command in your terminal:
     ```
     rabbitmq-server
     ```

3. **Verify Installation:**
   - Open your web browser and navigate to `http://localhost:15672/`.
   - Log in with the default credentials (username: `guest`, password: `guest`).
   - Verify that the RabbitMQ management console is accessible.

4. **Configure Connection URL (if necessary):**
   - If your RabbitMQ instance is running on a different port or hostname, update the connection URL in your application accordingly.


## Installation of App

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AnshAtreja/user_list_management_backend.git
2. **Install Dependencies**
   ```bash
   cd user_list_management_backend
    npm install
3. **Set up environment variables**
   - Create a '.env' file
   - Define the following variables
   ```bash
   PORT=3000
    MONGODB_URI=mongodb://localhost:27017/user-management
    EMAIL_USER=your_email@example.com
    EMAIL_PASS=your_email_password
   ```
   Here :
   - PORT : The port number on which the server runs on
   - MONGODB_URI : Your MongoDB URI
   - EMAIL_USER : The email from which you want to send emails to the users in the list
   - EMAIL_PASS : **IMPORTANT**
     Note : This email password is not the password of your email address, rather it is a password that you need to generate from your email settings
     1. Go to "Manage your google account"
     2. Ensure Two Factor Verification is enabled
     3. In the search bar type "App passwords"
     4. Create a new app password and then use that generated password in the 'EMAIL_PASS' variable
4. **Start the server**
   ```bash
   npm start

