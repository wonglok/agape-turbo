/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from 'react'
import { Handle, Position } from 'reactflow'
import { useFlow } from '../../useFlow'
// import { InputNumber, Slider } from 'antd'
import { ExposeParamter } from '../../SharedGUI/ExposeParamter'
import { makeHoverStateSource, makeHoverStateTarget } from '../../SharedGUI/HoverState'
// import { TextureLoader } from 'three' // Texture,
import { Switch } from 'antd'
import md5 from 'md5'
import path from 'path'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { EquirectangularReflectionMapping, Object3D, sRGBEncoding } from 'three'

export const handles = [
  //
  { type: 'source', dataType: 'envMap', id: 'envMap', displayName: 'EnvMap' },
]

export const name = 'EnvironmentMap'

export const createData = () => {
  return {
    type: name,
    data: { label: 'envMapPicker', envMapFileURL: '', showEnv: true, showBG: false },
    position: { x: 0, y: 0 },
  }
}

export default function GUI({ id, data, selected }) {
  // const updateNodeData = useFlow((s) => s.updateNodeData)
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
  node.data.glbObject = input
}
export function readSettings({ node }) {
  return node.data.glbObject
}

export const SettingsGUI = ({ data, id }) => {
  let updateNodeData = useFlow((r) => r.updateNodeData)
  return (
    <>
      <div className='nodrag'>
        <button
          className='w-full p-2 my-2 text-black bg-gray-200'
          onClick={() => {
            let input = document.createElement('input')
            input.type = 'file'

            input.onchange = ({
              target: {
                files: [first],
              },
            }) => {
              if (first) {
                let fd = new FormData()
                // fd.set('file', first)
                fd.set('fileName', `file-${md5(first.name + first.type)}${path.extname(first.name)}`)
                fd.set('mimetype', first.type + '')
                fd.set('size', first.size)

                fetch(`/api/test-upload-glb`, {
                  method: 'POST',
                  body: fd,
                })
                  .then((r) => r.json())
                  .then(async (r) => {
                    const { url, fields, downloadURL } = r
                    const formData = new FormData()

                    Object.entries({ ...fields, file: first }).forEach(([key, value]) => {
                      formData.append(key, value)
                    })

                    const upload = await fetch(url, {
                      method: 'POST',
                      body: formData,
                    })

                    if (upload.ok) {
                      console.log('Uploaded successfully!')
                      updateNodeData(id, 'envMapFileURL', downloadURL)
                    } else {
                      console.error('Upload failed.')
                    }
                  })
              }
            }
            input.click()

            // //
            // let input = document.createElement('input')
            // input.type = 'file'

            // input.onchange = ({
            //   target: {
            //     files: [first],
            //   },
            // }) => {
            //   if (first) {
            //     let fd = new FormData()
            //     // fd.set('file', first)
            //     fd.set('fileName', `file-${md5(first.name + first.type)}${path.extname(first.name)}`)
            //     fd.set('contentType', first.type + '')

            //     fetch(`/api/test-upload-glb`, {
            //       method: 'POST',
            //       body: fd,
            //     })
            //       .then((r) => r.json())
            //       .then(async (r) => {
            //         //
            //         // console.log(r)

            //         updateNodeData(id, 'envMapFileURL', r)

            //         // if (defaultItem !== '' || defaultItem !== null) {
            //         // }
            //       })
            //   }
            // }
            // input.click()
          }}>
          Select File
        </button>
      </div>

      <div className='flex items-center mb-3'>
        Background
        <Switch
          className='ml-3 bg-gray-200'
          defaultChecked={data.showBG || false}
          onChange={(ev) => {
            updateNodeData(id, 'showBG', ev)
          }}></Switch>
      </div>

      <div className='flex items-center mb-3'>
        Environment
        <Switch
          className='ml-3 bg-gray-200'
          defaultChecked={data.showEnv || false}
          onChange={(ev) => {
            updateNodeData(id, 'showEnv', ev)
          }}></Switch>
      </div>

      <div>
        {(data.envMapFileURL && (
          <>
            <button
              className='p-3 bg-gray-300'
              onClick={() => {
                //

                fetch(`/api/test-upload`, {
                  method: 'POST',
                  body: JSON.stringify({
                    method: 'delete',
                    url: data.envMapFileURL,
                  }),
                })
                  .then((r) => {
                    return r.json()
                  })
                  .then(
                    () => {
                      updateNodeData(id, 'envMapFileURL', false)
                      window.dispatchEvent(new CustomEvent('needsUpdate'))
                    },
                    () => {
                      updateNodeData(id, 'envMapFileURL', false)
                      window.dispatchEvent(new CustomEvent('needsUpdate'))
                    },
                  )
              }}>
              Remove
            </button>
          </>
        )) ||
          ''}
      </div>
      {/*  */}
    </>
  )
}

let promiseCache = new Map()
let asyncGetGLB = (url, load) => {
  if (promiseCache.has(url)) {
    return promiseCache.get(url)
  } else {
    promiseCache.set(
      url,
      new Promise(async (resolve) => {
        resolve(
          await load(url).then((v) => {
            v.mapping = EquirectangularReflectionMapping
            return v
          }),
        )
      }),
    )

    return promiseCache.get(url)
  }
}

// training and tooling //

export const run = async ({ setCompos, core, globals, getNode, send, on }) => {
  let envMap = false

  let load = (url) => {
    let loader = new RGBELoader()

    return loader.loadAsync(url)
  }
  let cancel = () => {
    core.now.scene.background = null
    core.now.scene.environment = null
    envMap = null
    send('envMap', null)
  }

  core.onReady(() => {
    let last = ''
    let tt = setInterval(() => {
      let node = getNode()
      let now = JSON.stringify(node.data)
      if (last !== now) {
        last = now

        // envMap
        if (node?.data?.envMapFileURL) {
          asyncGetGLB(node?.data?.envMapFileURL, load).then((v) => {
            if (getNode().data.showBG) {
              core.now.scene.background = v
            } else {
              core.now.scene.background = null
            }
            if (getNode().data.showEnv) {
              core.now.scene.environment = v
            } else {
              core.now.scene.environment = null
            }

            envMap = v
            send('envMap', v)
            // setCompos(<primitive object={v.scene}></primitive>)
          })
          // new TextureLoader().loadAsync(node?.data?.envMapFileURL).then((v) => {
          //   v.flipY = getNode().data.flipY || false
          //   v.needsUpdate = true
          //   send('glbObject', v)
          // })
        } else {
          cancel()
          //
          // send(
          //   'glbObject',
          //   new TextureLoader().load(
          //     `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=`,
          //   ),
          // )
        }
      }
    })

    window.addEventListener('needsUpdate', () => {
      let node = getNode()
      if (node?.data?.envMapFileURL) {
        asyncGetGLB(node?.data?.envMapFileURL, load)

        // new TextureLoader().loadAsync(node?.data?.envMapFileURL).then((v) => {
        //   v.flipY = getNode().data.flipY || false
        //   v.needsUpdate = true
        //   send('glbObject', v)
        // })
      } else {
        cancel()
        // send(
        //   'glbObject',
        //   new TextureLoader().load(
        //     `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=`,
        //   ),
        // )
      }
    })

    globals.onClean(() => {
      clearInterval(tt)
    })
  })
}
