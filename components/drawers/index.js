import dynamic from 'next/dynamic'

export const FiltersDrawer = dynamic(
  ()=> import(
    /*webpackChunkName: "FiltersDrawer"*/
    './FiltersDrawer'
  ),{
    ssr:false,
    // loading:()=><h1>Loading...</h1>,
  }
)

export const Account = dynamic(
  ()=> import(
    /*webpackChunkName: "FiltersDrawer"*/
    './Account'
  ),{
    ssr:false,
    // loading:()=><h1>Loading...</h1>,
  }
)

import {test} from '.'