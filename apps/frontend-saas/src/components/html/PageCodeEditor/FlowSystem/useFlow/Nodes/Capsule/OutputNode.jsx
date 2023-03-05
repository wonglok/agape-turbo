import React from 'react'
import { Handle, Position } from 'reactflow'
import { useFlow } from '../../useFlow'
import { getTemplateByNodeInstance } from '../../nodeTypes'

//BoxGeometry, Mesh,
// import { ExposeParamter } from '../../SharedGUI/ExposeParamter'
import { makeHoverStateTarget } from '../../SharedGUI/HoverState'

export const handles = [
  //
  { type: 'target', dataType: 'any', id: 'anyTarget', displayName: 'Target' },
  { type: 'source', dataType: 'any', id: 'anySource', displayName: 'Source' },
]

export const name = 'OutputNode'

export const createData = () => {
  return {
    type: name,
    data: { label: 'outputNode', color: '#a0a0a0', isExported: true },
    position: { x: 250, y: 25 },
  }
}

export default function GUI({ id, data, selected }) {
  const updateNodeLabel = useFlow((s) => s.updateNodeLabel)
  const updateNodeData = useFlow((s) => s.updateNodeData)

  return (
    <div
      className={`text-sm rounded-xl transition-transform duration-300 scale-100  border bg-white ${
        selected ? ' border-cyan-500 shadow-cyan-100 shadow-lg ' : ' border-transparent'
      }`}>
      {handles
        .filter((r) => r.type === 'target')
        .map((r, i, a) => {
          return (
            <Handle
              {...makeHoverStateTarget({ handle: r })}
              type={r.type}
              id={r.id}
              key={r.id}
              className='w-4 h-2 bg-gray-400 rounded-full'
              style={{ left: `calc(50% - 1rem / 2 + 25px * ${i - 0.5})` }}
              position={Position.Top}
            />
          )
        })}

      <div className='flex items-center justify-center'>
        <div
          style={{ backgroundColor: selected ? '#7298ff' : '#a0a0a0' }}
          className='flex items-center justify-center w-12 h-10 rounded-l-xl'>
          <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg' fillRule='evenodd' clipRule='evenodd'>
            <path
              fill='white'
              d='M7 16.462l1.526-.723c1.792-.81 2.851-.344 4.349.232 1.716.661 2.365.883 3.077 1.164 1.278.506.688 2.177-.592 1.838-.778-.206-2.812-.795-3.38-.931-.64-.154-.93.602-.323.818 1.106.393 2.663.79 3.494 1.007.831.218 1.295-.145 1.881-.611.906-.72 2.968-2.909 2.968-2.909.842-.799 1.991-.135 1.991.72 0 .23-.083.474-.276.707-2.328 2.793-3.06 3.642-4.568 5.226-.623.655-1.342.974-2.204.974-.442 0-.922-.084-1.443-.25-1.825-.581-4.172-1.313-6.5-1.6v-5.662zm-1 6.538h-4v-8h4v8zm15-11.497l-6.5 3.468v-7.215l6.5-3.345v7.092zm-7.5-3.771v7.216l-6.458-3.445v-7.133l6.458 3.362zm-3.408-5.589l6.526 3.398-2.596 1.336-6.451-3.359 2.521-1.375zm10.381 1.415l-2.766 1.423-6.558-3.415 2.872-1.566 6.452 3.558z'
            />
          </svg>
        </div>
        <input
          type='text'
          defaultValue={data.label}
          onChange={(evt) => updateNodeLabel(id, evt.target.value)}
          className='w-full h-10 pl-2 text-xs bg-gray-100 appearance-none nodrag rounded-r-xl'
        />
        {/* <input
          type='color'
          defaultValue={data.color}
          onChange={(evt) => updateNodeColor(id, evt.target.value)}
          className='h-10 text-xs  opacity-0'
        /> */}
      </div>
      {/*
      <div className='flex items-center justify-center'>
        <input
          type='text'
          placeholder='objectName'
          defaultValue={data.objectName}
          onChange={(evt) => updateNodeData(id, 'objectName', evt.target.value)}
          className='w-full h-10 pl-2 text-xs bg-gray-100 appearance-none nodrag rounded-r-xl'
        />
      </div> */}

      {handles
        .filter((r) => r.type === 'source')
        .map((r, i) => {
          return (
            <Handle
              isValidConnection={(connection) => {
                console.log(r)

                let oppositeNode = useFlow.getState().nodes.find((n) => n.id === connection.target)
                let template = getTemplateByNodeInstance(oppositeNode)
                let remoteHandle = template?.handles?.find((h) => h.id === connection.targetHandle)
                return remoteHandle?.dataType === r.dataType || r.dataType === 'any' || remoteHandle?.dataType === 'any'
              }}
              type={r.type}
              id={r.id}
              key={r.id}
              className='w-4 h-2 bg-gray-400 rounded-full'
              style={{ left: `calc(50% - 1rem / 2 + 25px * ${i})` }}
              position={Position.Bottom}
            />
          )
        })}
    </div>
  )
}

export const writeArrive = ({ node, input }) => {
  node.data.arrive = input
}

export const readArrive = ({ node }) => {
  return node.data.arrive
}

export const run = async ({ core, globals, emit, getNode, on, send, share }) => {
  //

  on('anyTarget', (ev) => {
    writeArrive({ node: getNode(), input: ev })
    send('anySource', ev)

    emit({ node: getNode(), handle: handles.find((r) => r.id === 'anySource'), data: ev })
  })

  //
}
