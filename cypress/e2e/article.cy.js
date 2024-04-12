/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from "../support/pages/home.pageObject";
import ArticlePageObject from "../support/pages/article.pageObject";

const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
  let user;
  let article;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    }).then((user) => {
      cy.login(user.email, user.username, user.password);
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    articlePage.visit();
    articlePage.typeArticleTitle(article.title);
    articlePage.typeArticleAbout(article.description);
    articlePage.typeArticleText(article.body);
    articlePage.clickPublishButton();
    articlePage.assertArticleTitle(article.title);
    articlePage.assertArticleText(article.body);
  });

  it('should be edited using Edit button', () => {
    const userId = window.localStorage.getItem('userId');
    cy.createArticle(article.title, article.description, article.body, article.tag, userId)
      .then((response) => {
        articlePage.visitCreatedArticle(response.body.article.slug);
      });
    articlePage.clickEditButton();
    articlePage.typeArticleTitle(article.newTitle);
    articlePage.typeArticleAbout(article.newDescription);
    articlePage.typeArticleText(article.newBody);
    articlePage.clickPublishButton();
    articlePage.assertArticleTitle(article.newTitle);
    articlePage.assertArticleText(article.newBody);
  });

  it('should be deleted using Delete button', () => {
    const userId = window.localStorage.getItem('userId');
    cy.createArticle(article.title, article.description, article.body, article.tag, userId)
      .then((response) => {
        articlePage.visitCreatedArticle(response.body.article.slug);
      });
    articlePage.assertArticleTitle(article.title);
    articlePage.assertArticleText(article.body);
    articlePage.clickDeleteButton();
    homePage.assertHomePageUrl();
  });
});
