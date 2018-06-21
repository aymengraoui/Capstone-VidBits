const {assert} = require('chai');
const request = require('supertest');
const app = require('../../app');
const { jsdom } = require("jsdom");

const {connectDatabase, disconnectDatabase} = require('../database-utilities');
const Video = require('../../models/video');

const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};



describe('POST', () => {
    beforeEach(connectDatabase);
    
    afterEach(disconnectDatabase);

    

    describe('#good video',()=>{
      const video = {
          title: 'title',
          description: 'video',
          url: 'url.com'
        }

      it('server response 201', async () => {
        
        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(video);
          
        assert.equal(response.status,201);
      });

      it('redirection', async () => {
        
        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(video);
          
        assert.equal(response.status,201);
      });
      
      it('persists a video', async () => {
        const videoSaved = new Video(video);

        await videoSaved.save();
        const stored = await Video.findOne({ title : video.title });

        assert.include(stored, video);
      });
    })
    

    describe('#bad video',()=>{
      it('server response 400 when title is empty', async () => {
        const video = {
          description: 'video'
        }
        
        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(video);

        assert.equal(response.status,400);
      });

      it('message error in create form', async () => {
        const video = {
          description: 'video'
        }
        
        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(video);
          const errorContent = parseTextFromHTML(response.text,'#error');
          assert.equal(errorContent,'please fill the title input');
      });

      it('preserve the description', async () => {
        const video = {
          description: 'video'
        }
        
        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(video);
          const errorContent = parseTextFromHTML(response.text,'#description');
          assert.include(errorContent,video.description);
      });
    })

    
});

describe('GET',()=>{
  beforeEach(connectDatabase);
    
  afterEach(disconnectDatabase);

  describe('#/videos/:id',()=>{
    it('render the video with specific id', async () => {
      const video = {
        title: 'title',
        description: 'video',
        url: 'url'
      }
      const newVideo = await Video.create({...video});
      const getResponse = await request(app)
        .get(`/videos/${newVideo._id}`)
      const titleContent = parseTextFromHTML(getResponse.text,'#title');
      assert.include(titleContent,video.title);
    });
  })
})