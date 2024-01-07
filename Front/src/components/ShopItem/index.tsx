import "./ShopItem.sass";
import itemImg from "../../assets/a1b3a1f34ed374b6fa9ea8dc8efbd11d.png";
import axios from "axios";

type ShopItemProps = {
  id: number;
  name: string;
  description: string;
  price: number;
  userId: string;
};

export const ShopItem = ({
  id,
  name,
  description,
  price,
  userId,
}: ShopItemProps) => {
  const handlePurchase = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/system/order/", {
        user: userId,
        product: id,
      });

      if (response.status === 201) {
        alert("Покупка успешно совершена!");
      } else {
        alert("Не удалось совершить покупку.");
      }
    } catch (error) {
      console.error("Ошибка при покупке:", error);
      alert("Произошла ошибка при покупке.");
    }
  };

  return (
    <>
      <div className="shopitem-container">
        <img className="shopitem-img" src={itemImg} />
        <p>{name}</p>
        <p>{description}</p>
        <div className="shopitem-purchase-div">
          <h2>{price}руб.</h2>
          <button className="shopitem-purchase-button" onClick={handlePurchase}>
            Купить
          </button>
        </div>
      </div>
    </>
  );
};
