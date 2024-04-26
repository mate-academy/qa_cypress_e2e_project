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

  checkNotAuthorized() {
    cy.getCookie('drash_sess')
      .then((cookie) => {
        expect(cookie)
          .to.have.property('value', 'null');
      });
  }

  assertUsernameNotExist() {
    this.usernameLink
      .should('not.exist');
  }
}

export default HomePageObject;
