/// <reference types="cypress" />
/// <reference types="../support" />

import EditArticlePageObject from '../support/pages/editArticle.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import faker from "faker";

const editArticlePage = new EditArticlePageObject();
const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();



describe('Article', () => {
  let user;
  let article;
  
  const editedArticle = {
    title: faker.lorem.words(),
    description: faker.lorem.words(),
    body: faker.lorem.words()
  };

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
    cy.wait(500);
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.username, user.password);
  });

  it('should be created using New Article form', () => {
    editArticlePage.visit();

    editArticlePage.typeArticleTitle(article.title);
    editArticlePage.typeArticleDescription(article.description);
    editArticlePage.typeArticleBody(article.body);
    editArticlePage.publishArticle();

    articlePage.assertArticleTitle(article.title);
    articlePage.assertArticleBody(article.body);

    articlePage.assertArticleButtons();
  });

  it('should be edited using Edit button', () => {
    editArticlePage.visit();
    cy.createArticle(article.title, article.description, article.body, article.tag).then((response) => {
      const slug = response.body.article.slug;
    articlePage.visitArticlePage(slug);
    });

    articlePage.clickEditArticleBtn();
    editArticlePage.typeArticleTitle(editedArticle.title);
    editArticlePage.typeArticleBody(editedArticle.body);
    editArticlePage.publishArticle();
    
    articlePage.assertArticleTitle(editedArticle.title);
    articlePage.assertArticleBody(editedArticle.body);
    
    articlePage.assertArticleButtons();
  });

  it('should be deleted using Delete button', () => {
    editArticlePage.visit();

    cy.createArticle(article.title, article.description, article.body).then(
      (response) => {
        const slug = response.body.article.slug;
        articlePage.visitArticlePage(slug);
      });

      articlePage.clickDeleteArticleBtn();
      homePage.assertAfterDeleteArticle();
    });
  });
