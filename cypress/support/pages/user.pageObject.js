/// <reference types='cypress' />

import PageObject from '../PageObject';

class UserPageObject extends PageObject {

    getGlobalFeed() {
        cy.getByDataQa('global-feed').click();
    }

    goToProfile() {
        cy.get('div.article-meta a').click();
    }

    followUser() {
        cy.getByDataQa('follow-button').click();
    }

    unfollowUser() {
        cy.getByDataQa('unfollow-button').click();
    }

    pageHasUnfollowBtn() {
        return cy.getByDataQa('unfollow-button');
    }

    pageHasFollowBtn() {
        return cy.getByDataQa('follow-button');
    }
}

export default UserPageObject;
