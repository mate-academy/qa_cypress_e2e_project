/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import faker from 'faker';
import HomePageObject from '../support/pages/home.pageObject';

 const articlePage = new ArticlePageObject();
 const homePage = new HomePageObject();

 const testData = {
  articleTitle: faker.random.words(1),
  articleDescription: faker.random.words(4),
  article: faker.random.words(6),
};

describe('Article', () => {
  let user;
  // let article;
  
  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    cy.register(user.email, user.username, user.password).then(() => {
      cy.login(user.email, user.username, user.password);
      });
    //   cy.task('generateArticle').then((generateArticle) => {
    //     article = generateArticle;
    //     cy.createArticle(article.title, article.description, article.body)
    //     .then((response) => {
    //       cy.visit(`/articles/${response.body.article.slug}`);
    //   });
    // });
    });
      articlePage.visit();
  });

  it('should be created using New Article form', () => {
    articlePage.fillArticleTitleField(testData.articleTitle);
    articlePage.fillArticleDecriptionField(testData.articleDescription);
    articlePage.fillArticleField(testData.article);
    articlePage.clickOnPublishedArticleBtn();

    articlePage.assertArticleTitle(testData.articleTitle);
  });

  it('should be edited using Edit button', () => {
    articlePage.fillArticleTitleField(testData.articleTitle);
    articlePage.fillArticleDecriptionField(testData.articleDescription);
    articlePage.fillArticleField(testData.article);
    articlePage.clickOnPublishedArticleBtn();
    articlePage.assertArticleTitle(testData.articleTitle);
    articlePage.clickOnEditArticleBtn();

    articlePage.updateArticleTitle(testData.articleTitle);
    articlePage.updateArticleDescription(testData.articleDescription);
    articlePage.updateArticle(testData.article);
    articlePage.clickOnPublishedArticleBtn();

    articlePage.assertArticleTitle(testData.articleTitle);
    });
  

  it('should be deleted using Delete button', () => {
    articlePage.fillArticleTitleField(testData.articleTitle);
    articlePage.fillArticleDecriptionField(testData.articleDescription);
    articlePage.fillArticleField(testData.article);
    articlePage.clickOnPublishedArticleBtn();

    articlePage.assertArticleTitle(testData.articleTitle);
    articlePage.clickOnDeleteArticleBtn();
    homePage.assertNoArticle();

  });
});
