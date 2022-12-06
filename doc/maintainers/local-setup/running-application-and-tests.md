# Application lifecycle

## Setup 

After you've cloned the repository, and before you can run the application locally or execute the tests, it is required 
to install the dependencies: 
```bash
yarn install
```

## Running the application in local environment

The application can be executed locally and will be available at http://localhost:3000/pairing-tool using the following command
```bash
yarn start
```

## Running the tests

To run the unit tests, execute: 
```bash 
yarn test
```

To run the functional tests, first you will need to have the application up and running (`yarn start`) and in a new terminal, you can execute: 
```bash 
yarn cypress
```
