/// <reference types="cypress" />
/// <reference types="../support" />

import { generateNewArticle } from "../support/generateNewArticle";
import faker from 'faker';

describe(' User is able to create an article', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.registerNewUser().then(user => {
      cy.login(user).then(() => user);
    }).as('user');

    cy.visit(`#/editor`);
  });

  it('should be created using New Article form', () => {
    const { articleTitle, articleDescription, articleBody, articleTags }
      = generateNewArticle();

    cy.getByDataCy('article-title')
      .type(articleTitle);
    cy.getByDataCy('article-description')
      .type(articleDescription);
    cy.getByDataCy('article-body')
      .type(articleBody);
      cy.getByDataCy('article-tags')
      .first()
      .type(`${articleTags}{enter}`);    
    cy.getByDataCy('publish-btn').click();
   // cy.wait(2000);
    cy.url(`#/articles/${articleTitle}-`);
    cy.get('h1').should('contain.text', articleTitle);
  });

});

describe(`User is able to edit an article`, () => {
  let newTitle;
  let newDescription;
  let newBody;
  let newTag;

  beforeEach(() => {
    newTitle = faker.lorem.sentence(2).slice(0, -1);
    newDescription = faker.lorem.sentence(2).slice(0, -1);
    newBody = faker.lorem.sentence(2).slice(0, -1);
    newTag = faker.lorem.sentence(1).slice(0, -1);

    cy.task('db:clear');
    cy.registerNewUser().then(user => {
      cy.login(user).then(() => {
        cy.createNewArticle(user).then((slug) => {
          cy.visit(`#/articles/${slug}`);
          user.articleSlug = slug;
        });
      });
    }).as('user');
  });

  it('User is able to edit the title of his own article.', () => {
    cy.get('@user').then(user => {
      cy.getByDataCy('edit-article-link').first().click();
      cy.getByDataCy('article-title').clear().type(newTitle);
      cy.getByDataCy('publish-btn').should('exist').click();
      cy.get('h1').should('contain.text', newTitle)
    });
  });

  it('User is able to edit the description of his own article.', () => {
    cy.get('@user').then(user => {
      cy.getByDataCy('edit-article-link').first().click();
      cy.getByDataCy('article-description').clear().type(newDescription);
      cy.getByDataCy('publish-btn').should('exist').click();
      //cy.wait(2000);
      cy.visit('#/');
      cy.contains('p', `${newDescription}`).should('exist');
    });
  });

  it('User is able to edit the body of his own article.', () => {
    cy.get('@user').then(user => {
      cy.getByDataCy('edit-article-link').first().click();
      cy.getByDataCy('article-body').clear().type(newBody);
      cy.getByDataCy('publish-btn').should('exist').click();
      cy.get('p').should('contain.text', newBody);
    });
  });

  it('User is able to edit the tag of his own article.', () => {
    cy.get('@user').then(user => {
      cy.getByDataCy('edit-article-link').first().click();
      cy.getByDataCy('article-tags').first().type(`${newTag}{enter}`);
      cy.getByDataCy('publish-btn').should('exist').click();
      cy.contains('a', newTag).should('exist');
    });
  });
});

describe(`User is able to delete an article`, () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.registerNewUser().then(user => {
      cy.login(user).then(() => {
        cy.createNewArticle(user).then((slug) => {
          cy.visit(`#/articles/${slug}`);
          user.articleSlug = slug;
        });
      });
    }).as('user');
  });

  it.only('User is able to delete an article by clicking on the Delete button', () => {
    cy.get('@user').then(user => {
      cy.getByDataCy('delete-article-btn').first().should('exist').click();
      //cy.wait(2000);
      cy.url('#/');
      cy.get('.article-preview').should('contain.text', 'No articles are here... yet.');
    })
  });
})
