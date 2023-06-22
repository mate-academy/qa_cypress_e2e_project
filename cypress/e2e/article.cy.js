/// <reference types="cypress" />
/// <reference types="../support" />
import NewArticlePageObject from '../support/pages/newArticle.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const newArticlePage = new NewArticlePageObject();
const articlePage = new ArticlePageObject();


describe('Article', () => {
  let user;
  let article;
  before(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('');
    cy.login(); 
    
  });

  it('should be created using New Article form', () => {
    
    newArticlePage.visit();
    newArticlePage.articleTitleField.type(article.title);
    newArticlePage.articleDescriptionField.type(article.description);
    newArticlePage.articleBodyField.type(article.body);
    newArticlePage.articleTagField.type(article.tag);
    newArticlePage.submitBtn.click();
    articlePage.assertArticleTitle(article.title);
    articlePage.assertArticleBody(article.body);
    
  });

  it('should be edited using Edit button', () => {

    cy.createArticle(article.title, article.description, article.body).then((response) => {
      const slug = response.body.article.slug; 
    cy.visit(`/#/articles/${slug}`);
      }); 

    articlePage.articleEditButton.eq(1).click()

    const articleNewTitle = 'New ' + article.title;
    const articleNewDescription = 'New ' + article.description;
    const articleNewBody = 'New ' + article.body;
    const articleNewTag = 'New ' + article.tag;

    newArticlePage.articleTitleField.clear();
    newArticlePage.articleTitleField.type(articleNewTitle);
    newArticlePage.articleDescriptionField.clear();
    newArticlePage.articleDescriptionField.type(articleNewDescription);
    newArticlePage.articleBodyField.clear();
    newArticlePage.articleBodyField.type(articleNewBody);
    newArticlePage.articleTagField.clear();
    newArticlePage.articleTagField.type(articleNewTag);
    newArticlePage.submitBtn.click();
    articlePage.assertArticleNewTitle(articleNewTitle);
    articlePage.assertArticleNewBody(articleNewBody);
    });
  
  it('should be deleted using Delete button', () => {
    cy.createArticle(article.title, article.description, article.body).then((response) => {
      const slug = response.body.article.slug;
    cy.visit(`/#/articles/${slug}`);
    }); 
    articlePage.articleDeleteButton.eq(0).click()
    cy.url().should('eq', 'http://localhost:1667/#/');
    cy.visit('#/my-feed');
    cy.get('.article-preview').should('not.contain', article.title);
  });

})
  

  


