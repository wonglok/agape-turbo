import { useEffect, useMemo } from 'react'

export function RunEdge({ globals, edge }) {
  useEffect(() => {
    // let bc = new BroadcastChannel(`${edge.source}${edge.sourceHandle}${edge.target}${edge.targetHandle}`)
    // bc.onmessage = (ev) => {
    //   console.log(ev.data)
    // }
    // bc.postMessage({ edge: edge })
    return () => {
      // bc.close()
    }
  }, [edge])

  return <></>
}
