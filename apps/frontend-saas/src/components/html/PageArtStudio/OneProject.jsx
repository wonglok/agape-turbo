import { ArtProject } from '@/backend/aws-art-project'
import nProgress from 'nprogress'
import { useEffect, useRef } from 'react'

export function OneProject({ data }) {
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
    <div className='inline-block mb-5 mr-5 shadow-xl w-72 card bg-base-100'>
      <figure className='h-52'>
        <img src='/img/user-image/yo/punk.jpg' alt='Shoes' />
      </figure>
      <div className='p-4'>
        <h2 className='card-title'>
          <textarea
            defaultValue={data.name}
            className='w-full p-2 mb-3 resize-none textarea textarea-bordered'
            rows={1}
            onChange={(ev) => {
              nProgress.start()
              clearTimeout(timerName.current)
              timerName.current = setTimeout(() => {
                let found = ArtProject.state.items.find((e) => e.oid === data.oid)
                found.name = found.name || ''
                found.description = found.description || ''

                found.name = ev.target.value
                ArtProject.update({ object: JSON.parse(JSON.stringify(found)), updateState: false })
                  .catch((r) => {
                    console.error(r)
                  })
                  .finally(() => {
                    nProgress.done()
                  })
              }, 500)
              // timerName.current
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
              clearTimeout(timerName.current)
              timerName.current = setTimeout(() => {
                let found = ArtProject.state.items.find((e) => e.oid === data.oid)
                found.name = found.name || ''
                found.description = found.description || ''

                found.description = ev.target.value
                ArtProject.update({ object: JSON.parse(JSON.stringify(found)), updateState: false })
                  .catch((r) => {
                    console.error(r)
                  })
                  .finally(() => {
                    nProgress.done()
                  })
              }, 500)
              // timerName.current
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
        {/*  */}
        <div className='justify-end card-actions'>
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
                    ArtProject.remove({ oid: data.oid })
                      .then(() => {
                        return ArtProject.listAll({}).then((response) => {
                          ArtProject.state.items = response.result
                        })
                      })
                      .catch((r) => {
                        console.error(r)
                      })
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

          <button className='text-xs btn btn-primary'>Edit</button>
        </div>
      </div>
    </div>
  )
}

//
