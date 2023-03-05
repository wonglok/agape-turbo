import { ArtProject } from '@/backend/aws-art-project'
import nProgress from 'nprogress'
import { useRef } from 'react'

export function CreateProject() {
  let nameRef = useRef()
  return (
    <div className='mb-3'>
      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>Create your new project</span>
        </label>
        <label className='input-group'>
          <span className='bg-white border border-r-0 border-gray-400'>Project Name</span>
          <input
            ref={nameRef}
            type='text'
            placeholder='My New Art Project'
            className='border-gray-400 input input-bordered'
          />
          <span
            className='text-white bg-blue-500 cursor-pointer'
            onClick={async () => {
              //
              nProgress.start()
              await ArtProject.create({
                object: {
                  //
                  name: nameRef.current.value,
                },
              })

              ArtProject.listAll({})
                .then((response) => {
                  ArtProject.state.items = response.result
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
