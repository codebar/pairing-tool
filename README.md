# Codebar: Pairing Tool

[![CircleCI](https://circleci.com/gh/saljuama/codebar-pairing-tool.svg?style=svg)](https://circleci.com/gh/saljuama/codebar-pairing-tool)

See it in action: https://saljuama.github.io/codebar-pairing-tool

## Development

### Running the application locally

```bash
$ yarn start
```

### Running the tests

#### Unit tests

```bash
$ yarn test
```

#### Functional tests

This requires that the application is running locally

```bash
$ yarn test:e2e
```

### Working with Feature Toggles

If we wanted to create a new toggle named `myToggle` with a default value of `false`, we would: 

#### Adding a new toggle 
Add the name, and the default value in the `src/config/featureToggles.js` file.
```javascript
export const featureToggles = {
  myToggle: false
}
```

It is recommended to create new toggles with a default value of `false` so new features developed under them are not 
available to the users right away until the features are ready for it

#### Accessing the value of a feature toggle
```javascript
import {useSelector} from 'react-redux'
import {featureEnabled} from '..path-to-config-folder../config/togglesSlice' 

const AnyComponent = () => {
    const myToggleValue = useSelector(featureEnabled('myToggle')) // false
    // rest of the component
}
```

#### Overriding a toggle value
With the querystring parameters: 
* Local: after `yarn start` we can visit `http://localhost:3000?myToggle=true` 
* In GH pages: visit `https://saljuama.github.io/codebar-pairing-tool?myToggle=true`

#### Releasing and cleaning up
To release a feature, or a change, hidden under a feature toggle, just go to the `src/config/featureToggles.js` file and
change the value to `true`. 

Once is verified that the feature is stable, and we will not need to turn the toggle off, we can start cleaning up the
source code to remove the toggle usages and remove the toggle from the `src/config/featureToggles.js` file itself.
