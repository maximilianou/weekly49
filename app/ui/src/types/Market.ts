
/* 
  struct MarketItem {
    uint itemId;
    address nftContract;
    uint256 tokenId;
    address payable seller;
    address payable owner;
    uint256 price;
    bool sold;
  }
*/
export type MarketItem = {
  itemId: string,
  nftContract: string,
  tokenId: string,
  seller: string,
  owner: string,
  price: number,
  sold: boolean,
  image: string,
  name: string,
  description: string,
}