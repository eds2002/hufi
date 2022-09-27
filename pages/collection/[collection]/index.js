import { storefront } from '../../../utils/storefront';
import { viewCollectionByHandle } from '../../../graphql/queries/viewCollectionByHandle';
import { CollectionBanner, CollectionProducts, CollectionSubCol } from '../../../components/sections/collection';
import { allCollections } from '../../../graphql/queries/allCollections';
import { Signup } from '../../../components/sections';
import ErrorImg from '../../../assets/404.svg'
import Link from 'next/link';
import { Button } from '../../../components/elements';
import Image from 'next/image';

const CollectionPage = ({collectionData, urlFilters,subCollections,collectionName}) => {
  return (
    <>
      {collectionData && subCollections ? 
      <main className = "relative w-full h-full">
        <div className = "sticky z-20 py-2 text-2xl font-medium bg-surface top-16">
          <p className = "px-4 mx-auto max-w-7xl">{collectionData.collectionByHandle.title}</p>
        </div>
        <CollectionSubCol data = {subCollections}/>
      </main>
      :
      <>
          <main className = "w-full h-screen">
            <div className = "flex flex-col items-center w-full h-full px-4 pt-24">
              <div className = "relative w-full h-full h-[300px] pointer-events-none select-none">
                <Image src = {ErrorImg} layout='fill' objectFit="contain"/>
              </div>
              <h1 className = "max-w-sm text-3xl font-medium text-center">Hmmm, it seems like this product doesn't exist.</h1>
              <Link href = "/">
                <Button text = 'Back to home' CSS = 'w-auto px-4 bg-secondaryVariant py-2 mt-6 hover:bg-secondary transition'/>
              </Link>
            </div>
          </main>
        </>
      }
    </>
  )
}

export async function getServerSideProps(context) {
  try{
    const { req, query, res, asPath, pathname } = context;
    const filtersArr = await query?.filterBy?.split(",")
    const {data:collection,errors} = await storefront(viewCollectionByHandle, {handle:query.collection, amount:50})
  
    const subCollectionsJSON = collection?.collectionByHandle?.subCollections?.value ? JSON.parse(collection.collectionByHandle.subCollections.value) : undefined
  
    for(const [index,set] of subCollectionsJSON.entries()){
      const queryData = []
      for(const value of set.collectionTitles){
        const {data:collection, errors:collectionError} = await storefront(allCollections,{amount:1, queryArgs:`[${value}]`})
        queryData.push(collection)
      }
      subCollectionsJSON[index].collectionTitles = queryData
    }
  
    return{
      props:{
        collectionData:collection || errors,
        urlFilters:filtersArr || null,
        subCollections:subCollectionsJSON,
      }
    }
  }catch(e){
    return{
      props:{
        collectionData:null,
        urlFilters:null,
        subCollections:null,
      }
    }
  }
}

export default CollectionPage