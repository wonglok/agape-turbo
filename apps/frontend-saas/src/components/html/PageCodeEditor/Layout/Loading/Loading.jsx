export function Loading({ ready }) {
  return (
    <div
      className='absolute top-0 left-0 flex items-center justify-center w-full h-full bg-white bg-opacity-40 backdrop:blur-xl'
      style={{ display: `${!ready ? 'flex' : 'none'}` }}>
      Loading...
    </div>
  )
}
