# Contributing to the pairing tool

If you want to contribute to any of the open tickets, please follow these steps

1. **Assign** the ticket to you. If you don't have permission to do so, please let us know in our Slack channel (#barcelona-pairing-tool);
1. **Announce** it in our Slack channel [#barcelona-pairing-tool](https://codebar.slack.com/archives/GQQ5T8UCQ) to identify if there is anyone else interested in collaborate with you;
1. Move it to **in progress** in the [board](https://github.com/codebar/pairing-tool/projects/1);
1. Do the changes in a dedicated **branch**. Check below for details in the branching strategy and the naming conventions;
1. **Push** the changes and create a **Pull Request** (PR). Check below for our conventions regarding PR.;
1. **Announce** the Pull Request in our slack channel to get reviewers;
1. Assign the **reviewers** to the Pull Request;
1. Once reviewed successfully, **merge** the Pull Request to develop.

**Need help ?** Ask in our [Slack channel](https://codebar.slack.com/archives/GQQ5T8UCQ). If you are not yet in the Codebar slack, [please follow this process](https://slack.codebar.io/).

## Using git

We have agreed to follow a standard [Git branching model](https://nvie.com/posts/a-successful-git-branching-model/). Under this model, we guarantee that:
* `master` branch will always contain a working version of the software aligned to the one in PRODUCTION
* `develop` branch will be the consolidation of all the features for next release. It must always be functional. It must never contain features not finished. Develop should always be ready to be released to production.
* `feature/*` branches will contain a functionality while it is being developed. They should never be merged to `develop` unless the feature is finished **and tested**. Additionally, they should **always** be merged to develop via a **Pull Request**.
* `documentation/*` branches will contain changes in our baseline documentation. General documentation not linked to the current features, can be merged directly to `master` but it must always be done with a **Pull Request** so the team can contribute.


## Pull Requests

We also agreed, to use some GitHub functions to improve our collaboration. Those are:

* **Require pull request reviews before merging** is set to 3.
* **Testing coverage** must be at least **20%**. This will be increased later during the project execution.
