/// <reference types="cypress" />
/// <reference types="../support" />

import ArticleEditorPageObject from "../support/pages/articleEditor.pageObject";
import ArticlesPageObject from "../support/pages/articles.pageObject";
import HomePageObject from "../support/pages/home.pageObject";

const articleEditorPage = new ArticleEditorPageObject();
const articlesPage = new ArticlesPageObject();
const homePage = new HomePageObject();

describe('Article', () => {
  before(() => {

  });
  let testData;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateArticle').then(generateArticle => {
      testData = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    cy.register();

    articleEditorPage.visit();

    articleEditorPage.typeTitle(testData.title);

    articleEditorPage.typeDescription(testData.description);

    articleEditorPage.typeBody(testData.body);

    articleEditorPage.clickOnPublish();

    articlesPage.articleTitle.should('contain', testData.title);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(testData.title, testData.description, testData.body, testData.tag).then((respons) => {
      const slug = respons.body.article.slug;

      cy.visit(`/#/articles/${slug}`);
    });

    articlesPage.clickOnEditBtn();

    articleEditorPage.typeTitle('new Title');

    articleEditorPage.clickOnPublish();

    articlesPage.articleTitle.should('contain', 'new Title');
  });

  it.only('should be deleted using Delete button', () => {
    cy.createArticle(testData.title, testData.description, testData.body, testData.tag).then((respons) => {
      const slug = respons.body.article.slug;

      cy.visit(`/#/articles/${slug}`);
    });

    articlesPage.clickOnDeleteBtn();

    homePage.cheackArticlesList();
  }); 
});
