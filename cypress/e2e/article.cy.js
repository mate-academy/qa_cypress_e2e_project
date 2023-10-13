/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import ArticleNewPageObject from '../support/pages/articleNew.pageObject';
import faker from 'faker';

const homePage = new HomePageObject();
const newArticlePage = new ArticleNewPageObject();
const articlePage = new ArticlePageObject();

const articleTitle = faker.lorem.words(2);
const articleDescription = faker.lorem.sentence();
const articleText = faker.lorem.sentences(2);
const newArticleText = faker.lorem.word();

describe('Article', () => {
  let user;

  before(() => {
    cy.viewport(1980,1024);
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(generateUser.email, generateUser.username, generateUser.password);
    });
  });

  it('should be created using New Article form', () => {
    newArticlePage.visit();
    newArticlePage.typeArticleTitle(articleTitle);
    newArticlePage.typeArticleDescription(articleDescription);
    newArticlePage.typeArticleBody(articleText);
    newArticlePage.clickPublishBtn();

    articlePage.assertArticleTitle(articleTitle);
    articlePage.assertArticleText(articleText);
    articlePage.assertArticleAuthor(user.username);
  });

  it('should be edited using Edit button', () => { 
    cy.get('@createdUser').then((user) => {
      cy.createArticle(user.id, articleTitle, articleDescription, articleText)
    .then(response => {
      const slug = response.body.article.slug;
      cy.visit(`/#/articles/${slug}`);
    }); 
    });

    articlePage.clickEditArticleBtn();
    newArticlePage.clearArticleBody();
    newArticlePage.typeArticleBody(newArticleText);
    newArticlePage.clickPublishBtn();

    articlePage.assertArticleText(newArticleText);
  });

  it('should be deleted using Delete button', () => {
    cy.get('@createdUser').then((user) => {
      cy.createArticle(user.id, articleTitle, articleDescription, articleText)
    .then(response => {
      const slug = response.body.article.slug;
      cy.visit(`/#/articles/${slug}`);
    }); 
    });

    articlePage.clickDeleteArticleBtn();
    homePage.clickYourFeed();

    homePage.assertEmptyArticleList();
  });
});
