import { PageCodingStudio } from '@/components/html/PageCodingStudio/PageCodingStudio'

export default PageCodingStudio

export async function getStaticProps() {
  return { props: { title: 'Agape Ecosystem' } }
}

//
