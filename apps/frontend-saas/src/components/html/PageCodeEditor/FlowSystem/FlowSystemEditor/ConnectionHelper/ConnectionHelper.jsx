import { useOnSelectionChange } from 'reactflow'
import { useFlow } from '../../useFlow/useFlow'
import { Cascader } from 'antd'
import { useEffect, useMemo } from 'react'
import { getOptions, getTemplateByNodeInstance } from '../../useFlow/nodeTypes'

export function ConnectionHelper() {
  useOnSelectionChange({
    onChange: ({ nodes = [], edges = [] }) => {
      useFlow.setState({
        selectedFirstNode: nodes[0],
        selectedFirstEdge: edges[0],
        selectedNodes: nodes,
        selectedEdges: edges,
      })
    },
  })

  let nodes = useFlow((s) => s.nodes)
  let connHelperAction = useFlow((s) => s.connHelperAction)
  let remoteHandleName = useFlow((s) => s.remoteHandleName)
  let createModuleName = useFlow((s) => s.createModuleName)
  let connectModuleID = useFlow((s) => s.connectModuleID)
  let onAddNode = useFlow((s) => s.onAddNode)
  let onAddEdge = useFlow((s) => s.onAddEdge)

  let hand = useFlow((s) => s.hand)
  let toolAddOnlyMode = useFlow((s) => s.toolAddOnlyMode)
  let options = useMemo(() => {
    return getOptions({ nodes, hand, toolAddOnlyMode })
  }, [hand, nodes, toolAddOnlyMode])

  useEffect(() => {
    let hh = (ev) => {
      //
      if (ev.key === 'Escape') {
        useFlow.setState({ showTool: false })
      }
    }
    window.addEventListener('keydown', hh)
    return () => {
      window.removeEventListener('keydown', hh)
    }
  })
  return (
    <div className='p-3 bg-gray-300 border rounded-lg bg-opacity-40  backdrop-blur-lg '>
      <Cascader
        className='mb-3 w-96'
        options={options}
        onChange={(segs) => {
          console.log(segs)
          if (segs[0] === 'create') {
            useFlow.setState({ connHelperAction: segs[0], createModuleName: segs[1], remoteHandleName: segs[2] })
          }
          if (segs[0] === 'connect') {
            useFlow.setState({ connHelperAction: segs[0], connectModuleID: segs[1], remoteHandleName: segs[2] })
          }

          return null
        }}
        expandTrigger={'hover'}
        showSearch={true}
        changeOnSelect={true}
      />

      <div className='flex'>
        {connHelperAction === 'create' && (
          <button
            className='px-3 py-2 mr-2 text-xs text-white bg-blue-500 rounded-xl disabled:opacity-50'
            onClick={() => {
              //
              onAddNode()
            }}
            disabled={!(connHelperAction && createModuleName && remoteHandleName)}>
            <>Create</>
          </button>
        )}
        {connHelperAction === 'connect' && (
          <button
            className='px-3 py-2 mr-2 text-xs text-white bg-blue-500 rounded-xl disabled:opacity-50'
            onClick={() => {
              //
              onAddEdge()
            }}
            disabled={!(connHelperAction && connectModuleID && remoteHandleName)}>
            <>Connect</>
          </button>
        )}
        <button
          className='px-3 py-2 text-xs text-white bg-gray-500 rounded-xl'
          onClick={() => {
            useFlow.setState({ showTool: false })
          }}>
          <>Cancel</>
        </button>
      </div>

      {/*  */}
    </div>
  )
}
