/// <reference types='cypress' />
/// <reference types='../support' />
import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
const homePage = new HomePageObject();
const profilePage = new ProfilePageObject();

describe('User', () => {
  let user;
  let userNew;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      return cy.task('generateUserNew').then((generateUserNew) => {
        userNew = generateUserNew;
      });
    });
  });

  beforeEach(() => {
    cy.register(user.email, user.username, user.password);
    cy.register(userNew.email, userNew.username, userNew.password);
    cy.login(user.email, user.password);
  });

  it('should be able to follow another user', () => {
    homePage.visit(`/#/@${user.username}`);
    homePage.assertHeaderContainUsername(user.username);
    homePage.visit(`/#/@${userNew.username}`);
    profilePage.assertHeaderContainUsernameOfTheOtherUser(userNew.username);
    profilePage.clickFollowButton();
    profilePage.assertThatTheButtonExist();
  });
});
