import { proxy, useSnapshot } from 'valtio'

export const CEState = proxy({
  tabAt: 'shaders',
})

let noop = () => {}
export const useCEStore = () => {
  let snap = useSnapshot(CEState)
  noop(snap)
  return CEState
}
