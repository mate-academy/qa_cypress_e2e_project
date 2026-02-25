/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import EditArticlePageObject from '../support/pages/editArticle.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const homePage = new HomePageObject();
const editArticlePage = new EditArticlePageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(
        generateUser.email,
        generateUser.username,
        generateUser.password
      );
    });
    cy.task('generateArticle').then((a) => {
      article = a;
      cy.login(user);
      editArticlePage.visit();
      editArticlePage.createArticle(
        article.title,
        article.description,
        article.body,
        article.tag
      );
    });
  });

  it('should be created using New Article form', () => {
    articlePage.assertH1ContainArticleTitle(article.title);
    articlePage.assertAuthorNameContainUsername(user.username);
    articlePage.assertArticleBodyContainBody(article.body);
  });

  it('should be edited using Edit button', () => {
    cy.task('generateArticle').then((newArticle) => {
      articlePage.clickArticleEditLink();
      editArticlePage
        .createArticle(
          newArticle.title,
          newArticle.description,
          newArticle.body,
          newArticle.tag
        );
      articlePage.assertH1ContainArticleTitle(newArticle.title);
      articlePage.assertArticleBodyContainBody(newArticle.body);
    });
  });

  it('should be deleted using Delete button', () => {
    articlePage.clickArticleDeleteBtn();
    homePage.assertArtListNotContainArticleTitle(article.title);
  });
});
