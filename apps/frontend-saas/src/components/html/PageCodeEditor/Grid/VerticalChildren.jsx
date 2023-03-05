export function VerticalChildren({ className, height = '100px', children }) {
  return (
    <div className={className} style={{ height: height }}>
      {children}
    </div>
  )
}
