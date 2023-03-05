import React from 'react'
import { Handle, Position } from 'reactflow'
import { useFlow } from '../../useFlow'
import { getTemplateByNodeInstance } from '../../nodeTypes'
import { SphereGeometry, TorusKnotGeometry } from 'three'
import { ExposeParamter } from '../../SharedGUI/ExposeParamter'
import { makeHoverStateTarget } from '../../SharedGUI/HoverState'

export const handles = [
  //
  // { type: 'target', dataType: 'args', id: 'args', displayName: 'Color' },
  { type: 'source', dataType: 'geometry', id: 'geometry', displayName: 'Geomtry' },
]

export const name = 'TorusKnotBufferGeometry'

export const createData = () => {
  return {
    type: name,
    data: { label: 'torusKnotGeometry1', color: '#a0a0a0' },
    position: { x: 250, y: 25 },
  }
}

export default function GUI({ id, data, selected }) {
  const updateNodeLabel = useFlow((s) => s.updateNodeLabel)
  const updateNodeColor = useFlow((s) => s.updateNodeColor)

  return (
    <div
      className={`text-sm rounded-xl transition-transform duration-300 scale-100  border bg-white ${
        selected ? ' border-cyan-500 shadow-cyan-100 shadow-lg ' : ' border-transparent'
      }`}>
      {handles
        .filter((r) => r.type === 'target')
        .map((r, i) => {
          return (
            <Handle
              type={r.type}
              id={r.id}
              key={r.id}
              className=''
              {...makeHoverStateTarget({ handle: r })}
              style={{ left: `calc(10px + 20px * ${i})` }}
              position={Position.Top}
            />
          )
        })}

      {/* <Handle type='target' id='color' position={Position.Left} /> */}
      <div className='flex items-center justify-center'>
        <div
          style={{ backgroundColor: selected ? '#7298ff' : '#a0a0a0' }}
          className='flex items-center justify-center w-12 h-10 bg-transparent rounded-l-xl'>
          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path
              fill='white'
              d='M18 10.031v-6.423l-6.036-3.608-5.964 3.569v6.499l-6 3.224v7.216l6.136 3.492 5.864-3.393 5.864 3.393 6.136-3.492v-7.177l-6-3.3zm-1.143.036l-4.321 2.384v-4.956l4.321-2.539v5.111zm-4.895-8.71l4.272 2.596-4.268 2.509-4.176-2.554 4.172-2.551zm-.569 6.134v4.96l-4.25-2.421v-5.134l4.25 2.595zm-5.83 14.842l-4.421-2.539v-5.176l4.421 2.595v5.12zm-3.773-8.702l4.778-2.53 4.237 2.417-4.668 2.667-4.347-2.554zm4.917 3.587l4.722-2.697v5.056l-4.722 2.757v-5.116zm10.586 5.115l-4.722-2.757v-5.116l4.722 2.754v5.119zm-4.074-8.861l4.247-2.39 4.769 2.594-4.367 2.509-4.649-2.713zm9.638 6.323l-4.421 2.539v-5.116l4.421-2.538v5.115z'
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
          className='h-10 text-xs opacity-0'
        /> */}
      </div>
      {/*  */}

      {handles
        .filter((r) => r.type === 'source')
        .map((r, i) => {
          return (
            <Handle
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

export const run = async ({ core, globals, nodeData, on, send }) => {
  //
  core.onReady(() => {
    let box = new TorusKnotGeometry(1.3, 0.2, 240, 64, 4, 3)

    send('geometry', box)
  })
}
