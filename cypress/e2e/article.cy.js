/// <reference types='cypress' />
/// <reference types='../support' />

// articles.spec.js
import SignUpPageObject from '../support/pages/signUp.pageObject';
import ArticlesPageObject from '../support/pages/articles.pageObject';
import faker from 'faker';

const articlePage = new ArticlesPageObject();
const signUpPage = new SignUpPageObject();

describe('Article', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
      signUpPage.visit();
      const username = faker.internet.userName();
      const email = faker.internet.email();
      const password = faker.internet.password();
      signUpPage.typeUsername(username);
      signUpPage.typeEmail(email);
      signUpPage.typePassword(password);
      signUpPage.clickSignUpButton();
      signUpPage.clickOkButton();
    });
  });

  it('should be created using New Article form', () => {
    articlePage.visit();
    articlePage.clickWriteArticle();
    articlePage.typeTitle('Your Title');
    articlePage.typeDescription('Your Description');
    articlePage.typeBody('Your Body');
    articlePage.clickArticlePublishButton();
    cy.url()
      .should('contain', '/articles');
  });

  it('should be edited using Edit button', () => {
    articlePage.visit();
    articlePage.clickEditButton();
    articlePage.clickArticlePublishButton();
    cy.url()
      .should('contain', '/articles');
  });

  it('should be deleted using Delete button', () => {
    articlePage.visit();
    articlePage.clickDeleteButton();
    cy.url()
      .should('contain', '/#');
  });
});
