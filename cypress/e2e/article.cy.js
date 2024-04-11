/// <reference types='cypress' />
/// <reference types='../support' />

import articlePageObject from '../support/pages/article.pageObject';

const articlePage = new articlePageObject();

describe('Article', () => {
  let user;
  let article;
  let editArticle;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
    cy.task('generateArticle').then((generateArticle) => {
      editArticle = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    cy.login(user.email, user.username, user.password);
    articlePage.visit();

    articlePage.typeTitle(article.title);
    articlePage.typeAbout(article.description);
    articlePage.typeArticle(article.body);
    articlePage.typeTags(article.tag);
    articlePage.clickOnPublishButton();

    articlePage.checkBannerContainArticle(article.title);
    articlePage.checkArticleContentContainBody(article.body);
  });

  it('should be edited using Edit button', () => {
    cy.login(user.email, user.username, user.password);
    articlePage.visit();

    articlePage.typeTitle(article.title);
    articlePage.typeAbout(article.description);
    articlePage.typeArticle(article.body);
    articlePage.typeTags(article.tag);
    articlePage.clickOnPublishButton();
    articlePage.clickOnEditButton()

    articlePage.typeTitle(editArticle.title);
    articlePage.typeAbout(editArticle.description);
    articlePage.typeArticle(editArticle.body);
    articlePage.typeTags(editArticle.tag);
    articlePage.clickOnPublishButton();

    articlePage.checkBannerContainArticle(editArticle.title);
    articlePage.checkArticleContentContainBody(editArticle.body);
  });

  it('should be deleted using Delete button', () => {
    cy.login(user.email, user.username, user.password);
    articlePage.visit();

    articlePage.typeTitle(article.title);
    articlePage.typeAbout(article.description);
    articlePage.typeArticle(article.body);
    articlePage.typeTags(article.tag);
    articlePage.clickOnPublishButton();
    articlePage.clickOnDeletwButton();

    articlePage.checkGlobalFeed();
  });
});
