import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function Card({ card }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: card?._id,
    data: { ...card }
  })
  const dndkitCardStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #2ecc71' : undefined
    // touchAction: 'none': pointer
  }
  return (
    <MuiCard
      ref={setNodeRef}
      style={dndkitCardStyle}
      {...attributes}
      {...listeners}
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset',
        display: card?.FE_PlaceholderCard ? 'none' : 'block'
        // ,overflow: card?.FE_PlaceholderCard ? 'hidden' :unset
        // ,height: card?.FE_PlaceholderCard ? '0px' :unset
      }}
    >
      {card?.cover && (
        <CardMedia sx={{ height: 140 }} image={card?.cover} title="Alime" />
      )}
      <CardContent sx={{ p: 1.5, ':last-child': { p: 1.5 } }}>
        <Typography>{card?.title}</Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        <Button
          startIcon={<GroupIcon />}
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark' ? 'white' : '#1976d2'
          }}
          size="small"
        >
          {card?.memberIds?.length}
        </Button>
        <Button
          startIcon={<CommentIcon />}
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark' ? 'white' : '#1976d2'
          }}
          size="small"
        >
          {card?.comments?.length}
        </Button>
        <Button
          startIcon={<AttachmentIcon />}
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark' ? 'white' : '#1976d2'
          }}
          size="small"
        >
          {card?.attachments?.length}
        </Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card
