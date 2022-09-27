import { storefront } from '../../../utils/storefront';
import { viewCollectionByHandle } from '../../../graphql/queries/viewCollectionByHandle';
import { CollectionBanner, CollectionProducts } from '../../../components/sections/collection';
import Image from 'next/image';
import Link from 'next/link';
import ErrorImg from '../../../assets/404.svg'
import { Button } from '../../../components/elements';

const SubCollectionPage = ({collectionData, urlFilters}) => {
  return (
    <>
      {collectionData.collectionByHandle ?
      <>
        <CollectionBanner data = {collectionData}/>
        <CollectionProducts data = {collectionData} filters = {urlFilters}/>
      </>
      :
        <>
          <main className = "w-full h-screen">
            <div className = "flex flex-col items-center w-full h-full px-4 pt-24">
              <div className = "relative w-full h-[300px] pointer-events-none select-none">
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
  const { req, query, res, asPath, pathname } = context;
  const filtersArr = await query?.filterBy?.split(",")
  const {data:collection,errors} = await storefront(viewCollectionByHandle, {handle:query.SubCollection, amount:50})
  return{
    props:{
      collectionData:collection || errors,
      urlFilters:filtersArr || null,
    }
  }
}

export default SubCollectionPage