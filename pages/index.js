import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Collections, Hero, HorizontalProducts, Incentive, Testimonial, TestimonialsGrid } from './components/sections'

export default function Home() {
  return (
    <>
      <Hero/>
      <Testimonial/>
      <HorizontalProducts/>
      <Collections/>
      <Incentive/>
      <TestimonialsGrid/>
    </>
  )
}
