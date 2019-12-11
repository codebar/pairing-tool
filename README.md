# Pairing Tool

## Prerequisites

* Node 12 with npm
* Python 3.7 with pip

## Backend

Before installing any dependencies, make sure you’re not inside a Python virtual environment as pipenv is going to create one!

All of the commands in this section require you to be in the backend directory:

```
cd back/
```

### Tools & dependencies

Install `pipenv` if not already installed:

```
pip install --user pipenv
```

Setup virtual environment and install the dependencies:

```
pipenv install
```

### Running it
The server is started by providing our app object to uvicorn:

```
pipenv run uvicorn main:app
```

When the server is running, its docs should be available at [localhost:8000/docs](http://localhost:8000/docs)

### Testing (coming soon!)

To run backend-specific tests, run pytest using in the backend directory:

```
pipenv run pytest
```

## Front-end

All of the commands in this section require you to be in the front-end directory:

```
cd front/
```

### Dependencies

Dependencies are currently installed using npm:

```
npm install
```

### Running it

To start front-end development server, use the provided `serve` script:

```
npm run serve
```

When the development server is running, the app should be available at [localhost:8080](https://localhost:8080)

### Testing

To run front-end unit tests run the provided script in the front end directory:

```
npm run test:unit
```

## End-to-end Tests

The e2e tests are located with the front-end code, so they have to be run from the front-end directory:

```
cd front/
```

The are run using another npm testing script:

```
npm run test:e2e
```

## Need help?

If you need any help, ask others on Slack.
