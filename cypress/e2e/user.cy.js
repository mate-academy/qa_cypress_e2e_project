/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();

describe('User', () => {
  let user;
  let secondUser;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateUser').then(generateUser => {
      secondUser = generateUser;
    });
  });

  it.skip('should be able to follow the another user', () => {
    cy.register(user.email, user.username, user.password);

    cy.login(secondUser.email, secondUser.username, secondUser.password);

    userPage.visitUserPage(user.username);

    userPage.followUserBtn.click();

    userPage.unfollowUserBtn.should('be.visible');
  });

  it.skip('should be able to unfollow the another user', () => {
    cy.register(user.email, user.username, user.password);

    cy.login(secondUser.email, secondUser.username, secondUser.password);

    userPage.visitUserPage(user.username);

    userPage.followUserBtn.click();
    userPage.unfollowUserBtn.click();

    userPage.followUserBtn.should('be.visible');
  });
});
