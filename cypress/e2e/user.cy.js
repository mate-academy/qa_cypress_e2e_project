/// <reference types='cypress' />
/// <reference types='../support' />
import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();

describe('User', () => {
  let user;
  let user2;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.username, user.email, user.password);
    });
    cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
      cy.login(user2.username, user2.email, user2.password);
    });
  });

  it('should provide an ability to follow user', () => {
    userPage.visitFollowedUserPage(user.username);
    userPage.assertFollowBtnExist();
    userPage.clickFollowUserBtn();
    userPage.assertUnfollowBtnExist();
  });

  it('should provide an ability to unfollow the user', () => {
    userPage.visitFollowedUserPage(user.username);
    userPage.clickFollowUserBtn();
    userPage.clickUnfollowUserBtn();
    userPage.assertFollowBtnExist();
  });
});
