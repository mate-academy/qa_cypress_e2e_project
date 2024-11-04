/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const articlePage = new ArticlePageObject();
const signInPage = new SignInPageObject();

describe('Article', () => {
  before(() => {
    cy.visit('/');
    signInPage.visit();
    signInPage.typeEmail('riot@qa.team');
    signInPage.typePassword('12345Qwert!');
    signInPage.clickSignInBtn();
  });

  it.only('should be created using New Article form', () => {
    articlePage.createNewArticle();
    articlePage.typeTitle('My Title');
    articlePage.typeDescription('My Description');
    articlePage.typeBody('My Body');
    articlePage.submitArticle();
    articlePage.assertArticleCreated('My Title');
  });

  it('should be edited using Edit button', () => {
    articlePage.clickEditArticleBtn();
    articlePage.typeTitle('My Title1');
    articlePage.typeDescription('My Description2');
    articlePage.typeBody('My Body3');
    articlePage.submitArticle();
    articlePage.assertArticleCreated('My Title1');
  });

  it('should be deleted using Delete button', () => {
    articlePage.clickDeleteArticleBtn();
    articlePage.assertArticleDeleted();
  });
});
