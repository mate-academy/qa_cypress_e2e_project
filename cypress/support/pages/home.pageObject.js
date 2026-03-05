import PageObject from './PageObject.js';

class HomePageObject extends PageObject {
  assertHeaderContainUsername(username) {
    this.getProfileLink()
      .should('contain', username);
  }
}

export default HomePageObject;
