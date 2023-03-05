import { useEffect, useMemo, useRef, useState } from 'react'
import { getTemplateByNodeInstance, nodeTypeList } from '../../../useFlow/nodeTypes'
import { useCore } from '../useCore/useCore'
import { useThree } from '@react-three/fiber'

export function RunNode({ globals, emit = () => {}, scope, nodes, node, edges }) {
  let nodeTemplate = useMemo(() => {
    return nodeTypeList.find((r) => r.type === node.type)
  }, [node.type])

  let core = useCore(`${node.type}`)

  let { on, send } = useMemo(() => {
    let on = (name, fnc) => {
      edges
        .filter((edge) => {
          return edge.target === node.id && edge.targetHandle === name
        })
        .map((edge) => {
          let hh = (ev) => {
            if (
              edges.some((edge) => {
                return edge.target === node.id && edge.targetHandle === name
              })
            ) {
              fnc(ev.detail)
            }
          }
          window.addEventListener(edge.id, hh)
          core.onClean(() => {
            window.removeEventListener(edge.id, hh)
          })
        })
    }

    let send = (name, data) => {
      edges
        .filter((edge) => {
          return edge.source === node.id && edge.sourceHandle === name
        })
        .map((edge) => {
          if (
            edges.some((edge) => {
              return edge.source === node.id && edge.sourceHandle === name
            })
          ) {
            window.dispatchEvent(new CustomEvent(`${edge.id}`, { detail: data }))
          }
        })
    }

    return {
      send,
      on,
    }
  }, [node.id, edges, core])

  let api = useRef({ on, send })
  api.current.on = on
  api.current.send = send

  // let get = useThree((s) => s.get)

  let nodesRef = useRef(nodes)
  useEffect(() => {
    nodesRef.current = nodes
  }, [nodes])

  let edgesRef = useRef(edges)
  useEffect(() => {
    edgesRef.current = edges
  }, [edges])

  let [compos, setCompos] = useState(null)
  useEffect(() => {
    let run = nodeTemplate?.run
    if (run) {
      run({
        core: core,
        globals,
        scope,
        setCompos,
        emit,
        // share: (id, v) => {
        //   globals[id] = v
        // },
        // give: (id) => {
        //   return globals[id]
        // },
        getNodes() {
          return nodesRef.current
        },
        getEdges() {
          return edgesRef.current
        },
        getNode() {
          return nodesRef.current.find((n) => n.id === node.id)
        },
        on: (name, fnc) => {
          api.current.on(name, fnc)
        },
        send: (name, data) => {
          api.current.send(name, data)
        },
      })

      console.log('Prep::', node.type)
      Promise.all(core.preloads.map((r) => r()))
        .then(() => {
          console.log('Run::', node.type)
          return Promise.all(core.readys.map((r) => r()))
        })
        .finally(() => {
          console.log('Done::', node.type)
        })
    }
  }, [nodeTemplate?.run])

  return (
    <>
      {/*  */}

      {compos}

      {/*  */}
    </>
  )
}
