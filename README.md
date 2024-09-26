# ![Drash Example App](logo.png)

## Workflow

1. Fork the repo.
1. Clone **your** forked repository.
1. Run `npm i`.
1. Create a new branch `git checkout -b e2e_testing`.
1. Run the [app](./DEV.md).
1. Resolve tasks.
1. Check yourself before submitting the task with a [Cypress checklist](https://mate-academy.github.io/qa-program/checklists/cypress.html).
1. Create a pull request.
1. Do not forget to click on `Re-request review` if you submit the homework after previous review.

## Task

Go to `e2e` folder and cover listed functionality with e2e tests:

- creating an article; *(done)*
- editings an article; *(done)*
- deleting an article; *(done)*
- sign in (positive); *(done)*
- sign in (invalid credentials); *(done)*
- sign up (positive); *(done)*
- sign up (negative); *(done)*
- following/unfollowing the user; *(done)*
- updating bio; *(done)*
- updating username; *(done)*
- updating email; *(done)*
- updating password. *(done)*

### Basics level

1. Clear all data from the database before the test.
1. Add `data-qa` attributes for all elements you are working with in tests.
1. Use faker and custom methods to generate a fake data in tests.

### Advanced level

Use PageObject pattern for your tests:

1. Create a files with POM classes for your pages in `cypress`/`support`/`pages`.
1. Use `PageObject.js` file for the common for the whole app elements.

Observe an example in `cypress`/`e2e`/`signIn.cy.js`.  
Find and additinoanl about Page Object in the [Cypress](https://mate.academy/learn/javascript-testing/cypress#/theory) topic.
