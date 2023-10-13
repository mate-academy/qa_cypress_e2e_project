/// <reference types='cypress' />
/// <reference types='../support' />

import ArticleEditPageObject from '../support/pages/articleEdit.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const ArticleEditPage = new ArticleEditPageObject();
const homePage = new HomePageObject();


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
    cy.wait(2000);
    cy.register();
    cy.login();
  });
   

  it('should be created using New Article form', () => {
    ArticleEditPage.visit();
    ArticleEditPage.typeTitle(article.title);
    ArticleEditPage.typeDescription(article.description);
    ArticleEditPage.typeBody(article.body);
    ArticleEditPage.clickOnPublish();
    
    cy.url().should('include', `articles/${article.title}`);

  });

  it('should be edited using Edit button', () => {
    cy.createdArticle(article);
    
    ArticleEditPage.clickOnEditBtn();
    ArticleEditPage.typeNewTitle(`Testing Conduit`, { force: true });
    ArticleEditPage.clickOnPublish();
    ArticleEditPage.containTitle(`Testing Conduit`);
    ArticleEditPage.containBody();

  });

  it('should be deleted using Delete button', () => {
    cy.createdArticle(article);
    
    ArticleEditPage.deleteArticleBtn();
    homePage.checkArticlesList();
  });
  });

