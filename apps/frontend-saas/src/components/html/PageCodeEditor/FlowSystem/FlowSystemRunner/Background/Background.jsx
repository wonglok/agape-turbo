import { useThree } from '@react-three/fiber'
import { Color } from 'three'

export function Background() {
  let scene = useThree((s) => s.scene)

  scene.background = new Color('#000000')
  return null
}
