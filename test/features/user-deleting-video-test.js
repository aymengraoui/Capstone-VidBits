const {assert} = require('chai');

const Video = require('../../models/video');

describe('User delete video', () => {

  describe("#delete", () => {
    const generateRandomUrl = (domain) => `http://${domain}/${Math.random()}`;

    const title = "Existing video title";
    const url = generateRandomUrl("example.com");
    const description = 'description';

    beforeEach(() => {
        browser.url("/videos/create");

        browser.setValue("input[id=title]", title);
        browser.setValue("input[id=url]", url);
        browser.setValue("textarea[id=description]",description);
        browser.click("input[type=submit]");
    });

    it("video deleted", async () => {

        browser.click("#delete");
        const videos = await Video.find(()=>{});
        assert.ok(videos.length === 0)
    });

  });
});