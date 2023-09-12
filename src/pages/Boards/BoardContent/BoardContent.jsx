import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  getFirstCollision
} from '@dnd-kit/core'
import { useCallback, useEffect, useRef, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  // const pointerSensor = useSensor(PointerSensor, {
  //   // Require the mouse to move by 10 pixels before activating
  //   activationConstraint: {
  //     distance: 10
  //   }
  // })
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10
    }
  })
  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5
    }
  })
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState([])
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumns, setOldColumns] = useState(null)
  const lastOverId = useRef(null)
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])
  const moveCardBetweenDifferentColumns = ({
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCartData
  }) => {
    setOrderedColumns((prevColumns) => {
      const overCardIndex = overColumn?.cards?.findIndex(
        (card) => card?._id === overCardId
      )
      let newCardIndex
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns?.find(
        (col) => col?._id === activeColumn?._id
      )
      const nextOverColumn = nextColumns?.find(
        (col) => col?._id === overColumn?._id
      )
      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        )
        if (isEmpty(nextActiveColumn?.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          (card) => card?._id
        )
        nextActiveColumn.ca
      }
      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        )
        const rebuild_activeDraggingCartData = {
          ...activeDraggingCartData,
          columnId: nextOverColumn?._id
        }
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          rebuild_activeDraggingCartData
        )
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => !card?.FE_PlaceholderCard
        )
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card) => card?._id
        )
      }
      return nextColumns
    })
  }
  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over || !active) return
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const { id: overCardId } = over
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCartData }
      } = active
      const overColumn = findColumnByCardId(overCardId)
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      if (!oldColumns || !overColumn) return
      if (oldColumns?._id !== overColumn?._id) {
        moveCardBetweenDifferentColumns({
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCartData
        })
      } else {
        // keo tha trong cung 1 column
        const oldCardIndex = oldColumns?.cards.findIndex(
          (card) => card?._id === activeDragItemId
        )
        const newCardIndex = overColumn?.cards.findIndex(
          (card) => card?._id === overCardId
        )
        const dndOrderedCards = arrayMove(
          oldColumns?.cards,
          oldCardIndex,
          newCardIndex
        )

        setOrderedColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns)
          const targetColumn = nextColumns?.find(
            (col) => col?._id === overColumn?._id
          )
          targetColumn.cardOrderIds = dndOrderedCards.map((c) => c?._id)
          targetColumn.cards = dndOrderedCards
          return nextColumns
        })
      }
    }
    if (
      activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN &&
      active?.id !== over?.id
    ) {
      const oldColumnIndex = orderedColumns.findIndex(
        (col) => col?._id === active?.id
      )
      const newColumnIndex = orderedColumns.findIndex(
        (col) => col?._id === over?.id
      )
      const dndOrderedColumns = arrayMove(
        orderedColumns,
        oldColumnIndex,
        newColumnIndex
      )
      // const dndOrderedColumnsIds = dndOrderedColumns.map(col => col?._id)
      setOrderedColumns(dndOrderedColumns)
    }
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumns(null)
  }
  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    const { active, over } = event
    if (!over || !active) return
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCartData }
    } = active
    const { id: overCardId } = over
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    if (!activeColumn || !overColumn) return
    if (activeColumn?._id !== overColumn?._id) {
      moveCardBetweenDifferentColumns({
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCartData
      })
    }
  }
  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)
    if (event?.active?.data?.current?.columnId) {
      // Chi thuc hien khi keo card, luu vi tri ban dau cua card truoc khi thuc hien thao tac keo, khong su dung lai cai cu vi da bi handleDragOver thay doi gia tri
      setOldColumns(findColumnByCardId(event?.active?.id))
    }
  }
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((col) =>
      col?.cards.map((card) => card._id)?.includes(cardId)
    )
  }
  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        return closestCorners({ ...args })
      const pointerIntersections = pointerWithin(args)
      if (!pointerIntersections?.length) return
      // const intersections = !!pointerIntersections?.length
      //   ? pointerIntersections
      //   : rectIntersection(args)
      let overId = getFirstCollision(pointerIntersections, 'id')
      if (overId) {
        lastOverId.current = overId
        const checkColumn = orderedColumns.find(
          (column) => column?._id === overId
        )
        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) =>
                container.id !== overId &&
                checkColumn?.cardOrderIds.includes(container.id)
            )
          })[0]?.id
        }
        return [{ id: overId }]
      }
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeDragItemType, orderedColumns]
  )
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
    >
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          p: '10px 0'
        }}
      >
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
