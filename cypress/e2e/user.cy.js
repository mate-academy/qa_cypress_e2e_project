/// <reference types='cypress' />
/// <reference types='../support' />

import ProfilePageObject from '../support/pages/profile.pageObject';

const profilePage = new ProfilePageObject();

describe('User', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should be able to follow the another user', () => {
    profilePage.register(user.newUsername, user.newEmail, user.newPassword);
    profilePage.login(user.username, user.email, user.password);

    profilePage.visit(`/@${user.newUsername}`);
    profilePage.clickFollow();
    profilePage.assertFollow();
  });
});
