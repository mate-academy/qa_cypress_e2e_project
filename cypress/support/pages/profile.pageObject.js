import PageObject from "../PageObject";

class ProfilePageObject extends PageObject {
    
    get followButton() {
        return cy.getByDataCy('follow-button');
    }

    clickFollowButton() {
        this.followButton.click();
    }
    assertFollowUser() {
        this.followButton.should('not.disabled');
    }
}
export default ProfilePageObject;