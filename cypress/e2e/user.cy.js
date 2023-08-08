/// <reference types='cypress' />
/// <reference types='../support' />
import HomePageObject from '../support/pages/home.pageObject';
import UserPageObject from '../support/pages/user.pageObject';

const homePage = new HomePageObject();
const userPage = new UserPageObject();

describe('User', () => {
  let user;
  let testUser;

  beforeEach(() => {
    cy.task('db:clear');
    homePage.visit();
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateTestUser').then((generateTestUser) => {
      testUser = generateTestUser;
    });
  });

  it('should be able to follow the another user', () => {
    cy.registerTestUser(testUser.email, testUser.username, testUser.password);
    cy.register(user.email, user.username, user.password);
    userPage.visit(testUser.username);
    userPage.assertUsername(testUser.username);
    userPage.followButton(testUser.username);
  });

  it('should be able to unfollow the another user', () => {
    cy.registerTestUser(testUser.email, testUser.username, testUser.password);
    cy.register(user.email, user.username, user.password);
    userPage.visit(testUser.username);
    userPage.assertUsername(testUser.username);
    userPage.followButton(testUser.username);
    userPage.unFollowButton(testUser.username);
  });
});
