import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'

export let useCore = (name = 'core') => {
  let core = useMemo(() => {
    let api = {
      loops: [],
      cleans: [],
      readys: [],
      preloads: [],
      now: {},
      onLoop: (v) => {
        api.loops.push(v)
      },
      work: (st, dt) => {
        api.loops.forEach((it) => it(st, dt))
      },
      clean: () => {
        api.cleans.forEach((t) => t())
        api.cleans = []
        api.loops = []
      },
      onClean: (cl) => {
        api.cleans.push(cl)
      },
      onReady: (cl) => {
        api.readys.push(cl)
      },
      onPreload: (cl) => {
        api.preloads.push(cl)
      },
    }
    return api
  }, [])

  let scene = useThree((s) => s.scene)
  let camera = useThree((s) => s.camera)
  let controls = useThree((s) => s.controls)
  core.now.scene = scene
  core.now.camera = camera
  core.now.controls = controls

  useFrame((st, dt) => {
    for (let kn in st) {
      core.now[kn] = st[kn]
    }
    core.work(st, dt)
  })

  useEffect(() => {
    return () => {
      core.clean()
    }
  }, [core])

  return core
}
