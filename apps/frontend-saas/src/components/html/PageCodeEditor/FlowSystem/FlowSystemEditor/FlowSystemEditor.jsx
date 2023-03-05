import ReactFlow, { ReactFlowProvider, useReactFlow, useViewport } from 'reactflow'
import { Background, Controls } from 'reactflow'
import { shallow } from 'zustand/shallow'
import { useFlow } from '../useFlow/useFlow'
import { nodeTypes } from '../useFlow/nodeTypes'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ConnectionHelper } from './ConnectionHelper/ConnectionHelper'
import { edgeTypes } from '../useFlow/edgeTypes'
import ExportGroup from '../useFlow/SharedGUI/ExportGroup'

export function FlowSystemEditor() {
  return (
    <ReactFlowProvider>
      <FlowSystemEditorCore></FlowSystemEditorCore>
    </ReactFlowProvider>
  )
}

export function FlowSystemEditorCore() {
  let reactFlowWrapper = useRef()

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onConnectEnd, onConnectStart } = useFlow(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
      onConnect: state.onConnect,
      onConnectStart: state.onConnectStart,
      onConnectEnd: state.onConnectEnd,
    }),
    shallow,
  )

  let { showTool, toolTop, toolLeft } = useFlow((r) => ({
    toolTop: r.toolTop,
    toolLeft: r.toolLeft,
    showTool: r.showTool,
  }))

  useEffect(() => {
    if (!showTool) {
      useFlow.setState({
        toolAddOnlyMode: false,
      })
    }
  }, [showTool])

  const { project, setViewport, fitView } = useReactFlow()
  const { x, y, zoom } = useViewport()

  useEffect(() => {
    //
    let hh = (ev) => {
      if (ev.code === 'Space') {
        let showTool = useFlow.getState().showTool
        let viewport = useFlow.getState().viewport
        let rect = useFlow.getState().rect
        if (!showTool) {
          useFlow.setState({
            addNodeOnly: true,
            toolAddOnlyMode: true,
            showTool: true,
            toolTop: `${rect.height / 2 + rect.top}px`,
            toolLeft: `${rect.width / 2 + rect.left - 410 / 2}px`,
            newNodePos: { x: -viewport.x + rect.width / 2, y: -viewport.y + rect.height / 2 },
          })
        } else {
          useFlow.setState({
            addNodeOnly: false,
            toolAddOnlyMode: false,
            showTool: false,
          })
        }
      }
    }
    window.addEventListener('keydown', hh)

    return () => {
      window.removeEventListener('keydown', hh)
    }
  }, [])

  useEffect(() => {
    let { top, left, width, height } = reactFlowWrapper.current.getBoundingClientRect()
    useFlow.setState({ viewport: { x, y, zoom }, rect: { top, left, width, height } })
  }, [x, y, zoom, reactFlowWrapper])

  useEffect(() => {
    useFlow.setState({
      fitToView: () => {
        // fitView({ padding: 0.1 })
      },
    })
  }, [fitView, setViewport])

  let nodeTypes2 = useMemo(() => {
    return {
      ...nodeTypes,
      ExportGroup: ExportGroup,
    }
  }, [])

  let edgeTypes2 = useMemo(() => edgeTypes, [])

  return (
    <div className='relative w-full h-full' ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes2}
        nodeTypes={nodeTypes2}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd({ reactFlowWrapper, project })}
        onConnectStart={onConnectStart}
        fitView
        snapToGrid
        snapGrid={[10, 10]}>
        <Background color='#898989' size={1} style={{ backgroundColor: '#e5e5e5' }} />
        <Controls />
      </ReactFlow>
      <div
        style={{
          position: 'fixed',
          zIndex: '50',
          top: `${toolTop}`,
          left: `${toolLeft}`,
          display: showTool ? 'block' : 'none',
        }}>
        {<ConnectionHelper></ConnectionHelper>}
      </div>
    </div>
  )
}

//onConnectEnd
