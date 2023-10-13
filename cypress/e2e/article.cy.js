/// <reference types='cypress' />
/// <reference types='../support' />

import articlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import faker from 'faker';

const articlePage = new articlePageObject();
const homePage = new HomePageObject();

const articleData = {
  title: faker.lorem.word(),
  description: faker.lorem.words(),
  body: faker.lorem.words(),
  tag: faker.lorem.word(),
  newTitle: faker.lorem.word(),
  newDescription: faker.lorem.words(),
  newBody: faker.lorem.words()
};

describe('Article', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should be created using New Article form', () => {
    cy.login(user.username, user.email, user.password);
    articlePage.visit();

    articlePage.typeArticleTitle(articleData.title);
    articlePage.typeArticleDescription(articleData.description);
    articlePage.typeArticleBody(articleData.body);
    articlePage.clickPublishArticleBtn();

    articlePage.assertArticlePublished(articleData.title);
    articlePage.assertArticlePublished(articleData.body);
  });

  it('should be edited using Edit button', () => {
    cy.login(user.username, user.email, user.password);
    articlePage.visit();

    articlePage.typeArticleTitle(articleData.title);
    articlePage.typeArticleDescription(articleData.description);
    articlePage.typeArticleBody(articleData.body);
    articlePage.clickPublishArticleBtn();

    articlePage.clickEditArticleBtn();
    articlePage.clearArticleTitle();
    articlePage.typeArticleTitle(articleData.newTitle);
    articlePage.clearArticleDescription();
    articlePage.typeArticleDescription(articleData.newDescription);
    articlePage.clearArticleBody();
    articlePage.typeArticleBody(articleData.newBody);
    articlePage.clickPublishArticleBtn();

    articlePage.assertArticlePublished(articleData.newTitle);
    articlePage.assertArticlePublished(articleData.newBody); 
  });


  it('should be deleted using Delete button', () => {
    cy.login(user.username, user.email, user.password);
    articlePage.visit();

    articlePage.typeArticleTitle(articleData.title);
    articlePage.typeArticleDescription(articleData.description);
    articlePage.typeArticleBody(articleData.body);
    articlePage.clickPublishArticleBtn();
    articlePage.clickDeleteArticleBtn();
    homePage.clickOnUsernameLink();

    articlePage.assertDeletedArticle('No articles are here... yet.');
  });
});
    

