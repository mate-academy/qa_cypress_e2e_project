import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  elements = {
    authorLink: () => cy.getByDataCy('author'),
    followBtn: () => cy.getByDataCy('follow-btn')
  };

  clickOnAuthorLink() {
    this.elements.authorLink().click();
  }

  clickOnFollowBtn() {
    this.elements.followBtn().click();
  }
}

export default UserPageObject;
