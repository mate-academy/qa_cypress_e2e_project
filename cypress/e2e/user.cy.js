/// <reference types='cypress' />
/// <reference types='../support' />
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignUpPage from '../support/pages/signUp.pageObject';
import ArticlePage from '../support/pages/article.pageObject';
import faker from 'faker';
import { confirmationMessage } from '../plugins/alertMessages';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const articlePage = new ArticlePage();

describe('User', () => {
  let user;
  let title;
  let description;
  let content;
  let tags;
  let nameNextUser;
  let emailNextUser;
  let passwordNextUser;
  let followButtonSelector;
  let followButtonText;
  let unfollowButtonSelector;
  let unfollowButtonText;
  const signUpPage = new SignUpPage();

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;

      cy.visit('/#/register');
      signUpPage.fillForm(user.username, user.email, user.password);
      signUpPage.submitSignUpForm();

      cy.contains(confirmationMessage).click();
      homePage.clickNewArticle();

      title = faker.lorem.words(2);
      description = faker.lorem.words(2);
      content = faker.lorem.words(2);
      tags = 'tag1';

      articlePage.fillTitle(title);
      articlePage.fillDescription(description);
      articlePage.fillContent(content);
      articlePage.fillTags(tags);
      articlePage.submitArticle();

      homePage.clickSettings();
      cy.scrollTo('bottom');
      settingsPage.logOutSettings();
    });
  });

  beforeEach(() => {
    nameNextUser = faker.name.firstName();
    emailNextUser = faker.internet.email();
    passwordNextUser = faker.internet.password();

    cy.visit('/#/register');
    signUpPage.fillForm(nameNextUser, emailNextUser, passwordNextUser);
    signUpPage.submitSignUpForm(); cy.contains(confirmationMessage).click();

    cy.visit('/#/');
    cy.get('li.nav-item a.nav-link').contains('Your Feed').click();
    cy.contains('a.author', user.username).click();

    followButtonSelector = 'button.btn.btn-sm.btn-outline-secondary.action-btn';
    followButtonText = 'Follow ' + user.username;
    unfollowButtonSelector = 'button.btn.btn-sm.' +
      'btn-outline-secondary.action-btn';
    unfollowButtonText = `Unfollow ${user.username}`;
  });

  it('should be able to follow the another user', () => {
    cy.contains(followButtonSelector, followButtonText).click();
    cy.contains(unfollowButtonSelector, unfollowButtonText).should('exist');
  });

  it('should be able to unfollow the another user', () => {
    cy.contains(followButtonSelector, followButtonText).click();
    cy.contains(unfollowButtonSelector, unfollowButtonText).click();
    cy.contains(followButtonSelector, followButtonText).should('exist');
  });
});
