import { useFlow } from '../useFlow'

export const makeHoverStateTarget = ({ handle: r }) => {
  return {
    onMouseEnter: () => {
      useFlow.getState().edges.forEach((edge) => {
        if (edge.targetHandle === r.id) {
          edge.animated = true
          edge.style = {
            stroke: 'cyan',
          }
        }
      })
      useFlow.setState({ edges: [...useFlow.getState().edges] })
      useFlow.getState().saveToDB()
    },
    onMouseLeave: () => {
      useFlow.getState().edges.forEach((edge) => {
        edge.animated = false
        edge.style = {
          stroke: '',
        }
      })
      useFlow.setState({ edges: [...useFlow.getState().edges] })
      useFlow.getState().saveToDB()
    },
  }
}

export const makeHoverStateSource = ({ handle: r }) => {
  return {
    onMouseEnter: () => {
      useFlow.getState().edges.forEach((edge) => {
        if (edge.sourceHandle === r.id) {
          edge.animated = true
          edge.style = {
            stroke: 'cyan',
          }
        }
      })
      useFlow.setState({ edges: [...useFlow.getState().edges] })
      useFlow.getState().saveToDB()
    },
    onMouseLeave: () => {
      useFlow.getState().edges.forEach((edge) => {
        edge.animated = false
        edge.style = {
          stroke: '',
        }
      })
      useFlow.setState({ edges: [...useFlow.getState().edges] })
      useFlow.getState().saveToDB()
    },
  }
}
