import { useEffect } from 'react'
import { FlowSystemEditor } from '../../FlowSystem/FlowSystemEditor/FlowSystemEditor'
import { FlowSystemRunner } from '../../FlowSystem/FlowSystemRunner/FlowSystemRunner'
import { HorizontalChildren } from '../../Grid/HorizontalChildren'
import { HorizontalParent } from '../../Grid/HorizontalParent'
import { useFlow } from '../../FlowSystem/useFlow/useFlow'
import { ExposedSettingsGUI } from '../../FlowSystem/useFlow/SharedGUI/ExposedSettingsGUI'
import { createData } from '../../FlowSystem/useFlow/Nodes/Capsule/Capsule'
import { getID } from '@/backend/aws'
import nProgress from 'nprogress'
import { ReactFlowProvider, useReactFlow } from 'reactflow'
import path from 'path'
import md5 from 'md5'

function AddEncap() {
  let { project } = useReactFlow()
  return (
    <button
      className='px-4 py-1 m-1 text-xs text-white bg-gray-700 rounded-2xl'
      onClick={() => {
        let nodeForEncap = createData()
        nodeForEncap.id = getID()
        nodeForEncap.data.label = 'My Package'
        nodeForEncap.data.nodes = []
        nodeForEncap.data.edges = []

        let viewport = useFlow.getState().viewport
        let rect = useFlow.getState().rect
        let pos = { x: -viewport.x + rect.width / 2, y: -viewport.y + rect.height / 2 }

        nodeForEncap.position = pos
        useFlow.setState({ nodes: [...useFlow.getState().nodes, nodeForEncap] })

        // let input = document.createElement('input')
        // input.type = 'file'
        // input.onchange = ({
        //   target: {
        //     files: [first],
        //   },
        // }) => {
        //   if (first) {
        //     let firstReader = new FileReader()
        //     firstReader.onload = () => {
        //       let obj = JSON.parse(firstReader.result)

        //     }
        //     firstReader.readAsText(first)
        //   }
        // }
        // input.click()
      }}>
      Load Package
    </button>
  )
}
export function ShaderEditorLayout() {
  let openFile = useFlow((s) => s.openFile)
  // let ready = useFlow((s) => s.ready)
  let docName = 'docNameNew'
  useEffect(() => {
    setTimeout(() => {
      nProgress.done()
    }, 500)
    return openFile({ docName })
  }, [docName, openFile])

  //
  return (
    <div className='w-full h-full'>
      <HorizontalParent>
        <HorizontalChildren className={'relative border-gray-400 border-r'} width='calc(20%)'>
          <ExposedSettingsGUI></ExposedSettingsGUI>
        </HorizontalChildren>
        <HorizontalChildren className={'relative'} width='calc(100% - 40%)'>
          <FlowSystemEditor></FlowSystemEditor>

          <div className='absolute top-0 right-0'>
            <button
              className='inline-block px-4 py-1 m-1 text-xs text-white bg-gray-700 rounded-2xl'
              onClick={() => {
                if (window.confirm('delete all and then reset?')) {
                  useFlow.setState({ nodes: [], edges: [] })

                  fetch(`/date/2022-20-23/backup.json`)
                    .then((r) => r.json())
                    .then((dat) => {
                      if (useFlow.getState().nodes.length === 0 && useFlow.getState().edges.length === 0) {
                        useFlow.setState({ nodes: dat.nodes, edges: dat.edges })
                      }
                    })
                }
              }}>
              Factory Reset
            </button>
          </div>

          <div className='absolute top-0 left-0'>
            <ReactFlowProvider>
              <AddEncap></AddEncap>
            </ReactFlowProvider>

            <button
              className='px-4 py-1 m-1 text-xs text-white bg-gray-700 rounded-2xl'
              onClick={() => {
                //
                let st = useFlow.getState()

                let viewport = useFlow.getState().viewport
                let rect = useFlow.getState().rect

                st.nodes.unshift({
                  id: getID(),
                  type: 'ExportGroup',
                  data: { label: 'Group', width: 500, height: 500 },
                  position: { x: -viewport.x + rect.width / 2, y: viewport.y + rect.height / 2 },
                  style: { zIndex: -1 },
                })
                // st.nodes = st.nodes.slice().sort((a, b) => {
                //   if (a.type.includes('group') || b.type.includes('group')) {
                //     return 1
                //   } else if (a.type.includes('group') && !b.type.includes('group')) {
                //     return -1
                //   } else {
                //     return 0
                //   }
                // })

                useFlow.setState({ edges: [...st.edges], nodes: [...st.nodes] })
              }}>
              Export Package
            </button>

            <button
              className='px-4 py-1 m-1 text-xs text-white bg-gray-700 rounded-2xl'
              onClick={() => {
                //

                let st = useFlow.getState()
                let data = {
                  edges: st.edges,
                  nodes: st.nodes,
                }

                let a = document.createElement('a')
                a.href = URL.createObjectURL(new Blob([JSON.stringify(data)], { type: 'application/json' }))
                a.download = 'backup.json'
                a.click()
              }}>
              Backup
            </button>
            <button
              className='px-4 py-1 m-1 text-xs text-white bg-gray-700 rounded-2xl'
              onClick={() => {
                let input = document.createElement('input')
                input.type = 'file'
                input.onchange = ({
                  target: {
                    files: [first],
                  },
                }) => {
                  if (first) {
                    let firstReader = new FileReader()
                    firstReader.onload = () => {
                      let obj = JSON.parse(firstReader.result)
                      useFlow.setState({ edges: obj.edges, nodes: obj.nodes })
                    }
                    firstReader.readAsText(first)
                  }
                }
                input.click()
              }}>
              Restore
            </button>

            <button
              className='px-4 py-1 m-1 text-xs text-white bg-gray-700 rounded-2xl'
              onClick={() => {
                //
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
              }}>
              Add Node
            </button>
          </div>
        </HorizontalChildren>

        <HorizontalChildren className={'relative'} width='calc(40%)'>
          <FlowSystemRunner></FlowSystemRunner>
        </HorizontalChildren>
      </HorizontalParent>
    </div>
  )
}
