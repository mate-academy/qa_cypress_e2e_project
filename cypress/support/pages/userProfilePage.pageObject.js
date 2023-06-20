import PageObject from '../PageObject';

class UserProfile extends PageObject {
  // url = '/#/editor/';
  visit(username) {
    cy.visit(`/#/@${username}/`);
  };

  clickOnMyArticleTab() {
    cy.getByDataCy('my-articles-tab')
      .click();
  }

  verifyDeleteArticle(title) {
    cy.contains('[data-qa="my-article"]', title)
      .should('not.exist');
  }
}

export default UserProfile;
