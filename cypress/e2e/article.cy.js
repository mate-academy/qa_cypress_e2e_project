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

  it('should be created using New Article form', () => {
    articlePage.createNewArticle();
    articlePage.typeTitle('My Title test');
    articlePage.typeDescription('My Description test');
    articlePage.typeBody('My Body test');
    articlePage.submitArticle();
    articlePage.assertArticleCreated('My Title test');
  });

  it('should be edited using Edit button', () => {
    articlePage.clickEditArticleBtn();
    articlePage.typeTitle('My Title new');
    articlePage.typeDescription('My Description new');
    articlePage.typeBody('My Body new');
    articlePage.submitArticle();
    articlePage.assertArticleCreated('My Title new');
  });

  it('should be deleted using Delete button', () => {
    articlePage.clickDeleteArticleBtn();
    articlePage.assertArticleDeleted();
  });
});
