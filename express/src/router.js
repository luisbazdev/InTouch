var express = require('express');
var router = express.Router();

router.post('/auth/verify', (req, res) => {
    if(!req.cookies.session){
        res.json({credentials: null});
    }
    else{
        res.json({credentials: req.cookies.session});
    }
});

router.post('/auth/authenticate', (req, res) => {
    var user = req.body.user
    var picture = req.body.pictureURL
    var uid = req.body.uid

    var credentials = {
        user,
        picture,
        uid
    }

    res.cookie('session', credentials, {
        httpOnly: true,
    })

    res.end()
});

router.post('/auth/logout', (req, res) => {
    res.clearCookie('session', {
        httpOnly: true,
    });
    res.json({credentials: null});
})

module.exports = router;