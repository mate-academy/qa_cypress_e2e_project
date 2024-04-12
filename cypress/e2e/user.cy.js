/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from "../support/pages/user.pageObject";

const userPage = new UserPageObject();

describe('User', () => {
  let user;
  let updatedData;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUpdatedSettings').then((generateUpdatedSettings) => {
      updatedData = generateUpdatedSettings;
    });
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    }).then((user) => {
      cy.login(user.email, user.username, user.password);
    });
  });

  it('should be able to follow the another user', () => {
    cy.login(updatedData.newEmail, updatedData.newUsername, updatedData.newPassword);
    userPage.visit(`/#/@${user.username}/`);
    userPage.clickOnFollowButton();
    userPage.assertFollowedUser();
  });
});
