import PageObject from '../PageObject';
class UserPageObject extends PageObject {
  url = '/#/';
  get articlePreview() {
    return cy.getByDataCy('article-list')
  }

  get folllowBtn() {
    return cy.getByDataCy('follow-btn')
  }

  get authorLink() {
    return cy.getByDataCy('author-link')
  }

  assertArticleDelete(title) {
    this.articlePreview.should('not.contain', title)
  }

  clickOnFollowBtn() {
    this.folllowBtn.click()
  }

  assertFollowingToUser(btnName) {
    this.folllowBtn.should('include', btnName)
  }

  


}

export default UserPageObject;