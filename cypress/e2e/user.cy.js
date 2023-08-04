/// <reference types='cypress' />
/// <reference types='../support' />
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignUpPage from '../support/pages/signUp.pageObject';
import ArticlePage from '../support/pages/article.pageObject';
import faker from 'faker';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const articlePage = new ArticlePage();

describe('User', () => {
  let user;
  let name;
  let email;
  let password;
  let title;
  let description;
  let content;
  let tags;
  const signUpPage = new SignUpPage();

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;

      name = faker.name.firstName();
      email = faker.internet.email();
      password = faker.internet.password();

      cy.register(user.email, user.username, user.password);
      cy.visit('/#/register');

      signUpPage.fillName(name);
      signUpPage.fillEmail(email);
      signUpPage.fillPassword(password);

      signUpPage.submitSignUpForm();
      cy.contains('OK').click();
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

      cy.visit('/#/register');
      signUpPage.fillName('user2');
      signUpPage.fillEmail('user2@mail.com');
      signUpPage.fillPassword('User123!');
      signUpPage.submitSignUpForm();

      cy.contains('OK').click();
    });
  });

  it('should be able to follow the another user', () => {
    cy.visit('/#/');
    cy.get('li.nav-item a.nav-link').contains('Your Feed').click();
    cy.contains('a.author', name).click();
    const followButtonSelector = 'button.btn.btn-sm.btn-outline-secondary' +
      '.action-btn';
    const buttonText = 'Follow ' + name;
    cy.contains(followButtonSelector, buttonText).click();
    const unfollowButtonSelector = 'button.btn.btn-sm.btn-outline-secondary' +
      '.action-btn';
    const buttonText2 = `Unfollow ${name}`;
    cy.contains(unfollowButtonSelector, buttonText2).should('exist');
  });

  it('should be able to unfollow the another user', () => {
    cy.visit('/#/');
    cy.get('li.nav-item a.nav-link').contains('Your Feed').click();
    cy.contains('a.author', name).click();
    const followButtonSelector = 'button.btn.btn-sm.btn-outline-secondary' +
      '.action-btn';
    const buttonText = 'Follow ' + name;
    cy.contains(followButtonSelector, buttonText).click();
    const unfollowButtonSelector = 'button.btn.btn-sm.btn-outline-secondary' +
      '.action-btn';
    const buttonText2 = `Unfollow ${name}`;
    cy.contains(unfollowButtonSelector, buttonText2).click();
    cy.contains(followButtonSelector, buttonText).should('exist');
  });
});
