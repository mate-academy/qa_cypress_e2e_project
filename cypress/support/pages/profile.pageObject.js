import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  url = '/#/';

  clickFollowButton() {
    cy.get('[data-test="follow-button"]').click();
  }

  clickUser() {
    cy.get('.author').click();
  }

  clickYourFeed() {
    cy.get('.feed-toggle > .nav > :nth-child(1) > .nav-link').click();
  }

  clickFollowUser() {
    cy.get('.col-xs-12 > div > .btn').click();
  }

  clickUnFollowUser() {
    cy.get('.col-xs-12 > div > .btn').click();
  }
}

export default ProfilePageObject;
