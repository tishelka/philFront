import { Header } from "../../components/Header";
import { RequestForm } from "../../components/RequestForm";
import { ShopItem } from "../../components/ShopItem";
import "./MainPage.sass";
import { useState, useEffect } from "react";
import axios from "axios";

type ShopItemData = {
  id: number;
  title: string;
  itemImg: string;
  description: string;
  price: number;
  filter: string;
};

export const MainPage = () => {
  const [shopItems, setShopItems] = useState<ShopItemData[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/items")
      .then((response) => {
        setShopItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };

  const filteredShopItems = selectedFilter
    ? shopItems.filter((item) => item.filter === selectedFilter)
    : shopItems;

  return (
    <div className="main-container">
      <Header />
      <RequestForm />
      <div className="main-items">
        <h1>Каталог пульсометров</h1>
        <div className="main-filters">
          <button
            className="main-filter-button"
            onClick={() => handleFilterClick("fitness")}
          >
            Для фитнеса
          </button>
          <button
            className="main-filter-button"
            onClick={() => handleFilterClick("running")}
          >
            Для бега
          </button>
          <button
            className="main-filter-button"
            onClick={() => handleFilterClick("triathlon")}
          >
            Для триатлона
          </button>
        </div>
        <div className="main-item-selection">
          {filteredShopItems.map((shopItem: ShopItemData) => {
            const props = {
              id: shopItem.id,
              title: shopItem.title,
              itemImg: shopItem.itemImg,
              description: shopItem.description,
              price: shopItem.price,
            };
            return <ShopItem {...props} />;
          })}
        </div>
      </div>
    </div>
  );
};
