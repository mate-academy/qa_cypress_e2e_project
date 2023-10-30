/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from "../support/pages/article.pageObject";

const articlePage = new ArticlePageObject();

describe("Article", () => {
	let user;
	let article;
	before(() => {
		cy.task("generateArticle").then((generateArticle) => {
			article = generateArticle;
		});
	});

	beforeEach(() => {
		cy.task("db:clear");
		cy.task("generateUser").then((generateUser) => {
			user = generateUser;
			cy.login(user.email, user.username, user.password);
		});
	});

	it("should be created using New Article form", () => {
		articlePage.visit();
		articlePage.typeArticleTitle(article.title);
		articlePage.typeArticleAbout(article.description);
		articlePage.typeArticleBody(article.body);
		articlePage.clickPublishBtn();
		articlePage.assertArticleTitle(article.title);
		articlePage.assertArticleBody(article.body);
	});

	it("should be edited using Edit button", () => {
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
		articlePage.clickEditBtn();
		articlePage.rewriteArticleBody(article.newbody);
		articlePage.clickPublishBtn();
		articlePage.assertArticleBody(article.newbody);
	});

	it("should be deleted using Delete button", () => {
		const articlePreviewText = "No articles are here... yet.";
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
		articlePage.clickDeleteBtn();
		articlePage.assertArticlePreview(articlePreviewText);
	});
});
