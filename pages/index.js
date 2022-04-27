import PortGrid from '../components/PortGrid'
import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function Home() {
  return (
    <div>
      <Header />
      <PortGrid />
      <Footer />
    </div>
  )
}
