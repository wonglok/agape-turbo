/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { Gate } from '@/backend/Gate'
import { LogoutButton } from '@/backend/LogoutButton'

export function WholePage() {
  return (
    <Gate>
      {/*  */}
      {/*  */}

      <div className='w-full h-full p-5 pb-5  from-green-200 to-cyan-900 bg-gradient-to-t'>
        <div
          style={{ maxWidth: '1920px' }}
          className='w-full h-full mx-auto shadow-lg text-base-content glass rounded-box bg-opacity-60 backdrop-blur-lg'>
          <>
            <div className='px-2 pt-2' style={{ height: '4.5rem' }}>
              <div className='navbar text-primary-content rounded-box space-x-1'>
                <div className='flex-1 ml-3 text-2xl'>
                  {/* <div className='' style={{ width: `18rem` }}></div> */}
                  <div className='flex items-center px-5 mr-5 text-black bg-gray-100 rounded-2xl'>
                    <div className='flex text-base shadow-xl breadcrumbs'>
                      <ul>
                        <li className=''>
                          <a href='/' target={'_blank'} referrerPolicy='no-referrer'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              className='w-4 h-4 mr-2 stroke-current'>
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'></path>
                            </svg>
                            Public View
                          </a>
                        </li>
                        <li>
                          <a href='/admin'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              className='w-4 h-4 mr-2 stroke-current'>
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'></path>
                            </svg>
                            Dashboard
                          </a>
                        </li>
                        <li>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            className='w-4 h-4 mr-2 stroke-current'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'></path>
                          </svg>
                          My Pages
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='flex-1 hidden md:flex md:flex-none'>
                  <div className='form-control'>
                    <div className='dropdown'>
                      <div tabIndex='0'>
                        <input
                          placeholder='Search'
                          className='rounded-full input input-ghost input-bordered text-primary-content placeholder-primary-content focus:text-primary-content focus:bg-transparent'
                        />
                      </div>
                      <div tabIndex='0' className='py-2 dropdown-content'>
                        <div className='shadow-xl card compact bg-neutral-focus text-neutral-content rounded-box w-72'>
                          <div className='card-body'>
                            <h2 className='font-extrabold capitalize card-title'>text input component</h2>
                            <p className='text-sm text-neutral-content text-opacity-80'>
                              Text input comes in various sizes and styles
                            </p>
                            <div className='flex justify-end mt-4'>
                              <a href='/components/input' className='btn btn-primary btn-sm xl:btn-md'>
                                See component
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  aria-label='button component'
                  className='hidden border-none btn btn-ghost mask mask-squircle btn-square focus:bg-base-content focus:bg-opacity-50 md:flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    className='inline-block w-6 h-6 stroke-current'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                  </svg>
                </button>
                <div className='dropdown dropdown-left '>
                  <div tabIndex='0'>
                    <button
                      aria-label='button component'
                      className='hidden border-none btn btn-ghost mask mask-squircle btn-square focus:bg-base-content focus:bg-opacity-50 md:flex'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        className='inline-block w-6 h-6 stroke-current'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'></path>
                      </svg>
                    </button>
                  </div>
                  <div tabIndex='0' className='py-2 dropdown-content translate-y-12 translate-x-12'>
                    <div className='text-black bg-gray-300 shadow card compact rounded-box w-72'>
                      <div className='card-body'>
                        <h2 className='font-extrabold capitalize card-title'>Notifications</h2>
                        <p className='text-sm text-black text-opacity-80'>
                          {`You'll need a navbar on top of your page`}
                        </p>
                        <div className='flex justify-end mt-4'>
                          <a href='/components/navbar' className='btn btn-primary btn-sm xl:btn-md'>
                            See component
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='dropdown dropdown-left'>
                  <div tabIndex='0'>
                    <button
                      aria-label='navbar component'
                      className='hidden border-none btn btn-ghost mask mask-squircle btn-square focus:bg-base-content focus:bg-opacity-50 md:flex'>
                      <div className='shadow-lg avatar'>
                        <div className='w-10 h-10 mask mask-squircle'>
                          <img src='/img/user-image/faces/dog128.png' alt='Avatar Tailwind CSS Component' />
                        </div>
                      </div>
                    </button>
                  </div>
                  <div tabIndex='0' className='py-2 dropdown-content  -translate-y-2 -translate-x-2'>
                    <div className='shadow-xl card compact bg-neutral-focus text-neutral-content rounded-box w-72'>
                      <div className='card-body'>
                        <h2 className='font-extrabold capitalize card-title daysfont'> See you around... 🥺 👋🏻</h2>
                        <LogoutButton></LogoutButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='h-full' style={{ height: 'calc(100% - 4.5rem)' }}>
              <div className='h-full px-6 pt-2 pb-8'>
                <div className='flex h-full'>
                  <div className='' style={{ width: `17rem` }}>
                    <ul className='w-full px-2 pt-2 shadow-xl first-letter:p-2 menu bg-base-100 rounded-box'>
                      <li className='flex items-center py-3 mb-2 text-3xl text-center bg-gray-200 rounded-lg daysfont'>
                        AGAPE
                      </li>
                      <li className='mb-2 text-black bg-teal-300 rounded-xl'>
                        <a>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-5 h-5'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                            />
                          </svg>
                          My Pages
                        </a>
                      </li>
                      <li className='mb-2 text-black bg-white rounded-xl'>
                        <a>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-5 h-5'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                          </svg>
                          Coding Studio
                        </a>
                      </li>
                      <li className='mb-2 text-black bg-white rounded-xl'>
                        <a>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-5 h-5'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                          </svg>
                          3D ART Studio
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className='h-full ml-5' style={{ width: `calc(100% - 17rem)` }}>
                    <div className='h-full p-4 overflow-auto bg-white shadow-xl rounded-2xl'>
                      <div className=''>
                        <div className='justify-center flex-1 pr-2 mx-2 md:flex md:justify-start'></div>
                      </div>
                      <div className='h-screen'>Content 123</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <LogoutButton /> */}
          </>
        </div>
      </div>

      {/*  */}
      {/*  */}
    </Gate>
  )
}

//
