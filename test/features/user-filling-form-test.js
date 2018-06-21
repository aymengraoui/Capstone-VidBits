const {assert} = require('chai');


describe('User visiting creating page', () => {
    describe('#with a form', () => {
        it('filling the inputs and submitting', () => {
            browser.url('/videos/create');
            browser.setValue("input[id=title]",'title test');
            browser.setValue("input[id=url]",'url.com');
            browser.setValue("textarea[id=description]",'test description');
            browser.click("input[type=submit]");

            assert.equal(browser.getText('#title'),'title test' );
            assert.equal(browser.getText('#description'),'test description');
        });
      });
  });