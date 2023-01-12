import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../css/LogIn.css'
import axios from 'axios';


const LogIn = (props) => {
    const [postName, setPostName] = useState('')
    const [username, setUsername] = useState('')
    const [postURL, setPostURL] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const repsonse = await axios.put('/posts', {
            postName: postName,
            username: username,
            postURL: postURL
        })
        setUsername("");
        setPostURL("");
        setPostName("");
    };

    return (
        // <div className='card'>
        //     <h1>Log In</h1>
        // </div>
        <Container maxWidth="sm">
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                    p: 2,
                    width: 500,
                    height: 350,
                    margin: 'auto',
                    marginTop: 20,
                    borderRadius: 2,
                    textAlign: 'center',
                }}
            >
                <h1>Add Post To Database</h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            label="Twitter Post Name"
                            variant="filled"
                            required
                            value={postName}
                            onChange={e => setPostName(e.target.value)}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Twitter Username"
                            variant="filled"
                            required
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            sx = {{marginTop: 2,}}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Post URL"
                            variant="filled"
                            required
                            sx = {{marginTop: 2,}}
                            value={postURL}
                            onChange={e => setPostURL(e.target.value)}
                        />
                    </div>
                    <div>
                        <Button type = "submit" variant="outlined" color="primary" sx={{
                            bgcolor: 'background.blue',
                            marginTop: 2,
                            }}>
                            Submit Post Info
                        </Button>
                        <Button href='/commentanalysis' variant="outlined" color="primary" sx={{
                            bgcolor: 'background.blue',
                            marginTop: 2,
                            marginLeft: 1,
                            }}>
                            Get Comment Analysis
                        </Button>
                    </div>
                </form>
            </Box>
        </Container>
      );
}

export default LogIn
