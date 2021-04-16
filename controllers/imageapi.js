import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: `U can get it for free at 'https://portal.clarifai.com/login'`
})

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(function () {
                return res.status(400).json('unable to work with API');
            })
}

export default handleApiCall; 
