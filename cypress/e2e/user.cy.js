/// <reference types='cypress' />
/// <reference types='../support' />
import { ArticlePageObject } from '../support/pages/article.pageObject';
import { SettingsPageObject } from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

describe('Article', () => {
  const articlePage = new ArticlePageObject();
  const settingsPage = new SettingsPageObject();
  const signInPage = new SignInPageObject();
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should be able to follow user (option unavailable)', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    articlePage.visit();
    articlePage.articleTitleField.type('test');
    articlePage.aboutField.type('test');
    articlePage.articleField.type('test');
    articlePage.tagField.type('test');
    articlePage.publishButton.click();
    cy.get('.navbar-brand').click();
    settingsPage.visit();
    settingsPage.logoutButton.click();
    signInPage.visit();
    cy.register('dmytro.horodchuk@gmail.com', 'Dmytro', user.password);
    signInPage.typeEmail('dmytro.horodchuk@gmail.com');
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.followBtn.click(); // [FOLLOW] BUTTON CAN'T BE TURNED ON, SO I CAN'T TEST IT FROM UI;
  });
});
