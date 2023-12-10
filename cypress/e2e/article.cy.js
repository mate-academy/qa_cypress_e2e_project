/// <reference types='cypress' />
/// <reference types='../support' />

import NewArticlePageObject from '../support/pages/newarticle.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const newArticlePage = new NewArticlePageObject();
const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();

describe('Article', () => {
  let user;
  let article;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should be created using New Article form', () => {
    cy.login(user.username, user.email, user.password);
    newArticlePage.visit();
    newArticlePage.typeArticleTitle(article.title);
    newArticlePage.typeArticleDescription(article.description);
    newArticlePage.typeArticleBody(article.body);
    newArticlePage.typeArticleTag(article.tag);
    newArticlePage.clickNewArticleButton();
    articlePage.assertNewArticleCreated(article.title, article.body,
      article.tag);
    homePage.visit();
    homePage.assertArticleComponentsExist(article.title, article.description,
      article.tag);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(
      user.username,
      user.email,
      user.password,
      article.title,
      article.description,
      article.body,
      article.tag).then((response) => {
      const slug = response.body.article.slug;
      cy.visit(`#/articles/${slug}`);
    });
    articlePage.clickEditArticleButton();
    newArticlePage.typeUpdatedArticleTitle(article.updatedTitle);
    newArticlePage.typeUpdatedArticleDescription(article.updatedDescription);
    newArticlePage.typeUpdatedArticleBody(article.updatedBody);
    newArticlePage.clickNewArticleButton();
    articlePage.assertNewArticleCreated(article.updatedTitle,
      article.updatedBody, article.tag);
    homePage.visit();
    homePage.assertArticleComponentsExist(article.updatedTitle,
      article.updatedDescription, article.tag);
  });

  it.only('should be deleted using Delete button', () => {
    cy.createArticle(
      user.username,
      user.email,
      user.password,
      article.title,
      article.description,
      article.body,
      article.tag).then((response) => {
      const slug = response.body.article.slug;
      cy.visit(`#/articles/${slug}`);
    });
    articlePage.assertNewArticleCreated(article.title,
      article.body, article.tag);
    articlePage.clickDeleteArticleButton();
    homePage.assertArticleDeleted(article.title,
      article.description, article.tag);
  });
});
