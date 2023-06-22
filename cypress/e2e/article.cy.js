/// <reference types="cypress" />
/// <reference types="../support" />


import ArticlePageObject from "../support/pages/articlePage.pageObject";
import EditArticlePageObject from "../support/pages/editArticle.pageObject";
import HomePageObject from "../support/pages/home.pageObject";

const editArticle = new EditArticlePageObject();
const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();
let testData;

describe('Article', () => {
  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateArticle').then(generateArticle => {
      testData = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    cy.register();

    editArticle.visit();

    editArticle.typeTitle(testData.title);

    editArticle.typeDescription(testData.description);

    editArticle.typeBody(testData.body);

    editArticle.clickOnPublish();

    articlePage.articleTitle.should('contain', testData.title);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(testData.title, testData.description, testData.body, testData.tag).then((respons) => {
      const slug = respons.body.article.slug;
      cy.visit(`/#/articles/${slug}`);
    });
    articlePage.clickOnEditBtn();
    editArticle.typeTitle('new Title');
    editArticle.clickOnPublish();
    articlePage.articleTitle.should('contain', 'new Title');
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(testData.title, testData.description, testData.body, testData.tag).then((respons) => {
      const slug = respons.body.article.slug;
    });
    cy.visit(`/#/articles/${slug}`);
    articlePage.clickOnDeleteBtn();
    homePage.cheackArticlesList();
  }); 
});
