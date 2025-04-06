/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';

const signInPage = new SignInPageObject();

describe('User', () => {
  let userTarget;
  let userFollower;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      userTarget = generateUser;
      cy.register(userTarget.email, userTarget.username, userTarget.password);
      userFollower = generateUser;
      userFollower.email += 'world';
      userFollower.username += 'follower';
      cy.register(
        userFollower.email,
        userFollower.username,
        userFollower.password
      );
    });
  });

  it('should be able to follow the another user', () => {
    signInPage.visit();

    signInPage.typeEmail(userFollower.email);
    signInPage.typePassword(userFollower.password);

    signInPage.clickSignInBtn();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.visit(`/#/@${userTarget.username.replace('follower', '')}`);

    cy.contains('button', `Follow ${userTarget.username.replace('follower', '')}`).click();
  });
});
