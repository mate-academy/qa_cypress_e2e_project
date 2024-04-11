/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.PageObject';
import HomePageObject from '../support/pages/home.pageObject';

import faker from 'faker';

const ArticlePage = new ArticlePageObject();
const HomePage = new HomePageObject();

describe('Article', () => {
  let user;
  let article;
  const newArticleBody = faker.random.words();

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
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.username, user.password);
    ArticlePage.visit();
  });

  it('should be created using New Article form', () => {
    ArticlePage.typeArticleItile(article.title);
    ArticlePage.typeArticleAbout(article.description);
    ArticlePage.typeArticleBody(article.body);
    ArticlePage.clickPublishArticleButton();

    ArticlePage.assertArticleTitlePage(article.title);
    ArticlePage.assertArticleBodyPage(article.body);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(article.title, article.description, article.body);

    ArticlePage.assertArticleTitlePage(article.title);
    ArticlePage.assertArticleBodyPage(article.body);

    ArticlePage.clickEditArticleButton();
    ArticlePage.typeArticleBody(newArticleBody);
    ArticlePage.clickPublishArticleButton();

    ArticlePage.assertArticleBodyPage(newArticleBody);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article.title, article.description, article.body);

    ArticlePage.assertArticleTitlePage(article.title);
    ArticlePage.assertArticleBodyPage(article.body);

    ArticlePage.clickDeleteArticleButton();

    HomePage.clickUsernameLink();

    ArticlePage.assertArticlePreview();
  });
});
