/// <reference types='cypress' />
/// <reference types='../support' />
const faker = require('faker');
const randomNumber = Math.floor(Math.random() * 100000);


describe('Article', () => {
  let article;
  let article2;
  let user;

  before(() => {
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {user = generateUser});
    cy.task('generateArticle').then(data => {article = data;});
    cy.task('generateArticle').then(data => {article2 = data;});
  });

  it('should be created using New Article form', () => {
   cy.register(user.username);
   cy.getCyData('create_article').click();
   cy.url().should('contain', `/#/editor`);
   cy.getPlaceholder('Article Title').type(article.title);
   cy.getPlaceholder('What\'s this article about?').type(article.description);
   cy.getPlaceholder('Write your article (in markdown)').type(article.body);
   cy.getPlaceholder('Enter tags').type(article.tag);
   cy.get('.btn').click();
   cy.url().should('contain', `/#/articles/${article.title}`);
   cy.getCyData('article_title').should('contain', article.title);
   cy.getCyData('article_body').should('contain', article.body);
   cy.getCyData('article_userdata').should('contain', user.username);
  });

  it('should be edited using Edit button', () => {
    cy.register(user.username);
    cy.createArticle(article.title);
    cy.contains('a', 'Edit Article').click({force: true});
    cy.url().should('contain', `/#/editor/${article.title}`);
    cy.getPlaceholder('Article Title').type(`{selectall} ${article2.title}`);
    cy.getPlaceholder('What\'s this article about?').type(`{selectall} ${article2.description}`);
    cy.getPlaceholder('Write your article (in markdown)').type(`{selectall} ${article2.body}`);
    cy.getPlaceholder('Enter tags').type('{selectall}', `{selectall} ${article2.tag}`);
    cy.get('.btn').click();
    cy.url().should('contain', `/#/articles/${article2.title}`); //url doesn't match article title: bug report is needed 
    cy.getCyData('article_title').should('contain', article2.title);
    cy.getCyData('article_body').should('contain', article2.body);
    cy.getCyData('article_userdata').should('contain', user.username);
  });

  it('should be deleted using Delete button', () => {
    cy.register();
    cy.createArticle(article.title);
    cy.contains('span', 'Delete Article').click({force: true});
    cy.get('.swal-modal').should('contain', 'Deleted the article. Going home...');
    cy.url().should('be.equal','http://localhost:1667/#/');
    cy.wait(11000);
    ///-------------------------bug report is needed: user is redirected to deleted article----------------------------\\\\
    cy.request(`#/articles/${article.title}`).then(response => {
      expect(response.status).to.eq(404);   
    });
  });
  
});
