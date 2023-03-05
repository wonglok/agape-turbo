/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { Gate } from '@/backend/Gate'
import { AdminLayout } from '../AdminLayout/AdminLayout'
import { CreateProject } from './CreateProject'
import { OneProject } from './OneProject'
import { useEffect } from 'react'
import { ArtProject } from '@/backend/aws-art-project'
import { useSnapshot } from 'valtio'

export function PageArtStudio() {
  useEffect(() => {
    //!SECTION

    ArtProject.listAll({}).then((response) => {
      ArtProject.state.items = response.result
    })
  }, [])

  let arp = useSnapshot(ArtProject.state)
  return (
    <Gate>
      <AdminLayout>
        <div className='navbar bg-base-200 rounded-box'>
          <a className='text-xl normal-case btn btn-ghost'>My 3D Art Projects</a>
        </div>

        <CreateProject></CreateProject>

        <div className='pt-3'>
          {JSON.parse(JSON.stringify(arp.items))
            .sort((a, b) => {
              if (a.createdAt < b.createdAt) {
                return 1
              }
              if (a.createdAt > b.createdAt) {
                return -1
              }
              return 0
            })
            .map((it) => {
              return <OneProject key={it.oid} data={it}></OneProject>
            })}
        </div>
      </AdminLayout>
    </Gate>
  )
}

//

//

//

//
