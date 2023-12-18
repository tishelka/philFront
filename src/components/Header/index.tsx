import "./Header.sass";

export const Header = () => {
  return (
    <div className="header-main-container">
      <div className="header-container">
        <h1>RunSmart</h1>
        <div className="header-info">
          <p>Официальный представитель</p>
          <p>Garmin, Polar, Suunto</p>
        </div>
        <div className="header-contacts">
          <p>+7 (499) 922-89-74</p>
          <button className="header-button">Заказать звонок</button>
        </div>
      </div>
      <div className="main-first">
        <h1>ПОДБОР ПУЛЬСОМЕТРА</h1>
        <h3>С УЧЁТОМ ВАШЕГО УРОВНЯ ПОДГОТОВКИ</h3>
        <button className="main-button">ЗАКАЗТЬ КОНСУЛЬТАЦИЮ</button>
      </div>
    </div>
  );
};
