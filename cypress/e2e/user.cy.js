/// <reference types='cypress' />
/// <reference types='../support' />
import UserPageObject from '../support/pages/userPage.pageObject';

const userPage = new UserPageObject();

describe('User', () => {
  let user1;
  let user2;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('registerUser1').then((generateUser) => {
      user1 = generateUser;
    });

    cy.task('registerUser2').then((generateNewUser) => {
      user2 = generateNewUser;
    });
  });

  it('should be able to follow the another user', () => {
    cy.register(user1.email, user1.username, user1.password);
    cy.registerUser2(user2.email, user2.username, user2.password);

    userPage.visitUser(user1.username);
    userPage.assertUsername(user1.username);
    userPage.clickOnTheFollowBtn(user2.username);
  });

  it('should be able to unfollow the another user', () => {
    cy.register(user1.email, user1.username, user1.password);
    cy.registerUser2(user2.email, user2.username, user2.password);

    userPage.visitUser(user1.username);
    userPage.assertUsername(user1.username);
    userPage.clickOnTheFollowBtn(user2.username);
    userPage.clickOnTheUnfollowBtn(user2.username);
  });
});
