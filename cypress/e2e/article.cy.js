/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from "../support/pages/article.pageObject";
import HomePageObject from "../support/pages/home.pageObject";

const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();
const faker = require("faker");

describe("Article", () => {
  const newTitle = faker.lorem.word();
  const newDescription = faker.lorem.words();
  const newBody = faker.lorem.words();
  const newTags = faker.lorem.words();
  let article;
  let user;

  before(() => {
    cy.task("generateUser").then((generateUser) => {
      user = generateUser;
    });
    cy.task("generateArticle").then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task("db:clear");
    cy.register(user.email, user.username, user.password);
  });

  it("should be created using New Article form", () => {
    cy.login();

    articlePage.visit();

    articlePage.typeArticleTitle(article.title);
    articlePage.typeArticleDescription(article.description);
    articlePage.typeArticleBody(article.body);
    articlePage.typeArticleTag(article.tag);
    articlePage.typeArticleTag(article.tag);

    articlePage.clickPublishBtn();

    homePage.assertArticlePageUrl(article.title);
  });

  it("should be edited using Edit button", () => {
    cy.login();
    cy.createArticle();

    cy.wait(5000);
    articlePage.clickEditArticleBtn();

    articlePage.articleTitle.clear();
    articlePage.articleTitle.type(newTitle);
    articlePage.articleDescription.clear();
    articlePage.articleDescription.type(newDescription);
    articlePage.articleBody.clear();
    articlePage.articleBody.type(newBody);
    articlePage.articleBody.clear();
    articlePage.articleBody.type(newBody);
    articlePage.articleTag.clear();
    articlePage.articleTag.type(newTags);
    articlePage.clickPublishBtn();

    homePage.assertEditArticlePageUrl();
  });

  it("should be deleted using Delete button", () => {
    cy.login();
    cy.createArticle();

    articlePage.clickDeleteBtn();
    homePage.assertSuccessfullDelete();
  });
});
