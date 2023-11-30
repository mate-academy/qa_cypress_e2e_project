/// <reference types='cypress' />
/// <reference types='../support' />
const faker = require("faker");
import HomePageObject from '../support/pages/home.pageObject';
import CreateArticlePageObject from '../support/pages/article.pageObject';

const homePage = new HomePageObject();
const articlePage = new CreateArticlePageObject();
let user;
let article;

const testData = {
  newTitle: faker.lorem.word(),
  newDescription: faker.lorem.word(),
  newBody: faker.lorem.sentence()
};

describe('Article', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
      articlePage.visit();
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    articlePage.typeArticleTitle(article.title);
    articlePage.typeArticleDescription(article.description);
    articlePage.typeArticleBody(article.body);
    articlePage.typeArticleTag(article.tag);
    articlePage.clickOnPublishArticleBtn();

    articlePage.assertArticleTitle(article.title);
    articlePage.assertArticleBody(article.body);
    articlePage.assertEditBtn();
    articlePage.assertDeleteBtn();
  });

  it('should not provide an ability to create an article while all required fields blank', () => {
    articlePage.clickOnPublishArticleBtn();

    articlePage.assertOopsError();
  });

  it('should not provide an ability to create an article while "Article Title" field blank', () => {
    articlePage.typeArticleDescription(article.description);
    articlePage.typeArticleBody(article.body);
    articlePage.typeArticleTag(article.tag);
    articlePage.clickOnPublishArticleBtn();

    articlePage.assertOopsError();
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(article.title,
      article.description,
      article.body).then(response => {
      const slug = response.body.article.slug;

      cy.visit(`#/articles/${slug}`);
      articlePage.clickOnEditBtn();
      articlePage.typeNewArticleTitle(testData.newTitle);
      articlePage.typeNewArticleDescription(testData.newDescription);
      articlePage.typeNewArticleBody(testData.newBody);
      articlePage.clickOnPublishArticleBtn();

      articlePage.assertArticleTitle(testData.newTitle);
      articlePage.assertArticleBody(testData.newBody);
    });
  });

  it('should not provide the ability to edit an article while title remains blank', () => {
    cy.createArticle(article.title,
      article.description,
      article.body).then(response => {
      const slug = response.body.article.slug;

      cy.visit(`#/articles/${slug}`);
      articlePage.clickOnEditBtn();
      articlePage.fillBlankArticleTitle();
      articlePage.clickOnPublishArticleBtn();

      articlePage.assertOopsError();
    });
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article.title,
      article.description,
      article.body).then(response => {
      const slug = response.body.article.slug;

      cy.visit(`#/articles/${slug}`);
      articlePage.clickOnDeleteBtn();

      homePage.assertYourFeedLink();
      homePage.assertGlobalFeedLink();
      cy.get('.article-preview')
        .matchImageSnapshot();
    });
  });
});
