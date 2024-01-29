import PageObject from "../PageObject";

class ProfilePageObject extends PageObject {
    get followButton() {
        return cy.getByDataCy('follow-button')
    }

    clickFollowButton() {
        this.followButton.click();
    }

    assertFollowButton() {
        this.followButton.should('contain', 'Follow')
    }

    assertUnfollowButton() {
        this.followButton.should('contain', 'Unfollow')
    }
}

export default ProfilePageObject