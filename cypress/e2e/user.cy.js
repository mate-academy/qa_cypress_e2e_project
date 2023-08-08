/* eslint-disable max-len */
/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types='cypress' />
/// <reference types='../support' />
describe('User', () => {
  // eslint-disable-next-line no-unused-vars
  let article;
  beforeEach(() => {
    cy.task('db:clear');
    cy.register();
    // cy.visit('/#/register');
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be able to follow the another user', () => {
    cy.visit('/#/login');
    cy.signIn();
    cy.wait(5000);
    cy.visit('/#/editor');
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.get(':nth-child(2) > .form-control').type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tag);
    cy.get('.btn').click();
    cy.wait(5000);
    cy.visit('/#/register');
    cy.findByPlaceholder('Username').type('Kassandra');
    cy.findByPlaceholder('Email').type('kassandra012@gmail.com');
    cy.findByPlaceholder('Password').type('user.Password1');
    cy.get('.btn').click();
    cy.wait(5000);
    // eslint-disable-next-line max-len
    cy.get('.swal-text').should('contain.text', 'Your registration was successful!');
    cy.get('.swal-button').click();
    cy.visit(`/#/@${'riot'}`);
    // cy.get('.navbar-brand').click();
    // cy.wait(5000);
    // cy.get('[data-cy="username-link"]').contains('Kassandra');
    // cy.get('.article-preview').contains(article.title).click();
    cy.get('.col-xs-12 > div > .btn').click();
    cy.get('.col-xs-12 > div > .btn').contains('Unfollow');
  });
  it('should be able to unfollow the another user', () => {
    cy.visit('/#/login');
    cy.signIn();
    cy.wait(5000);
    cy.visit('/#/editor');
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.get(':nth-child(2) > .form-control').type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tag);
    cy.get('.btn').click();
    cy.wait(5000);
    cy.visit('/#/register');
    cy.findByPlaceholder('Username').type('Kassandra');
    cy.findByPlaceholder('Email').type('kassandra012@gmail.com');
    cy.findByPlaceholder('Password').type('user.Password1');
    cy.get('.btn').click();
    cy.wait(5000);
    // eslint-disable-next-line max-len
    cy.get('.swal-text').should('contain.text', 'Your registration was successful!');
    cy.get('.swal-button').click();
    cy.visit(`/#/@${'riot'}`);
    cy.get('.col-xs-12 > div > .btn').contains('Unfollow');
    cy.get('.col-xs-12 > div > .btn').click();
    cy.get('.col-xs-12 > div > .btn').contains('Follow');
  });

  it.only('should be able to follow the another user Global feed flow', () => {
    cy.visit('/#/login');
    cy.signIn();
    cy.wait(5000);
    cy.visit('/#/editor');
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.get(':nth-child(2) > .form-control').type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tag);
    cy.get('.btn').click();
    cy.wait(5000);
    cy.visit('/#/register');
    cy.findByPlaceholder('Username').type('Kassandra');
    cy.findByPlaceholder('Email').type('kassandra012@gmail.com');
    cy.findByPlaceholder('Password').type('user.Password1');
    cy.get('.btn').click();
    cy.wait(5000);
    // eslint-disable-next-line max-len
    cy.get('.swal-text').should('contain.text', 'Your registration was successful!');
    cy.get('.swal-button').click();
    cy.wait(5000);
    cy.get('[data-cy="username-link"]').contains('Kassandra');
    cy.get('.article-preview').contains(article.title).click();
    cy.get('.article-actions > .article-meta > :nth-child(3) > .btn-outline-secondary > :nth-child(3)').click();
  });
});

// import SignUpPageObject from '../support/pages/signUp.pageObject';
// import CreateArticlePageObject from '../support/pages/createArticle.pageObject';
// // eslint-disable-next-line max-len
// import FollowUnfollowPageObject from '../support/pages/followUnfollow.pageObject';

// const signUpPage = new SignUpPageObject();
// const createArticle = new CreateArticlePageObject();
// const followUnfollow = new FollowUnfollowPageObject();

// describe('User', () => {
//   let user;
//   // eslint-disable-next-line no-unused-vars
//   let article;
//   before(() => {
//     cy.task('db:clear');
//     cy.visit('/#/register');
//     cy.register();
//     cy.task('generateUser').then((generateUser) => {
//       user = generateUser;
//       cy.task('generateArticle').then((generateArticle) => {
//         article = generateArticle;
//       });
//     });
//   });

//   it('should be able to follow and unfollow the another user', () => {
//     // eslint-disable-next-line cypress/no-unnecessary-waiting
//     cy.wait(5000);
//     cy.visit('/#/login');
//     cy.signIn();
//     // eslint-disable-next-line cypress/no-unnecessary-waiting
//     cy.wait(4000);
//     cy.newArticle(article);

//     createArticle.assertArticleTitleExists(article.title);
//     createArticle.assertArticleBodyMatches(article.body);
//     signUpPage.logoutUser();

//     signUpPage.visit();

//     signUpPage.typeUsername('Kassandra');
//     signUpPage.typeEmail(user.email);
//     signUpPage.typePassword(user.password);
//     signUpPage.clickSignUpBtn();
//     // eslint-disable-next-line cypress/no-unnecessary-waiting
//     cy.wait(5000);
//     signUpPage.assertSuccesfulRegistration();
//     cy.get('.swal-button').click();
//     cy.wait(7000);
//     // eslint-disable-next-line cypress/no-unnecessary-waiting
//     cy.get('.feed-toggle > .nav > :nth-child(1) > .nav-link').click();
//     // cy.wait(4000);
//     cy.get('.article-preview').click();
//     // eslint-disable-next-line max-len
//     cy.get('.article-actions > .article-meta > :nth-child(3) > .btn-outline-secondary > :nth-child(3)').click();
//     followUnfollow.unfollowUser('riot');
//   });
// });
