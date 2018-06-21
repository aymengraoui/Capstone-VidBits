const {assert} = require('chai');

const Video = require('../../models/video');

describe('User updating video', () => {

  describe("#changes the values", () => {
    const generateRandomUrl = (domain) => `http://${domain}/${Math.random()}`;

    const title = "Existing video title";
    const url = generateRandomUrl("example.com");
    const description = 'description';

    const newTitle = "new video title";
    const newUrl = generateRandomUrl("example.com");
    const newDescription = 'new description';

    beforeEach(() => {
        browser.url("/videos/create");

        browser.setValue("input[id=title]", title);
        browser.setValue("input[id=url]", url);
        browser.setValue("textarea[id=description]",description);
        browser.click("input[type=submit]");
    });

    it("video edited ", async () => {
        browser.click("#edit");
        browser.setValue("input[id=title]", newTitle);
        browser.setValue("input[id=url]", newUrl);
        browser.setValue("textarea[id=description]",newDescription);
        browser.click("input[type=submit]");

        assert.equal(browser.getAttribute("#iframe", "src"), newUrl);
        assert.include(browser.getText("#title"), newTitle);
        assert.include(browser.getText("#description"), newDescription);
    });

  });
});