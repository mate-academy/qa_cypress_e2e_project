/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from "../support/pages/article.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";
import faker from "faker";

const articlePage = new ArticlePageObject();
const signInPage = new SignInPageObject();

describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    cy.register(user.email, user.username, user.password);
    articlePage.visit();
    articlePage.typeTitle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);
    articlePage.typeTag(article.tag);
    articlePage.clickPublishBtn();
    articlePage.assertDeleteBtn();
    articlePage.assertEditBtn();
  });

  it('should be edited using Edit button', () => {
    const updateTitle = faker.lorem.word();
    const updateDesription = faker.lorem.sentence();
    const updateBody = faker.lorem.text();
    const updateTag = faker.lorem.word();

    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body);
    articlePage.clickEditBtn();
    articlePage.typeTitle('{selectAll}' + updateTitle);
    articlePage.typeDescription('{selectAll}' + updateDesription);
    articlePage.typeBody('{selectAll}' + updateBody);
    articlePage.typeTag('{selectAll}' + updateTag);
    articlePage.clickPublishBtn();
    articlePage.assertArticleHeader(updateTitle);
    articlePage.assertArticleBody(updateBody);
  });

  it('should be deleted using Delete button', () => {
    cy.register(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body);
    articlePage.clickDeleteBtn();
    articlePage.assertSuccessDeleteMessage();  
  });
});