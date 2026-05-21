/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';

const signInPage = new SignInPageObject();

describe('User', () => {
  let userTarget;
  let userFollower;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generatedUser) => {
      userTarget = generatedUser;
      cy.register(userTarget.email, userTarget.username, userTarget.password);
    });

    cy.task('generateUser').then((generatedUser) => {
      userFollower = generatedUser;
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
    cy.wait(1500);

    cy.visit(`/#/@${userTarget.username}`);

    cy.getByDataCy('follow-btn').click();

    cy.url().should('include', `/#/@${userTarget.username}`);
  });

  it('should be able to unfollow another user', () => {
    signInPage.visit();

    signInPage.typeEmail(userFollower.email);
    signInPage.typePassword(userFollower.password);
    signInPage.clickSignInBtn();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1500);
    cy.visit(`/#/@${userTarget.username}`);

    cy.getByDataCy('follow-btn').click();
    cy.getByDataCy('follow-btn').click();
    cy.getByDataCy('follow-btn').should('contain', 'Follow');
  });
});
