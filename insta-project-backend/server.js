//jshint esversion:6nod

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const { default: axios } = require('axios');
const needle = require('needle');
const token = 'AAAAAAAAAAAAAAAAAAAAAPR9lAEAAAAAjNyGlyplTqmWuGa%2BTSgo06gdFqk%3DeZU2mdsmxzsxNT7wjePbyFGSSEPRecaDy6TGL13ncBYN230wYc'
const endpointURL = "https://api.twitter.com/2/tweets?ids=";

//const { TwitterApi } = require('twitter-api-v2');
// const cors = require('cors')

// const client = new Twitter({
//     consumer_key: 'AWbv1Vhy0OjLZsMz4OrUqfALd',
//     consumer_secret: 'jS4VcEgfp3hgSSsnuqjkJ6hdJ6EatPd2ugmo3tczdbcF3kKxgH',
//     bearer_token: 'AAAAAAAAAAAAAAAAAAAAAPR9lAEAAAAAjNyGlyplTqmWuGa%2BTSgo06gdFqk%3DeZU2mdsmxzsxNT7wjePbyFGSSEPRecaDy6TGL13ncBYN230wYc'
// });

// const appOnlyClient = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAPR9lAEAAAAAjNyGlyplTqmWuGa%2BTSgo06gdFqk%3DeZU2mdsmxzsxNT7wjePbyFGSSEPRecaDy6TGL13ncBYN230wYc');
// const v2Client = appOnlyClient.v2;
// const roClient = v2Client.readOnly

// const client = new Twitter({
//     appKey: "AWbv1Vhy0OjLZsMz4OrUqfALd",
//     appSecret: "jS4VcEgfp3hgSSsnuqjkJ6hdJ6EatPd2ugmo3tczdbcF3kKxgH",
//     accessToken: "1612484955745157121-EXdcmBM5Sbr6UFOfUTHgyuHxQlp1Ta",
//     accessSecret: "yNKOnuDHqvfbLf9sud8d0cu4yTi6PXdHkCkRA5zwEuYmR"
// })

// const rClient = client.readOnly

//var Twitter = require('twitter');
 
// var client = new Twitter({
//   consumer_key: 'AWbv1Vhy0OjLZsMz4OrUqfALd',
//   consumer_secret: 'jS4VcEgfp3hgSSsnuqjkJ6hdJ6EatPd2ugmo3tczdbcF3kKxgH',
//   access_token_key: '1612484955745157121-EXdcmBM5Sbr6UFOfUTHgyuHxQlp1Ta',
//   access_token_secret: 'yNKOnuDHqvfbLf9sud8d0cu4yTi6PXdHkCkRA5zwEuYmR'
// });

// const twitterClient = new TwitterClient({
//   apiKey: 'AWbv1Vhy0OjLZsMz4OrUqfALd',
//   apiSecret: 'jS4VcEgfp3hgSSsnuqjkJ6hdJ6EatPd2ugmo3tczdbcF3kKxgH',
//   accessToken: '1612484955745157121-EXdcmBM5Sbr6UFOfUTHgyuHxQlp1Ta',
//   accessTokenSecret: 'yNKOnuDHqvfbLf9sud8d0cu4yTi6PXdHkCkRA5zwEuYmR',
// });

 
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

    //res.send(url)
    // var index = url.indexOf('status')
    // index += 7

    // const postID = url.substring(index)
    // res.send(postID)

    // rClient.get(`https://api.twitter.com/2/tweets/${postID}`, function(error, tweets, response) {
    //     if(error) throw error;
    //     res.send(tweets); 
    // });
});

app.post('/gettwitterpost', async (req, res) => {
    const postID = String(req.body.postID);
    // const tweet = await v2Client.singleTweet(id, {
    //     expansions: [
    //       'entities.mentions.username',
    //       'in_reply_to_user_id',
    //     ],
    // });

    //try {
    //     const lookupTweetById = await roClient.tweets.findTweetById(
    //       //The ID of the Tweet
    //       {id}
    //     );
    //     res.send(lookupTweetById);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // v2Client.get(`tweets/${req.body.postID}`, function(error, tweets, response) {
    //     if(error) throw error;
    //     res.send(tweets.data); 
    // });

//     var params = {id: id};
//     client.get('/2/tweets', params, function(error, tweets, response) {
//     if (!error) {
//         res.json(tweets);
//     }
// });
    // try {
    //     const tweet = await twitterClient.tweets.statusesShow({id: postID});
    //     res.send(tweet);
    // } catch (error) {
    //     console.log(error);
    //     res.send("Error occured");
    // }
    // try {
    //     const tweet = await axios.get(`https://api.twitter.com/2/tweets?ids=${postID}`)
    //     res.send(tweet);
    // } catch (error) {
    //     console.log(error);
    //     res.send("Error occured ")
    // }

    async function getRequest() {

        // These are the parameters for the API request
        // specify Tweet IDs to fetch, and any additional fields that are required
        // by default, only the Tweet ID and text are returned
        const params = {
            "ids": postID
        }
    
        // this is the HTTP header that adds bearer token authentication
        const response = await needle('get', endpointURL, params, {
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



