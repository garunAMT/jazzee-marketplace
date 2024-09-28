import { getAllProducts } from '@/actions';
import AuctionCreationForm from '@/components/shared/AuctionCreationForm'

const CreateAuctionPage = async () => {

  const products = await getAllProducts();
  return (
    <div>
      <AuctionCreationForm products={products} />
    </div>
  )
}

export default CreateAuctionPage
