// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
import ArticleFormPageObject from './pages/articleForm.pageObject';
import HomePageObject from './pages/home.pageObject';

const articleFormPage = new ArticleFormPageObject();
const homePage = new HomePageObject();

addMatchImageSnapshotCommand();

Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-qa="${selector}"]`);
});

Cypress.Commands.add('register', (email, username, password) => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  }).then((response) => {
    const user = {
      bio: response.body.user.bio,
      effectiveImage:
        'https://static.productionready.io/images/smiley-cyrus.jpg',
      email: response.body.user.email,
      image: response.body.user.image,
      token: response.body.user.token,
      username: response.body.user.username,
      id: response.body.user.id
    };
    window.localStorage.setItem('user', JSON.stringify(user));
    cy.setCookie('drash_sess', response.body.user.token);
  });
});

Cypress.Commands.add(
  'articleCreateButFake',
  (
    title = 'empty',
    about = 'empty',
    body = 'empty',
    tags = 'empty',
    id = `don't find`
  ) => {
    homePage.logInProcess();
    homePage.newArticleBtnClick();
    articleFormPage.fieldsFillingProcess();
  }
);

Cypress.Commands.add(
  'articleCreate',
  (
    titleInput = 'empty',
    aboutInput = 'empty',
    bodyInput = 'empty',
    tagsInput = 'empty',
    idInput = `don't find`
  ) => {
    cy.getCookie('drash_sess').then((cookie) => {
      cy.request({
        method: 'POST',
        url: '/articles',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `drash_sess=${cookie.value}`
        },
        body: {
          article: {
            title: titleInput,
            description: aboutInput,
            body: bodyInput,
            tags: tagsInput,
            author_id: idInput
          }
        }
      }).then((response) => {
        const article = {
          title: response.body.article.title,
          body: response.body.article.body,
          slug: response.body.article.slug
        };
        window.localStorage.setItem('article', JSON.stringify(article));
      });
    });
  }
);

// cy.register(user.email, user.username, user.password).then((user) => {
//   cy.createArticle(
//     user.id, article.title, article.description, article.body
//   )
//     .then((response) => {
//       const slug = response.body.article.slug;
//       cy.visit(`/#/articles/${slug}`);
//     });
// });

// Cypress.Commands.add('register', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
//   cy.request('POST', '/api/users', {
//     user: {
//       email,
//       username,
//       password
//     }
//   });
// });
