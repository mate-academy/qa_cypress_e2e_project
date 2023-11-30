/// <reference types='cypress' />
/// <reference types='../support' />

import homePageObject from '../support/pages/home.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import faker from 'faker';

const homePage = new homePageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
  let user;
  let article;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    cy.login(user.email, user.username, user.password);
    articlePage.visit();
  });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle; 
  });
});

  it('should be created using New Article form', () => {
    articlePage.typeTitle(article.title);
    articlePage.typeAbout(article.description);
    articlePage.typeBody(article.body);
    articlePage.typeTag(article.tag);
    articlePage.clickPublishBtn();

    articlePage.assertArticleInfo(article.title);

  });

  it('should be edited using Edit button', () => {
    const newTitle = faker.lorem.word()
    const newDescription = faker.lorem.words()
    const newBody = faker.lorem.words()
    const newTag = faker.lorem.word()

    articlePage.typeTitle(article.title);
    articlePage.typeAbout(article.description);
    articlePage.typeBody(article.body);
    articlePage.typeTag(article.tag);
    articlePage.clickPublishBtn();
    articlePage.assertArticleInfo(article.title);

    articlePage.clickEditBtn();
    articlePage.typeTitle(newTitle);
    articlePage.typeAbout(newDescription);
    articlePage.typeBody(newBody);
    articlePage.typeTag(newTag);
    articlePage.clickPublishBtn();
    articlePage.assertArticleInfo(newTitle);
  });

  it('should be deleted using Delete button', () => {
    articlePage.typeTitle(article.title);
    articlePage.typeAbout(article.description);
    articlePage.typeBody(article.body);
    articlePage.typeTag(article.tag);
    articlePage.clickPublishBtn();
    articlePage.assertArticleInfo(article.title);
    articlePage.clickDeleteBtn();
    cy.wait(2000);
    homePage.assertHomePageUrl();
  });
});
