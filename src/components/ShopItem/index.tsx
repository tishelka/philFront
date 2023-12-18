import "./ShopItem.sass";

type ShopItemProps = {
  title: string;
  itemImg: string;
  description: string;
  price: number;
};

export const ShopItem = ({
  title,
  itemImg,
  description,
  price,
}: ShopItemProps) => {
  return (
    <div className="shopitem-container">
      <img className="shopitem-img" src={itemImg} />
      <p>{title}</p>
      <p>{description}</p>
      <div className="shopitem-purchase-div">
        <h2>{price}руб.</h2>
        <button className="shopitem-purchase-button">Купить</button>
      </div>
    </div>
  );
};
