/// <reference types='cypress' />
/// <reference types='../support' />
import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';

const homePage = new HomePageObject();
const profilePage = new ProfilePageObject();

describe('User', () => {
  let user;
  let User2;
  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      return cy.task('generateUser2').then((generateUser2) => {
        User2 = generateUser2;
      });
    });
  });

  beforeEach(() => {
    cy.register(user.email, user.username, user.password);
    cy.register(User2.email, User2.username, User2.password);
    cy.login(user.email, user.password);
  });

  it('should be able to follow the another user', () => {
    homePage.visit(`/#/@${user.username}`);
    homePage.assertHeaderContainUsername(user.username);

    homePage.visit(`/#/@${User2.username}`);

    profilePage.assertHeaderContainUsernameOfOtherUser(User2.username);
    profilePage.clickFollowButton();

    profilePage.assertThatTheButtonExist();
  });
});
