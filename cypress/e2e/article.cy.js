/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';
import NewArticlePageObject from '../support/pages/newArticle.pageObject';
import ArticlePageObject from '../support/pages/articlePage.pageObject';

const homePage = new HomePageObject();
const newArticle = new NewArticlePageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
  let email, username, password;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((user) => {
      email = user.email;
      username = user.username;
      password = user.password;
      cy.loginNewUser(email, username, password);
    });
    newArticle.visit();
  });

  it('should be created using New Article form', () => {
    cy.task('generateArticle').then((article) => {
      newArticle.title.type(article.title);
      newArticle.description.type(article.description);
      newArticle.body.type(article.body);
      newArticle.tag.type(`${article.tag}{enter}`);
      newArticle.tag.type(`${article.tag}2{enter}`);
      newArticle.publishArticleBtn.click();
      newArticle.title.should('contain', article.title);
      articlePage.authorUsername.eq(0).should('contain', username);
      newArticle.body.should('contain.text', article.body);
      homePage.visit();
      homePage.yourFeedTab.click();
      newArticle.title.should('contain.text', article.title);
      articlePage.tag.eq(0).should('have.text', article.tag);
    });
  });

  it('should be edited using Edit button', () => {
    cy.createArticle();
    articlePage.editArticleBtn.click();
    newArticle.title.type('{selectAll}Changed title');
    newArticle.description.type('{selectAll}Changed description');
    newArticle.body.type('{selectAll}Changed body');
    newArticle.tag.type('Tag{enter}');
    newArticle.publishArticleBtn.click();
    newArticle.title.should('have.text', 'Changed title');
    newArticle.body.should('have.text', 'Changed body\n');
    articlePage.tag.eq(1).should('have.text', 'Tag');
    homePage.visit();
    homePage.yourFeedTab.click();
    newArticle.title.should('have.text', 'Changed title');
    newArticle.description.should('have.text', 'Changed description');
    homePage.tag.eq(1).should('have.text', 'Tag');
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle();
    articlePage.deleteArticleBtn.click();
    homePage.noArticleText.should(
      'contain.text',
      'No articles are here... yet.'
    );
  });
});
