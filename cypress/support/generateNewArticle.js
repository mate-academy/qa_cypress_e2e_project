const faker = require("faker");


function generateNewArticle() {
    const articleTitle = faker.lorem.sentence(2).slice(0, -1);
    const articleDescription = faker.lorem.sentence(5);
    const articleBody = faker.lorem.sentence();
    const articleTags = faker.lorem.sentence(1).slice(0, -1);

    return { articleTitle, articleDescription, articleBody, articleTags };
}

module.exports = { generateNewArticle };