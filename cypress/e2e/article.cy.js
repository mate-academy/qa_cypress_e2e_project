/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
  let user;
  let article;
  let article2;

  before(() => {
    cy.task('generateUser').then((generateUser1) => {
      user = generateUser1;
    });

    cy.task('generateArticle').then((generateArticle1) => {
      article = generateArticle1;
    });

    cy.task('generateArticle').then((generateArticle2) => {
      article2 = generateArticle2;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.register(user.email, user.username, user.password);
  });

  it('should be created using New Article form', () => {
    articlePage.visit();
    articlePage.typeTitle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);
    articlePage.clickPublishArticleBtn();
    articlePage.assertCreateArticle(article);
  });

  it('should be edited using Edit button', () => {
    articlePage.visit();
    cy.createArticle(article.title, article.description, article.body);
    articlePage.clickEditArticleBtn();
    cy.editArticle(article2.title, article2.description, article2.body);
    articlePage.assertEditArticle(article2);
  });

  it('should be deleted using Delete button', () => {
    articlePage.visit();
    cy.createArticle(article.title, article.description, article.body);
    articlePage.clickDeleteArticleBtn();
    homePage.yourFeed();
    articlePage.assertDeleteArticle();
  });
});
