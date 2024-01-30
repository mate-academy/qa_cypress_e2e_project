/* eslint-disable */
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
  let userId;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.register(user.email, user.username, user.password).then((response) => {
      userId = response.body.user.id;
    });
    cy.login(user.email, user.username, user.password);
  });

  it('should be created using New Article form', () => {
    newArticlePage.visit();
    newArticlePage.typeArticleTitle(article.title);
    newArticlePage.typeArticleDescription(article.description);
    newArticlePage.typeArticleBody(article.body);
    newArticlePage.typeArticleTags(article.tag);
    newArticlePage.clickSubmitBtn();
    articlePage.assertContent(article.body);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(userId, article.body, article.description, article.tag, article.title)
      .then((response) => {
        const slug = response.body.article.slug;
        articlePage.visit(`#/articles/${slug}`);
      });
    articlePage.clickeditArticlebtn();
    newArticlePage.clearArticleBody();
    newArticlePage.typeArticleBody('new' + article.body);
    newArticlePage.clickSubmitBtn();
    articlePage.assertContent('new' + article.body);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(userId, article.body, article.description,
      article.tag, article.title)
      .then((response) => {
        const slug = response.body.article.slug;
        articlePage.visit(`#/articles/${slug}`);
      });
    articlePage.clickdeleteArticlebtn();
    homePage.assertHomepage();
  });
});
