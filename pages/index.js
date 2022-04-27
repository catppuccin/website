import PortGrid from '../components/PortGrid'
import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <PortGrid />
      <Footer />
    </div>
  )
}
