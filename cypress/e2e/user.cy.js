/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();

describe('User', () => {
  let user;
  let userT;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateSecondUser').then((generateSecondUser) => {
      userT = generateSecondUser;
    });
  });

  it('should be able to follow the another user', () => {
    cy.register(user.email, user.username, user.password);
    cy.registerSecondUser(userT.email, userT.username, userT.password);
    userPage.visitUser(user.username);
    userPage.assertUsername(user.username);
    userPage.clickOnFollowBtn(user.username);
    userPage.assertUnfollowBtn(user.username);
  });

  it('should be able to unfollow the another user', () => {
    cy.register(user.email, user.username, user.password);
    cy.registerSecondUser(userT.email, userT.username, userT.password);
    userPage.visitUser(user.username);
    userPage.assertUsername(user.username);
    userPage.clickOnFollowBtn(user.username);
    userPage.clickOnUnfollowBtn(user.username);
    userPage.assertFollowBtn(user.username);
  });
});
