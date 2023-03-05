import { useDrag } from '@use-gesture/react'
import { useEffect, useRef, useState } from 'react'
import { Handle, Position, useReactFlow } from 'reactflow'
// import { useFlow } from '../useFlow'
import { getID } from '@/backend/aws'

export const name = 'ExportGroup'

let renewIDs = (data) => {
  let oldNewMap = new Map()
  let provide = (id) => {
    if (oldNewMap.has(id)) {
      return oldNewMap.get(id)
    } else {
      oldNewMap.set(id, getID())
      return oldNewMap.get(id)
    }
  }
  data.nodes.forEach((it) => {
    it.id = provide(it.id)
  })
  data.edges.forEach((it) => {
    it.id = provide(it.id)
    it.source = provide(it.source)
    it.target = provide(it.target)
  })

  return data
}

export function ExportGroup(node) {
  let { getIntersectingNodes, getEdges, getNodes, getZoom } = useReactFlow()
  // let [canSel, setSel] = useState(node.data.canSel)

  // useEffect(() => {
  //   node.data.canSel = canSel
  //   useFlow.getState().saveToDB()
  // }, [canSel, node])

  let [size, setSize] = useState({ width: node.data.width || 500, height: node.data.height || 500 })
  let [init, setInit] = useState({ width: node.data.width || 500, height: node.data.height || 500 })
  const bind = useDrag((state) => {
    if (state.first) {
      setInit({ width: node.data.width || 500, height: node.data.height || 500 })
    } else {
      node.data.width = init.width + state.movement[0] / getZoom()
      node.data.height = init.height + state.movement[1] / getZoom()
      setSize({ width: node.data.width, height: node.data.height })
    }
  }, {})

  let ref = useRef()

  return (
    <>
      <div
        className={'export-group '}
        ref={ref}
        style={{
          width: `${size.width.toFixed(0)}px`,
          height: `2px`, //${size.height.toFixed(0)}px
          position: 'relative',
        }}>
        <div className='absolute top-0 left-0 w-full p-3 text-center bg-blue-300'>
          <button
            className='px-5 py-2 m-4 bg-gray-200 rounded-2xl'
            onClick={() => {
              //

              ref.current.style.height = size.height + 'px'

              setTimeout(() => {
                const intersections = getIntersectingNodes(node)

                const edges = getEdges()

                let okEdges = edges.filter((ed) => {
                  return intersections.some((r) => r.id === ed.target || r.id === ed.source)
                })

                let node2 = getNodes().find((r) => r.id === node.id)
                let okNodes = intersections

                let data = {
                  edges: okEdges,
                  nodes: [...okNodes, node2],
                }

                renewIDs(data)

                let a = document.createElement('a')
                a.href = URL.createObjectURL(new Blob([JSON.stringify(data)], { type: 'application/json' }))
                a.download = 'backup.json'
                a.click()

                setTimeout(() => {
                  ref.current.style.height = '2px'
                })
              }, 100)
            }}>
            Download Scoped Package
          </button>
          {/* <button
            className={'px-5 py-2 m-4 rounded-2xl ' + (!canSel ? 'bg-blue-500' : 'bg-gray-200')}
            onClick={() => {
              setSel((s) => !s)
            }}>
            {canSel ? 'Toggle Lock' : 'Locked'}
          </button> */}
        </div>
      </div>
      <div
        className='bg-blue-300'
        style={{
          width: `${(size.width + 2).toFixed(0)}px`,
          position: 'absolute',
          left: `0px`,
          height: '20px',
          top: `${size.height.toFixed(0)}px`,
        }}></div>

      <div
        style={{
          width: `${size.width.toFixed(0)}px`,
          position: 'absolute',
          left: `0px`,
          height: '2px',
          top: `${size.height.toFixed(0)}px`,
        }}>
        <div {...bind()} className='absolute bottom-0 right-0 w-8 h-8 bg-red-500 rounded-full nodrag touch-none'></div>
      </div>
      {/* <Handle
        type={'source'}
        id={'programOut'}
        key={'programOut'}
        position={Position.Bottom}
        className='w-2 h-4 bg-blue-500 rounded-full'
        style={{
          width: `${50}px`,
          position: 'absolute',
          left: `${size.width * 0.5 + 50 / 4}px`,
          height: '25px',
          top: `${size.height.toFixed(0)}px`,
        }}
      /> */}

      <div
        className='bg-blue-300'
        style={{
          height: `${size.height.toFixed(0)}px`,
          position: 'absolute',
          left: `0px`,
          width: '20px',
          top: `${(size.height * 0.0).toFixed(0)}px`,
        }}></div>
      <div
        className='bg-blue-300'
        style={{
          height: `${(size.height + 20).toFixed(0)}px`,
          left: `${size.width.toFixed(0)}px`,
          position: 'absolute',
          width: '20px',
          top: `${(size.height * 0.0).toFixed(0)}px`,
        }}></div>

      <div
        style={{
          top: `0px`,
          width: `${size.width.toFixed(0)}px`,
          position: 'absolute',
          height: '2px',
        }}></div>
    </>
  )
}

export const run = async ({ core, globals, getNodes, getEdges, getNode, send, on }) => {
  let getGraphInArea = () => {
    let node = getNode()

    let x0 = node.position.x
    let y0 = node.position.y

    let x1 = x0 + node.data.width
    let y1 = y0 + node.data.height

    let intersections = getNodes().filter((n) => {
      return n.position.x >= x0 && n.position.y <= x1 && n.position.y >= y0 && n.position.y <= y1
    })

    const edges = getEdges()

    let okEdges = edges.filter((ed) => {
      return intersections.some((r) => r.id === ed.target || r.id === ed.source)
    })

    let node2 = getNode()
    let okNodes = intersections

    let data = {
      edges: okEdges,
      nodes: [...okNodes, node2],
    }

    let newGraph = renewIDs(data)

    return newGraph
  }
  core.onPreload(() => {})
  core.onReady(() => {
    // console.log(getGraphInArea())
    // send('programOut',)
    //
    // let last = ''
    // let tt = setInterval(() => {
    //   let node = getNode()
    //   let now = JSON.stringify(node)
    //   if (last !== now) {
    //     last = now
    //     send('number', node?.data?.float0)
    //   }
    // })
    // window.addEventListener('needsUpdate', () => {
    //   let node = getNode()
    //   send('number', node?.data?.float0)
    // })
    // globals.onClean(() => {
    //   clearInterval(tt)
    // })
  })
}

export default ExportGroup
