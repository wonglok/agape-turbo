// import { useFlow } from './useFlow'

export const nodeTypes = {}
export const nodeTypeList = []
function importAll(r) {
  r.keys().forEach((key) => {
    let moduleObject = r(key)
    let nodeName = moduleObject.name

    nodeTypes[nodeName] = moduleObject.default

    if (!nodeTypeList.some((r) => r.name === moduleObject.name)) {
      nodeTypeList.push({
        ...moduleObject,
        get handles() {
          return moduleObject.handles
        },
        type: moduleObject.name,
        gui: moduleObject.default,
      })
    }

    // console.log(nodeTypeList)
  })
}

export let checkSupportDataTypes = (template, arr = []) => {
  return arr.some((dataType) => {
    return (template?.handles || []).some((h) => h.dataType === dataType || h.dataType === 'any' || dataType === 'any')
  })
}

export let getTemplateByNodeInstance = (node) => {
  return nodeTypeList.find((t) => t.type === node?.type)
}

// get handles from template refvractor
export let getDataTypesFromTemplate = ({ template }) => {
  if (template?.handles && template?.handles.length === 0) {
    let dataTypeList = nodeTypeList.reduce((acc, item, key) => {
      item.handles.forEach((h) => {
        //
        if (!acc.includes(h.dataType)) {
          acc.push(h.dataType)
        }
      })

      return acc
    }, [])

    return dataTypeList
    // return (template.provideHandle({ nodes: node.data.nodes || [] })?.all || []).map((r) => r.dataType)
  }
  return (template?.handles || []).map((r) => r.dataType)
}

let filterConnectionSockets = (it, hand) => {
  let handTemplate = getTemplateByNodeInstance(hand.node)

  return it.handles
    .filter((h) => {
      if (hand.handleType === 'target') {
        return h.type === 'source'
      } else {
        return h.type === 'target'
      }
    })
    .filter((h) => {
      if (handTemplate.handles.length === 0) {
        return true
      }

      let handeHand = handTemplate?.handles?.find((r) => r?.id === hand?.handleId)

      if (h.dataType === 'any' || handeHand?.dataType === 'any') {
        return true
      }

      return h.dataType === handeHand?.dataType
    })
}

export let getCreateItems = ({ nodes, hand }) => {
  //
  let handTemplate = getTemplateByNodeInstance(hand.node)

  let dataTypes = getDataTypesFromTemplate({ template: handTemplate, node: hand.node })

  let templates = nodeTypeList.filter((template) => {
    return checkSupportDataTypes(template, dataTypes)
  })

  return templates
    .filter((template) => {
      return filterConnectionSockets(template, hand).length > 0
    })
    .map((it) => {
      return {
        label: it.name,
        value: it.name,
        children: filterConnectionSockets(it, hand).map((t) => {
          return {
            label: `${t.displayName} ${t.type}`,
            value: t.id,
          }
        }),
      }
    })
}

let getConnectItems = ({ nodes, hand }) => {
  let handTemplate = getTemplateByNodeInstance(hand.node)

  let dataTypes = getDataTypesFromTemplate({ template: handTemplate, node: hand.node })

  let templates = nodeTypeList.filter((template) => {
    return checkSupportDataTypes(template, dataTypes)
  })

  let arr = []

  let okTypes = templates.filter((it) => {
    return filterConnectionSockets(it, hand).length > 0
  })

  nodes
    .filter((r) => r.id !== hand.nodeId)
    .forEach((nd) => {
      if (okTypes.some((t) => t.name === nd.type)) {
        let handHandleType = hand?.handleType

        let template = getTemplateByNodeInstance(nd)

        let labelChildren = template?.handles
          .filter((r) => {
            if (handHandleType === 'target') {
              return r.type === 'source'
            } else {
              return r.type === 'target'
            }
          })

          .map((hh) => {
            return {
              label: `${hh.displayName} ${hh.type}`,
              value: hh.id,
            }
          })

        arr.push({
          label: `${nd.type} - ${nd?.data?.label || ''}`,
          value: nd.id,

          children: labelChildren,
        })
      }
    })

  return arr
}

function getAddOnlyItem({ nodes }) {
  return nodeTypeList.map((it) => {
    let hh = it.handles
    if (hh.length === 0) {
      // let node = nodes.find((r) => r.name === it.type)
      hh = it.provideHandle({ nodes: nodes }).all
    }

    return {
      label: it.name,
      value: it.name,
      children: hh.map((t) => {
        return {
          label: `${t.displayName} ${t.type}`,
          value: t.id,
        }
      }),
    }
  })
}
export const getOptions = ({ nodes, hand, toolAddOnlyMode }) => {
  if (toolAddOnlyMode) {
    return [
      {
        label: 'Create',
        value: 'create',
        children: getAddOnlyItem({ nodes }),
      },
    ]
  }
  return [
    {
      label: 'Create',
      value: 'create',
      children: getCreateItems({ nodes, hand }),
    },
    //
    {
      label: 'Connect',
      value: 'connect',
      children: getConnectItems({ nodes, hand }),
    },
  ]
}

importAll(require.context('./Nodes', true, /\.(jsx)$/, 'sync'))

//
