//jshint esversion:6nod

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const { default: axios } = require('axios');
const needle = require('needle');
const token = 'YOUR BEARER TOKEN HERE'
const endpointURL = "https://api.twitter.com/2/tweets?";
const getRepliesEndpoint  = "https://api.twitter.com/2/tweets/search/recent?query="
 
mongoose.connect("mongodb://localhost:27017/insta-project-db", { useNewUrlParser: true, useUnifiedTopology: true })
const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(cors())

const postSchema = {
    postName: String,
    username: String,
    postURL: String,
}

const Post = mongoose.model("Post", postSchema)


app.put('/posts', (req, res) => {
    const post = new Post({
        postName: req.body.postName,
        username: req.body.username,
        postURL: req.body.postURL
    })
    post.save()
    res.send('Post added successfully')
});

app.get('/getpost/:name', (req, res) => {
    const name = req.params.name;
    var url = "";

    Post.findOne({postName: name}, function(err, foundPost){
        if(!err){
            if (foundPost) {
                url = foundPost.postURL;
                res.send(url)
            } else {
                res.send("No articles matching that title was found.")
            }
        } else {
            console.log(err)
        }
    });
});

app.post('/gettwitterpost', async (req, res) => {
    const postID = String(req.body.postID);
    async function getRequest() {

        // These are the parameters for the API request
        // specify Tweet IDs to fetch, and any additional fields that are required
        // by default, only the Tweet ID and text are returned
        // const params = {
        //     "ids": postID,
        //     "tweet.fields": "conversation_id"
        // }

        const params = {
            "query": `conversation_id:${postID}`,
        }
    
        // this is the HTTP header that adds bearer token authentication
        const response = await needle('get', getRepliesEndpoint, params, {
            headers: {
                "User-Agent": "v2TweetLookupJS",
                "authorization": `Bearer ${token}`
            }
        })
    
        if (response.body) {
            return response.body;
        } else {
            throw new Error('Unsuccessful request');
        }
    }
    (async () => {

        try {
            // Make request
            const response = await getRequest();
            res.json(response.data)
    
        } catch (e) {
            console.log(e);
            process.exit(-1);
        }
        process.exit();
    })();
});

app.listen(8000, () => {
    console.log('Server is running on port 8000')
})



