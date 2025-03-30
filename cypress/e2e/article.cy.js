/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();

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
    cy.register(user.email, user.username, user.password);
    articlePage.visit();
    articlePage.addTitle(article.title);
    articlePage.addDescription(article.description);
    articlePage.addBody(article.body);
    articlePage.addTag(article.tag);
    articlePage.clickOnPublishBtn();
    articlePage.assertArticleTitle(article.title);
    articlePage.assertArticleSlug(article.title);
  });

  it('should be edited using Edit button', () => {
    cy.register(user.email, user.username, user.password);
    cy.createArticle(article);
    articlePage.clickOnEditBtn();
    articlePage.clearArticle('Article Title');
    articlePage.addTitle(article.title);
    articlePage.clickOnPublishBtn();
    articlePage.assertArticleTitle(article.title);
    articlePage.assertArticleSlug(article.title);
  });

  it('should be deleted using Delete button', () => {
    cy.register(user.email, user.username, user.password);
    cy.createArticle(article);
    articlePage.clickOnDeleteBtn();
    homePage.assertHomePageUrl();
  });
});
