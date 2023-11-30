/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.PageObject';

const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();
const profilePage = new ProfilePageObject();

describe('Article', () => {
  let user, article;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;

      cy.createArticle(
        user.username,
        user.email,
        user.password,
        article.title,
        article.description,
        article.body);
    });
  });

  it('should be created using New Article form', () => {
    cy.visit(`/#/articles/${article.title}`);
    articlePage.assertBannerContainTitle(article.title);
    articlePage.assertContentContainBody(article.body);
    articlePage.assertBannerContainEditBtn();
    articlePage.assertBannerContainDeleteBtn();
  });

  it('should be edited using Edit button', () => {
    cy.visit(`/#/articles/${article.title}`);
    articlePage.clickArticleEditBtn();
    articlePage.typeArticleContent('{selectAll}' + article.body);
    articlePage.clickArticlePublishBtn();

    articlePage.assertContentContainBody(article.body);
  });

  it('should be deleted using Delete button', () => {
    cy.visit(`/#/articles/${article.title}`);
    cy.intercept('DELETE', `/articles/${article.title}`).as('deleteArticle');
    articlePage.clickArticleDeleteBtn();

    cy.wait('@deleteArticle').then(() => {
      homePage.clickUserNameLink();
      profilePage.assertEmptyArticlesField();
    });
  });
});
