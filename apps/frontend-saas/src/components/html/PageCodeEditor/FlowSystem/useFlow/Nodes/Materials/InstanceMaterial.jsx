import React from 'react'
import { Handle, Position } from 'reactflow'
import { useFlow } from '../../useFlow'
import { getTemplateByNodeInstance } from '../../nodeTypes'
// import { ExportParamter } from '../../SharedGUI/ExportParamter'
import { makeHoverStateSource, makeHoverStateTarget } from '../../SharedGUI/HoverState'

export const handles = [
  //
  { type: 'target', dataType: 'material', id: 'receiver', displayName: 'Inherit', position: Position.Top },

  { type: 'target', isProp: true, dataType: 'color', id: 'color', displayName: 'Color' },

  { type: 'target', isProp: true, dataType: 'texture', id: 'map', displayName: 'Texture Color' },
  { type: 'target', isProp: true, dataType: 'texture', id: 'normalMap', displayName: 'Texture Normal' },

  { type: 'target', isProp: true, dataType: 'texture', id: 'roughnessMap', displayName: 'Texture Roughness' },
  { type: 'target', isProp: true, dataType: 'texture', id: 'metalnessMap', displayName: 'Texture Metalness' },
  { type: 'target', isProp: true, dataType: 'texture', id: 'emissiveMap', displayName: 'Texture Emissive' },

  { type: 'target', isProp: true, dataType: 'color', id: 'emissive', displayName: 'Color Emissive' },

  { type: 'target', isProp: true, dataType: 'number', id: 'ior', displayName: 'Index of Refraction' },
  { type: 'target', isProp: true, dataType: 'number', id: 'thickness', displayName: 'Thickness' },
  { type: 'target', isProp: true, dataType: 'number', id: 'transmission', displayName: 'Transmission' },
  { type: 'target', isProp: true, dataType: 'number', id: 'roughness', displayName: 'Roughness' },
  { type: 'target', isProp: true, dataType: 'number', id: 'metalness', displayName: 'Metalness' },

  { type: 'source', dataType: 'material', id: 'material', displayName: 'Material' },
]

export const name = 'InstanceMaterial'

export const createData = () => {
  return {
    type: name,
    data: { label: 'instanceMaterial1', color: '#a0a0a0' },
    position: { x: 250, y: 25 },
  }
}

export default function GUI({ id, data, selected }) {
  const updateNodeLabel = useFlow((s) => s.updateNodeLabel)

  return (
    <div
      className={`text-sm rounded-xl transition-transform duration-300 scale-100  border bg-white ${
        selected ? ' border-cyan-500 shadow-cyan-100 shadow-lg ' : ' border-transparent'
      }`}>
      {handles
        .filter((r) => r.position === Position.Top)
        .filter((r) => r.type === 'target')
        .map((r, i) => {
          return (
            <Handle
              isValidConnection={(connection) => {
                let oppositeNode = useFlow.getState().nodes.find((n) => n.id === connection.source)
                let template = getTemplateByNodeInstance(oppositeNode)
                let remoteHandle = template?.handles?.find((h) => h.id === connection.sourceHandle)
                return remoteHandle?.dataType === r.dataType || r.dataType === 'any' || remoteHandle?.dataType === 'any'
              }}
              {...makeHoverStateTarget({ handle: r })}
              type={r.type}
              id={r.id}
              key={r.id}
              className='w-4 h-2 bg-gray-400 rounded-full hover:shadow-lg hover:shadow-cyan-500 hover:bg-cyan-400'
              style={{ left: `calc(50% + 15px * ${i})` }}
              position={r.position}
            />
          )
        })}

      {handles
        .filter((r) => r.position !== Position.Top)
        .filter((r) => r.type === 'target')
        .map((r, i) => {
          return (
            <Handle
              {...makeHoverStateTarget({ handle: r })}
              type={r.type}
              id={r.id}
              key={r.id}
              className='w-2 h-4 bg-gray-400 rounded-full hover:shadow-lg hover:shadow-cyan-500 hover:bg-cyan-400'
              style={{ top: `calc(52px + 24px * ${i})` }}
              position={Position.Left}
            />
          )
        })}

      <div className='flex items-center justify-center rounded-t-xl'>
        <div
          style={{ backgroundColor: selected ? '#6C6F72' : '#C2C2C2' }}
          className='flex items-center justify-center w-12 h-10 bg-transparent  rounded-tl-xl '>
          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path
              fill='white'
              d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-6.373 16.199c3.809.315 2.446-3.73 5.97-3.769l1.526 1.274c.381 4.6-5.244 5.626-7.496 2.495zm8.293-3.396l-1.549-1.293c.457-2.18 1.854-4.188 3.267-5.51l3.362 2.804c-1.041 1.636-3.023 3.154-5.08 3.999z'
            />
          </svg>
        </div>

        <input
          type='text'
          defaultValue={data.label}
          onChange={(evt) => updateNodeLabel(id, evt.target.value)}
          className='w-full h-10 pl-2 text-xs bg-gray-100 appearance-none nodrag rounded-r-xl'
        />

        {/* <ExportParamter id={id} data={data}></ExportParamter> */}

        {/* <input
          type='color'
          defaultValue={data.color}
          onChange={(evt) => updateNodeColor(id, evt.target.value)}
          className='inline-block h-10 text-xs opacity-0 appearance-none cursor-grabbing y-0'
        /> */}
      </div>

      {handles
        .filter((r) => r.position !== Position.Top)
        .filter((r) => r.id !== 'material')
        .map((h) => {
          return (
            <div key={h.id} className='flex items-center w-full text-xs bg-white '>
              <div className='py-1 ml-2 '>{h.displayName}</div>
            </div>
          )
        })}

      <div className='flex items-center w-full text-xs '>
        <div className='py-1 ml-2'></div>
      </div>
      <div>
        {handles
          .filter((r) => r.type === 'source')
          .map((r, i) => {
            return (
              <Handle
                {...makeHoverStateSource({ handle: r })}
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
    </div>
  )
}

export const run = async ({ core, globals, getNode, on, send, share }) => {
  //
  let base = new Map()
  let local = new Map()
  core.onReady(() => {
    //
    let pulse = () => {
      //
      let specification = {}
      for (let [key, val] of base.entries()) {
        specification[key] = val
      }
      for (let [key, val] of local.entries()) {
        specification[key] = val
      }

      send('material', specification)
    }

    on('receiver', (mateiralSpec) => {
      base.clear()
      for (let kn in mateiralSpec) {
        base.set(kn, mateiralSpec[kn])
      }
      pulse()
    })

    handles
      .filter((r) => r.isProp)
      .forEach(({ id }) => {
        on(id, (val) => {
          local.set(id, val)
          pulse()
        })
        pulse()
      })

    globals.onClean(() => {})
  })
}
