import { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ImageList, ImageListItem, ImageListItemBar, ListSubheader, IconButton } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';

function App() {

  const [images, setImages] = useState([])
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')

  const fetchImages = async () => {
    let res = await axios.get('http://localhost:3001')
    setImages(res.data)
  }

  const addImageHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', image)
    formData.append('title', title)

    await axios.post('http://localhost:3001/add-image', formData)
    setTimeout(() => fetchImages(), 2000)
    setImage("")
    setTitle("")
  }

  useEffect(() => {
    fetchImages()
  }, [])

  return (
    <div className="App">
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        autoComplete="oN"
        onSubmit={addImageHandler}
        encType='multipart/form-data'
      >
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          name='title'
          value={title}
        />
        <label htmlFor="image">
          <input
            style={{ display: 'none' }}
            id="image"
            name="image"
            type="file"
            onChange={e => setImage(e.target.files[0])}
          />

          <Button color="secondary" variant="contained" component="span">
           {image ? "Image Selected" : "Choose Image"}
          </Button>
        </label>
        <Button type="submit" variant='outlined'>Add Image</Button>
      </Box>
      <ImageList sx={{ width: 750, height: 550 }}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">December</ListSubheader>
        </ImageListItem>
        {images.map((item) => (
          <ImageListItem key={item.image}>
            <img
              src={`${item.image}?w=248&fit=crop&auto=format`}
              srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${item.title}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div >
  );
}

export default App;
