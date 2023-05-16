# Shopper Price Updater

![Project Logo](https://media.licdn.com/dms/image/C4D0BAQFEJ0yrCSp-fw/company-logo_200_200/0/1621454624147?e=1692230400&v=beta&t=KeiqJJthUg4Wv6c9zfMQ05YqQqXzv4pdLsHYDjWCcRc)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contact](#contact)

## Introduction

The Shopper Price Updater is a web application that allows users to update prices for products in a database. It provides an interface for uploading a CSV file, validating the product data, and updating the prices accordingly.

## Features

- Upload CSV file containing product data
- Validate the product data for required fields and numeric values
- Perform price update for validated products
- Display validation results and broken rules
- User-friendly interface

## Getting Started

### Prerequisites

- Node.js (version 18.1.0)
- MySQL (version 8)

### Installation

1. Clone the repository:

```shell
git clone https://github.com/jessicatorreslima/shopper-price-updater.git
```

2. Install the backend dependencies:

```shell
cd shopper-price-updater
npm install
```

3. Install the frontend dependencies:

```shell
cd client
npm install
```

### Database Import

To properly use this project, you need to import the `database.sql` file into your database.

#### Steps for Import

1. Make sure you have MySQL installed and properly configured.

2. In your DBMS, create a new empty database that will be used by the project.

3. Locate the `database.sql` file in this repository and import it into your newly created database:

Use the command `mysql -u <username> -p <database> < database.sql` in the terminal or use a graphical interface to import the file.

4. After the import, your database will be populated with the necessary tables and data for the proper functioning of the project.

### Environment Variables

- Rename the .env.example file to .env in the root directory and provide the following variables:

```shell
DB_HOST=localhost
DB_PORT=port
DB_NAME=database_name
DB_USER=username
DB_PASSWORD=password
```

- Replace localhost, port, username, password, and database_name with your MySQL database credentials.

## Usage

1. Start the backend server (on shopper-price-updater/):

```shell
npm start
```

2. Open another terminal and start the frontend server (on shopper-price-updater/client):

```shell
npm start
```

### Note for macOS and Linux users:

If you're using macOS or Linux, you'll need to make a small adjustment in the client's package.json file. Locate the "scripts" section and modify the "start" script as shown below:

```json
{
  "scripts": {
    "start": "PORT=3001 react-scripts start"
  }
}
```

3. Open the application in your browser:

```shell
http://localhost:3001
```

4. Upload a CSV file containing product data.
5. Click the "Validate" button to validate the product data.
6. Review the validation results and broken rules.
7. If all products are valid, click the "Update" button to update the prices.

## Technologies Used

- React
- Node.js
- Express
- MySQL
- Axios

## Contact

Feel free to reach out to me via email or LinkedIn.

📧 Email: jtlimapro@gmail.com

🌐 LinkedIn: [Jessica Torres Lima](https://www.linkedin.com/in/jessicatorreslima/)
