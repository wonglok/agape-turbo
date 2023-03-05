import { AppVersion } from '@/backend/aws-app-version'
import nProgress from 'nprogress'
import { useEffect, useRef } from 'react'

export function CreateAppVersion({ app }) {
  let nameRef = useRef()

  return (
    <div className='flex items-center justify-start w-full my-3'>
      <div className='form-control'>
        {/* <label className='label'>
          <span className='label-text'>Create New Version</span>
        </label> */}
        <label className='input-group'>
          <span className='bg-white border border-r-0 border-gray-400'>Version Name</span>
          <input
            ref={nameRef}
            type='text'
            placeholder='My New App Version'
            className='border-gray-400 input input-bordered'
          />
          <span
            className='text-white bg-blue-500 cursor-pointer'
            onClick={async () => {
              nProgress.start()

              await AppVersion.create({
                object: {
                  //
                  appID: app.oid,
                  name: nameRef.current.value,
                },
              })

              //

              AppVersion.listAll({})
                .then((response) => {
                  AppVersion.state.items = response.result
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
