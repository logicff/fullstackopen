# CI/CD
...

# Exercise

## 11.1 Warming up

Think about a hypothetical situation where we have an application being worked on by a team of about 6 people. The application is in active development and will be released soon.

Let us assume that the application is coded with some other language than JavaScript/TypeScript, e.g. in Python, Java, or Ruby. You can freely pick the language. This might even be a language you do not know much yourself.

Write a short text, say 200-300 words, where you answer or discuss some of the points below. You can check the length with https://wordcounter.net/. Save your answer to the file named exercise1.md in the root of the repository that you shall create in exercise 11.2.

The points to discuss:

* Some common steps in a CI setup include linting, testing, and building. What are the specific tools for taking care of these steps in the ecosystem of the language you picked? You can search for the answers by Google.
* What alternatives are there to set up the CI besides Jenkins and GitHub Actions? Again, you can ask Google!
* Would this setup be better in a self-hosted or a cloud-based environment? Why? What information would you need to make that decision?

Remember that there are no 'right' answers to the above! 

## 11.2 The example project

The first thing you'll want to do is to fork the [example repository](https://github.com/fullstack-hy2020/full-stack-open-pokedex) under your name. What it essentially does is it creates a copy of the repository under your GitHub user profile for your use.

To fork the repository, you can click on the Fork button in the top-right area of the repository view next to the Star button.

Once you've clicked on the Fork button, GitHub will start the creation of a new repository called `{github_username}/full-stack-open-pokedex`.

Once the process has been finished, you should be redirected to your brand-new repository.

Clone the project now to your machine. As always, when starting with a new code, the most obvious place to look first is the file `package.json`

**NOTE** since the project is already a bit old, you need Node 16 to work with it!

Try now the following:

* install dependencies (by running `npm install`)
* start the code in development mode
* run tests
* lint the code

You might notice that the project contains some broken tests and linting errors. **Just leave them as they are for now.** We will get around those later in the exercises.

**NOTE** the tests of the project have been made with `Jest`. The course material in `part 5` uses `Vitest`. From the usage point of view, the libraries have barely any difference.

As you might remember from `part 3`, the React code should not be run in development mode once it is deployed in production. Try now the following

* create a production build of the project
* run the production version locally

Also for these two tasks, there are ready-made npm scripts in the project!

Study the structure of the project for a while. As you notice both the frontend and the backend code are now in the same repository. In earlier parts of the course we had a separate repository for both, but having those in the same repository makes things much simpler when setting up a CI environment.

In contrast to most projects in this course, the frontend code does not use Vite but it has a relatively simple `Webpack` configuration that takes care of creating the development environment and creating the production bundle.

## 11.3 Hello world!

Create a new Workflow that outputs "Hello World!" to the user. For the setup, you should create the directory `.github/workflows` and a file `hello.yml` to your repository.

To see what your GitHub Action workflow has done, you can navigate to the **Actions** tab in GitHub where you should see the workflows in your repository and the steps they implement. The output of your Hello World workflow should look something like this with a properly configured workflow.

You should see the "Hello World!" message as an output. If that's the case then you have successfully gone through all the necessary steps. You have your first GitHub Actions workflow active!

Note that GitHub Actions also informs you on the exact environment (operating system, and its setup) where your workflow is run. This is important since if something surprising happens, it makes debugging so much easier if you can reproduce all the steps in your machine!

## 11.4 Date and directory contents

Extend the workflow with steps that print the date and current directory content in the long format.

Both of these are easy steps, and just running commands `date` and `ls` will do the trick.

Your workflow should now look like this.

As the output of the command `ls -l` shows, by default, the virtual environment that runs our workflow does not have any code!

## 11.5 Linting workflow

Implement or copy-paste the "Lint" workflow and commit it to the repository. Use a new yml file for this workflow, you may call it e.g. pipeline.yml.

Push your code and navigate to "Actions" tab and click on your newly created workflow on the left. You should see that the workflow run has failed.

## 11.6 Fix the code

There are some issues with the code that you will need to fix. Open up the workflow logs and investigate what is wrong.

A couple of hints. One of the errors is best to be fixed by specifying proper env for linting, see [here](https://fullstackopen.com/en/part3/validation_and_es_lint#lint) how it can be done . One of the complaints concerning `console.log` statement could be taken care of by simply silencing the rule for that specific line. Ask google how to do it.

Make the necessary changes to the source code so that the lint workflow passes. Once you commit new code the workflow will run again and you will see updated output where all is green again.

## 11.7 Building and testing

Let's expand on the previous workflow that currently does the linting of the code. Edit the workflow and similarly to the lint command add commands for build and test. After this step outcome should look like this.

As you might have guessed, there are some problems in code...

## 11.8 Back to green

Investigate which test fails and fix the issue in the code (do not change the tests).

Once you have fixed all the issues and the Pokedex is bug-free, the workflow run will succeed and show green!

## 11.9 Simple end-to-end tests

11.9 Simple end-to-end tests

The current set of tests uses Jest to ensure that the React components work as intended. This is essentially the same thing that is done in the section Testing React apps of part 5 with Vitest.

Testing components in isolation is quite useful but that still does not ensure that the system as a whole works as we wish. To have more confidence about this, let us write a couple of really simple end-to-end tests similarly we did in section part 5. You could use `Playwright` or `Cypress` for the tests.

No matter which you choose, you should extend Jest-definition in package.json to prevent Jest from trying to run the e2e-tests. Assuming that directory `e2e-tests` is used for e2e-tests, the definition is:

```json
{
  // ...
  "jest": {
    "testEnvironment": "jsdom",

    "testPathIgnorePatterns": ["e2e-tests"]
  }
}
```

**Playwright**

Set Playwright up (you'll find [here](https://fullstackopen.com/en/part5/end_to_end_testing_playwright) all the info you need) to your repository. Note that in contrast to part 5, you should now install Playwright to the same project with the rest of the code!

Use this test first:

```js
const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Pokedex', () => {
  test('front page can be opened', async ({ page }) => {
     await page.goto('')
    await expect(page.getByText('ivysaur')).toBeVisible()
    await expect(page.getByText('Pokémon and Pokémon character names are trademarks of Nintendo.')).toBeVisible()
  })
})
```

**Note** is that although the page renders the Pokemon names with an initial capital letter, the names are actually written with lowercase letters in the source, so you should test for `ivysaur` instead of `Ivysaur`!

Define a npm script `test:e2e` for running the e2e tests from the command line.

Remember that the Playwright tests assume that the application is up and running when you run the test! Instead of starting the app manually, you should now configure a Playwright development server to start the app while tests are executed, see [here](https://playwright.dev/docs/next/api/class-testconfig#test-config-web-server) how that can be done.

Ensure that the test passes locally.

Once the end-to-end test works in your machine, include it in the GitHub Action workflow. That should be pretty easy by following [this](https://playwright.dev/docs/ci-intro#on-pushpull_request).

**Cypress**

Set Cypress up (you'll find [here](https://fullstackopen.com/en/part5/end_to_end_testing_cypress) all the info you need) and use this test first:

```js
describe('Pokedex', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:5000')
    cy.contains('ivysaur')
    cy.contains('Pokémon and Pokémon character names are trademarks of Nintendo.')
  })
})
```

Define a npm script `test:e2e` for running the e2e tests from the command line.

**Note** is that although the page renders the Pokemon names with an initial capital letter, the names are actually written with lowercase letters in the source, so you should test for `ivysaur` instead of `Ivysaur`!

Ensure that the test passes locally. Remember that the Cypress tests assume that the application is up and running when you run the test! If you have forgotten the details, please see part 5 how to get up and running with Cypress.

Once the end-to-end test works in your machine, include it in the GitHub Action workflow. By far the easiest way to do that is to use the ready-made action [cypress-io/github-action](https://github.com/cypress-io/github-action). The step that suits us is the following:

```yaml
- name: e2e tests
  uses: cypress-io/github-action@v5
  with:
    command: npm run test:e2e
    start: npm run start-prod
    wait-on: http://localhost:5000
```

Three options are used: [command](https://github.com/cypress-io/github-action#custom-test-command) specifies how to run Cypress tests, [start](https://github.com/cypress-io/github-action#start-server) gives npm script that starts the server, and [wait-on](https://github.com/cypress-io/github-action#wait-on) says that before the tests are run, the server should have started on url http://localhost:5000.

Note that you need to build the app in GitHub Actions before it can be started in production mode!

**Once the pipeline works...**

Once you are sure that the pipeline works, write another test that ensures that one can navigate from the main page to the page of a particular Pokemon, e.g. ivysaur. The test does not need to be a complex one, just check that when you navigate to a link, the page has some proper content, such as the string chlorophyll in the case of ivysaur.

**Note** the Pokemon abilities are written with lowercase letters in the source code (the capitalization is done in CSS), so do not test for Chlorophyll but rather chlorophyll.

The end result should be something like this.

End-to-end tests are nice since they give us confidence that software works from the end user's perspective. The price we have to pay is the slower feedback time. Now executing the whole workflow takes quite much longer.

## 11.10-11.12

没有信用卡，无法使用官方推荐的`Fly.io`或者`Render`。

## 11.13 Pull request

Update the trigger of the existing workflow as suggested above to run on new pull requests to your main branch.

Create a new branch, commit your changes, and open a pull request to your main branch.

Note that when you open the pull request, make sure that you select here your own repository as the destination base repository. By default, the selection is the original repository by https://github.com/fullstack-hy2020 and you do not want to do that.

In the "Conversation" tab of the pull request you should see your latest commit(s) and the yellow status for checks in progress.

Once the checks have been run, the status should turn to green. Make sure all the checks pass. Do not merge your branch yet, there's still one more thing we need to improve on our pipeline.

## 11.14 Run deployment step only for the main branch

All looks good, but there is actually a pretty serious problem with the current workflow. All the steps, including the deployment, are run also for pull requests. This is surely something we do not want!

Fortunately, there is an easy solution for the problem! We can add an [if](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsif) condition to the deployment step, which ensures that the step is executed only when the code is being merged or pushed to the main branch.

The workflow [context](https://docs.github.com/en/free-pro-team@latest/actions/reference/context-and-expression-syntax-for-github-actions#contexts) gives various kinds of information about the code the workflow is run.

The relevant information is found in [GitHub context](https://docs.github.com/en/actions/learn-github-actions/contexts#github-context), the field event_name tells us what is the "name" of the event that triggered the workflow. When a pull request is merged, the name of the event is somehow paradoxically push, the same event that happens when pushing the code to the repository. Thus, we get the desired behavior by adding the following condition to the step that deploys the code:

```yaml
if: ${{ github.event_name == 'push' }}
```

Push some more code to your branch, and ensure that the deployment step is not executed anymore. Then merge the branch to the main branch and make sure that the deployment happens.

## 11.15 Adding versioning

We will extend our workflow with one more step:

```yaml
- name: Bump version and push tag
  uses: anothrNick/github-tag-action@1.64.0
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Note: you should use the most recent version of the action, see [here](https://github.com/anothrNick/github-tag-action) if a more recent version is available.

We're passing an environmental variable `secrets.GITHUB_TOKEN` to the action. As it is third party action, it needs the token for authentication in your repository. You can read more [here](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token) about authentication in GitHub Actions.

The [anothrNick/github-tag-action](https://github.com/anothrNick/github-tag-action) action accepts some environment variables that modify the way the action tags your releases. You can look at these in the [README](https://github.com/anothrNick/github-tag-action) and see what suits your needs.

As you can see from the documentation by default your releases will receive a `minor` bump, meaning that the middle number will be incremented.

Modify the configuration above so that each new version is by default a `patch` bump in the version number, so that by default, the last number is increased.

Remember that we want only to bump the version when the change happens to the main branch! So add a similar `if` condition to prevent version bumps on pull request as was done in Exercise 11.14 to prevent deployment on pull request related events.

Complete now the workflow. Do not just add it as another step, but configure it as a separate job that [depends](https://docs.github.com/en/actions/using-workflows/advanced-workflow-features#creating-dependent-jobs) on the job that takes care of linting, testing and deployment. So change your workflow definition as follows:

```yaml
name: Deployment pipeline

on:
  push:
    branches:
      - main
  pull_request:
    branches: [main]
    types: [opened, synchronize]

jobs:
  simple_deployment_pipeline:
    runs-on: ubuntu-latest
    steps:
      // steps here
  tag_release:
    needs: [simple_deployment_pipeline]
    runs-on: ubuntu-latest
    steps:
      // steps here
```

As mentioned earlier, jobs of a workflow are executed in parallel. However since we want the linting, testing and deployment to be done first, we set a dependency that the tag_release waits for since we do not want to tag the release unless it passes tests and is deployed.

If you're uncertain of the configuration, you can set `DRY_RUN` to `true`, which will make the action output the next version number without creating or tagging the release!

Once the workflow runs successfully, the repository mentions that there are some tags.

By clicking view all tags, you can see all the tags listed.

If needed, you can navigate to the view of a single tag that shows eg. what is the GitHub commit corresponding to the tag.

## 11.16 Skipping a commit for tagging and deployment

In general, the more often you deploy the main branch to production, the better. However, there might sometimes be a valid reason to skip/prevent a particular commit or a merged pull request from being tagged and released to production.

Modify your setup so that if a commit message in a pull request contains `#skip`, the merge will not be deployed to production and it is not tagged with a version number.

**Hints**:

The easiest way to implement this is to alter the [if](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsif) conditions of the relevant steps. Similarly to exercise 11-14 you can get the relevant information from the [GitHub context](https://docs.github.com/en/free-pro-team@latest/actions/reference/context-and-expression-syntax-for-github-actions#github-context) of the workflow.

You might take this as a starting point:

```yaml
name: Testing stuff

on:
  push:
    branches:
      - main

jobs:
  a_test_job:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: github context
        env:
          GITHUB_CONTEXT: ${{ toJson(github) }}
        run: echo "$GITHUB_CONTEXT"
      - name: commits
        env:
          COMMITS: ${{ toJson(github.event.commits) }}
        run: echo "$COMMITS"
      - name: commit messages
        env:
          COMMIT_MESSAGES: ${{ toJson(github.event.commits.*.message) }}
        run: echo "$COMMIT_MESSAGES"
```

See what gets printed in the workflow log!

Note that you can access the commits and commit messages only when pushing or merging to the main branch, so for pull requests the `github.event.commits` is empty. It is anyway not needed, since we want to skip the step altogether for pull requests.

You most likely need functions [contains](https://docs.github.com/en/actions/learn-github-actions/expressions#contains) and [join](https://docs.github.com/en/actions/learn-github-actions/expressions#join) for your if condition.

Developing workflows is not easy, and quite often the only option is trial and error. It might actually be advisable to have a separate repository for getting the configuration right, and when it is done, to copy the right configurations to the actual repository.

It would also make sense to re-use longer conditions by moving them to commonly accessible variables and referring these variables on the step level:

```yaml
name: some workflow name

env:
  # the below will be 'true'
  CONDITION: ${{ contains('kissa', 'ss') && contains('koira', 'ra') && contains('pretty long array of criteria to repeat in multiple places', 'crit') }}

jobs:
  job1:
    # rest of the job
    outputs:
      # here we produce a record of the outcome of a key step in the job.
      # the below will be 'true'
      job2_can_run: ${{ steps.final.outcome == 'success' }}
    steps:
      - if: ${{ env.CONDITION == 'true' }}
        run: echo 'this step is executed'

      - if: ${{ env.CONDITION == 'false' }}
        run: echo 'this step will not be executed'

      - if: ${{ env.CONDITION == 'true' }}
        # this is important, the id `final` is referenced in job1's `outputs`.
        id: final
        run: echo

  job2:
    needs:
      - job1
    # this job will be dependent on the above job1's final step, which in turn depends on the CONDITION defined at the beginning of the file.
    # note that the `env`-variable cannot be directly accessed on the job level, so we need to use something else,
    # such as the outputs from another job.
    if: ${{ needs.job1.outputs.job2_can_run == 'true' }}
    steps:
      # rest of the job
```

It would also be possible to install a tool such as [act](https://github.com/nektos/act) that makes it possible to run your workflows locally. Unless you end up using more involved use cases like creating your [own custom actions](https://docs.github.com/en/free-pro-team@latest/actions/creating-actions), going through the burden of setting up a tool such as act is most likely not worth the trouble. 

## 11.17 Adding protection to your main branch

Add protection to your main branch.

You should protect it to:

* Require all pull request to be approved before merging
* Require all status checks to pass before merging

## 11.18 Build success/failure notification action

You can find quite a few third-party actions from [GitHub Action Marketplace](https://github.com/marketplace?type=actions) by using the search phrase [discord](https://github.com/marketplace?type=actions&query=discord). Pick one for this exercise. My choice was [actions-status-discord](https://github.com/marketplace/actions/actions-status-discord) since it has quite a few stars and decent documentation.

Setup the action so that it gives two types of notifications:

* A success indication if a new version gets deployed
* An error indication if a build fails

In the case of an error, the notification should be a bit more verbose to help developers find quickly which is the commit that caused it.

See [here](https://docs.github.com/en/actions/learn-github-actions/expressions#status-check-functions) how to check the job status!

## 11.19 Periodic health check

We are pretty confident now that our pipeline prevents bad code from being deployed. However, there are many sources of errors. If our application would e.g. depend on a database that would for some reason become unavailable, our application would most likely crash. That's why it would be a good idea to set up a periodic health check that would regularly do an HTTP GET request to our server. We quite often refer to this kind of request as a ping.

It is possible to [schedule](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule) GitHub actions to happen regularly.

Use now the action [url-health-check](https://github.com/marketplace/actions/url-health-check) or any other alternative and schedule a periodic health check ping to your deployed software. Try to simulate a situation where your application breaks down and ensure that the check detects the problem. Write this periodic workflow to an own file.

**Note** that unfortunately it takes quite long until GitHub Actions starts the scheduled workflow for the first time. For me, it took nearly one hour. So it might be a good idea to get the check working firstly by triggering the workflow with Git push. When you are sure that the check is properly working, then switch to a scheduled trigger.

**Note also** that once you get this working, it is best to drop the ping frequency (to max once in 24 hours) or disable the rule altogether since otherwise your health check may consume all your monthly free hours.

## 11.20 Your own pipeline

Build a similar CI/CD-pipeline for some of your own applications. Some of the good candidates are the phonebook app that was built in parts 2 and 3 of the course, or the blogapp built in parts 4 and 5, or the Redux anecdotes built in part 6. You may also use some app of your own for this exercise.

You most likely need to do some restructuring to get all the pieces together. A logical first step is to store both the frontend and backend code in the same repository. This is not a requirement but it is recommended since it makes things much more simple.

One possible repository structure would be to have the backend at the root of the repository and the frontend as a subdirectory. You can also "copy paste" the structure of the example app of this part or try out the [example app](https://github.com/fullstack-hy2020/create-app) mentioned in part 7.

It is perhaps best to create a new repository for this exercise and simply copy and paste the old code there. In real life, you most likely would do this all in the old repository but now "a fresh start" makes things easier.

This is a long and perhaps quite a tough exercise, but this kind of situation where you have a "legacy code" and you need to build proper deployment pipeline is quite common in real life!

Obviously, this exercise is not done in the same repository as the previous exercises. Since you can return only one repository to the submission system, put a link of the other repository to the one you fill into the submission form.

## 11.21 Protect your main branch and ask for pull request

Protect the main branch of the repository where you did the previous exercise. This time prevent also the administrators from merging the code without a review.

Do a pull request and ask GitHub user [mluukkai](https://github.com/mluukkai) to review your code. Once the review is done, merge your code to the main branch. Note that the reviewer needs to be a collaborator in the repository. Ping us in Discord to get the review, and to include the collaboration invite link to the message.

**Please note** what was written above, include the link to `the collaboration invite` in the ping, not the link to the pull request.

Then you are done!