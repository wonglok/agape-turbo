import { create } from 'zustand'
export const useOnline = create((get, set) => {
  //!SECTION

  return {
    //
    user: false,
    login: () => {},
    logout: () => {},
    hydrate: () => {},
  }
})
