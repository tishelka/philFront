import { Header } from "../../components/Header";
import { Advantages } from "../../components/Advantages";
import { RequestForm } from "../../components/RequestForm";
import { ShopItem } from "../../components/ShopItem";
import { Reviews } from "../../components/Reviews";
import { Footer } from "../../components/Footer";
import Modal from "../../components/Modal";
import "./MainPage.sass";
import { useState, useEffect } from "react";
import axios from "axios";

type ShopItemData = {
  id: number;
  name: string;
  description: string;
  price: number;
  filter: string;
};

export const MainPage = () => {
  const [shopItems, setShopItems] = useState<ShopItemData[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const userId = localStorage.getItem("userId") || "";
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    console.log(userId);
    axios
      .get("http://127.0.0.1:8000/system/product/")
      .then((response) => {
        setShopItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };

  const filteredShopItems = selectedFilter
    ? shopItems.filter((item) => item.filter === selectedFilter)
    : shopItems;

  return (
    <div className="main-container">
      <Header />
      <Advantages />
      <RequestForm />
      <div className="main-items">
        <h1>Каталог пульсометров</h1>
        <div className="main-filters">
          <button
            className="main-filter-button"
            onClick={() => handleFilterClick("fitness")}
          >
            <div>Для фитнеса</div>
          </button>

          <button
            className="main-filter-button"
            onClick={() => handleFilterClick("running")}
          >
            <div>Для бега</div>
          </button>
          <button
            className="main-filter-button"
            onClick={() => handleFilterClick("triathlon")}
          >
            <div>Для триатлона</div>
          </button>
        </div>
        <div className="cont cont-cat">
          <div className="main-item-selection">
            {filteredShopItems.map((shopItem: ShopItemData) => {
              return (
                <ShopItem key={shopItem.id} {...shopItem} userId={userId} />
              );
            })}
          </div>
        </div>
      </div>
      <Reviews />
      <Footer />
      <Modal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
};
