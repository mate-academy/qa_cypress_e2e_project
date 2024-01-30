/// <reference types='cypress' />
/// <reference types='../support' />


import faker from 'faker';
import ArticlePageObject from '../support/pages/Article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';


const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();
describe('Article', () => {
  before(() => {

  });
let user;
let article;
let slug;
const newInfo = faker.random.words(10);
const newTitle = faker.random.words(3);
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
    cy.wait(2000)
    cy.register()
    cy.login()
  });

  it('should be created using New Article form', () => {
    articlePage.visit();
    articlePage.typeTitle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);
    articlePage.clickPublishBtn();
    cy.url().should('contain', article.title);
  });

  it('should be edited using Edit button', () => {
      cy.createdArticle(article);
      articlePage.clickEditBtn();
      cy.get('[data-cy="article-title"]').clear();
      cy.get('[data-cy="article-write"]').clear();
      articlePage.typeTitle(newTitle);
      articlePage.typeBody(newInfo);
      articlePage.clickPublishBtn();
      articlePage.assertContainerContainTitle(newTitle);
      articlePage.assertContainerContainBody(newInfo);      
  })


  it('should be deleted using Delete button', () => {
    cy.createdArticle(article);
   articlePage.clickDeleteBtn();
   cy.wait(2000)
   articlePage.assertAllertTextContain();
  });
});
