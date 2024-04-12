/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePage from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import NewArticlePage from '../support/pages/newArticle.pageObject';
import ProfilePage from '../support/pages/profile.pageObject';

const newArticlePage = new NewArticlePage();
const articlePage = new ArticlePage();
const homePage = new HomePageObject();
const profilePage = new ProfilePage();

describe('Article', () => {
  let userId;
  let username;

  beforeEach(() => {
    cy.task('db:clear');
    cy.register();
    cy.getCookie('username').then((cookie) => {
      username = cookie.value;
    });
    cy.getCookie('userId').then((cookie) => {
      userId = cookie.value;
    });
  });

  it('should be created using New Article form', () => {
    cy.generateArticleData().then((article) => {
      newArticlePage.visit();
      newArticlePage.typeTitle(article.title);
      newArticlePage.typeAbout(article.about);
      newArticlePage.typeBody(article.body);
      newArticlePage.typeTag(article.tag);
      newArticlePage.publishArticleButton.click();
      articlePage.assertUrl(article.title.toLowerCase());
      articlePage.assertContainText(
        articlePage.bannerCreatedArticle,
        article.title
      );
      articlePage.assertContainText(articlePage.bannerCreatedArticle, username);
      articlePage.assertContainText(
        articlePage.containerCreatedArticle,
        article.body
      );
    });
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(1, userId).then((response) => {
      articlePage.visit(
        `#/articles/${response.body.article.title.toLowerCase()}`
      );

      cy.generateArticleData().then((article) => {
        articlePage.editArticleButtonContainer.click();
        newArticlePage.titleArticleField.clear();
        newArticlePage.typeTitle(article.title);
        newArticlePage.aboutArticleField.clear();
        newArticlePage.typeAbout(article.about);
        newArticlePage.bodyArticleField.clear();
        newArticlePage.typeBody(article.body);
        newArticlePage.tagArticleField.clear();
        newArticlePage.typeTag(article.tag);
        newArticlePage.publishArticleButton.click();

        articlePage.assertContainText(
          articlePage.bannerCreatedArticle,
          article.title
        );
        articlePage.assertContainText(
          articlePage.containerCreatedArticle,
          article.body
        );
      });
    });
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(2, userId).then((response) => {
      articlePage.visit(
        `#/articles/${response.body.article.title.toLowerCase()}`
      );
      articlePage.deliteArticleButtonContainer.click();

      homePage.usernameLink.click();
      profilePage.assertArticleNotExist(response.body.article.title);
    });
  });
});
