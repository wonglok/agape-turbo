/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { Gate } from '@/backend/Gate'
import { AdminLayout } from '../AdminLayout/AdminLayout'

export function PageAdmin() {
  return (
    <Gate>
      <AdminLayout>123123123123</AdminLayout>
    </Gate>
  )
}

//
