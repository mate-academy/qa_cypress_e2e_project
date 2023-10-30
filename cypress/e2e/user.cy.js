/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from "../support/pages/home.pageObject";

const homePage = new HomePageObject();

describe("User", () => {
	let user;
	let article;
	before(() => {
		cy.task("generateUser").then((generateUser) => {
			user = generateUser;
		});

		cy.task("generateArticle").then((generateArticle) => {
			article = generateArticle;
		});
	});

	beforeEach(() => {
		cy.task("db:clear");
		cy.login(user.email, user.username, user.password);
		cy.get("@createdUser").then((user) => {
			cy.createArticle(
				user.id,
				article.title,
				article.description,
				article.body
			).then((response) => {
				const slug = response.body.article.slug;
				cy.visit(`/#/articles/${slug}`);
			});
		});
	});

	it("should be able to follow the another user", () => {
		cy.login(user.updatedEmail, user.updatedUsername, user.password);
		homePage.visit();
		homePage.clickOnAuthor();
		homePage.clickOnFollowBtn();
		homePage.assertBtnName("Unfollow");
	});
});
