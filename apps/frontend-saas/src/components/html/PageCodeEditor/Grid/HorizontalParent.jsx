export function HorizontalParent({ children }) {
  return (
    <div className='flex flex-row' style={{ width: '100%', height: '100%' }}>
      {children}
    </div>
  )
}
