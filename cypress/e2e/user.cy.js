/// <reference types='cypress' />
/// <reference types='../support' />
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignUpPage from '../support/pages/signUp.pageObject';
import ArticlePage from '../support/pages/article.pageObject';
import userGenerator from '../plugins/userGenerator';
import faker from 'faker';
import { confirmationMessage } from '../plugins/alertMessages';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const articlePage = new ArticlePage();

describe('User', () => {
  let user;
  let followButtonSelector;
  let followButtonText;
  let unfollowButtonSelector;
  let unfollowButtonText;
  const signUpPage = new SignUpPage();

  before(() => {
    cy.task('db:clear');
    user = userGenerator.generateUser();

    cy.visit('/#/register');
    signUpPage.fillForm(user.username, user.email, user.password);
    signUpPage.submitSignUpForm();
    cy.get('.swal-button--confirm').contains(confirmationMessage).click();
    homePage.clickNewArticle();

    const title = faker.lorem.words(2);
    const description = faker.lorem.words(2);
    const content = faker.lorem.words(2);
    const tags = 'tag1';

    articlePage.fillTitle(title);
    articlePage.fillDescription(description);
    articlePage.fillContent(content);
    articlePage.fillTags(tags);
    articlePage.submitArticle();

    homePage.clickSettings();
    settingsPage.logOutSettings();
  });

  beforeEach(() => {
    const nameNextUser = faker.name.firstName();
    const emailNextUser = faker.internet.email();
    const passwordNextUser = faker.internet.password();

    cy.visit('/#/register');
    signUpPage.fillForm(nameNextUser, emailNextUser, passwordNextUser);
    signUpPage.submitSignUpForm();
    cy.get('.swal-button--confirm').contains(confirmationMessage).click();

    cy.get('a.navbar-brand.router-link-active').click();
    cy.get('li.nav-item a.nav-link').contains('Your Feed').click();
    cy.get('a.author').contains(user.username).click();

    followButtonSelector = 'button.btn.btn-sm.btn-outline-secondary.action-btn';
    followButtonText = `Follow ${user.username}`;
    unfollowButtonSelector = 'button.btn.btn-sm.' +
      'btn-outline-secondary.action-btn';
    unfollowButtonText = `Unfollow ${user.username}`;
  });

  it('should be able to follow the another user', () => {
    cy.get(followButtonSelector).contains(followButtonText).click();
    cy.get(unfollowButtonSelector)
      .should('contain', unfollowButtonText)
      .should('exist');
  });

  it('should be able to unfollow the another user', () => {
    cy.get(followButtonSelector).contains(followButtonText).click();
    cy.get(unfollowButtonSelector).contains(unfollowButtonText).click();
    cy.get(followButtonSelector)
      .should('contain', followButtonText)
      .should('exist');
  });
});
