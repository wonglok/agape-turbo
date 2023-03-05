import { getBezierPath } from 'reactflow'
import { useFlow } from '../../useFlow'

const foreignObjectSize = 40

const onEdgeClick = (evt, id) => {
  evt.stopPropagation()

  let edges = [...useFlow.getState().edges]

  let idx = edges.findIndex((r) => r.id === id)

  if (idx !== -1) {
    edges.splice(idx, 1)
  }

  useFlow.setState({ edges: edges })
  useFlow.getState().saveToDB()
}

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const [edgePath1, labelX1, labelY1] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  return (
    <>
      <path id={id} style={style} className='react-flow__edge-path' d={edgePath1} markerEnd={markerEnd} />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={labelX1 - foreignObjectSize / 2}
        y={labelY1 - foreignObjectSize / 2}
        className='edgebutton-foreignobject'
        requiredExtensions='http://www.w3.org/1999/xhtml'>
        <div>
          <button className='edgebutton' onClick={(event) => onEdgeClick(event, id)}>
            <svg
              className=' scale-50'
              clipRule='evenodd'
              fillRule='evenodd'
              strokeLinejoin='round'
              strokeMiterlimit='2'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z' />
            </svg>
          </button>
        </div>
      </foreignObject>
      {/*  */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
.edgebutton {
  width: 40px;
  height: 40px;
  background: #eee;
  border: 1px solid #fff;
  cursor: pointer;
  border-radius: 50%;
  font-size: 12px;
  line-height: 1;
  opacity: 0.15;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.08);
}

.edgebutton:hover {
  opacity: 1;
}

.edgebutton-foreignobject div {
  background: transparent;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40px;
}
`,
        }}></style>
    </>
  )
}
