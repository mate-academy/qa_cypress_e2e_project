/// <reference types='cypress' />
/// <reference types='../support' />
import SignUpPageObject from '../support/pages/signUp.pageObject';
import ArticlesPageObject from '../support/pages/articles.pageObject';
import faker from 'faker';

const articlePage = new ArticlesPageObject();
const signUpPage = new SignUpPageObject();

describe('Articles page', () => {
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
      signUpPage.clickSomeButton();
      articlePage.visit();
      articlePage.clickWriteArticle();
      articlePage.typeTitle('Your Title');
      articlePage.typeDescription('Your Description');
      articlePage.typeBody('Your Body');
      articlePage.clickPublishButton();
    });
  });
});

it('should provide an ability to write an article', () => {
  articlePage.clickWriteArticle();
  articlePage.typeTitle('Your Title');
  articlePage.typeDescription('Your Description');
  articlePage.typeBody('Your Body');
  articlePage.clickPublishButton();
});
it('should provide an ability to edit an article', () => {
  articlePage.clickEditButton();
  articlePage.clickSomeButton();
});
it('should provide an ability to delete an article', () => {
  articlePage.clickDangerButton();
});
