/// <reference types="cypress" />
/// <reference types="../support" />

import faker from "faker";
import HomePageObject from "../support/pages/home.pageObject";
import ArticlePageObject from "../support/pages/articlePage.pageObject";

const homePage = new HomePageObject;
const articlePage = new ArticlePageObject;
const newArticle = {
  title: faker.lorem.word(),
  description: faker.lorem.words(),
  body: faker.lorem.words()
};

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
    homePage.visit();
    cy.login(user.email, user.username, user.password);
  });

  it('should be created using New Article form', () => {
    articlePage.visit();
    articlePage.typeArticleTitleField(article.title);
    articlePage.typeArticleDescriptionField(article.description);
    articlePage.typeArticleBodyField(article.body);
    articlePage.clickOnPublishBtn();
    articlePage.articleTitle.should('contain', article.title);
    articlePage.articleBody.should('contain', article.body);
    articlePage.articleDeleteBtn.should('exist');
    articlePage.articleEditBtn.should('exist');
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(article.title, article.description, article.body, article.tag)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`/#/articles/${slug}`);
      });
    articlePage.clickOnEditBtn();
    articlePage.typeArticleTitleField(newArticle.title);
    articlePage.typeArticleDescriptionField(newArticle.description);
    articlePage.typeArticleBodyField(newArticle.body);
    articlePage.clickOnPublishBtn();
    articlePage.articleTitle.should('contain', newArticle.title);
    articlePage.articleBody.should('contain', newArticle.body);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article.title, article.description, article.body, article.tag)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`/#/articles/${slug}`);
    articlePage.clickOnDeleteBtn();
    homePage.globalfeedLink.should('be.visible');
    homePage.checkNoArticlesVisible();
    });
  });
});

