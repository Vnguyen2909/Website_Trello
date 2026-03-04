import Button from '@mui/material/Button'
import HomeIcon from '@mui/icons-material/Home'
import { red } from '@mui/material/colors'

function App() {

  return (
    <>
      <div>HELLO WORD</div>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <HomeIcon sx={{color: red[500]}}/>
    </>
  )
}

export default App
