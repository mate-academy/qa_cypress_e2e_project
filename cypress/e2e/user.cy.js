/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';

const homePage = new HomePageObject();
const profilePage = new ProfilePageObject();

describe('User', () => {
  let user;
  let secondUser;
  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      return cy.task('generateAnotherUser').then((generateAnotherUser) => {
        secondUser = generateAnotherUser;
      });
    });
  });

  beforeEach(()=>{
    cy.register(user.email, user.username, user.password);
    cy.register(secondUser.email, secondUser.username, secondUser.password);
    cy.loginAuth(user.email, user.password);
  });

  it('should be able to follow the another user', () => {
    homePage.visit(`/#/@${user.username}`);
    homePage.assertHeaderContainUsername(user.username);

    homePage.visit(`/#/@${secondUser.username}`);

    profilePage.assertHeaderContainUsernameOfOtherUser(secondUser.username);
    profilePage.clickFollowButton();

    profilePage.assertThatTheButtonExist();
  });
});
