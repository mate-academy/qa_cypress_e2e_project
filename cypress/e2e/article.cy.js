/* eslint-disable max-len */
/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import NewArticlePageObject from '../support/pages/newArticle.pageObject';

const articlePage = new ArticlePageObject();
const newArticlePage = new NewArticlePageObject();
const homePage = new HomePageObject();

describe('Article', () => {
  let user;
  let article;

  before(() => {

  });

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
    cy.registerAndLogin(user.email, user.username, user.password);
    articlePage.visit();
    articlePage.typeTitle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);
    articlePage.typeTags(article.tag);
    articlePage.clickPublishButton();

    newArticlePage.assertArticleTitle(article.title);
    newArticlePage.assertUrl(article.title);
    newArticlePage.assertArticleBody(article.body);
  });

  it('should be edited using Edit button', () => {
    cy.registerAndLogin(user.email, user.username, user.password)
      .then((userId) => {
        user.id = userId;
      });
    cy.createArticle(article, user).then((slug) => {
      article.slug = '#/articles/' + slug;
      newArticlePage.visit(article.slug);
    });
    newArticlePage.clickEditArticleButton();
    articlePage.typeTitle(article.title + 'new');
    articlePage.typeDescription(article.description + 'new');
    articlePage.typeBody(article.body + 'new');
    articlePage.typeTags(article.tag + 'new');
    articlePage.clickPublishButton();

    newArticlePage.assertArticleTitle(article.title + 'new');
    newArticlePage.assertArticleBody(article.body + 'new');
  });

  it('should be deleted using Delete button', () => {
    cy.registerAndLogin(user.email, user.username, user.password)
      .then((userId) => {
        user.id = userId;
      });
    cy.createArticle(article, user).then((slug) => {
      article.slug = '#/articles/' + slug;
      newArticlePage.visit(article.slug);
    });
    newArticlePage.clickDeleteArticleButton();

    newArticlePage.assertAllertTextContain('Deleted the article. Going home...');
    homePage.assertAbsenceOfArticles();
  });
});
