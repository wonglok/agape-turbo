import { PageArtStudio } from '@/components/html/PageArtStudio/PageArtStudio'

export default PageArtStudio

export async function getStaticProps() {
  return { props: { title: 'Agape Ecosystem' } }
}

//
