/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from '../support/pages/user.pageObject';
const userPage = new UserPageObject();

describe('User', () => {
  let user1;
  let user2;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user1 = generateUser;
    });
    cy.task('generateUser').then((generateUser2) => {
      user2 = generateUser2;
    });
  });

  beforeEach(() => {
    cy.register(user1.email, user1.username, user1.password);
    cy.register(user2.email, user2.username, user2.password);
    cy.login(user2.email, user2.username, user2.password);
  });

  it('should be able to follow the another user', () => {
    cy.visit(`#/@${user1.username}`);
    userPage.clickFollowBtn();
    userPage.assertFollowUser();
  });
});
