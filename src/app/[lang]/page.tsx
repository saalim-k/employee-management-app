import { Locale, getDictionary } from './dictionaries/getDictionary'

type Props = {
  params: {
    lang: Locale
  }
}

export default async function Home({ params: { lang } }: Props) {
  const intl = await getDictionary(lang)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  )
}
