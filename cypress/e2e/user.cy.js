/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';

const homePage = new HomePageObject();
const profilePage = new ProfilePageObject();

describe('User tests', () => {
  before(() => {
    cy.task('db:clear');
    homePage.visit();
  });

  it('should be able to follow the another user', () => {
    profilePage.goToSomeoneProfile();

    profilePage.followBtnClick();
  });
});
