import { storefront } from '../../utils/storefront';
import { viewCollectionByHandle } from '../../graphql/queries/viewCollectionByHandle';
import { CollectionBanner, CollectionProducts } from '../../components/sections/collection';

const CollectionPage = ({collectionData, urlFilters}) => {
  ("y0",collectionData)
  return (
    <>
      {collectionData.collectionByHandle ?
      <>
        <CollectionBanner data = {collectionData}/>
        <CollectionProducts data = {collectionData} filters = {urlFilters}/>
      </>
      :
        <div>
          <p>This collection doesnt exists</p>
          <p>::::OTHER COLLECTIONS</p>
        </div>
      }
    </>
  )
}

export async function getServerSideProps(context) {
  const { req, query, res, asPath, pathname } = context;
  const filtersArr = await query?.filterBy?.split(",")
  const {data:collection,errors} = await storefront(viewCollectionByHandle, {handle:query.collection, amount:50})
  return{
    props:{
      collectionData:collection || errors,
      urlFilters:filtersArr || null,
    }
  }
}

export default CollectionPage