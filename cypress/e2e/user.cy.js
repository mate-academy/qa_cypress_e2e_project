/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';
import NewArticlePageObject from '../support/pages/newArticle.pageObject';
import ArticlePageObject from '../support/pages/articlePage.pageObject';

const homePage = new HomePageObject();
const newArticle = new NewArticlePageObject();
const articleView = new ArticlePageObject();

describe('User', () => {
  let username, email, password;
  let secondUsername, secondEmail, secondPassword;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((user) => {
      username = user.username;
      email = user.email;
      password = user.password;
      cy.loginNewUser(email, username, password);
    });
  });

  it.skip('should be able to follow the another user', () => {});

  it('Should be able to make article favorite', () => {
    cy.createArticle();
    cy.logout();
    cy.task('generateUser').then((user) => {
      secondUsername = user.username;
      secondEmail = user.email;
      secondPassword = user.password;
      cy.loginNewUser(secondEmail, secondUsername, secondPassword);
    });
    cy.visit('/#/my-feed');
    homePage.yourFeedTab.click();
    newArticle.title.click();
    articleView.makeFavoriteBtn.click();
    articleView.favoriteCounter.should('have.text', '(1)');
    articleView.makeFavoriteBtn.should('contain', 'Unfavorite Article');
  });

  it('Should be able to post comment to the article', () => {
    cy.createArticle();
    cy.logout();
    cy.task('generateUser').then((user) => {
      secondUsername = user.username;
      secondEmail = user.email;
      secondPassword = user.password;
      cy.loginNewUser(secondEmail, secondUsername, secondPassword);
    });
    cy.visit('/#/my-feed');
    homePage.yourFeedTab.click();
    newArticle.title.click();
    articleView.commentInput.type('Comment to the article');
    articleView.postCommentBtn.click();
    articleView.commentText.should('have.text', 'Comment to the article');
  });
});
