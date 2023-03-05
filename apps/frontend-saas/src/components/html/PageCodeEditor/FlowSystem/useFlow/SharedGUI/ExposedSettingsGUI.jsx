import { useMemo } from 'react'
import { getTemplateByNodeInstance } from '../nodeTypes'
import { useFlow } from '../useFlow'

export function ExposedSettingsGUI() {
  let nodes = useFlow((s) => s.nodes)

  let groupNames = useMemo(() => {
    return nodes.reduce((acc, item, key) => {
      if (
        item &&
        item.data &&
        item.data.isGroupedForExpose &&
        item.data.isExposed &&
        item.data.groupName &&
        !acc.includes(item.data.groupName)
      ) {
        acc.push(item.data.groupName)
      }
      return acc
    }, [])
  }, [nodes])

  let onRender = (n) => {
    let tmpl = getTemplateByNodeInstance(n)

    tmpl.SettingsGUI = tmpl.SettingsGUI || (() => {})

    return (
      <div key={n.id} className='pb-5 mb-5 border-b-2'>
        <div className='px-3 text-sm'>{n?.data?.label}</div>
        <div className='px-3 text-sm'>
          {tmpl?.SettingsGUI && <tmpl.SettingsGUI isSettings={true} data={n.data} id={n.id}></tmpl.SettingsGUI>}
        </div>
      </div>
    )
  }

  return (
    <div className='py-5'>
      {groupNames.map((name, i) => {
        return (
          <div key={name + i}>
            <div className='px-4 mb-3 text-center underline'>{name}</div>
            {nodes
              .filter((r) => name === r.data.groupName)
              .filter((r) => r.data.isExposed)
              .map(onRender)}
          </div>
        )
      })}

      {nodes.filter((r) => !groupNames.some((n) => n === r.data.groupName)).filter((r) => r.data.isExposed).length >
        0 && <div className='px-4 text-center underline'>No Group</div>}
      {nodes
        .filter((r) => !groupNames.some((n) => n === r.data.groupName))
        .filter((r) => r.data.isExposed)
        .map(onRender)}
    </div>
  )
}
