/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();

describe('User', () => {
  let user;
  let user2;
  before(() => {
    cy.task('generateUser').then((generateUser1) => {
      user = generateUser1;
    });

    cy.task('generateUser').then((generateUser2) => {
      user2 = generateUser2;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.register(user.email, user.username, user.password);
    cy.register(user2.email, user2.username, user2.password);
  });

  it('should be able to follow the another user', () => {
    userPage.visit(user);
    userPage.clickFollowBtn();
    userPage.AssertFollowing('Unfollow');
    userPage.clickUnFollowBtn();
    userPage.AssertUnFollowing('Follow');
  });
});
