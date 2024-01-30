describe('Article comment', () => {
  it('should respond with a 200 status when comments for an article exist',
    () => {
      // eslint-disable-next-line no-unused-expressions
      async () => {
      // create an article and comment inside the db
        // eslint-disable-next-line no-undef
        const article = await createTestArticle();
        const id = typeof article.id === 'boolean' ? 0 : Number(article.id);
        if (!id) {
          throw new Error(
            // eslint-disable-next-line max-len
            'article.id should be defined, maybe you query to add an article screwed up somewhere'
          );
        }
        // eslint-disable-next-line no-undef
        await createTestComment({ article_id: id });

        // make request
        const res = await fetch(
        // eslint-disable-next-line no-undef
        `${server.address}/articles/test-article-title/comments`
        );
        const body = await res.json();

        // clear down db
        // eslint-disable-next-line no-undef
        await clearTestArticles();
        // eslint-disable-next-line no-undef
        await clearTestComments();

        // assertions
        expect(res.status)
          .toBe(200);
        expect(body.success)
          .toBeTruthy();
        expect(body.data[0].body)
          .toBe('Test Body');
        expect(body.data[0].author_username)
          .toBe('Test username');
      };
    });
});
