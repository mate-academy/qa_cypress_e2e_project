/// <reference types='cypress' />
/// <reference types='../support' />

import ProfilePageObject from '../support/pages/profile.pageObject';

describe.skip('User', () => {
  let profilePage;

  beforeEach(() => {
    cy.task('db:clear');
    cy.registerAndLogin().as('firstUser');
    cy.registerAndLogin().as('secondUser');

    cy.get('@firstUser').then(({ username }) => {
      profilePage = new ProfilePageObject(username);

      profilePage.visit();
    });
  });

  it('should be able to follow the another user', function () {
    profilePage.clickOnFollowButton();
    profilePage.checkUnfollowButtonExists();
  });

  it('should be able to unfollow the another user', function () {
    profilePage.clickOnFollowButton();
    profilePage.clickOnUnfollowButton();
    profilePage.checkFollowButtonExists();
  });
});
