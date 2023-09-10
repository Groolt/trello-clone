import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
function Card({ temporaryHideMedia }) {
  return (
    <MuiCard sx={{
      cursor: 'pointer',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
      overflow: 'unset'
    }}>
      {!temporaryHideMedia && <CardMedia
        sx={{ height: 140 }}
        image="https://th.bing.com/th/id/R.8224b3015b978ea7cf348b6d7d66db96?rik=GQ9RD71sF%2fejCA&pid=ImgRaw&r=0"
        title="Alime"
      />}
      <CardContent sx={{ p: 1.5, ':last-child': { p: 1.5 } }}>
        <Typography >Groolt MERN Stack</Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        <Button startIcon={<GroupIcon/>} sx={{ color: (theme) => (theme.palette.mode === 'dark' ? 'white' : '#1976d2') }} size="small">20</Button>
        <Button startIcon={<CommentIcon/>} sx={{ color: (theme) => (theme.palette.mode === 'dark' ? 'white' : '#1976d2') }} size="small">15</Button>
        <Button startIcon={<AttachmentIcon/>} sx={{ color: (theme) => (theme.palette.mode === 'dark' ? 'white' : '#1976d2') }} size="small">10</Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card