/// <reference types='cypress' />
/// <reference types='../support' />

// import faker from 'faker';
import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();

describe('User', () => {
  let user;
  let newUser;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateUser').then(generateUser => {
      newUser = generateUser;
    });
  });

  it('should be able to follow the another user', () => {
    cy.register(user.email, user.username, user.password);
    cy.register(newUser.email, newUser.username, newUser.password);
    cy.login(newUser.email, newUser.password);
    userPage.visitUserPage(user.username);
    userPage.clickFollowBtn();
    userPage.checkSuccessfulFollowUser(user.username);
  });

  it('should be able to unfollow the another user', () => {
    cy.register(user.email, user.username, user.password);
    cy.register(newUser.email, newUser.username, newUser.password);
    cy.login(newUser.email, newUser.password);
    userPage.visitUserPage(user.username);
    userPage.clickFollowBtn();
    userPage.clickUnfollowBtn();
    userPage.checkSuccessfulUnfollowUser(user.username);
  });
});
