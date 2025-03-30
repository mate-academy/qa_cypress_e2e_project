/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();

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
    // cy.wait(2000);
    cy.register(user.email, user.username, user.password);
    articlePage.visit();
  });

  it('should be created using New Article form', () => {
    articlePage.typeArticleTitle(article.title);
    articlePage.typeArticleAbout(article.description);
    articlePage.typeArticleBody(article.body);
    articlePage.typeArticleTags(article.tags);

    articlePage.clickPublishBtn();

    articlePage.assertArticleContainsTitle(article.title);
    articlePage.assertArticleContainsBody(article.body);
  });

  it('should be edited using Edit button', () => {
    cy.loginAuth(user.email, user.password).then((user) => {
      cy.createArticle(
        user.id, article.title, article.description, article.body
      ).then((articles) => {
        const slug = articles.body.article.slug;
        cy.visit(`/#/articles/${slug}`);
      });
    });
    articlePage.clickEditBtn();
    articlePage.typeArticleTitle(`{selectAll}{backspace}${article.title}`);
    articlePage.typeArticleAbout(`{selectAll}{backspace}${article.description}`);
    articlePage.typeArticleBody(`{selectAll}{backspace}${article.body}`);
    articlePage.typeArticleTags(`{selectAll}{backspace}${article.tags}`);

    articlePage.clickPublishBtn();

    articlePage.assertArticleContainsTitle(article.title);
    articlePage.assertArticleContainsAuthor(user.username);
    articlePage.assertArticleContainsBody(article.body);
  });

  it('should be deleted using Delete button', () => {
    cy.loginAuth(user.email, user.password).then((user) => {
      cy.createArticle(
        user.id, article.title, article.description, article.body
      ).then((articles) => {
        const slug = articles.body.article.slug;
        cy.visit(`/#/articles/${slug}`);
      });
    });
    articlePage.clickDeleteArticle();

    homePage.usernameLink.click();
    cy.get('.article-preview')
      .should('contain.text', 'No articles are here... yet.');
  });
});