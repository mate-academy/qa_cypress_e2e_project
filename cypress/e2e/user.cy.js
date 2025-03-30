/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from '../support/pages/user.pageObject';
import HomePage from '../support/pages/home.pageObject';

const userPage = new UserPageObject();
const homePage = new HomePage();

describe('User', () => {
  let author;
  let user;
  let article;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generateUser) => {
      author = generateUser;
      cy.createArticle(
        author.username,
        author.email,
        author.password,
        article.body,
        article.description,
        article.tags,
        article.title
      );
    });

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.username, user.email, user.password);
      cy.loginSignInPage(user.email, user.password);
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should provide ability to follow user', () => {
    homePage.clickGlobalFeed();
    homePage.visitAuthorPage(author.username);
    
    userPage.assertFollowBtnExist();
    userPage.clickFollowUserBtn();
    userPage.assertUnfollowBtnExist();
  });

  it('should provide an ability to unfollow the user', () => {
  homePage.clickGlobalFeed();
  homePage.visitAuthorPage(author.username);
  
  userPage.assertFollowBtnExist();
  userPage.clickFollowUserBtn();
  userPage.clickUnfollowUserBtn();
  userPage.assertFollowBtnExist();
  });
});
