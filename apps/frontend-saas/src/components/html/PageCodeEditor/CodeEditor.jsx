import { useSnapshot } from 'valtio'
import { useCEStore } from './CodeEditorState'
import { CodeEditorLayout } from './Layout/CodeEditorLayout/CodeEditorLayout'
import { ShaderEditorLayout } from './Layout/ShaderEditorLayout/ShaderEditorLayout'
import { ModuleStoreLayout } from './Layout/ModuleStoreLayout/ModuleStoreLayout'
import { TestLayout } from './Layout/TestLayout/TestLayout'

function AppIcon({
  title,
  icon = (
    <svg width='24' height='24' fillRule='evenodd' clipRule='evenodd'>
      <path d='M16 3.383l-.924-.383-7.297 17.617.924.383 7.297-17.617zm.287 3.617l6.153 4.825-6.173 5.175.678.737 7.055-5.912-7.048-5.578-.665.753zm-8.478 0l-6.249 4.825 6.003 5.175-.679.737-6.884-5.912 7.144-5.578.665.753z' />
    </svg>
  ),
  name = 'code',
}) {
  let st = useCEStore()

  //
  return (
    <div
      style={{ minWidth: '55px' }}
      className={
        'inline-flex flex-col items-center justify-center pt-2 pb-1 px-2 mr-1 transition-all duration-500 ' +
        (st.tabAt === name
          ? ' bg-white border border-gray-300 rounded-lg shadow-inner'
          : ' rounded-lg border border-transparent')
      }
      onClick={() => {
        st.tabAt = name
      }}>
      {icon}
      <div className='text-xs select-none'>{title}</div>

      <div className=''>
        {st.tabAt === name ? (
          <div
            style={{
              marginTop: '2px',
              width: `16px`,
              height: `1px`,
              borderRadius: `3px`,
              backgroundColor: 'lime',
              boxShadow: `0px 0px 5px 0px cyan`,
            }}></div>
        ) : (
          <div
            style={{
              marginTop: '2px',
              width: `16px`,
              height: `1px`,
            }}></div>
        )}
      </div>
    </div>
  )
}

export function CodeEditor() {
  let { tabAt } = useCEStore()

  //
  return (
    <div className='w-full h-full'>
      <div className='flex items-center px-3 from-gray-300 bg-gradient-to-t' style={{ height: `4.5rem` }}>
        {/*  */}
        <AppIcon name='codePage' title={'Code'}></AppIcon>
        {/*  */}
        <AppIcon
          name='modulePage'
          title={'Packs'}
          icon={
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
              <path d='M18.417 6.75v-.947c-.124-1.511-4.042-1.52-4.148-.001h-.013v.948c-.034 1.598 4.214 1.601 4.161 0zm-2.067-1.366c.723 0 1.311.253 1.311.564s-.588.564-1.311.564c-.724 0-1.311-.253-1.311-.564s.587-.564 1.311-.564zm-2.286 3.771v-.947c-.123-1.511-4.042-1.52-4.148-.001h-.013v.948c-.034 1.598 4.213 1.601 4.161 0zm-2.068-.238c-.723 0-1.311-.253-1.311-.564 0-.312.588-.564 1.311-.564.724 0 1.311.253 1.311.564 0 .312-.587.564-1.311.564zm2.068-4.446v-.946c-.124-1.512-4.042-1.52-4.148-.001h-.013v.947c-.034 1.598 4.214 1.602 4.161 0zm-2.067-1.366c.723 0 1.311.253 1.311.564s-.588.564-1.311.564c-.724 0-1.311-.253-1.311-.564s.587-.564 1.311-.564zm.003-3.105l-11 6 .009.019-.009-.005v12.118l11 5.868 11-5.869v-12.055l-11-6.076zm-.003 1.141l9.917 5.458-9.896 5.385-9.903-5.448 9.882-5.395zm9.003 11.63l-8 4.268v-3.039l8-4.353v3.124zm-10 4.268l-8-4.268v-3.172l8 4.401v3.039zm-8-3.228l8 4.268v2.921l-8-4.268v-2.921zm10 4.268l8-4.268v2.921l-8 4.268v-2.921zm-7.447-12.277h-.013v.948c-.034 1.598 4.213 1.601 4.161 0v-.947c-.123-1.511-4.042-1.519-4.148-.001zm2.08.71c-.723 0-1.311-.253-1.311-.564s.588-.565 1.311-.565c.724 0 1.311.253 1.311.564s-.588.565-1.311.565z' />
            </svg>
          }></AppIcon>
        <AppIcon
          name='shaders'
          title={'Shaders'}
          icon={
            <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg' fillRule='evenodd' clipRule='evenodd'>
              <path d='M13 9h9l-14 15 3-9h-9l14-15-3 9zm-8.699 5h8.086l-1.987 5.963 9.299-9.963h-8.086l1.987-5.963-9.299 9.963z' />
            </svg>
          }></AppIcon>
        <AppIcon
          name='test'
          title={'Test'}
          icon={
            <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg' fillRule='evenodd' clipRule='evenodd'>
              <path d='M13 9h9l-14 15 3-9h-9l14-15-3 9zm-8.699 5h8.086l-1.987 5.963 9.299-9.963h-8.086l1.987-5.963-9.299 9.963z' />
            </svg>
          }></AppIcon>
      </div>
      <div className='bg-gray-200' style={{ height: `calc(100% - 4.5rem)` }}>
        {tabAt === 'codePage' && <CodeEditorLayout></CodeEditorLayout>}
        {tabAt === 'modulePage' && <ModuleStoreLayout></ModuleStoreLayout>}
        {tabAt === 'shaders' && <ShaderEditorLayout></ShaderEditorLayout>}
        {tabAt === 'test' && <TestLayout></TestLayout>}
      </div>
    </div>
  )
}

//
