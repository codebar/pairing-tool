## Development

### Useful commands for development

* `yarn start` - Starts the application in local environment (http://localhost:3000)
* `yarn test` - Runs the unit tests
* `yarn test:e2e` - Runs the functional tests (it requires the app to be running)


### Maintaining the repo

One of the practices followed while maintaining this repository is the use of **feature toggles**, and there are some 
utilities in this project to make it easy to follow the practice: 

1. A central place to keep the values of the toggles
2. Mechanism to read the value of the toggles by their name
3. Mechanism to override the toggles values in the application if needed

#### Example

Adding a new toggle, `myToggle`, disabled by default, with a value of `false`, for this we would create a new property,
in the `src/config/featureToggles.js` file: 

```javascript
export const featureToggles = {
    myToggle: false
}
```

Then we can check its actual value in any React component, using a custom react hook that is available

```javascript
import {useFeatureToggle} from '..path-to-config-folder../config/togglesSlice' 

const AnyComponent = () => {
    const myToggleValue = useFeatureToggle('myToggle') // false
    // rest of the component
}
```

We could override the value of the toggle in runtime with query string parameters in the URL, in different environments,
as follows: 
* In local environment: `http://localhost:3000?myToggle=true`
* In production environment `https://codebar.github.io/pairing-tool/?myToggle=true`

Valid values are `true` or `false`, any other value than these will be ignored and interpreted as `false`

Once the feature is complete, we can release it by swapping the value in `src/config/featureToggles.js` to `true`, 
and after the deployment of this change the feature will be available for everyone. 

Finally, after the release, once confirmed the feature is stable and there will be no need to turn the feature off, then 
the toggle can be removed, by first deleting their usages in production code and tests, and lastly from the toggles file
