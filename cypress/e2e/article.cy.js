/// <reference types='cypress' />
/// <reference types='../support' />
import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';
import createArticlePageObject from '../support/pages/createArticle.pageObject';
// eslint-disable-next-line no-unused-vars
import faker from 'faker';
// eslint-disable-next-line no-unused-vars
import SignInPageObject from '../support/pages/signIn.pageObject';

// eslint-disable-next-line new-cap
const createArticle = new createArticlePageObject();
const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('db:clear');
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
    homePage.assertHeaderContainUsername(user.username);

    createArticle.visit();

    createArticle.typeTitle(article.title);
    createArticle.typeDescription(article.description);
    createArticle.typeBody(article.body);
    createArticle.typeTags(article.tag);
    createArticle.clickPublishBtn();

    cy.contains('h1', article.title).should('be.visible');
    cy.url().should('include', article.title);
  });

  it('should be edited using Edit button', () => {
    cy.register(user.email, user.username, user.password);

    cy.publishArticle(article);
    createArticle.clickEditArticleBtn();
    createArticle.clearFieldDataCy('article-title');
    createArticle.typeTitle(article.title);
    createArticle.clearFieldDataCy('article-description');
    createArticle.typeDescription(article.description);
    createArticle.clearFieldDataCy('article-body');
    createArticle.typeBody(article.body);
    createArticle.clearFieldPlaceholder('Enter tags');
    createArticle.typeTags(article.tag);
    createArticle.clickPublishBtn();
    cy.contains('h1', article.title).should('be.visible');
    cy.url().should('include', article.title);
  });

  it.only('should be deleted using Delete button', () => {
    cy.register(user.email, user.username, user.password);

    cy.publishArticle(article);
    createArticle.clickDeleteArticle();
    cy.url().should('include', '/#/');
    homePage.assertHeaderContainUsername(user.username);
  });
});
