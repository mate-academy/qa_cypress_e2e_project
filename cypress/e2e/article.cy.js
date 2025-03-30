/// <reference types='cypress' />
/// <reference types='../support' />

import CreateArticlePageObject from '../support/pages/createArticle.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import faker from 'faker';

const createArticlePage = new CreateArticlePageObject();
const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();

describe('Article flow', () => {
  let article;
  let user;

  const alertMessage = {
    failedCreateArticle: 'Oops!',
    noArticles: 'No articles are here... yet.'
  };

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should allow to create an article using New Article form', () => {
    cy.login(user.email, user.username, user.password);
    createArticlePage.visit();

    createArticlePage.typeTitle(article.title);
    createArticlePage.typeDescription(article.description);
    createArticlePage.typeBody(article.body);
    createArticlePage.typeTag(article.tag);
    createArticlePage.clickPublishArticleBtn();

    articlePage.assertArticlesTitle(article.title);
    articlePage.assertArticlesBody(article.body);
    cy.url().should('include', '/articles');
  });

  it('should allow to create an article without tags', () => {
    cy.login(user.email, user.username, user.password);
    createArticlePage.visit();

    createArticlePage.typeTitle(article.title);
    createArticlePage.typeDescription(article.description);
    createArticlePage.typeBody(article.body);
    createArticlePage.clickPublishArticleBtn();

    articlePage.assertArticlesTitle(article.title);
    articlePage.assertArticlesBody(article.body);
    cy.url().should('include', '/articles');
  });

  it('should not allow to create an article without title', () => {
    cy.login(user.email, user.username, user.password);
    createArticlePage.visit();

    createArticlePage.typeDescription(article.description);
    createArticlePage.typeBody(article.body);
    createArticlePage.typeTag(article.tag);
    createArticlePage.clickPublishArticleBtn();

    createArticlePage.assertFailedCreatingArticle(alertMessage.failedCreateArticle);
    cy.url().should('include', '/editor');
  });

  it('should not allow to create an article without description', () => {
    cy.login(user.email, user.username, user.password);
    createArticlePage.visit();

    createArticlePage.typeTitle(article.title);
    createArticlePage.typeBody(article.body);
    createArticlePage.typeTag(article.tag);
    createArticlePage.clickPublishArticleBtn();

    createArticlePage.assertFailedCreatingArticle(alertMessage.failedCreateArticle);
    cy.url().should('include', '/editor');
  });

  it('should not allow to create an article without body', () => {
    cy.login(user.email, user.username, user.password);
    createArticlePage.visit();

    createArticlePage.typeTitle(article.title);
    createArticlePage.typeDescription(article.description);
    createArticlePage.typeTag(article.tag);
    createArticlePage.clickPublishArticleBtn();

    createArticlePage.assertFailedCreatingArticle(alertMessage.failedCreateArticle);
    cy.url().should('include', '/editor');
  });

  it('should allow to edit an article\'s title using Edit button', () => {
    const newTitle = faker.lorem.word();
    let slug;

    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        slug = response.body.article.slug;
        articlePage.visitArticlePage(slug);
      });

    articlePage.clickEditArticleBtn();
    createArticlePage.clearTitleField();

    createArticlePage.typeTitle(newTitle);
    createArticlePage.clickPublishArticleBtn();

    articlePage.assertArticlesTitle(newTitle);
    articlePage.assertArticlesBody(article.body);
    cy.url().should('include', '/articles');
  });

  it('should allow to edit an article\'s description using Edit button', () => {
    const newDescription = faker.lorem.words();
    let slug;

    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        slug = response.body.article.slug;
        articlePage.visitArticlePage(slug);
      });

    articlePage.clickEditArticleBtn();
    createArticlePage.clearDescriptionField();

    createArticlePage.typeDescription(newDescription);
    createArticlePage.clickPublishArticleBtn();

    articlePage.assertArticlesTitle(article.title);
    articlePage.assertArticlesBody(article.body);
    cy.url().should('include', '/articles');

    homePage.visit();
    homePage.assertEditingDescription(article.title, newDescription);
  });

  it('should allow to edit an article\'s body using Edit button', () => {
    const newBody = faker.lorem.words();
    let slug;

    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        slug = response.body.article.slug;
        articlePage.visitArticlePage(slug);
      });

    articlePage.clickEditArticleBtn();
    createArticlePage.clearBodyField();

    createArticlePage.typeBody(newBody);
    createArticlePage.clickPublishArticleBtn();

    articlePage.assertArticlesTitle(article.title);
    articlePage.assertArticlesBody(newBody);
    cy.url().should('include', '/articles');
  });

  it('should allow to delete an article using Delete button', () => {
    let slug;

    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        slug = response.body.article.slug;
        articlePage.visitArticlePage(slug);
      });

    articlePage.clickDeleteArticleBtn();

    homePage.clickYourFeedLink();

    homePage.assertNoArticles(alertMessage.noArticles);
  });
});
