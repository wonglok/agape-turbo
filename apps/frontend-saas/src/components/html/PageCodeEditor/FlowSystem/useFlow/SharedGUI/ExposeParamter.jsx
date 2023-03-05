import { Input, Switch, Tooltip } from 'antd'
import { useFlow } from '../useFlow'

export function ExposeParamter({ id, data }) {
  let updateNodeData = useFlow((r) => r.updateNodeData)
  return (
    <div className='text-xs'>
      <div className=''>
        <Tooltip
          placement='right'
          title={
            <div className='p-3 text-xs text-black bg-white rounded'>
              <div className='flex items-center'>
                <div>Expose as Parameter</div>
                <div className=''>
                  <Switch
                    className='p-1 ml-2 bg-gray-200'
                    defaultChecked={data.isExposed}
                    onChange={(val) => {
                      //
                      updateNodeData(id, 'isExposed', val)
                    }}
                  />
                </div>
              </div>

              {data.isExposed && (
                <div className='flex items-center'>
                  <div>Enable Group</div>
                  <div className=''>
                    <Switch
                      className='p-1 ml-2 bg-gray-200'
                      defaultChecked={data.isGroupedForExpose}
                      onChange={(val) => {
                        //
                        updateNodeData(id, 'isGroupedForExpose', val)
                      }}
                    />
                  </div>
                </div>
              )}

              {/*  */}
              {/*  */}

              {data.isExposed && data.isGroupedForExpose && (
                <div className=''>
                  <div>Group Name</div>
                  <div className=''>
                    <Input
                      className='px-3 bg-gray-100'
                      type='text'
                      defaultValue={data.groupName}
                      onChange={(ev) => {
                        let val = ev.target.value
                        updateNodeData(id, 'groupName', val)
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          }>
          <div className={`px-2 py-1 ml-1 mr-3 rounded-xl ${data.isExposed ? 'bg-cyan-700' : 'bg-gray-100'}`}>
            {data.isExposed ? (
              <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg' fillRule='evenodd' clipRule='evenodd'>
                <path
                  fill='cyan'
                  d='M2.978 8.358l-2.978-2.618 8.707-4.74 3.341 2.345 3.21-2.345 8.742 4.639-3.014 2.68.014.008 3 4.115-3 1.634v4.122l-9 4.802-9-4.802v-4.115l1 .544v2.971l7.501 4.002v-7.889l-2.501 3.634-9-4.893 2.978-4.094zm9.523 5.366v7.875l7.499-4.001v-2.977l-5 2.724-2.499-3.621zm-11.022-1.606l7.208 3.918 1.847-2.684-7.231-3.742-1.824 2.508zm11.989 1.247l1.844 2.671 7.208-3.927-1.822-2.498-7.23 3.754zm-9.477-4.525l8.01-4.43 7.999 4.437-7.971 4.153-8.038-4.16zm-2.256-2.906l2.106 1.851 7.16-3.953-2.361-1.657-6.905 3.759zm11.273-2.052l7.076 3.901 2.176-1.935-6.918-3.671-2.334 1.705z'
                />
              </svg>
            ) : (
              <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg' fillRule='evenodd' clipRule='evenodd'>
                <path d='M23 6.066v12.065l-11.001 5.869-11-5.869v-12.131l11-6 11.001 6.066zm-21.001 11.465l9.5 5.069v-10.57l-9.5-4.946v10.447zm20.001-10.388l-9.501 4.889v10.568l9.501-5.069v-10.388zm-5.52 1.716l-9.534-4.964-4.349 2.373 9.404 4.896 4.479-2.305zm-8.476-5.541l9.565 4.98 3.832-1.972-9.405-5.185-3.992 2.177z' />
              </svg>
            )}
          </div>
        </Tooltip>
      </div>
    </div>
  )
}
