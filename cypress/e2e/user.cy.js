/// <reference types='cypress' />
/// <reference types='../support' />
import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const homePage = new HomePageObject();
const signInPage = new SignInPageObject();
const profilePage = new ProfilePageObject();

describe('User', () => {
  let firstUser;
  let secondUser;

  beforeEach(() => {
    cy.task('db:clear');
    cy.logout();
    cy.task('generateUser').then((generatedUser) => {
      firstUser = generatedUser;
      cy.register(firstUser.email, firstUser.username, firstUser.password);
      cy.logout();
      cy.task('generateUser').then((generatedUser2) => {
        secondUser = generatedUser2;
        cy.register(secondUser.email, secondUser.username, secondUser.password);
        signInPage.visit();
        signInPage.login(secondUser.email, secondUser.password);
        homePage.clickSettingsLink();
      });
    });
  });

  it('should be able to follow the another user', () => {
    profilePage.visit(`/#/@${firstUser.username}`);
    profilePage.clickFollowButton();
    profilePage.unFollowButton.should('exist');
  });

  it('should be able to unfollow the another user', () => {
    profilePage.visit(`/#/@${firstUser.username}`);
    profilePage.clickFollowButton();
    profilePage.clickUnFollowButton();
    profilePage.followButton.should('exist');
  });
});
