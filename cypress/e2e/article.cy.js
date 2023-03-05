/// <reference types="cypress" />
/// <reference types="../support" />

import { generateNewArticle } from "../support/generateNewArticle";
import faker from 'faker';

describe('Create new article', () => {  
  beforeEach(() => {
    cy.task('db:clear');
    cy.registerNewUser().then(user => {
      cy.login(user).then(() => user);
    }).as('user');

    cy.visit(`#/editor`);
  });

  it(`The New Article page contains the 'Create article form'`, () => {
    cy.findByPlaceholder('Article Title').should('exist');
    cy.findByPlaceholder(`What's this article about?`).should('exist');
    cy.findByPlaceholder(`Write your article (in markdown)`).should('exist');
    cy.findByPlaceholder(`Enter tags`).should('exist');
    cy.contains('button', 'Publish Article').should('exist');
  });

  it('The user can create a new article using all field', () => {
    const { articleTitle, articleDescription, articleBody, articleTags }
      = generateNewArticle();

    cy.findByPlaceholder('Article Title')
      .type(articleTitle);
    cy.findByPlaceholder(`What's this article about?`)
      .type(articleDescription);
    cy.findByPlaceholder(`Write your article (in markdown)`)
      .type(articleBody);
    cy.findByPlaceholder(`Enter tags`)
      .type(`${articleTags}{enter}`);
    cy.contains('button', 'Publish Article').click();
    cy.wait(2000);
    cy.url(`#/articles/${articleTitle}-`);
    cy.get('h1').should('contain.text', articleTitle);
  });

  it('The user can create new article using only title', () => {
    const { articleTitle } = generateNewArticle();

    cy.findByPlaceholder('Article Title').type(articleTitle);
    cy.contains('button', 'Publish Article').click();
    cy.wait(2000);
    cy.get('h1').should('contain.text', articleTitle);
    cy.url(`#/articles/${articleTitle}-`);
  });

  it('The user can create new article without Tags ', () => {
    const { articleTitle, articleDescription, articleBody }
      = generateNewArticle();

    cy.findByPlaceholder('Article Title')
      .type(articleTitle);
    cy.findByPlaceholder(`What's this article about?`)
      .type(articleDescription);
    cy.findByPlaceholder(`Write your article (in markdown)`)
      .type(articleBody);
    cy.contains('button', 'Publish Article').click();
    cy.url(`#/articles/${articleTitle}-`);
  });

  it(`The user can't create new article without title`, () => {
    const { articleDescription, articleBody }
      = generateNewArticle();

    cy.findByPlaceholder(`What's this article about?`)
      .type(articleDescription);
    cy.findByPlaceholder(`Write your article (in markdown)`)
      .type(articleBody);
    cy.contains('button', 'Publish Article').click();
    cy.contains('.swal-modal', 'Oops!').should('exist');
  });
});

describe(`Edit article`, () => {
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

  it('The user can edit the title of their own article.', () => {
    cy.get('@user').then(user => {
      cy.contains('a', 'Edit Article').should('exist').click();
      cy.findByPlaceholder('Article Title').clear().type(newTitle);
      cy.contains('button', 'Publish Article').should('exist').click();
      cy.get('h1').should('contain.text', newTitle)
    });
  });

  it('The user can edit the description of their own article.', () => {
    cy.get('@user').then(user => {
      cy.contains('a', 'Edit Article').should('exist').click();
      cy.findByPlaceholder(`What's this article about?`).clear().type(newDescription);
      cy.contains('button', 'Publish Article').should('exist').click()
      cy.wait(2000);
      cy.visit('#/');
      cy.contains('p', `${newDescription}`).should('exist');
    });
  });

  it('The user can edit the body of their own article.', () => {
    cy.get('@user').then(user => {
      cy.contains('a', 'Edit Article').should('exist').click();
      cy.findByPlaceholder(`Write your article (in markdown)`).clear().type(newBody);
      cy.contains('button', 'Publish Article').should('exist').click();
      cy.get('p').should('contain.text', newBody);
    });
  });

  it('The user can edit the tag of their own article.', () => {
    cy.get('@user').then(user => {
      cy.contains('a', 'Edit Article').should('exist').click();
      cy.findByPlaceholder(`Enter tags`).type(`${newTag}{enter}`);
      cy.contains('button', 'Publish Article').should('exist').click();
      cy.contains('a', newTag).should('exist');
    });
  });
});

describe(`Delete article`, () => {
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
  it('The userc can delete article using Delete button', () => {
    cy.get('@user').then(user => {
      cy.contains('.btn', 'Delete Article').should('exist').click();
      cy.wait(2000);
      cy.url('#/');
    })
  });
})
