/// <reference types='cypress' />
/// <reference types='../support' />
import UserPageObject from '../support/pages/userPage.pageObject';

const userPage = new UserPageObject();

describe('User', () => {
  let user;
  let testUser;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateNewUser').then((generateNewUser) => {
      testUser = generateNewUser;
    });
  });

  it('should be able to follow the another user', () => {
    cy.register(user.email, user.username, user.password);

    // eslint-disable-next-line max-len
    cy.registerNewUser(testUser.email, testUser.username, testUser.password);

    userPage.visitUser(user.username);

    userPage.assertUsername(user.username);

    userPage.assertFollowBtn(user.username);

    userPage.clickOnTheFollowBtn(user.username);

    userPage.assertUnfollowBtn();
  });

  it('should be able to unfollow the another user', () => {
    cy.register(user.email, user.username, user.password);

    // eslint-disable-next-line max-len
    cy.registerNewUser(testUser.email, testUser.username, testUser.password);

    userPage.visitUser(user.username);

    userPage.assertUsername(user.username);

    userPage.assertFollowBtn(user.username);

    userPage.clickOnTheFollowBtn(user.username);

    userPage.clickOnTheUnfollowBtn(user.username);
  });
});
