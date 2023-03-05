import { loginMetamask, loginWithPW } from './aws'

export function LoginPage() {
  return (
    <>
      <div></div>
      <div className='flex items-center justify-center w-full h-full'>
        <div className=''>
          <div className='my-3'>
            <input
              id='userID'
              type='text'
              placeholder='userID'
              className='block w-full p-2 px-2 mb-3 text-black bg-gray-200 text-blakc rounded-xl'
            />
            <input
              id='password'
              type='password'
              placeholder='password'
              className='block w-full p-2 px-2 mb-3 text-black bg-gray-200 text-blakc rounded-xl'
            />
            <button
              className='block w-full p-2 px-12 text-white bg-blue-500 rounded-xl'
              onClick={() => {
                let userID = document.querySelector('#userID')
                let password = document.querySelector('#password')
                loginWithPW({ userID: userID.value, password: password.value })
              }}>
              Login with Password
            </button>
          </div>
          <div className='my-3 text-center'>- or -</div>
          <button
            className='p-2 px-12 text-white bg-yellow-500 rounded-xl'
            onClick={() => {
              loginMetamask()
            }}>
            Login with Metamask
          </button>
        </div>
      </div>
    </>
  )
}
