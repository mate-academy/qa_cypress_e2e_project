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

  it(`The Creating new article page 
    should contains 'Article Title' field`, () => {
      cy.findByPlaceholder('Article Title').should('exist');
  });

  it(`The Creating new article page 
  should contains 'About artice' field`, () => {
    cy.findByPlaceholder(`What's this article about?`).should('exist');
  });

  it(`The Creating new article page 
  should contains 'Write your artice' field`, () => {
    cy.findByPlaceholder(`Write your article (in markdown)`).should('exist');
  });

  it(`The Creating new article page 
  should contains 'Enter tags' field`, () => {
    cy.findByPlaceholder(`Enter tags`).should('exist');
  });

  it(`The Creating new article page 
  should contains 'Publish Article' button`, () => {
    cy.contains('button', 'Publish Article').should('exist');
  });

  it('The user can create a new article with filled all field', () => {
    const { articleTitle, articleDescription, articleBody, articleTags }
      = generateNewArticle();

    cy.findByPlaceholder('Article Title').type(articleTitle);
    cy.findByPlaceholder(`What's this article about?`).type(articleDescription);
    cy.findByPlaceholder(`Write your article (in markdown)`).type(articleBody);
    cy.findByPlaceholder(`Enter tags`).type(`${articleTags}{enter}`);
    cy.contains('button', 'Publish Article').click();
    cy.wait(2000);
    cy.get('h1').should('contain.text', articleTitle);
    cy.get('p').should('contain.text', articleBody);
  });

  it('The user can create new article using only title', () => {
    const { articleTitle, articleDescription, articleBody, articleTags }
      = generateNewArticle();

    cy.findByPlaceholder('Article Title').type(articleTitle);
    cy.contains('button', 'Publish Article').click();
    cy.wait(2000);
    cy.get('h1').should('contain.text', articleTitle);
  });

  it('The user can create new article using title and description', () => {
    const { articleTitle, articleDescription, articleBody, articleTags }
      = generateNewArticle();

    cy.findByPlaceholder('Article Title').type(articleTitle);
    cy.findByPlaceholder(`What's this article about?`).type(articleDescription);
    cy.contains('button', 'Publish Article').click();
  });

  it('The user can create new article using all field without Tags ', () => {
    const { articleTitle, articleDescription, articleBody, articleTags }
      = generateNewArticle();

    cy.findByPlaceholder('Article Title').type(articleTitle);
    cy.findByPlaceholder(`What's this article about?`).type(articleDescription);
    cy.findByPlaceholder(`Write your article (in markdown)`).type(articleBody);
    cy.contains('button', 'Publish Article').click();
  });

  it(`The user can't create new article without title`, () => {
    const { articleTitle, articleDescription, articleBody, articleTags }
      = generateNewArticle();

    cy.findByPlaceholder(`What's this article about?`).type(articleDescription);
    cy.findByPlaceholder(`Write your article (in markdown)`).type(articleBody);
    cy.contains('button', 'Publish Article').click();
    cy.contains('.swal-modal', 'Oops!').should('exist');
  });
});

describe(`Edit article`, () => {
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

  it('The user can edit whole of their own article.', () => {
    cy.get('@user').then(user => {
      const newTitle = faker.lorem.sentence(2).slice(0, -1);
      const newDescription = faker.lorem.sentence(2).slice(0, -1);
      const newBody = faker.lorem.sentence(2).slice(0, -1);
      const newTag = faker.lorem.sentence(1).slice(0, -1);

      cy.contains('a', 'Edit Article').should('exist').click();
      cy.findByPlaceholder('Article Title').clear().type(newTitle);
      cy.findByPlaceholder(`What's this article about?`).clear().type(newDescription);
      cy.findByPlaceholder(`Write your article (in markdown)`).clear().type(newBody);
      cy.findByPlaceholder(`Enter tags`).type(`${newTag}{enter}`);
      cy.contains('button', 'Publish Article').should('exist').click();
    });
  });

  it('The user can edit the title of their own article.', () => {
    cy.get('@user').then(user => {
      const newTitle = faker.lorem.sentence(2).slice(0, -1);
      cy.contains('a', 'Edit Article').should('exist').click();
      cy.findByPlaceholder('Article Title').clear().type(newTitle);
      cy.contains('button', 'Publish Article').should('exist').click();
      cy.get('h1').should('contain.text', newTitle)
    });
  });

  it('The user can edit the description of their own article.', () => {
    cy.get('@user').then(user => {
      const newDescription = faker.lorem.sentence(2).slice(0, -1);
      cy.contains('a', 'Edit Article').should('exist').click();
      cy.findByPlaceholder(`What's this article about?`).clear().type(newDescription);
      cy.contains('button', 'Publish Article').should('exist').click()
    });
  });

  it('The user can edit the body of their own article.', () => {
    cy.get('@user').then(user => {
      const newBody = faker.lorem.sentence(2).slice(0, -1);
      cy.contains('a', 'Edit Article').should('exist').click();
      cy.findByPlaceholder(`Write your article (in markdown)`).clear().type(newBody);
      cy.contains('button', 'Publish Article').should('exist').click();
      cy.get('p').should('contain.text', newBody);
    });
  });

  it('The user can edit the tag of their own article.', () => {
    cy.get('@user').then(user => {
      const newTag = faker.lorem.sentence(1).slice(0, -1);
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
