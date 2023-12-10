import { Locale, getDictionary } from "./dictionaries"


type Props = {
  params: {
    lang: Locale
  }
}

export default async function Home({ params: { lang } }: Props) {
  const intl = await getDictionary(lang)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl font-bold text-center">
        {intl.welcome}
      </h1>
      <p className="text-2xl text-center">
      </p>
    </main>
  )
}
