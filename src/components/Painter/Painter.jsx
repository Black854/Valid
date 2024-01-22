import { useEffect, useState } from 'react'
import { Excalidraw } from '@excalidraw/excalidraw'
import { getPainterDataSelector, getThemeType } from '../../redux/Selectors/appSelectors'
import { useDispatch, useSelector } from 'react-redux'
import { getPainterData, setPainterData } from '../../redux/Reducers/appReducer'
import _ from 'lodash'
import { Loading } from '../common/Loading'

const Painter = () => {
  const dispatch = useDispatch()

  const themeType = useSelector(getThemeType)
  const painterData = useSelector(getPainterDataSelector)
  const [elements, setElements] = useState(painterData && painterData.length > 0 ? JSON.parse(painterData) : null)

  useEffect(() => {
    dispatch(getPainterData())

    return () => {
      if (elements && elements.length > 0) {
        dispatch(setPainterData(elements))
      }
    }
  }, [])

  useEffect(() => {
    painterData && painterData.length !== 0 && setElements(JSON.parse(painterData))
  }, [painterData])

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (painterData && painterData.length > 0 && elements.length > 0) {
        const areEqual = _.isEqual(elements, JSON.parse(painterData))
        if (!areEqual && elements && elements.length > 0) {
          dispatch(setPainterData(elements))
        }
      } else {
        if (elements && elements.length > 0) {
          dispatch(setPainterData(elements))
        }
      }
    }, 1000)

    return () => clearTimeout(timerId)
  }, [elements])

  const handleUpdateElements = (e) => {
    const areEqual = _.isEqual(e, elements)
    if (!areEqual) {
      setElements(e)
    }
  }

  return elements ? (
    <div style={{ height: '90vh' }}>
      <Excalidraw
        initialData={{
          elements,
          appState: {
            viewBackgroundColor: '#edf2ff',
          },
        }}
        onChange={(e) => handleUpdateElements(e)}
        theme={themeType}
        langCode='ru-RU'
      />
    </div>
  ) : <Loading />
}

export default Painter