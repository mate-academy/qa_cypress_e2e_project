/* eslint-disable import/first */
/// <reference types='cypress' />
/// <reference types='../support' />
import UserPageObject from '../support/pages/user.PageObject';
const userPage = new UserPageObject();
let user;
let newUser;

describe('User', () => {
  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateNewUser').then((generateNewUser) => {
      newUser = generateNewUser;
    });
  });

  it('should be able to follow the another user', () => {
    cy.register(user.email, user.username, user.password);
    cy.register(newUser.email, newUser.username, newUser.password);
    userPage.openUserPage(user.username);
    userPage.clickOnFollowUserBtn(user.username);
    userPage.assertFollow();
  });

  it('should be able to unfollow the another user', () => {
    cy.register(user.email, user.username, user.password);
    cy.register(newUser.email, newUser.username, newUser.password);
    userPage.openUserPage(user.username);
    userPage.clickOnFollowUserBtn(user.username);
    userPage.clickOnUnfollowUserBtn();
    userPage.assertUnfollow();
  });
});
