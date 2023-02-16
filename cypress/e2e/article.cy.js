/// <reference types="cypress" />
/// <reference types="../support" />

import homePageObject from '../support/pages/home.pageObject';
import createArticle from '../support/pages/createArticle.pageObject';
import articlePage from '../support/pages/articlePage.pageObject';
import userPage from '../support/pages/userPage.pageObject';

const userProfile = new userPage();
const homePage = new homePageObject();
const articleCreate = new createArticle();
const pageArticle = new articlePage ();

describe('Article', () => {
  let article;
  let updateMsg = ['Updated article title', 'Updated article body', 'Updated description']
  before(() => {
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should be created using New Article form', () => {
    cy.register();

    articleCreate.visit()

    articleCreate.articleTitleField
      .type(article.title);
    articleCreate.articleDescField
      .type(article.description);
    articleCreate.articleBodyField
      .type(article.body);
    articleCreate.articleTagField
      .type(article.tag);
    articleCreate.articlePublishBtn
      .click();

    cy.url()
      .should('contain', article.title);

    pageArticle.articleTitleField
      .should('contain', article.title);
    pageArticle.articleBodyField
      .should('contain', article.body);
    homePage.usernameLink
      .click();
    userProfile.articleDesc
      .should('contain', article.description);
    

  });
  
  it('should be edited using Edit button', () => { 
    cy.createArticle(article.title, article.description, article.body)
      .then(responce => {
        pageArticle.visit(responce.body.article.slug)
      })

    pageArticle.articleUpdateBtn
      .first()
      .click()

    articleCreate.articleTitleField
      .type(`{selectALL}${updateMsg[0]}`)
    articleCreate.articleBodyField
      .type(`{selectALL}${updateMsg[1]}`)
    articleCreate.articleDescField
      .type(`{selectALL}${updateMsg[2]}`)
    articleCreate.articleTagField
      .type('nwtg')
    
    articleCreate.articlePublishBtn
      .click();

    pageArticle.articleTitleField
      .should('contain', updateMsg[0])
    pageArticle.articleBodyField
      .should('contain', updateMsg[1])
    
    homePage.visit()

    homePage.articleDesc
      .should('contain', updateMsg[2])

    //по тегам перевірку не пишу бо не бачу їх на сайті
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article.title, article.description, article.body)
    .then(responce => {
      pageArticle.visit(responce.body.article.slug)
    })

    pageArticle.articleDeleteBtn
      .first()
      .click();
    homePage.usernameLink
      .click()

    userProfile.articlePreview
      .should('contain', 'No articles are here... yet.')
  });
});
