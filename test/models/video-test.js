const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');
const Video = require('../../models/video');

async function connectDatabase() {
  await mongoose.connect(databaseUrl, options);
  await mongoose.connection.db.dropDatabase();
}

async function disconnectDatabase() {
  await mongoose.disconnect();
}

describe('when the video is submitted', () => {
  beforeEach(connectDatabase);
  
  afterEach(disconnectDatabase);

  describe('#title', () => {
      it('is a String', () => {
        const titleAsNonString = 1;
        const video = new Video({
          title: titleAsNonString
        });
  
        assert.strictEqual(video.title, titleAsNonString.toString());
      });
  
      it('is required', () => {
        const video = new Video({});
  
        const error = video.validateSync();
  
        assert.equal(error.errors.title.message, 'Path `title` is required.');
        assert.equal(error.errors.title.kind, 'required');
      });
    });

    describe('#description', () => {
      const descriptionAsNonString = 1;
      it('is a String', () => {
        const video = new Video({
          description: descriptionAsNonString
        });
  
        assert.strictEqual(video.description, descriptionAsNonString.toString());
      });
  
      it('is required', () => {
        const video = new Video({});
  
        const error = video.validateSync();
  
        assert.equal(error.errors.description.message, 'Path `description` is required.');
        assert.equal(error.errors.description.kind, 'required');
      });
    });

    describe('#url', () => {
      const urlAsNonString = 1;
      it('is a String', () => {
        const video = new Video({
          url: urlAsNonString
        });
  
        assert.strictEqual(video.url, urlAsNonString.toString());
      });
  
      it('is required', () => {
        const video = new Video({});
  
        const error = video.validateSync();
  
        assert.equal(error.errors.url.message, 'Path `url` is required.');
        assert.equal(error.errors.url.kind, 'required');
      });
    });
  
});

module.exports = {
  connectDatabase,
  disconnectDatabase,
}