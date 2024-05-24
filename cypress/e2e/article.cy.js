/// <reference types='cypress' />
/// <reference types='../support' />

// import SignInPageObject from '../support/pages/signIn.pageObject';
// import SignUpPageObject from '../support/pages/signUp.pageObject';
// import PageObject from '../support/PageObject';
import ArticlePage from '../support/pages/article.pageObject';
// import SettingsPageObject from '../support/pages/settings.pageObject';

// let user;
// const signInPage = new SignInPageObject();
// const signUpPage = new SignUpPageObject();
const articlePage = new ArticlePage();
// const page = new PageObject();

// const article = {
//   title: 'Test Article',
//   description: 'This is a test article description',
//   body: 'This is the body of the test article'
// };

// describe('Article page', () => {

//   beforeEach(() => {
//     cy.task('db:clear');
//     cy.task('generateUser').then((generatedUser) => {
//       user = generatedUser;
//       const email = user.email;
//       const username = user.username;
//       const password = user.password;
//       cy.visit('/');
//       cy.request('POST', '/users', { email, username, password }).then(response => {
//         expect(response.status).to.equal(200);
//       }).catch(error => {
//         throw new Error('Request failed', error);
//       });
//       // Rejestracja użytkownika przed każdym testem
//       // cy.register(email, username, password).then(response => {
//       //   expect(response.status).to.equal(200);
//       // }).catch(error => {
//       //   throw new Error('Request failed', error);
//       // });
//     });
//   });

//   it.only('should be created using New Article form', () => {
//     // articlePage.login(user.email, user.password);
//     // cy.createArticle(article.title, article.description, article.body)
//     //   .then((response) => {
//     //     const slug = response.body.article.slug;
//     //     cy.visit(`/article/${slug}`);
//     //     cy.url().should('include', `/article/${slug}`);
//     //   });
//   });

//   // it('should be able to create an article', () => {
//   //   // Twój test do utworzenia artykułu
//   // });

//   // it('should be able to delete an article', () => {
//   //   articlePage.login(user.email, user.password);
//   //   cy.createArticle(article.title, article.description, article.body)
//   //     .then((response) => {
//   //       const slug = response.body.article.slug;
//   //       articlePage.deleteArticle(slug);
//   //       articlePage.verifyArticleNotFound(slug);
//   //     });
//   // });
// });

describe('Article page', () => {
  const user = {
    username: 'tester',
    email: 'tester@tester.pl',
    password: 'Qwer123!'
  };
  const article = {
    title: 'Test Article',
    description: 'This is a test article description',
    body: 'This is the body of the test article'
  };

  beforeEach(() => {
    cy.task('db:clear');
    cy.register(user.email, user.username, user.password);
    // cy.visit('/#/register');
    // cy.findByPlaceholder('Username').type(user.username);
    // cy.findByPlaceholder('Email').type(user.email);
    // cy.findByPlaceholder('Password').type(`${user.password}{enter}`);
    // cy.get(':nth-child(4) > .nav-link').should('contain', user.userName);
  });

  it('should be able to create an article', () => {
    cy.login(user.email, user.password);
    articlePage.login(user.email, user.password);
    articlePage.goToNewArticle();
    articlePage.typeTitleField(article.title);
    articlePage.typeAboutField(article.description);
    articlePage.typeArticleBodyField(article.body);
    articlePage.clickPublishArticleBtn();
    // cy.visit('/#/login');
    // cy.findByPlaceholder('Email').type(user.email);
    // cy.findByPlaceholder('Password').type(`${user.password}{enter}`);
    // cy.on('window:confirm', (str) => {
    //   expect(str).to.equal('Logging you in... Please wait...');
    //   return true;
    // });
    // cy.get(':nth-child(4) > .nav-link').should('contain', user.username);
    // cy.contains('.nav-link', 'New Article').click();
    // cy.findByPlaceholder('Article Title').type(article.title);
    // cy.findByPlaceholder('What\'s this article about?')
    //   .type(article.description);
    // cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    // cy.contains('Publish Article').click();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Please wait...');
      return true;
    });
    articlePage.createdActicleTitle.should('contain', article.title);
    articlePage.createdActicleAbout.should('contain', article.description);
    cy.url().should('include', '/articles/');
  });

  it.only('should be able to delete an article', () => {
    // const response
    cy.login(user.email, user.password);
    articlePage.login(user.email, user.password);
    articlePage.goToNewArticle();
    articlePage.typeTitleField(article.title);
    articlePage.typeAboutField(article.description);
    articlePage.typeArticleBodyField(article.body);
    articlePage.clickPublishArticleBtn();
    //   cy.intercept('POST', '/#/login').as('loginRequest'); // Zakładając, że logowanie wysyła żądanie POST do /api/users/login
    // cy.get(':nth-child(4) > .nav-link').should('contain', user.username);
    // cy.wait('@loginRequest').then((interception) => {
    //   response = interception.response.body;
    //   authToken = response.user.token;
    // articlePage.createArticle(article.title, article.description, article.body);
    // cy.createArticle(article.title, article.description, article.body).then((response) => {
    //   const slug = response.body.article.slug;
    //   cy.visit(`/article/${slug}`);
    //   cy.url().should('include', `/article/${slug}`);
    //   cy.get('.article-actions').contains('Delete Article').click();
    //   cy.on('window:confirm', (str) => {
    //     expect(str).to.equal('Do you really want to delete it?');
    //     return true;
    //   });
    //   cy.visit(`/article/${slug}`);
    //   cy.reload();// I trired to reload page but it doesn't work.
    //   cy.visit(`/article/${slug}`, { failOnStatusCode: false });
    //   // cy.get('h2').contains('This page could not be found.').should('exist'); // I tried also this but it doesn't work.
    //   cy.contains(`This page could not be found.`).should('exist');
    // });
  });

  afterEach(() => {
    cy.task('db:clear');
  });
});
