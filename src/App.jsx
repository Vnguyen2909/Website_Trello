import Button from '@mui/material/Button'
import HomeIcon from '@mui/icons-material/Home'
import { red } from '@mui/material/colors'
import Typography from '@mui/material/Typography'

function App() {

  return (
    <>
      <div>HELLO WORD</div>
      <Typography variant='body2' color="text.secondary">Test Typography</Typography>

      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <br />
      <HomeIcon sx={{color: red[500]}}/>
    </>
  )
}

export default App
