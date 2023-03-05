/* eslint-disable @next/next/no-img-element */
import { AppProject } from '@/backend/aws-app-project'
import nProgress from 'nprogress'
import { useEffect, useRef, useState } from 'react'
import { CreateAppVersion } from './CreateAppVersion'
import { ListAppVersions } from './ListAppVersions'

export function OneAppProject({ data }) {
  let timerDebounce = useRef(0)
  let [viewDetail, setViewDetail] = useState(false)
  useEffect(() => {
    let h = (ev) => {
      let dom = document.querySelector('#' + 'my-modal-remove-item' + data.oid)
      if (ev.key === 'Escape') {
        if (dom) {
          dom.checked = false
        }
      }
    }

    //
    //
    window.addEventListener('keydown', h)
    return () => {
      window.removeEventListener('keydown', h)
    }
  })
  return (
    <div className='inline-block mb-8 mr-8 border border-gray-500 shadow-xl rounded-box'>
      <div
        className='inline-flex items-stretch p-4 border-b-0 border-gray-500 rounded-t-xl'
        style={{ height: `16.5rem` }}>
        <figure className='h-full mr-3'>
          <div className='h-full cursor-pointer indicator group'>
            <img src='/img/user-image/yo/punk.jpg' className='rounded-xl' alt='Punk' />
            <span className=' invisible group-hover:visible indicator-item indicator-center indicator-middle translate-y-20 badge badge-accent'>
              Change Image (todo)
            </span>
          </div>
        </figure>
        <div className='h-full w-72'>
          <h2 className=''>
            <textarea
              defaultValue={data.name}
              className='w-full p-2 mb-3 resize-none textarea textarea-bordered'
              rows={1}
              onChange={(ev) => {
                nProgress.start()
                clearTimeout(timerDebounce.current)
                timerDebounce.current = setTimeout(() => {
                  let found = AppProject.state.items.find((e) => e.oid === data.oid)
                  found.name = found.name || ''
                  found.description = found.description || ''

                  found.name = ev.target.value
                  AppProject.update({ object: JSON.parse(JSON.stringify(found)), updateState: false })
                    .catch((r) => {
                      console.error(r)
                    })
                    .finally(() => {
                      nProgress.done()
                    })
                }, 500)
                // timerDebounce.current
              }}
              placeholder='Project Name'></textarea>
          </h2>
          <div>
            <textarea
              defaultValue={data.description}
              className='w-full p-2 mb-3 resize-none textarea textarea-bordered'
              rows={3}
              onChange={(ev) => {
                nProgress.start()
                clearTimeout(timerDebounce.current)
                timerDebounce.current = setTimeout(() => {
                  let found = AppProject.state.items.find((e) => e.oid === data.oid)
                  found.name = found.name || ''
                  found.description = found.description || ''

                  found.description = ev.target.value
                  AppProject.update({ object: JSON.parse(JSON.stringify(found)), updateState: false })
                    .catch((r) => {
                      console.error(r)
                    })
                    .finally(() => {
                      nProgress.done()
                    })
                }, 500)
                // timerDebounce.current
              }}
              placeholder='description'></textarea>
          </div>
          {/* <div>
          <div className='w-full form-control'>
            <label className='cursor-pointer label'>
              <span className='label-text'>Safety Lock</span>
              <input type='checkbox' className='toggle toggle-accent' />
            </label>
          </div>
        </div> */}

          <div className='inline-flex justify-end w-full'>
            <label htmlFor={'my-modal-remove-item' + data.oid} className='mr-2 btn btn-error'>
              Remove
            </label>

            <input type='checkbox' id={'my-modal-remove-item' + data.oid} className='modal-toggle' />
            <div className='modal rounded-box'>
              <div className='modal-box'>
                <h3 className='text-lg font-bold'>
                  Remove Project {`"`}
                  {data.name}
                  {`"`}?
                </h3>
                <div className='modal-action'>
                  <label htmlFor={'my-modal-remove-item' + data.oid} className='text-xs btn btn-neutral'>
                    Cancel
                  </label>
                  <label
                    onClick={(ev) => {
                      nProgress.start()
                      ev.target.classList.toggle('loading')
                      AppProject.remove({ oid: data.oid })
                        .then(() => {
                          return AppProject.listAll({}).then((response) => {
                            AppProject.state.items = response.result
                          })
                        })
                        .then(() => {
                          ev.target.classList.toggle('loading')
                        })
                        .catch((r) => {
                          console.error(r)
                        })
                        .finally(() => {
                          nProgress.done()
                        })
                    }}
                    htmlFor={'my-modal-remove-item' + data.oid}
                    className='text-xs btn btn-error'>
                    Confirm Remove
                  </label>
                </div>
              </div>
            </div>

            <button
              className='text-xs btn btn-primary'
              onClick={() => {
                setViewDetail((s) => !s)
              }}>
              Open
            </button>
          </div>
        </div>
      </div>
      {viewDetail && (
        <div className='px-3  border-t border-gray-500 '>
          <div className=''>
            <CreateAppVersion app={data}></CreateAppVersion>

            <ListAppVersions app={data}></ListAppVersions>
          </div>
        </div>
      )}
    </div>
  )
}

//
