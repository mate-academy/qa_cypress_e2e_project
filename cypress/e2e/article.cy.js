/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import EditArticlePageObject from '../support/pages/editArticle.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const EditArticlePage = new EditArticlePageObject();
const ArticlePage = new ArticlePageObject();
const signInPage = new SignInPageObject();
describe('Article', () => {
  let user;
  let article;
  let updateArticle;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
    cy.task('updatedArticleData').then((updatedArticleData) => {
      updateArticle = updatedArticleData;
    });
  });
  it('should be created using New Article form', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    ArticlePage.assertHeaderContainUsername(user.username);
    ArticlePage.visit();
    ArticlePage.typeTitle(article.title);
    ArticlePage.typeDescription(article.description);
    ArticlePage.typeBody(article.body);
    ArticlePage.clickSubmitBtn();
    ArticlePage.assertContainTitle(article.title);
    ArticlePage.assertContainBody(article.body);
    cy.url().should('include', '/articles/');
  });

  it('should be edited using Edit button', () => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    ArticlePage.assertHeaderContainUsername(user.username);
    EditArticlePage.visit(article.title);
    EditArticlePage.typeTitle(updateArticle.title);
    EditArticlePage.typeDescription(updateArticle.description);
    EditArticlePage.typeBody(updateArticle.body);
    EditArticlePage.clickSaveButton();
    EditArticlePage.assertContainTitle(updateArticle.title);
    EditArticlePage.assertContainBody(updateArticle.body);
    cy.get('h1').should('not.contain', article.title);
    cy.get('p').should('not.contain', article.body);
  });
  it('should be deleted using Delete button', () => {
    cy.visit('/#/login');
    cy.get('[placeholder="Email"]').type(user.email);
    cy.get('[placeholder="Password"]').type(user.password);
    cy.get('.btn').click();
    ArticlePage.assertHeaderContainUsername(user.username);
    cy.visit(`#/articles/${updateArticle.title}`);
    cy.get(
      '.container > .article-meta > :nth-child(3) > .btn-outline-danger'
    ).click();
  });
});
