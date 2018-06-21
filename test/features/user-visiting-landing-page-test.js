const {assert} = require('chai');


describe('User visiting landing page', () => {
  describe('#with no existing videos', () => {
    it('shows no videos', () => {
      browser.url('/videos');

      assert.equal(browser.getText('#videos-container'), '');
    });
  });

  describe('#and can visit', () => {
    it('videos/create ', () => {
      browser.url('/videos');
      browser.click('#create-videos')
      assert.equal(browser.getText('#save-video'), 'Save a video');
    });
  });
});

describe('User visiting landing page', () => {
  describe('#with no existing videos', () => {
    it('shows no videos', () => {
      browser.url('/videos');

      assert.equal(browser.getText('#videos-container'), '');
    });
  });

  describe("#With an existing video", () => {
    const generateRandomUrl = (domain) => `http://${domain}/${Math.random()}`;

    const title = "Existing video title";
    const url = generateRandomUrl("example.com");

    beforeEach(() => {
        browser.url("/videos/create");

        browser.setValue("input[id=title]", title);
        browser.setValue("input[id=url]", url);
        browser.setValue("textarea[id=description]",'description');
        browser.click("input[type=submit]");

        browser.url("/videos");
    });

    it("renders the video in the list", async () => {
      assert.equal(browser.getAttribute("#iframe", "src"), url);
      assert.include(browser.getText("#videos-container .video-title"), title);
    });

    it("can navigate to a video", async () => {
      
      browser.click('#show-video');
      assert.equal(browser.getText('#title'), title);
    });


  });
});