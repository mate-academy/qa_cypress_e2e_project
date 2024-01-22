/// <reference types="cypress" />
/// <reference types="../support" />
import { faker } from '@faker-js/faker';
import { generateNewArticle } from '../support/generateNewArticle';



describe('Створення статті', () => {

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

   it('корисутвач повинен мати форму Нова стаття', () => {
      cy.findByPlaceholder('Article Title').should('exist');
      cy.findByPlaceholder('What\'s this article about?').should('exist');
      cy.findByPlaceholder('Write your article (in markdown)').should('exist');
      cy.findByPlaceholder('Enter tags').should('exist');
      cy.getByDataQa('publish-btn').should('exist');
   });

   it('корисутвач повинен створити статтю із заповненими всіма полями', () => {
      cy.findByPlaceholder('Article Title').type(title);
      cy.findByPlaceholder('What\'s this article about?').type(description);
      cy.findByPlaceholder('Write your article (in markdown)').type(body);
      cy.findByPlaceholder('Enter tags').type(tags);
      cy.getByDataQa('publish-btn').click();
      cy.url(`articles/${title}-`);
      cy.get('h1').should('contain.text', title);
   });

   it('корисутвач повинен мати змогу створити статтю з порожнім полем Tags', () => {
      cy.findByPlaceholder('Article Title').type(title);
      cy.findByPlaceholder('What\'s this article about?').type(description);
      cy.findByPlaceholder('Write your article (in markdown)').type(body);
      cy.getByDataQa('publish-btn').click();
      cy.url(`articles/${title}-`);
      cy.get('h1').should('contain.text', title);
   });

   it('корисутвач повинен мати змогу створити статтю з порожнім полем "Опис статті', () => {
      cy.findByPlaceholder('Article Title').type(title);
      cy.findByPlaceholder('Write your article (in markdown)').type(body);
      cy.findByPlaceholder('Enter tags').type(tags);
      cy.getByDataQa('publish-btn').click();
      cy.url(`articles/${title}-`);
      cy.get('h1').should('contain.text', title);
   });

   it('корисутвач не повинен мати змогу створити статтю з порожнім полем "Назва статті', () => {
      cy.findByPlaceholder('What\'s this article about?').type(description);
      cy.findByPlaceholder('Write your article (in markdown)').type(body);
      cy.findByPlaceholder('Enter tags').type(tags);
      cy.getByDataQa('publish-btn').click();
      cy.get('.swal-title').should('contain.text', errorMsg);
   });

   it('корисутвач не повинен мати змогу створити статтю з порожніми полями', () => {
      cy.getByDataQa('publish-btn').click();
      cy.get('.swal-title').should('contain.text', errorMsg);
   });
});

describe('Редагування статті', () => {

   let articleSlug

   beforeEach(() => {
      cy.task('db:clear');
      cy.createArticle().then(response => {
         articleSlug = response.body.article.slug;
         cy.wrap(articleSlug).as('articleSlug');
      });
   });


   it('корисутвач повинен мати змогу редагувати назву власної статті', () => {
      const newTitle = faker.lorem.sentence(1).slice(0, -1);

      cy.visit(`/#/articles/${articleSlug}`);
      cy.contains('a', 'Edit Article').should('exist').click();
      cy.findByPlaceholder('Article Title').clear().type(newTitle);
      cy.contains('button', 'Publish Article').should('exist').click();
      cy.get('h1').should('contain.text', newTitle)
   });

   it('корисутвач повинен мати змогу редагувати опис власної статті', () => {
      const newDescription = faker.lorem.sentence(4).slice(0, -1);

      cy.visit(`/#/articles/${articleSlug}`);
      cy.contains('a', 'Edit Article').click();
      cy.findByPlaceholder('What\'s this article about?').clear().type(newDescription);
      cy.contains('button', 'Publish Article').should('exist').click();
   });

   it('корисутвач повинен мати змогу редагувати текст власної статті', () => {
      const newBody = faker.lorem.sentence(10);

      cy.visit(`/#/articles/${articleSlug}`);
      cy.contains('a', 'Edit Article').click();
      cy.findByPlaceholder('Write your article (in markdown)').clear().type(newBody);
      cy.contains('button', 'Publish Article').should('exist').click();
      cy.get('p').should('contain.text', newBody);
   });

   it('корисутвач повинен мати змогу редагувати теги власної статті', () => {
      const newTag = faker.lorem.sentence(1).slice(0, -1);

      cy.visit(`/#/articles/${articleSlug}`);
      cy.contains('a', 'Edit Article').click();
      cy.findByPlaceholder('Enter tags').clear().type(newTag);
      cy.contains('button', 'Publish Article').should('exist').click();
   });
});

describe('Видалення статті', () => {
   let articleSlug

   beforeEach(() => {
      cy.task('db:clear');
      cy.createArticle().then(response => {
         articleSlug = response.body.article.slug;
         cy.wrap(articleSlug).as('articleSlug');
      });
   });

   it('корисутвач повинен мати змогу видалити власну статтю', () => {

      cy.visit(`/#/articles/${articleSlug}`);
      cy.contains('button', 'Delete Article').click();
      cy.getByDataQa('username-link').click();
      cy.get('.article-preview').should('have.text', '\n      No articles are here... yet.\n    ');
   });

   it('корисутвач не повинен мати змогу видаляти чужі статті', () => {
      cy.visit(`/#/articles/${articleSlug}`);
      cy.clearCookies().reload();
      cy.login();
      cy.visit(`/#/articles/${articleSlug}`);
      cy.get('.container > .article-meta > :nth-child(3) > [data-qa="delete-btn"]').should('not.exist');
   });
});
