import { AppVersion } from '@/backend/aws-app-version'
import { useRouter } from 'next/router'
import nProgress from 'nprogress'
import { useEffect, useRef } from 'react'

export function OneAppVersion({ app, version }) {
  let data = version
  let router = useRouter()
  let timerName = useRef(0)

  useEffect(() => {
    let h = (ev) => {
      let dom = document.querySelector('#' + 'my-modal-remove-item' + data.oid)
      if (ev.key === 'Escape') {
        if (dom) {
          dom.checked = false
        }
      }
    }
    window.addEventListener('keydown', h)
    return () => {
      window.removeEventListener('keydown', h)
    }
  })
  return (
    <div className='w-full mb-5 mr-5 border border-gray-500 shadow-xl rounded-box bg-base-100'>
      <div className='flex justify-between w-full px-4 pt-4'>
        <h2 className='w-1/2'>
          <textarea
            defaultValue={data.name}
            className='w-full p-2 mb-3 resize-none textarea textarea-bordered'
            rows={1}
            onChange={(ev) => {
              nProgress.start()
              clearTimeout(timerName.current)
              timerName.current = setTimeout(() => {
                let found = AppVersion.state.items.find((e) => e.oid === data.oid)
                found.name = found.name || ''
                found.description = found.description || ''

                found.name = ev.target.value

                //
                AppVersion.update({ object: JSON.parse(JSON.stringify(found)), updateState: false })
                  .catch((r) => {
                    console.error(r)
                  })
                  .finally(() => {
                    nProgress.done()
                  })
                //
              }, 500)
              // timerName.current
            }}
            placeholder='Project Name'></textarea>
        </h2>

        {/* <div>
          <div className='w-full form-control'>
            <label className='cursor-pointer label'>
              <span className='label-text'>Safety Lock</span>
              <input type='checkbox' className='toggle toggle-accent' />
            </label>
          </div>
        </div> */}

        <div className='ml-3 card-actions'>
          <label htmlFor={'my-modal-remove-item' + data.oid} className='btn btn-error'>
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
                    AppVersion.remove({ oid: data.oid })
                      .then(() => {
                        return AppVersion.listAll({}).then((response) => {
                          AppVersion.state.items = response.result
                        })
                      })
                      .catch((r) => console.log(r))
                      .finally(() => {
                        ev.target.classList.toggle('loading')
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
              //
              //

              router.push(`/admin/app/${version.oid}/editor`)
            }}>
            Edit
          </button>
        </div>
      </div>

      <div className='px-4'>
        <textarea
          defaultValue={data.description}
          className='w-full p-2 mb-3 resize-none textarea textarea-bordered'
          rows={3}
          onChange={(ev) => {
            nProgress.start()
            clearTimeout(timerName.current)
            timerName.current = setTimeout(() => {
              let found = AppVersion.state.items.find((e) => e.oid === data.oid)
              found.name = found.name || ''
              found.description = found.description || ''

              found.description = ev.target.value
              AppVersion.update({ object: JSON.parse(JSON.stringify(found)), updateState: false }).finally(() => {
                nProgress.done()
              })
            }, 500)
            // timerName.current
          }}
          placeholder='description'></textarea>
      </div>
    </div>
  )
}

//
//
