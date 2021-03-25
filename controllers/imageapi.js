import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: '5f45439ac5ad41df8fcbb536c3afe794'
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
