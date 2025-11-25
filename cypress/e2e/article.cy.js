/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const articlePage = new ArticlePageObject();
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Article Management', () => {
  let user;
  let articleData;
  let updatedArticleData;

  before(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      return cy.register(user.email, user.username, user.password);
    });

    cy.task('generateArticle').then((generateArticle) => {
      articleData = generateArticle;
    });
    cy.task('generateArticle').then((generateArticle) => {
      updatedArticleData = generateArticle;
    });
  });

  beforeEach(() => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
  });

  it('should create a new article with valid data', () => {
    articlePage.visitNewArticle();
    articlePage.typeTitle(articleData.title);
    articlePage.typeAbout(articleData.about);
    articlePage.typeContent(articleData.content);
    articlePage.typeTags(articleData.tags.join(' '));
    articlePage.clickPublishArticle();

    articlePage.articleTitle.should('contain', articleData.title);
    articlePage.articleContent.should('contain', articleData.content);
  });

  it('should edit an existing article', () => {
    cy.createArticle(articleData);
    articlePage.clickEditArticle();
    articlePage.typeTitle(updatedArticleData.title);
    articlePage.typeAbout(updatedArticleData.about);
    articlePage.typeContent(updatedArticleData.content);
    articlePage.clickPublishArticle();

    articlePage.articleTitle.should('contain', updatedArticleData.title);
    articlePage.articleContent.should('contain', updatedArticleData.content);
  });

  it('should delete an article', () => {
    cy.createArticle(articleData);
    articlePage.clickDeleteArticle();
    cy.url().should('not.include', '/article/');
    homePage.articleList.should('not.contain', articleData.title);
  });

  it('should validate required fields when creating an article', () => {
    articlePage.visitNewArticle();
    articlePage.clickPublishArticle();

    articlePage.errorMessages
      .should('be.visible')
      .and('contain', `title can't be blank`)
      .and('contain', `description can't be blank`)
      .and('contain', `body can't be blank`);
  });
});
