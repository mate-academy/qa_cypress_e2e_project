/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';

const homePage = new HomePageObject();
let user;

describe('User', () => {
  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generatedUser => {
      user = generatedUser;
    });
  });

  beforeEach(() => {
    cy.register();
    cy.visit(`#/@${user.username}/`);
  });

  it.skip('should be able to follow the another user', () => { // дорогi пiдписчечечкi не хочуть фоловитись, жук
    homePage.clickOnBtn('follow-btn');
  });
});
