describe('Article comment', () => {
  it('should respond with a 200 status when comments for an article exist', () => {
    async () => {
      // create an article and comment inside the db
      const article = await createTestArticle();
      const id = typeof article.id === "boolean" ? 0 : Number(article.id);
      if (!id) {
        throw new Error(
          "article.id should be defined, maybe you query to add an article screwed up somewhere",
        );
      }
      await createTestComment({ article_id: id });

      // make request
      const res = await fetch(
        `${server.address}/articles/test-article-title/comments`,
      );
      const body = await res.json();

      // clear down db
      await clearTestArticles();
      await clearTestComments();

      // assertions
      expect(res.status)
        .toBe(200);
      expect(body.success)
        .toBeTruthy();
      expect(body.data[0].body)
        .toBe("Test Body");
      expect(body.data[0].author_username)
        .toBe("Test Username");
    }
  });
});
