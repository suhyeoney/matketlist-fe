import Script from 'next/script'
import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@main/header'
import { store } from '@store/store'
import { Providers } from '@store/provider' 
import Footer from 'src/app/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Matket List',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  /*
    Naver Map과 같은 third-party script의 로딩 우선순위를 설정함으로써, 로딩 성능 향상 도모
    beforeInteractive : 해당 페이지가 상호작용하기 전에 가져오고 실행되어야 할 필요가 있는 경우 설정
  */

  return (
    <html lang="en">
      <head>
        {/* <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate"></meta>
        <meta httpEquiv="Pragma" content="no-cache"></meta>
        <meta httpEquiv="Expires" content="0"></meta> */}
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <Script
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_KEY}`}
          strategy="beforeInteractive"
        ></Script>
      </head>
      <body>
        <Providers>
          { children }
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
