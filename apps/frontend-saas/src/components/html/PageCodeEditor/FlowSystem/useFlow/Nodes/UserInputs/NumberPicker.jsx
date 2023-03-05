import React, { useRef } from 'react'
import { Handle, Position } from 'reactflow'
import { useFlow } from '../../useFlow'
import { getTemplateByNodeInstance } from '../../nodeTypes'
import { InputNumber, Slider } from 'antd'
import { ExposeParamter } from '../../SharedGUI/ExposeParamter'
import { makeHoverStateSource, makeHoverStateTarget } from '../../SharedGUI/HoverState'

export const handles = [
  //
  { type: 'source', dataType: 'number', id: 'number', displayName: 'Number Picker' },
]

export const name = 'NumberPicker'

export const createData = () => {
  return {
    type: name,
    data: { label: 'floatPicker1', float0: 0 },
    position: { x: 250, y: 25 },
  }
}

export default function GUI({ id, data, selected }) {
  const updateNodeData = useFlow((s) => s.updateNodeData)
  const updateNodeLabel = useFlow((s) => s.updateNodeLabel)
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
              {...makeHoverStateTarget({ handle: r })}
              className='w-2 h-4 bg-gray-400 rounded-full'
              style={{ top: `calc(10px + 20px * ${i})` }}
              position={Position.Left}
            />
          )
        })}
      <div className='flex items-center justify-center'>
        {/*  */}
        {/*  */}
        <div
          style={{ backgroundColor: selected ? '#7298ff' : '#a0a0a0' }}
          className='flex items-center justify-center w-12 h-10 bg-transparent  rounded-tl-xl'>
          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path
              fill='white'
              d='M24 7v-2c0-2.761-2.238-5-5-5h-14c-2.761 0-5 2.239-5 5v2h10v2h-10v6h4v2h-4v2c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-2h-8v-2h8v-6h-5v-2h5zm-16 11c0 .552-.447 1-1 1s-1-.448-1-1v-4c0-.552.447-1 1-1s1 .448 1 1v4zm3 0c0 .552-.447 1-1 1s-1-.448-1-1v-4c0-.552.447-1 1-1s1 .448 1 1v4zm3 0c0 .552-.447 1-1 1s-1-.448-1-1v-4c0-.552.447-1 1-1s1 .448 1 1v4zm0-8c0 .552-.447 1-1 1s-1-.448-1-1v-4c0-.552.447-1 1-1s1 .448 1 1v4zm3 0c0 .552-.447 1-1 1s-1-.448-1-1v-4c0-.552.447-1 1-1s1 .448 1 1v4z'
            />
          </svg>
        </div>

        <input
          type='text'
          defaultValue={data.label}
          onChange={(evt) => updateNodeLabel(id, evt.target.value)}
          className='w-full h-10 pl-2 text-xs bg-gray-100 appearance-none rounded-r-xl nodrag'
        />

        <ExposeParamter id={id} data={data}></ExposeParamter>

        {/* <input
          type='color'
          defaultValue={data.color}
          onChange={(evt) => updateNodeColor(id, evt.target.value)}
          className='h-10 text-xs opacity-0'
        /> */}
      </div>

      <div className='px-3 pt-0 pb-3'>
        <SettingsGUI data={data} id={id}></SettingsGUI>
      </div>

      {handles
        .filter((r) => r.type === 'source')
        .map((r, i) => {
          return (
            <Handle
              {...makeHoverStateSource({ handle: r })}
              type={r.type}
              id={r.id}
              key={r.id}
              className='w-2 h-4 bg-gray-400 rounded-full'
              style={{ top: `calc(20px + 20px * ${i})` }}
              position={Position.Right}
            />
          )
        })}
    </div>
  )
}

export function writeSettings({ node, input }) {
  node.data.float0 = input
}
export function readSettings({ node }) {
  return node.data.float0
}

export const SettingsGUI = ({ data, id }) => {
  const updateNodeData = useFlow((s) => s.updateNodeData)
  let tt = useRef(0)
  return (
    <>
      <div className='nodrag'>
        <Slider
          className='nodrag'
          min={0}
          max={10}
          step={0.01}
          value={data.float0}
          onChange={(result) => {
            clearTimeout(tt.current)
            tt.current = setTimeout(() => {
              updateNodeData(id, 'float0', result)
            }, 1)
          }}></Slider>

        <InputNumber
          className='w-full nodrag'
          type='number'
          step={0.01}
          value={data.float0}
          onChange={(result) => {
            // clearInterval(tt.current)
            // tt.current = setTimeout(() => {
            clearTimeout(tt.current)
            tt.current = setTimeout(() => {
              updateNodeData(id, 'float0', result)
            }, 1)
            // }, 1)
          }}></InputNumber>
      </div>
      {/*  */}
    </>
  )
}

export const run = async ({ setReady, core, globals, getNode, send, on }) => {
  core.onPreload(() => {})
  core.onReady(() => {
    let last = ''
    let tt = setInterval(() => {
      let node = getNode()
      let now = JSON.stringify(node)
      if (last !== now) {
        last = now
        send('number', node?.data?.float0)
      }
    })

    window.addEventListener('needsUpdate', () => {
      let node = getNode()
      send('number', node?.data?.float0)
    })

    globals.onClean(() => {
      clearInterval(tt)
    })
  })
}
