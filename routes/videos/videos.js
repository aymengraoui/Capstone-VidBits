const router = require('express').Router();

const Video = require('../../models/video');

router.post('/videos', async (req, res) => {
    const video = {...req.body};
    const videoSaved = new Video(video);
    const error = videoSaved.validateSync();
    if(error){
        video.error = {};
        if(error.errors.title){
            video.error.title = 'please fill the title input';
        }
        if(error.errors.description){
            video.error.description = 'please fill the description input';
        }
        if(error.errors.url){
            video.error.url = 'please fill the url input';
        }
        res.status(400);
        res.render('videos/create',{video});
    }else {
        const videoSaved = await Video.create(video);
        res.status(201);
        res.render('videos/show',{video : videoSaved});
    }
});

router.get('/', async (req, res, next) => {
    res.redirect('/videos');
}); 

router.get('/videos', async (req, res, next) => {
    const videos = await Video.find(()=>{});
    res.render('index',{videos});
});

router.get('/videos/create', async (req, res, next) => {
    res.render('videos/create');
});

router.get('/videos/:id', async (req, res, next) => {
    const video = await Video.findById({ _id: req.params.id });
    res.render("videos/show", { video });
});

router.get('/videos/:id/edit', async (req, res, next) => {
    const video = await Video.findById({ _id: req.params.id });
    res.render("videos/edit", { video });
});

router.get('/videos/:id/delete', async (req, res, next) => {
    Video.remove({ _id: req.params.id }, (error) => {
        if (error) return res.send(error);
        res.redirect("/videos");
    });
});

router.post('/videos/:id/edit', async (req, res, next) => {
    const video = {...req.body};
    video._id = req.params.id;
    const videoUpdatedValue = new Video(video);
    const error = videoUpdatedValue.validateSync();
    if(error){
        video.error = {};
        if(error.errors.title){
            video.error.title = 'please fill the title input';
        }
        if(error.errors.description){
            video.error.description = 'please fill the description input';
        }
        if(error.errors.url){
            video.error.url = 'please fill the url input';
        }
        res.status(400);
        res.render(`videos/edit`,{video});
    }else {
        console.log('updating')
        await Video.findOneAndUpdate({ _id: req.params.id }, req.body, (error) => {
            if (error) return res.send(error);
            res.render('videos/show',{video : videoUpdatedValue});
        });
    }
});

module.exports = router;