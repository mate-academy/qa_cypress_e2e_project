import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  get bioLink() {
    return cy.get('.col-xs-12 > p');
  }

  get articleOnProfilePage() {
    return cy.get('h1');
  }

  assertArticleOnProfilePage(title) {
    this.articleOnProfilePage
      .should('contain.text', title);
  }

  clickOnArticleOnProfilePage() {
    this.articleOnProfilePage.click();
  }

  assertBioContainNewBio(username) {
    this.bioLink
      .should('contain', username);
  }
}

export default ProfilePageObject;
