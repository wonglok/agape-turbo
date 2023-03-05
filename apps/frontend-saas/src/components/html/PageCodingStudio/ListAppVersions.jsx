import { AppVersion } from '@/backend/aws-app-version'
import nProgress from 'nprogress'
import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { OneAppVersion } from './OneAppVersion'

export function ListAppVersions({ app }) {
  let version = useSnapshot(AppVersion.state)

  useEffect(() => {
    //
    nProgress.start()
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
  }, [])

  return (
    <div className=''>
      {version.items
        .filter((v) => v.appID === app.oid)
        .map((it) => {
          return (
            <div className='block mr-5' key={it.oid}>
              <OneAppVersion app={app} version={it}></OneAppVersion>
            </div>
          )
        })}
    </div>
  )
}
