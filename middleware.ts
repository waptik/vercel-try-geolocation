import { NextRequest, NextResponse } from 'next/server'
import countries from './lib/countries.json'

// run only on homepage
export const config = {
  matcher: '/',
}

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req
  const country = geo.country || 'GH'
  const city = geo.city || 'Accra'
  const region = geo.region || 'AA'
  const longitude = geo.longitude || ''
  const latitude =  geo.latitude || ''

  const countryInfo = countries.find((x) => x.cca2 === country)

  const currencyCode = Object.keys(countryInfo.currencies)[0]
  const currency = countryInfo.currencies[currencyCode]
  const languages = Object.values(countryInfo.languages).join(', ')

  url.searchParams.set('country', country)
  url.searchParams.set('city', city)
  url.searchParams.set('region', region)
  url.searchParams.set('currencyCode', currencyCode)
  url.searchParams.set('currencySymbol', currency.symbol)
  url.searchParams.set('name', currency.name)
  url.searchParams.set("latitude", latitude)
  url.searchParams.set("longitude", longitude)
  url.searchParams.set('languages', languages)

  return NextResponse.rewrite(url)
}
