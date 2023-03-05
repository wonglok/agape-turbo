export function HorizontalChildren({ className, width = '100px', children }) {
  return (
    <div className={className} style={{ width: width }}>
      {children}
    </div>
  )
}
