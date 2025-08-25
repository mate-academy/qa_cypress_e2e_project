import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() { return this.getByQa('username-link'); }
  assertHeaderContainUsername(username) {
    this.usernameLink.should('contain', username);
  }
}

export default HomePageObject;
