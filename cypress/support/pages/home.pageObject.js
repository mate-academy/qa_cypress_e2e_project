import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return this.getByDataCy('username-link'); //user
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
        .should('contain', username);
  }
}

export default HomePageObject;
