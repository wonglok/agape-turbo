import { AppProject } from '@/backend/aws-app-project'
import nProgress from 'nprogress'
import { useEffect, useRef } from 'react'

export function CreateAppProject() {
  let nameRef = useRef()

  return (
    <div className='mb-3'>
      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>Create your new project</span>
        </label>
        <label className='input-group'>
          <span className='bg-white border border-r-0 border-gray-400'>App Name</span>
          <input
            ref={nameRef}
            type='text'
            placeholder='My New App Project'
            className='border-gray-400 input input-bordered'
          />
          <span
            className='text-white bg-blue-500 cursor-pointer'
            onClick={async () => {
              //
              nProgress.start()
              await AppProject.create({
                object: {
                  //
                  name: nameRef.current.value,
                },
              })

              AppProject.listAll({})
                .then((response) => {
                  AppProject.state.items = response.result
                })
                .catch((r) => {
                  console.error(r)
                })
                .finally(() => {
                  nProgress.done()
                })
            }}>
            Create
          </span>
        </label>
      </div>
    </div>
  )
}
