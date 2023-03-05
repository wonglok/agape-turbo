import { Triangle } from '@/pages/_app'
import { LoginPage } from './LoginPage'
import { AWSData } from './aws'
import { useSnapshot } from 'valtio'

export function Gate({ children }) {
  let aws = useSnapshot(AWSData)

  if (aws.canShow) {
    return aws.userIDFromServer ? children : <LoginPage />
  } else {
    return <Triangle></Triangle>
  }
}
