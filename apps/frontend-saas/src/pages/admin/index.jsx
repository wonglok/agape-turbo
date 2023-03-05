import { PageAdmin } from '@/components/html/PageAdmin/PageAdmin'

export default PageAdmin

export async function getStaticProps() {
  return { props: { title: 'Agape Ecosystem' } }
}

//
