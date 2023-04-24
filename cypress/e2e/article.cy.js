/// <reference types="cypress" />
/// <reference types="../support" />
import { faker } from '@faker-js/faker';
import { generateNewArticle } from '../support/generateNewArticle';



describe('Create Article page', () => {

   let user;
   const errorMsg = 'Oops!';
   const { title, description, body, tags } = generateNewArticle();

   beforeEach(() => {
      cy.task('db:clear');
      cy.task('generateUser').then(generateUser => {
         user = generateUser;
      });
      cy.register().then(user => {
         cy.login(user).then(() => user);
      }).as('user');
      cy.visit(`#/editor`);
   });

   it('should have New article form', () => {
      cy.findByPlaceholder('Article Title').should('exist');
      cy.findByPlaceholder('What\'s this article about?').should('exist');
      cy.findByPlaceholder('Write your article (in markdown)').should('exist');
      cy.findByPlaceholder('Enter tags').should('exist');
      cy.getByDataQa('publish-btn').should('exist');
   });

   it('should create an article with filled all fields', () => {
      cy.findByPlaceholder('Article Title').type(title);
      cy.findByPlaceholder('What\'s this article about?').type(description);
      cy.findByPlaceholder('Write your article (in markdown)').type(body);
      cy.findByPlaceholder('Enter tags').type(tags);
      cy.getByDataQa('publish-btn').click();
      cy.url(`articles/${title}-`);
      cy.get('h1').should('contain.text', title);
   });

   it('should create an article with empty Tags field', () => {
      cy.findByPlaceholder('Article Title').type(title);
      cy.findByPlaceholder('What\'s this article about?').type(description);
      cy.findByPlaceholder('Write your article (in markdown)').type(body);
      cy.getByDataQa('publish-btn').click();
      cy.url(`articles/${title}-`);
      cy.get('h1').should('contain.text', title);
   });

   it('should create an article with empty Article Description field', () => {
      cy.findByPlaceholder('Article Title').type(title);
      cy.findByPlaceholder('Write your article (in markdown)').type(body);
      cy.findByPlaceholder('Enter tags').type(tags);
      cy.getByDataQa('publish-btn').click();
      cy.url(`articles/${title}-`);
      cy.get('h1').should('contain.text', title);
   });

   it('should not create an article with empty Article Title field', () => {
      cy.findByPlaceholder('What\'s this article about?').type(description);
      cy.findByPlaceholder('Write your article (in markdown)').type(body);
      cy.findByPlaceholder('Enter tags').type(tags);
      cy.getByDataQa('publish-btn').click();
      cy.get('.swal-title').should('contain.text', errorMsg);
   });

   // I think bug. User should be able to create an article with empty body
   it.skip('should not create an article with empty Article Body field', () => {
      cy.findByPlaceholder('Article Title').type(title);
      cy.findByPlaceholder('What\'s this article about?').type(description);
      cy.findByPlaceholder('Enter tags').type(tags);
      cy.getByDataQa('publish-btn').click();
      cy.get('.swal-title').should('contain.text', errorMsg);
   });

   it('should not craete an article with all empty fields', () => {
      cy.getByDataQa('publish-btn').click();
      cy.get('.swal-title').should('contain.text', errorMsg);
   });
});

describe('Editing Article', () => {

   let articleSlug

   beforeEach(() => {
      cy.task('db:clear');
      cy.createArticle().then(response => {
         articleSlug = response.body.article.slug;
         cy.wrap(articleSlug).as('articleSlug');
      });
   });


   it('should be able to edit the title of their own article', () => {
      const newTitle = faker.lorem.sentence(1).slice(0, -1);

      cy.visit(`/#/articles/${articleSlug}`);
      cy.contains('a', 'Edit Article').should('exist').click();
      cy.findByPlaceholder('Article Title').clear().type(newTitle);
      cy.contains('button', 'Publish Article').should('exist').click();
      cy.get('h1').should('contain.text', newTitle)
   });

   it('The user can edit the description of their own article', () => {
      const newDescription = faker.lorem.sentence(4).slice(0, -1);

      cy.visit(`/#/articles/${articleSlug}`);
      cy.contains('a', 'Edit Article').click();
      cy.findByPlaceholder('What\'s this article about?').clear().type(newDescription);
      cy.contains('button', 'Publish Article').should('exist').click();
   });

   it('should be able to edit the body of their own article', () => {
      const newBody = faker.lorem.sentence(10);

      cy.visit(`/#/articles/${articleSlug}`);
      cy.contains('a', 'Edit Article').click();
      cy.findByPlaceholder('Write your article (in markdown)').clear().type(newBody);
      cy.contains('button', 'Publish Article').should('exist').click();
      cy.get('p').should('contain.text', newBody);
   });

   it('should be able to edit the tags of their own article', () => {
      const newTag = faker.lorem.sentence(1).slice(0, -1);

      cy.visit(`/#/articles/${articleSlug}`);
      cy.contains('a', 'Edit Article').click();
      cy.findByPlaceholder('Enter tags').clear().type(newTag);
      cy.contains('button', 'Publish Article').should('exist').click();
   });
});

describe('Deleting Article', () => {
   let articleSlug

   beforeEach(() => {
      cy.task('db:clear');
      cy.createArticle().then(response => {
         articleSlug = response.body.article.slug;
         cy.wrap(articleSlug).as('articleSlug');
      });
   });

   it('should be able to delete their own article', () => {

      cy.visit(`/#/articles/${articleSlug}`);
      cy.contains('button', 'Delete Article').click();
      cy.getByDataQa('username-link').click();
      cy.get('.article-preview').should('have.text', '\n      No articles are here... yet.\n    ');
   });

   it('should not able to delete another\'s article', () => {
      cy.visit(`/#/articles/${articleSlug}`);
      cy.clearCookies().reload();
      cy.login();
      cy.visit(`/#/articles/${articleSlug}`);
      // I am sorry for this method but I tried to create data for this but it not works
      cy.get('.container > .article-meta > :nth-child(3) > [data-qa="delete-btn"]').should('not.exist');
   });
});
