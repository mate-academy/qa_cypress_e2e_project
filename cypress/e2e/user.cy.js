/// <reference types='cypress' />
/// <reference types='../support' />
import faker from 'faker';

import UserPageObject from '../support/pages/user.pageObject';
const UserPage = new UserPageObject;

describe('User', () => {
  let user;
  let user2;
  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });

    cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
      cy.register(user2.email, user2.username, user2.password);
    });
  });

  it('should be able to follow the another user', () => {
    cy.login(user.email, user.username, user.password);

    UserPage.pageUser(user2.username);
    UserPage.clickOnfollowUserBtn();
    UserPage.assertUnFollowBtnExist();
  });

  it('should be able to unfollow the another user', () => {
    cy.login(user.email, user.username, user.password);

    UserPage.pageUser(user2.username);
    UserPage.clickOnfollowUserBtn();
    UserPage.clickOnUnFollowUserBtn();
    UserPage.assertFollowBtnExist();
  });
});
