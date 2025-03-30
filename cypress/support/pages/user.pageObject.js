import PageObject from '../PageObject';

class UserPageObject extends PageObject {
 url = '/#/';

 get followUserBtn() {
   return cy.getByDataQa('follow-btn');
 }

  get unFollowUserBtn() {
   return cy.getByDataQa('unfollow-btn');
 }

 get infoUser() {
   return cy.getByDataQa('info-username');
 }

 clickOnfollowUserBtn() {
   this.followUserBtn.click();
 }

 clickOnUnFollowUserBtn(){
   this.unFollowUserBtn.click();
 }

 assertUnFollowBtnExist() {
   this.unFollowUserBtn.should('be.visible');
 }

 assertFollowBtnExist() {
   this.followUserBtn.should('be.visible');
 }

  pageUser(username) {
   cy.visit(`/#/@${username}`);
 }

 assertBioUserExist(text) {
   this.infoUser.should('contain', text);
 }
 }
export default UserPageObject;
