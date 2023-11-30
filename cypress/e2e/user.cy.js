/// <reference types='cypress' />
/// <reference types='../support' />
import UserPageObject from '../support/pages/user.pageObject';
import HomePage from '../support/pages/home.pageObject';

const userPage = new UserPageObject();
const homePage = new HomePage();

describe('User', () => {
  let user;
  let user2;
  let article;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.createArticle(user.username,
        user.email,
        user.password,
        article.body,
        article.description,
        article.tags,
        article.title);
    });
    cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
      cy.register(user2.username, user2.email, user2.password);
      cy.loginSignInPage(user2.email, user2.password);
    });
  });

  it('should provide ability to follow user', () => {
    homePage.clickGlobalFeed();
    homePage.visitUserPage(user.username);
    userPage.assertFollowBtnExist();
    userPage.clickFollowUserBtn();
    userPage.assertUnfollowBtnExist();
  });
  // next test is blocked by previous
  // it('should provide an ability to unfollow the user', () => {
  // homePage.clickGlobalFeed();
  // homePage.visitUserPage();
  // userPage.assertFollowBtnExist();
  // userPage.clickFollowUserBtn();
  // userPage.clickUnfollowUserBtn();
  // userPage.assertFollowBtnExist();
  // });
});
