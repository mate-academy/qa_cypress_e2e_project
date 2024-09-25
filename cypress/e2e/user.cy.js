import UserPageObject from '../support/pages/userPage.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

/// <reference types='cypress' />
/// <reference types='../support' />

const userPage = new UserPageObject();
const signInPage = new SignInPageObject();

describe('User', () => {
  let firstUser;
  let secondUser;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      firstUser = generateUser;
      cy.register(firstUser.email, firstUser.username, firstUser.password);
      secondUser = generateUser;
      secondUser.email += 'mail';
      secondUser.username += 'follower';
      cy.register(secondUser.email, secondUser.username, secondUser.password);
    });
  });

  it('should be able to follow the another user', () => {
    signInPage.visit();

    signInPage.typeEmail(secondUser.email);
    signInPage.typePassword(secondUser.password);

    signInPage.clickSignInBtn();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(10000);

    cy.visit(`/#/@${firstUser.username.replace('follower', '')}`);

    cy.contains(
      'button',
      `Follow ${firstUser.username.replace('follower', '')}`
    ).click();
    cy.contains(`Unollow ${firstUser.username}`).should('exist');
  });

  it('should allow to unfollow the another user', () => {
    signInPage.visit();

    signInPage.typeEmail(secondUser.email);
    signInPage.typePassword(secondUser.password);

    signInPage.clickSignInBtn();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(10000);

    cy.visit(`/#/@${firstUser.username.replace('follower', '')}`);

    userPage.assertCanFollowUser();

    cy.contains(
      'button',
      `Follow ${firstUser.username.replace('follower', '')}`
    ).click();

    userPage.assertCanUnfollowUser();

    cy.contains(
      'button',
      `Unfollow ${firstUser.username.replace('follower', '')}`
    ).click();
  });
});
