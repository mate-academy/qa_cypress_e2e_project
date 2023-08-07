/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const homePage = new HomePageObject();
const signUpPage = new SignUpPageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('db:clear');
    homePage.visit();

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.successMessage();
    articlePage.visit();
    articlePage.typeArticleTitle(article.title);
    articlePage.typeArticleDescription(article.description);
    articlePage.typeArticleBody(article.body);
    articlePage.typeArticleTag(article.tag);
    articlePage.clickPublishBtn();
    cy.contains('h1', article.title).should('be.visible');
  });

  it('should be edited using Edit button', () => {
    cy.register(user.email, user.username, user.password);
    cy.createArticle(article);
    articlePage.clickEditBtn();
    articlePage.clearArticle('Article Title');
    articlePage.typeArticleTitle(article.title);
    articlePage.clearArticle('What\'s this article about?');
    articlePage.typeArticleDescription(article.description);
    articlePage.clearArticle('Write your article (in markdown)');
    articlePage.typeArticleBody(article.body);
    articlePage.clearArticle('Enter tags');
    articlePage.typeArticleTag(article.tag);
    articlePage.clickPublishBtn();
    cy.contains('h1', article.title).should('be.visible');
  });

  it('should be deleted using Delete button', () => {
    cy.register(user.email, user.username, user.password);
    cy.createArticle(article);
    articlePage.clickDeleteBtn();
    cy.url().should('include', '/#/');
  });
});
