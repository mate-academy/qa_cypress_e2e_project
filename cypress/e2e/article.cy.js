/// <reference types='cypress' />
/// <reference types='../support' />
import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';
import CreateArticlePageObject from '../support/pages/createArticle.pageObject';

const createArticle = new CreateArticlePageObject();
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

  // eslint-disable-next-line max-len
  it('should not allow to create new article with empty "Article title" field', () => {
    cy.register(user.email, user.username, user.password);

    createArticle.visit();

    createArticle.typeDescription(article.description);
    createArticle.typeBody(article.body);
    createArticle.typeTags(article.tag);
    createArticle.clickPublishBtn();

    cy.get('.swal-title').should('contain', 'Oops!');
  });

  // eslint-disable-next-line max-len
  it('should not allow to create new article with empty "What\'s this article about?" field', () => {
    cy.register(user.email, user.username, user.password);

    createArticle.visit();

    createArticle.typeTitle(article.title);
    createArticle.typeBody(article.body);
    createArticle.typeTags(article.tag);
    createArticle.clickPublishBtn();

    cy.get('.swal-title').should('contain', 'Oops!');
  });

  // eslint-disable-next-line max-len
  it('should not allow to create new article with empty "Write your article"', () => {
    cy.register(user.email, user.username, user.password);

    createArticle.visit();

    createArticle.typeTitle(article.title);
    createArticle.typeDescription(article.description);
    createArticle.typeTags(article.tag);
    createArticle.clickPublishBtn();

    cy.get('.swal-title').should('contain', 'Oops!');
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

  it('should be deleted using Delete button', () => {
    cy.register(user.email, user.username, user.password);

    cy.publishArticle(article);
    createArticle.clickDeleteArticle();
    cy.url().should('include', '/#/');
    homePage.assertHeaderContainUsername(user.username);
  });
});
