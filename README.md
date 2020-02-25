![alt](.github/assets/codebar-bcn-sticker.png)

## Pairing Tool

---

#### General Prerequisites

Before you get started please do the following

1. Join the [#barcelona-pairing-tool](https://codebar.slack.com/archives/GQQ5T8UCQ) slack channel.
2. Read the [Contributing guidelines](.github/contributing.md).

#### Technical Prerequisites

-   Node 12 with npm
-   Python 3.7 with pip

#### Download the project:

```sh
git clone https://github.com/codebar/pairing-tool.git

cd pairing-tool
```

---

##### Backend

Before installing any dependencies, make sure you’re not inside a Python virtual environment as pipenv is going to create one!

All of the commands in this section require you to be in the backend directory:

```sh
cd back/
```

##### Tools & dependencies

Install `pipenv` if not already installed:

```sh
pip install --user pipenv
```

Setup virtual environment and install the dependencies:

```sh
pipenv install
```

##### Running the back end locally

The server is started by providing our app object to uvicorn:

```sh
pipenv run uvicorn main:app
```

When the server is running, its docs should be available at [localhost:8000/docs](http://localhost:8000/docs)

###### Testing (coming soon!)

To run backend-specific tests, run pytest using in the backend directory:

```sh
pipenv run pytest
```

##### Front-end

All of the commands in this section require you to be in the front-end directory:

```sh
cd front/
```

###### Dependencies

Dependencies are currently installed using npm:

```sh
npm install
```

##### Running the front end locally

To start front-end development server, use the provided `serve` script:

```sh
npm run serve
```

When the development server is running, the app should be available at [localhost:8080](https://localhost:8080)

##### Testing

To run front-end unit tests run the provided script in the front end directory:

```sh
npm run test:unit
```

##### Building

To build the final html/css/js files, run the following command:

```sh
npm run build
```

The built files are located in `dist/` directory.

##### End-to-end Tests

The e2e tests are located with the front-end code, so they have to be run from the front-end directory:

```sh
cd front/
```

The are run using another npm testing script:

```sh
npm run test:e2e

```

##### Need help?

If you need any help, ask others on Slack.
