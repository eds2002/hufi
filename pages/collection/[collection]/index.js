import { storefront } from '../../../utils/storefront';
import { viewCollectionByHandle } from '../../../graphql/queries/viewCollectionByHandle';
import { CollectionBanner, CollectionProducts, CollectionSubCol } from '../../../components/sections/collection';
import { allCollections } from '../../../graphql/queries/allCollections';
import { Signup } from '../../../components/sections';

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
      <main className = "relative w-full h-full">
        <div className = "h-[40vh] flex items-center justify-center flex-col">
          <h1 className = "text-3xl font-medium text-center">Hm, seems like this collection doesn&apos;t exist. <br/>Our apologies.</h1>
        </div>
        <div>
          <h1>Collections that may interest you.</h1>
        </div>
      </main>
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