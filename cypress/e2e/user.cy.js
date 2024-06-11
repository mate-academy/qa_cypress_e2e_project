/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();

describe('User', () => {
  let data;
  const defaultUsername = 'Riot';
  const followBtnText = 'Follow';
  const unfollowBtnText = 'Unfollow';

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateData').then((generateData) => {
      data = generateData;
    });
    cy.visit('/#/');
  });

  it('should be able to follow the another user', () => {
    cy.register();
    cy.signIn(data.email, data.username, data.password);
    userPage.visitUserUrl(defaultUsername);

    userPage.assertUsernameContainText(defaultUsername);
    userPage.assertFollowBtnContainText(followBtnText);

    userPage.clickFollowUserBtn();
    userPage.assertUnfollowBtnContainText(unfollowBtnText);
  });
});
