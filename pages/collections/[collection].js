import { storefront } from '../../utils/storefront';
import { viewCollectionByHandle } from '../../graphql/queries/viewCollectionByHandle';
import { CollectionBanner, CollectionProducts } from '../../components/sections/collection';

const CollectionPage = ({collectionData}) => {
  return (
    <>
      <CollectionBanner data = {collectionData}/>
      <CollectionProducts data = {collectionData}/>
    </>
  )
}

export async function getServerSideProps(context) {
  const { req, query, res, asPath, pathname } = context;
  const {data:collection,errors} = await storefront(viewCollectionByHandle, {handle:query.collection, amount:50})
  return{
    props:{collectionData:collection || errors}
  }
}

export default CollectionPage