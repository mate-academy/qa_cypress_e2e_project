import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertUsernameNotExist() {
    this.usernameLink.should('not.exist');
  }

  checkNotAuthorized() {
    cy.getCookie('drash_sess').then((cookie) => {
      expect(cookie).to.have.property('value', 'null');
    });
  }
}

export default HomePageObject;
