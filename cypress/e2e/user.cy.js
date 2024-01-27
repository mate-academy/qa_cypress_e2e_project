/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import UserPageObject from '../support/pages/user.pageObject';

const homePage = new HomePageObject();
const userPage = new UserPageObject();

describe('User', () => {
  let user1;
  let user2;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user1 = generateUser;
    });

    cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
    });
  });

  beforeEach(() => {
    cy.register(user1.email, user1.username, user1.password);
    cy.register(user2.email, user2.username, user2.password);
    cy.login(user1.email, user1.username, user1.password);
    // articlePage.visit();
    // cy.createArticle(article.title, article.description, article.body);
  });

  it('should be able to follow the another user', () => {
    userPage.visit(`/#/@${user2.username}`);

    homePage.assertHeaderContainUsername(user1.username);
    userPage.assertUserInfo(user2.username);
    userPage.assertUserInfo(user2.username);

    userPage.clickFollowUserButton();

    userPage.assertFollowTheUser();

    // This is a bug. The user is not followed
  });

  it('should be able to unfollow the another user', () => {
    // The test is blocked. The user is not followed
  });
});
