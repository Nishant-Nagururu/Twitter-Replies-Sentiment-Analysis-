import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'

const CommentAnalysis = () => {
    const [currPost,setCurrPost] = useState("");
    const [currComments,setCurrComments] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [currSentiment, setCurrSentiment] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.get(`/getpost/${currPost}`);
        const url = response.data;
        console.log(url);
        var index = url.indexOf('status')
        index += 7
        const postID = url.substring(index)
        console.log(postID);
        
        const tweet = await axios.post(`/gettwitterpost`, 
            {postID}
        );

        console.log(tweet.data[0].text)
        setCurrPost("") 

        //SENTIMENT ANALYSIS SHIT BELOW IT WORKS
       
        // const response = await axios.post(`https://api.meaningcloud.com/sentiment-2.1?key=54985fc8c0290d2c82179f46023dccd7&txt=${currPost}&lang=en`)
        // setCurrSentiment(response.data.score_tag);
        // setIsSubmitted(true);
    };

    return (
        <div>
            <Container maxWidth="sm">
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                        p: 2,
                        width: 500,
                        height: 500,
                        margin: 'auto',
                        marginTop: 20,
                        borderRadius: 2,
                        textAlign: 'center',
                    }}
                >
                    <h1>Pick a Post</h1>
                    
                    <form onSubmit={handleSubmit}>
                        <div>
                            <TextField
                                label="Post Name"
                                variant="filled"
                                required
                                value={currPost}
                                onChange={e => setCurrPost(e.target.value)}
                            />
                        </div>
                        <div>
                            <Button type = "submit" variant="outlined" color="primary" sx={{
                                bgcolor: 'background.blue',
                                marginTop: 2,
                                }}>
                                Get Comment Sentiment
                            </Button>
                        </div>
                        {isSubmitted? <h1>Post Sentiment: {currSentiment}</h1> : null}
                        <div>
                        <Button  href='/' variant="outlined" size='small' color="primary" sx={{
                                bgcolor: 'background.blue', 
                                marginTop: 25,
                                }}>
                                Go Back
                            </Button>
                        </div>
                    </form>
                </Box>
            </Container>
        </div>
    )
}

export default CommentAnalysis
