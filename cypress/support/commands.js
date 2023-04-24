import SignInPageObject from './pages/signIn.pageObject';
import Header from './pages/header.pageObject';
import SettingsPageObject from './pages/settings.PageObject';
import NewArticlePageObject from './pages/newArticle.pageObject';
import ArticlePageObject from './pages/articlePage.pageObject';

const signInPage = new SignInPageObject();
const newArticle = new NewArticlePageObject();
const header = new Header();
const settings = new SettingsPageObject();
const articleView = new ArticlePageObject();
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

Cypress.Commands.add('getByDataQA', (selector) => {
  cy.get(`[data-qa="${selector}"]`);
});

Cypress.Commands.add(
  'register',
  (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
    cy.request('POST', '/users', {
      email,
      username,
      password
    });
  }
);

Cypress.Commands.add(
  'loginNewUser',
  (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
    cy.request('POST', '/users', {
      email,
      username,
      password
    }).then((resp) => {
      cy.setCookie('drash_sess', resp.body.user.token);
      cy.request('POST', '/users/login', {
        user: {
          email,
          password
        }
      });
    });
  }
);

Cypress.Commands.add('login', (email, password) => {
  signInPage.visit();
  signInPage.emailField.type(email);
  signInPage.passwordField.type(password);
  signInPage.signInBtn.click();
});

Cypress.Commands.add('createArticle', () => {
  cy.task('generateArticle').then((article) => {
    newArticle.visit();
    newArticle.title.type(article.title);
    newArticle.description.type(article.description);
    newArticle.body.type(article.body);
    newArticle.tag.type(`${article.tag} {enter}`);
    newArticle.publishArticleBtn.click();
    articleView.editArticleBtn.should('exist');
  });
});

Cypress.Commands.add('logout', () => {
  header.settingsLink.click();
  settings.logoutBtn.click();
});
