/// <reference types="cypress" />
/// <reference types="../support" />

import ArticleEditorPageObject from '../support/pages/articleEdit.pageObject';
import ArticlesPageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const articleEditPage = new ArticleEditorPageObject();
const articlePage = new ArticlesPageObject();
const homePage = new HomePageObject();

describe('Article', () => {
  before(() => {

  });
  let user;
  let testData;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });

    cy.task('generateArticle').then(generateArticle => {
      testData = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should be created using New Article form', () => {
    cy.login();

    articleEditPage.visit();

    articleEditPage.typeTitle(testData.title);

    articleEditPage.typeDescription(testData.description);

    articleEditPage.typeBody(testData.body);

    articleEditPage.clickOnPublish();

    articlePage.articleTitle.should('contain', testData.title);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(testData.title, testData.description, testData.body, testData.tag).then((respons) => {
      const slug = respons.body.article.slug;

      cy.visit(`/#/articles/${slug}`);
    });

    articlePage.clickOnEditBtn();

    articleEditPage.typeTitle('new Title');

    articleEditPage.clickOnPublish();

    articlePage.articleTitle.should('contain', 'new Title');
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(testData.title, testData.description, testData.body, testData.tag).then((respons) => {
      const slug = respons.body.article.slug;

      cy.visit(`/#/articles/${slug}`);
    });

    articlePage.clickOnDeleteBtn();

    homePage.cheackArticlesList();
  });
});
