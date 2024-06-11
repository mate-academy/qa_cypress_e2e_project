/// <reference types='cypress' />
/// <reference types='../support' />
import { userPageObject } from '../support/pages/UserPageObject'



describe('User', () => {
  let user;
  let followinguser;

  beforeEach(() => {
    cy.task('db:clear');
    cy.wait(1000);
  });
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('editUser').then((editUser) => {
      followinguser = editUser;
    });
  });

  
    it('should be able to follow the another user', () => {
      cy.login(user.email, user.username, user.password);
      cy.login(followinguser.email
        , followinguser.username, followinguser.password);
      cy.visit(`/#/@${user.username}/`);
      userPageObject.ClickFollowBtn();
      userPageObject.AssertFollowing('Unfollow');
      userPageObject.ClickUnfollowBtn();
      userPageObject.AssertFollowing('Follow');
    });
  });
