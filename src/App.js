import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ====== SVG Иконки, аватар, валюты, стили ======
const ICONS = {
  visa: (
    <svg width="38" height="14" viewBox="0 0 38 14" fill="none">
      <rect width="38" height="14" rx="3" fill="#fff"/>
      <text x="6" y="11" fontWeight="bold" fontSize="11" fill="#2565d4">VISA</text>
    </svg>
  ),
  mc: (
    <svg width="38" height="14" viewBox="0 0 38 14" fill="none">
      <rect width="38" height="14" rx="3" fill="#fff"/>
      <circle cx="13" cy="7" r="5" fill="#ff4f1f"/>
      <circle cx="25" cy="7" r="5" fill="#febc11"/>
      <text x="21" y="11" fontWeight="bold" fontSize="10" fill="#fff">MC</text>
    </svg>
  ),
  union: (
    <svg width="38" height="14" viewBox="0 0 38 14" fill="none">
      <rect width="38" height="14" rx="3" fill="#fff"/>
      <circle cx="13" cy="7" r="5" fill="#1bb881"/>
      <circle cx="25" cy="7" r="5" fill="#e9455a"/>
      <text x="12" y="11" fontWeight="bold" fontSize="9" fill="#fff">UP</text>
    </svg>
  ),
  plus: (
    <svg width="24" height="24" fill="none"><circle cx="12" cy="12" r="12" fill="#36fafe"/><rect x="6" y="11" width="12" height="2" rx="1" fill="#181a20"/><rect x="11" y="6" width="2" height="12" rx="1" fill="#181a20"/></svg>
  ),
  copy: (
    <svg width="20" height="20" fill="none"><rect x="4" y="6" width="12" height="10" rx="2" fill="#fff"/><rect x="6" y="4" width="10" height="10" rx="2" fill="#b3bfff"/></svg>
  ),
  ru: (
    <svg width="26" height="18" viewBox="0 0 26 18"><rect width="26" height="18" rx="4" fill="#fff"/><rect y="6" width="26" height="6" fill="#2472d3"/><rect y="12" width="26" height="6" fill="#ef4444"/></svg>
  ),
  en: (
    <svg width="26" height="18" viewBox="0 0 26 18"><rect width="26" height="18" rx="4" fill="#fff"/><path fill="#1c4fb1" d="M0 0h26v2.5L2.5 18H0V0z"/><path fill="#ef4444" d="M0 0h2.5L26 15.5V18h-2.5L0 2.5V0z"/></svg>
  ),
  moon: (
    <svg width="19" height="19" fill="none"><circle cx="9.5" cy="9.5" r="9.5" fill="#222944"/><path d="M14.9 12.7A5.5 5.5 0 0 1 7.1 4.1a6 6 0 1 0 7.8 8.6Z" fill="#36fafe"/></svg>
  ),
  sun: (
    <svg width="19" height="19" fill="none"><circle cx="9.5" cy="9.5" r="9.5" fill="#fff"/><path d="M9.5 5v2M9.5 12v2M5 9.5h2M12 9.5h2M6.7 6.7l1 1M11.3 11.3l1 1M6.7 12.3l1-1M11.3 7.7l1-1" stroke="#fcb900" strokeWidth="1.1" strokeLinecap="round"/></svg>
  ),
  notif: (
    <svg width="21" height="21" fill="none"><rect x="2" y="6" width="17" height="9" rx="4.5" fill="#36fafe"/><rect x="5" y="3" width="11" height="3" rx="1.5" fill="#b3bfff"/></svg>
  ),
  send: (
    <svg width="22" height="22" fill="none"><circle cx="11" cy="11" r="11" fill="#36fafe"/><path d="m7 11 7-4v8l-7-4z" fill="#21243b"/></svg>
  ),
  bank: (
    <svg width="22" height="22" fill="none"><circle cx="11" cy="11" r="11" fill="#b3bfff"/><rect x="6" y="7" width="10" height="8" rx="3" fill="#fff"/><rect x="8" y="10" width="6" height="2" rx="1" fill="#b3bfff"/></svg>
  ),
  settings: (
    <svg width="22" height="22" fill="none"><circle cx="11" cy="11" r="11" fill="#46477d"/><rect x="7" y="7" width="8" height="8" rx="2" fill="#fff"/></svg>
  ),
  qr: (
    <svg width="21" height="21" fill="none"><rect x="2" y="2" width="6" height="6" rx="2" fill="#b3bfff"/><rect x="13" y="2" width="6" height="6" rx="2" fill="#b3bfff"/><rect x="2" y="13" width="6" height="6" rx="2" fill="#b3bfff"/><rect x="13" y="13" width="6" height="6" rx="2" fill="#36fafe"/></svg>
  ),
  trophy: (
    <svg width="21" height="21" fill="none"><circle cx="10.5" cy="10.5" r="10.5" fill="#ffd700"/><rect x="6" y="6" width="9" height="6" rx="3" fill="#fff"/><rect x="8" y="9" width="5" height="2" rx="1" fill="#ffd700"/></svg>
  ),
};

const AVATAR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAMAAAC7m5rvAAAAbFBMVEX///+rq6v09PTy8vK0tLSbm5u2trbd3d2cnJzb29v7+/vz8/OZmZl5eXnt7e1XV1dUVFSEhISsrKyCgoL5+fmMjIylpaXj4+OtpaTQ0NDW1tZ6enprampaWlpI+Pjujo6NjY2Pa2trW1tZWVlbq6urKysrFxcVOli3UAAABmElEQVR4nO3bi44CMRQAUc0loY7t/f/XaGN8UPAdSU0PaeU5vNJTMM2ElTEFQT/3S+KjAcw2Pbww7T1nYtvP3C9nNNl/Ow6AF1jUJ1vB9JHAF1jWJ7GyoAbR5nNY3inb7nVhAnI1YXQoRFiJQpR1lKZRXZoTZeInlMwrKkJcMTsQ/awtXfTQ1ZgKcdLaNO8prZcElWHQq1jZgI2SlcQXrC9Z2ANMJk4tE4Q9HoZl3yKQGIPxHjFJP37QZWTLQMSi5xAFeaCoC2lIIRUB4iQApRSkGpGqQxUfEoBO4n2fuh8mQ4rjA+o5AAAAAElFTkSuQmCC";

const BG_GRAD = {
  dark: "linear-gradient(180deg, #232749 0%, #181a20 100%)",
  light: "linear-gradient(180deg, #f9fafd 0%, #f2f3fa 100%)",
};

const TEXT = {
  ru: {
    balance: "Баланс",
    actions: "Действия",
    send: "Отправить",
    deposit: "Пополнить",
    cashback: "Кэшбек",
    refer: "Рефералы",
    settings: "Настройки",
    cards: "Карты",
    history: "История",
    bonuses: "Бонусы",
    news: "Новости",
    promo: "Акции",
    select_asset: "Валюта",
    select_lang: "Язык",
    select_theme: "Тема",
    theme_dark: "Тёмная",
    theme_light: "Светлая",
    user: "АГЕНТ СБУ",
    push_sent: "Перевод успешно отправлен!",
    push_error: "Ошибка перевода",
    push_cashback: "Кэшбек получен!",
    welcome: "Добро пожаловать, АГЕНТ СБУ!",
    fake_account: "Счёт",
    lottery: "Лотерея",
    win: "Поздравляем, вы выиграли NFT!",
    ref_prog: "Реферальная программа",
    share_link: "Ваша ссылка",
    copy: "Копировать",
    copy_done: "Скопировано!",
    bonus: "Премия",
    promo_today: "Акции дня",
    history_empty: "Пока нет операций",
    your_level: "Ваш уровень",
    copy_ref: "Скопировать ссылку",
    theme_switch: "Сменить тему",
    currency: "Валюта",
    all_assets: "Все активы",
    choose_card: "Выберите карту",
    send_amount: "Сумма перевода",
    confirm: "Подтвердить",
    cancel: "Отмена",
    send_success: "Деньги успешно отправлены!",
    cashback_offer: "Получите кэшбек до 5% на любые переводы",
    lottery_action: "Попробовать удачу",
  },
  en: {
    balance: "Balance",
    actions: "Actions",
    send: "Send",
    deposit: "Deposit",
    cashback: "Cashback",
    refer: "Referrals",
    settings: "Settings",
    cards: "Cards",
    history: "History",
    bonuses: "Bonuses",
    news: "News",
    promo: "Promo",
    select_asset: "Currency",
    select_lang: "Language",
    select_theme: "Theme",
    theme_dark: "Dark",
    theme_light: "Light",
    user: "AGENT SBU",
    push_sent: "Transfer sent successfully!",
    push_error: "Transfer error",
    push_cashback: "Cashback received!",
    welcome: "Welcome, AGENT SBU!",
    fake_account: "Account",
    lottery: "Lottery",
    win: "Congratulations, you won an NFT!",
    ref_prog: "Referral program",
    share_link: "Your link",
    copy: "Copy",
    copy_done: "Copied!",
    bonus: "Bonus",
    promo_today: "Today's promos",
    history_empty: "No transactions yet",
    your_level: "Your level",
    copy_ref: "Copy link",
    theme_switch: "Switch theme",
    currency: "Currency",
    all_assets: "All assets",
    choose_card: "Choose a card",
    send_amount: "Send amount",
    confirm: "Confirm",
    cancel: "Cancel",
    send_success: "Funds sent!",
    cashback_offer: "Get up to 5% cashback on any transfers",
    lottery_action: "Try your luck",
  }
};

const ASSETS = [
  { code: "RUB", label: "₽", color: "#36fafe" },
  { code: "USD", label: "$", color: "#b3bfff" },
  { code: "BTC", label: "₿", color: "#feaf32" },
  { code: "TON", label: "TON", color: "#5de0ff" },
  { code: "SOL", label: "◎", color: "#42f3c2" },
  { code: "USDT", label: "₮", color: "#26e275" }
];

const LANGS = [
  { code: "ru", label: "Русский", icon: ICONS.ru },
  { code: "en", label: "English", icon: ICONS.en }
];

// ====== ГЛОБАЛЬНЫЙ КОМПОНЕНТ ======
export default function App() {
  // ——————— Глобальный стейт ———————
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("ru");
  const [asset, setAsset] = useState(ASSETS[0]);
  const [tab, setTab] = useState("wallet");
  const [cards, setCards] = useState([
    {
      id: 1,
      type: "Visa",
      number: "5336 2410 8956 6521",
      name: TEXT[lang].user,
      expiry: "09/28",
      balance: 43900,
      logo: ICONS.visa,
      color: "linear-gradient(120deg, #363b49 60%, #765dff 100%)"
    },
    {
      id: 2,
      type: "Mastercard",
      number: "4242 1812 3478 4352",
      name: TEXT[lang].user,
      expiry: "11/27",
      balance: 12000,
      logo: ICONS.mc,
      color: "linear-gradient(120deg,#e7e9ed 35%, #d8c168 100%)"
    },
    {
      id: 3,
      type: "UnionPay",
      number: "2258 3221 7862 1010",
      name: TEXT[lang].user,
      expiry: "04/29",
      balance: 6700,
      logo: ICONS.union,
      color: "linear-gradient(120deg,#47e3c9 35%, #b3bfff 100%)"
    }
  ]);
  const [selectedCard, setSelectedCard] = useState(0);

  // Фейковая история операций (динамическая)
  const [history, setHistory] = useState([
    { id: 1, type: "Пополнение", desc: "Через карту Visa", sum: "+ 20 000 ₽", date: "2025-07-03", status: "success" },
    { id: 2, type: "Перевод", desc: "Получатель: Коля", sum: "- 4 300 ₽", date: "2025-07-03", status: "success" },
    { id: 3, type: "Кэшбек", desc: "Пятёрочка", sum: "+ 350 ₽", date: "2025-07-02", status: "success" },
    { id: 4, type: "Покупка", desc: "Ozon", sum: "- 2 110 ₽", date: "2025-07-01", status: "pending" }
  ]);
  const [showPush, setShowPush] = useState(false);
  const [pushMsg, setPushMsg] = useState("");
  const [pushType, setPushType] = useState("info"); // info/success/error

  // ——————— Баннеры, акции, пуши ———————
  const banners = [
    {
      id: 1,
      title: TEXT[lang].promo_today,
      desc: TEXT[lang].cashback_offer,
      img: <svg width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#36fafe"/><text x="15" y="42" fontWeight="bold" fontSize="30" fill="#181a20">5%</text></svg>,
      color: "#232749"
    },
    {
      id: 2,
      title: TEXT[lang].lottery,
      desc: TEXT[lang].win,
      img: <svg width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#b3bfff"/><text x="13" y="42" fontWeight="bold" fontSize="28" fill="#222">NFT</text></svg>,
      color: "#181a20"
    }
  ];

  // ——————— Форма для переводов ———————
  const [showSend, setShowSend] = useState(false);
  const [sendSum, setSendSum] = useState("");
  const [sendTo, setSendTo] = useState("");
  const [sendSuccess, setSendSuccess] = useState(false);

  // ——————— Смена темы/языка/валюты (модалки) ———————
  const [showAsset, setShowAsset] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [showTheme, setShowTheme] = useState(false);

  // ——————— Push-уведомление ———————
  function push(msg, type = "info") {
    setPushMsg(msg);
    setPushType(type);
    setShowPush(true);
    setTimeout(() => setShowPush(false), 2200);
  }

  // ——————— Перевод денег ———————
  function sendMoney() {
    if (!sendSum || isNaN(sendSum) || !sendTo) {
      push(TEXT[lang].push_error, "error");
      return;
    }
    // Фейковый перевод — запись в историю, пуш, сброс формы
    setHistory(prev => [
      {
        id: prev.length + 1,
        type: TEXT[lang].send,
        desc: `→ ${sendTo}`,
        sum: `- ${sendSum} ${asset.label}`,
        date: new Date().toISOString().slice(0, 10),
        status: "success"
      }, ...prev]);
    push(TEXT[lang].push_sent, "success");
    setSendSuccess(true);
    setTimeout(() => {
      setSendSuccess(false);
      setShowSend(false);
      setSendSum("");
      setSendTo("");
    }, 1300);
  }

  // ——————— Смена темы с анимацией ———————
  function switchTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
    push(theme === "dark" ? TEXT[lang].theme_light : TEXT[lang].theme_dark, "info");
  }

  // ——————— Смена языка ———————
  function switchLang(l) {
    setLang(l);
    push(l === "ru" ? "Язык: Русский" : "Language: English", "info");
  }

  // ——————— Смена валюты/актива ———————
  function switchAsset(a) {
    setAsset(a);
    push(`${TEXT[lang].currency}: ${a.code}`, "info");
  }

  // ——————— Copy ref link ———————
  function copyLink(link) {
    navigator.clipboard.writeText(link);
    push(TEXT[lang].copy_done, "success");
  }

  // Адаптив
  useEffect(() => {
    document.body.style.background = theme === "dark" ? BG_GRAD.dark : BG_GRAD.light;
  }, [theme]);

  // ——————— Стили шрифтов (инжект через useEffect) ———————
  useEffect(() => {
    const font = document.createElement("link");
    font.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap";
    font.rel = "stylesheet";
    document.head.appendChild(font);
    return () => { document.head.removeChild(font); };
  }, []);

  // ——————— Мобильная адаптация ———————
  useEffect(() => {
    document.body.style.margin = 0;
    document.body.style.overflowX = "hidden";
  }, []);

  // ====== Продолжаю ниже — ВКЛАДКИ, UI, push-компонент, модалки, меню ======
  // =============== PUSH УВЕДОМЛЕНИЯ ===============
  function Push() {
    return (
      <AnimatePresence>
        {showPush && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            style={{
              position: "fixed",
              top: 16,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 20,
              background: pushType === "error"
                ? "#f44336"
                : pushType === "success"
                ? "#47e3c9"
                : "#46477d",
              color: "#fff",
              fontWeight: 700,
              borderRadius: 18,
              padding: "17px 36px",
              boxShadow: "0 2px 20px #23274933",
              fontSize: 18,
              letterSpacing: 0.7
            }}
          >
            {pushMsg}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // =============== МОДАЛКА — СМЕНА ВАЛЮТЫ ===============
  function ModalAsset() {
    return (
      <AnimatePresence>
        {showAsset && (
          <motion.div
            className="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
              background: "rgba(25,27,33,0.25)", zIndex: 22, display: "flex", alignItems: "center", justifyContent: "center"
            }}
            onClick={() => setShowAsset(false)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: theme === "dark" ? "#262a40" : "#fff",
                borderRadius: 18,
                padding: 26,
                minWidth: 300,
                boxShadow: "0 4px 32px #181a2044"
              }}
            >
              <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 20, color: "#6d4aff" }}>
                {TEXT[lang].select_asset}
              </div>
              {ASSETS.map(a => (
                <div
                  key={a.code}
                  onClick={() => {
                    switchAsset(a);
                    setShowAsset(false);
                  }}
                  style={{
                    display: "flex", alignItems: "center",
                    marginBottom: 13, cursor: "pointer",
                    fontWeight: 700,
                    fontSize: 16,
                    background: asset.code === a.code ? "#36fafe22" : "none",
                    borderRadius: 10,
                    padding: "10px 8px"
                  }}
                >
                  <span style={{ fontSize: 22, marginRight: 14, color: a.color }}>{a.label}</span>
                  <span>{a.code}</span>
                  {asset.code === a.code && (
                    <span style={{
                      marginLeft: "auto", fontWeight: 800, color: "#6d4aff", fontSize: 19
                    }}>•</span>
                  )}
                </div>
              ))}
              <div style={{ textAlign: "right" }}>
                <button
                  style={{
                    background: "#e8eafd", color: "#363b49", border: "none", borderRadius: 8, padding: "6px 17px", marginTop: 8, fontWeight: 600, cursor: "pointer"
                  }}
                  onClick={() => setShowAsset(false)}
                >
                  {TEXT[lang].cancel}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // =============== МОДАЛКА — СМЕНА ЯЗЫКА ===============
  function ModalLang() {
    return (
      <AnimatePresence>
        {showLang && (
          <motion.div
            className="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
              background: "rgba(25,27,33,0.24)", zIndex: 22, display: "flex", alignItems: "center", justifyContent: "center"
            }}
            onClick={() => setShowLang(false)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: theme === "dark" ? "#262a40" : "#fff",
                borderRadius: 18,
                padding: 26,
                minWidth: 260,
                boxShadow: "0 4px 32px #181a2044"
              }}
            >
              <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 16, color: "#6d4aff" }}>
                {TEXT[lang].select_lang}
              </div>
              {LANGS.map(l => (
                <div
                  key={l.code}
                  onClick={() => {
                    switchLang(l.code);
                    setShowLang(false);
                  }}
                  style={{
                    display: "flex", alignItems: "center",
                    marginBottom: 14, cursor: "pointer",
                    fontWeight: 700,
                    fontSize: 16,
                    background: lang === l.code ? "#36fafe22" : "none",
                    borderRadius: 10,
                    padding: "8px 10px"
                  }}
                >
                  <span style={{ fontSize: 22, marginRight: 10 }}>{l.icon}</span>
                  <span>{l.label}</span>
                  {lang === l.code && (
                    <span style={{
                      marginLeft: "auto", fontWeight: 800, color: "#6d4aff", fontSize: 19
                    }}>•</span>
                  )}
                </div>
              ))}
              <div style={{ textAlign: "right" }}>
                <button
                  style={{
                    background: "#e8eafd", color: "#363b49", border: "none", borderRadius: 8, padding: "6px 17px", marginTop: 8, fontWeight: 600, cursor: "pointer"
                  }}
                  onClick={() => setShowLang(false)}
                >
                  {TEXT[lang].cancel}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // =============== МОДАЛКА — СМЕНА ТЕМЫ ===============
  function ModalTheme() {
    return (
      <AnimatePresence>
        {showTheme && (
          <motion.div
            className="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
              background: "rgba(25,27,33,0.18)", zIndex: 22, display: "flex", alignItems: "center", justifyContent: "center"
            }}
            onClick={() => setShowTheme(false)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: theme === "dark" ? "#262a40" : "#fff",
                borderRadius: 18,
                padding: 26,
                minWidth: 220,
                boxShadow: "0 4px 32px #181a2044"
              }}
            >
              <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 16, color: "#6d4aff" }}>
                {TEXT[lang].select_theme}
              </div>
              <div
                onClick={() => {
                  setTheme("dark");
                  setShowTheme(false);
                  push(TEXT[lang].theme_dark, "info");
                }}
                style={{
                  display: "flex", alignItems: "center",
                  marginBottom: 12, cursor: "pointer",
                  fontWeight: 700,
                  fontSize: 16,
                  background: theme === "dark" ? "#36fafe22" : "none",
                  borderRadius: 10,
                  padding: "10px 10px"
                }}
              >
                <span style={{ fontSize: 22, marginRight: 10 }}>{ICONS.moon}</span>
                <span>{TEXT[lang].theme_dark}</span>
                {theme === "dark" && (
                  <span style={{
                    marginLeft: "auto", fontWeight: 800, color: "#6d4aff", fontSize: 19
                  }}>•</span>
                )}
              </div>
              <div
                onClick={() => {
                  setTheme("light");
                  setShowTheme(false);
                  push(TEXT[lang].theme_light, "info");
                }}
                style={{
                  display: "flex", alignItems: "center",
                  marginBottom: 12, cursor: "pointer",
                  fontWeight: 700,
                  fontSize: 16,
                  background: theme === "light" ? "#36fafe22" : "none",
                  borderRadius: 10,
                  padding: "10px 10px"
                }}
              >
                <span style={{ fontSize: 22, marginRight: 10 }}>{ICONS.sun}</span>
                <span>{TEXT[lang].theme_light}</span>
                {theme === "light" && (
                  <span style={{
                    marginLeft: "auto", fontWeight: 800, color: "#6d4aff", fontSize: 19
                  }}>•</span>
                )}
              </div>
              <div style={{ textAlign: "right" }}>
                <button
                  style={{
                    background: "#e8eafd", color: "#363b49", border: "none", borderRadius: 8, padding: "6px 17px", marginTop: 8, fontWeight: 600, cursor: "pointer"
                  }}
                  onClick={() => setShowTheme(false)}
                >
                  {TEXT[lang].cancel}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // ====== Продолжаю ниже! Следующий кусок: Вся разметка: шапка, меню, вкладки, баннеры, карты, история, перевод, профиль, бонусы и т.д. ======
  // =============== BOTTOM TABS (все анимированы) ===============
  const TABS = [
    { key: "wallet", icon: ICONS.bank, label: TEXT[lang].balance },
    { key: "cards", icon: ICONS.visa, label: TEXT[lang].cards },
    { key: "history", icon: ICONS.notif, label: TEXT[lang].history },
    { key: "promo", icon: ICONS.trophy, label: TEXT[lang].promo },
    { key: "profile", icon: ICONS.settings, label: TEXT[lang].settings }
  ];

  // =================== ГЛАВНЫЙ RETURN ===================
  return (
    <div style={{
      fontFamily: "'Inter', Arial, sans-serif",
      minHeight: "100vh",
      background: theme === "dark"
        ? "linear-gradient(180deg, #232749 0%, #181a20 100%)"
        : "linear-gradient(180deg, #f9fafd 0%, #f2f3fa 100%)",
      color: theme === "dark" ? "#f7fafc" : "#232749",
      transition: "background .4s"
    }}>
      {/* Push уведомление */}
      <Push />
      <ModalAsset />
      <ModalLang />
      <ModalTheme />

      {/* Верхняя шапка */}
      <div style={{
        width: "100%",
        maxWidth: 440,
        margin: "0 auto",
        borderRadius: 0,
        background: theme === "dark"
          ? "linear-gradient(90deg,#353861 65%,#6d4aff 120%)"
          : "linear-gradient(90deg,#e8eafd 65%,#6d4aff 120%)",
        color: "#fff",
        fontWeight: 800,
        padding: "27px 20px 18px 24px",
        fontSize: 29,
        boxShadow: "0 3px 22px #2327491c",
        position: "sticky",
        top: 0,
        zIndex: 12,
        display: "flex", alignItems: "center"
      }}>
        <span style={{
          fontSize: 35,
          marginRight: 15,
          filter: "drop-shadow(0 4px 12px #d4c1ff99)"
        }}>💠</span>
        MILION
        <div style={{ flex: 1 }} />
        <button
          style={{
            background: "none", border: "none", marginRight: 10, cursor: "pointer"
          }}
          onClick={() => setShowTheme(true)}
          title={TEXT[lang].select_theme}
        >{theme === "dark" ? ICONS.moon : ICONS.sun}</button>
        <button
          style={{
            background: "none", border: "none", marginRight: 6, cursor: "pointer"
          }}
          onClick={() => setShowLang(true)}
          title={TEXT[lang].select_lang}
        >{lang === "ru" ? ICONS.ru : ICONS.en}</button>
        <button
          style={{
            background: "none", border: "none", cursor: "pointer"
          }}
          onClick={() => setShowAsset(true)}
          title={TEXT[lang].select_asset}
        ><span style={{ fontSize: 21, color: asset.color }}>{asset.label}</span></button>
      </div>

      {/* Основная область (чтобы не улетало за экран на мобиле) */}
      <div style={{
        width: "100%",
        maxWidth: 440,
        minHeight: 580,
        margin: "0 auto",
        background: theme === "dark" ? "#191b23" : "#fff",
        borderRadius: 0,
        boxShadow: "0 10px 60px #21243b19",
        paddingBottom: 74,
        position: "relative"
      }}>

        {/* ——— ВКЛАДКА Баланс / Кошелёк ——— */}
        <AnimatePresence mode="wait">
          {tab === "wallet" && (
            <motion.div
              key="wallet"
              initial={{ opacity: 0, x: 70 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ type: "spring", duration: 0.47 }}
              style={{ padding: "26px 18px 0 18px", minHeight: 470 }}
            >
              {/* Welcome и Баннер */}
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 14 }}>
                {TEXT[lang].welcome}
              </div>
              <motion.div
                initial={{ scale: 0.95, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.32 }}
                style={{
                  background: "linear-gradient(90deg,#36fafe 10%,#765dff 100%)",
                  borderRadius: 19,
                  boxShadow: "0 2px 18px #765dff25",
                  color: "#232749",
                  fontWeight: 800,
                  fontSize: 24,
                  padding: "17px 28px",
                  marginBottom: 20,
                  display: "flex",
                  alignItems: "center"
                }}
              >
                {asset.label}
                <span style={{ fontSize: 28, marginLeft: 13, color: "#fff" }}>
                  {cards.reduce((sum, c) => sum + c.balance, 0).toLocaleString()} {asset.label}
                </span>
                <span style={{ flex: 1 }} />
                <button
                  style={{
                    background: "none", border: "none", cursor: "pointer", marginLeft: 10
                  }}
                  onClick={() => setShowSend(true)}
                  title={TEXT[lang].send}
                >{ICONS.send}</button>
              </motion.div>

              {/* Баннеры, акции, промо */}
              <div style={{ display: "flex", gap: 16, marginBottom: 23 }}>
                {banners.map(bn => (
                  <motion.div
                    key={bn.id}
                    initial={{ opacity: 0, y: 13 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 + bn.id * 0.09 }}
                    style={{
                      flex: 1,
                      background: bn.color,
                      color: "#fff",
                      borderRadius: 17,
                      boxShadow: "0 2px 18px #6d4aff25",
                      padding: "12px 14px",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <div style={{ marginRight: 10 }}>{bn.img}</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 15.7, marginBottom: 3 }}>{bn.title}</div>
                      <div style={{ fontWeight: 600, fontSize: 13.5, color: "#d8f2ff" }}>{bn.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Список карт (swipe) */}
              <div style={{
                display: "flex",
                gap: 17,
                overflowX: "auto",
                marginBottom: 22,
                paddingBottom: 3
              }}>
                {cards.map((card, idx) => (
                  <motion.div
                    key={card.id}
                    layout
                    initial={{ scale: 0.98, opacity: 0.7 }}
                    animate={{ scale: selectedCard === idx ? 1.04 : 1, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => { setTab("cards"); setSelectedCard(idx); }}
                    style={{
                      minWidth: 240,
                      background: card.color,
                      borderRadius: 20,
                      color: "#fff",
                      boxShadow: idx === selectedCard ? "0 4px 19px #765dff3b" : "0 2px 9px #6d4aff15",
                      padding: "22px 23px 15px 23px",
                      cursor: "pointer",
                      border: idx === selectedCard ? "3px solid #ffe45d" : "2px solid #e6e7f3",
                      position: "relative",
                      marginBottom: 4
                    }}
                  >
                    <div style={{
                      fontWeight: 800,
                      fontSize: 16,
                      opacity: 0.97,
                      marginBottom: 7,
                      letterSpacing: 1.3,
                      display: "flex", alignItems: "center"
                    }}>
                      {card.type}
                      <span style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#fff7",
                        marginLeft: 11,
                        borderRadius: 7,
                        padding: "2px 8px",
                        border: "1px solid #fff5",
                        background: "#fff3",
                        boxShadow: "0 0 6px #fff5"
                      }}>
                        {card.logo}
                      </span>
                    </div>
                    <div style={{
                      fontSize: 21,
                      fontFamily: "monospace",
                      letterSpacing: 2.3,
                      marginBottom: 7
                    }}>
                      {card.number}
                    </div>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: 13,
                      color: "#f2eecf"
                    }}>
                      <span>EXP: {card.expiry}</span>
                      <span style={{
                        fontWeight: 700,
                        background: "#3f395f51",
                        padding: "3px 10px",
                        borderRadius: 7,
                        fontSize: 13
                      }}>{card.balance.toLocaleString()} {asset.label}</span>
                    </div>
                    <div style={{
                      position: "absolute", left: 20, bottom: 10,
                      fontSize: 11, color: "#f5f4fa90", fontWeight: 600, letterSpacing: 1.1
                    }}>{card.name}</div>
                  </motion.div>
                ))}
              </div>

              {/* Кнопки действий */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 16,
                marginBottom: 18
              }}>
                <button style={{
                  flex: 1,
                  background: "linear-gradient(90deg,#6d4aff,#ffe45d)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 15,
                  fontWeight: 700,
                  fontSize: 15.5,
                  padding: "13px 0",
                  boxShadow: "0 2px 8px #b7b1ce22",
                  cursor: "pointer",
                  letterSpacing: 1
                }}
                onClick={() => setShowSend(true)}
                >
                  {TEXT[lang].send}
                </button>
                <button style={{
                  flex: 1,
                  background: "#fff",
                  color: "#6d4aff",
                  border: "2px solid #6d4aff",
                  borderRadius: 15,
                  fontWeight: 700,
                  fontSize: 15.5,
                  padding: "13px 0",
                  boxShadow: "0 2px 8px #b7b1ce12",
                  cursor: "pointer",
                  letterSpacing: 1
                }}
                onClick={() => push(TEXT[lang].push_cashback, "success")}
                >
                  {TEXT[lang].cashback}
                </button>
              </div>
              <div style={{ fontSize: 12.5, color: "#b4b8cb", marginTop: 12 }}>
                Ваши деньги под надёжной защитой <br />и доступны в любой момент.
              </div>
            </motion.div>
          )}

          {/* ——— ВКЛАДКА Карты ——— */}
          {tab === "cards" && (
            <motion.div
              key="cards"
              initial={{ opacity: 0, x: 70 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ type: "spring", duration: 0.45 }}
              style={{ padding: "26px 18px 0 18px", minHeight: 470 }}
            >
              <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 13 }}>
                {TEXT[lang].choose_card}
              </div>
              <div style={{
                display: "flex", gap: 16, overflowX: "auto", marginBottom: 14, paddingBottom: 2
              }}>
                {cards.map((card, idx) => (
                  <motion.div
                    key={card.id}
                    layout
                    initial={{ scale: 0.95, opacity: 0.7 }}
                    animate={{ scale: selectedCard === idx ? 1.04 : 1, opacity: 1 }}
                    transition={{ duration: 0.22 }}
                    onClick={() => setSelectedCard(idx)}
                    style={{
                      minWidth: 210,
                      background: card.color,
                      color: "#fff",
                      borderRadius: 20,
                      boxShadow: idx === selectedCard ? "0 4px 19px #765dff3b" : "0 2px 9px #6d4aff15",
                      padding: "22px 20px 15px 20px",
                      cursor: "pointer",
                      border: idx === selectedCard ? "3px solid #ffe45d" : "2px solid #e6e7f3",
                      position: "relative",
                      marginBottom: 2
                    }}
                  >
                    <div style={{
                      fontWeight: 800,
                      fontSize: 15,
                      opacity: 0.97,
                      marginBottom: 7,
                      letterSpacing: 1.1,
                      display: "flex", alignItems: "center"
                    }}>
                      {card.type}
                      <span style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#fff7",
                        marginLeft: 9,
                        borderRadius: 7,
                        padding: "2px 7px",
                        border: "1px solid #fff5",
                        background: "#fff3",
                        boxShadow: "0 0 6px #fff5"
                      }}>
                        {card.logo}
                      </span>
                    </div>
                    <div style={{
                      fontSize: 18,
                      fontFamily: "monospace",
                      letterSpacing: 2.1,
                      marginBottom: 7
                    }}>
                      {card.number}
                    </div>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: 13,
                      color: "#f2eecf"
                    }}>
                      <span>EXP: {card.expiry}</span>
                      <span style={{
                        fontWeight: 700,
                        background: "#3f395f51",
                        padding: "3px 10px",
                        borderRadius: 7,
                        fontSize: 13
                      }}>{card.balance.toLocaleString()} {asset.label}</span>
                    </div>
                    <div style={{
                      position: "absolute", left: 20, bottom: 10,
                      fontSize: 11, color: "#f5f4fa90", fontWeight: 600, letterSpacing: 1.1
                    }}>{card.name}</div>
                  </motion.div>
                ))}
              </div>
              <button style={{
                padding: "12px 0", width: "100%",
                background: "#6d4aff",
                color: "#fff",
                border: "none",
                borderRadius: 15,
                fontWeight: 700,
                fontSize: 16,
                boxShadow: "0 2px 8px #6d4aff24",
                cursor: "pointer",
                letterSpacing: 1
              }}
              onClick={() => push(TEXT[lang].push_cashback, "success")}
              >
                + {TEXT[lang].cards}
              </button>
            </motion.div>
          )}

          {/* ——— ВКЛАДКА История ——— */}
          {tab === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: 70 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ type: "spring", duration: 0.45 }}
              style={{ padding: "26px 18px 0 18px", minHeight: 470 }}
            >
              <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 13 }}>
                {TEXT[lang].history}
              </div>
              {history.length === 0 && (
                <div style={{
                  color: "#b3bacb",
                  textAlign: "center",
                  marginTop: 70,
                  fontSize: 19
                }}>
                  {TEXT[lang].history_empty}
                </div>
              )}
              {history.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 13 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.19 + item.id * 0.05 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 13,
                    padding: "9px 0",
                    borderBottom: "1px solid #e8e9f3"
                  }}
                >
                  <div style={{
                    fontWeight: 700,
                    color: item.sum.includes("+") ? "#50bb61" : "#d34c4c",
                    fontSize: 16,
                    marginRight: 14,
                    minWidth: 32,
                    textAlign: "center"
                  }}>
                    {item.type[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{item.type}</div>
                    <div style={{ fontSize: 13.5, color: "#b1b1be" }}>{item.desc}</div>
                  </div>
                  <div style={{
                    minWidth: 90, textAlign: "right",
                    fontWeight: 700,
                    color: item.sum.includes("+") ? "#50bb61" : "#d34c4c",
                    fontSize: 15
                  }}>
                    {item.sum}
                    <div style={{
                      fontSize: 11, fontWeight: 400, color: "#b1b1b6"
                    }}>{item.date}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* ——— ВКЛАДКА Промо / Бонусы ——— */}
          {tab === "promo" && (
            <motion.div
              key="promo"
              initial={{ opacity: 0, x: 70 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ type: "spring", duration: 0.45 }}
              style={{ padding: "26px 18px 0 18px", minHeight: 470 }}
            >
              <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 13 }}>
                {TEXT[lang].promo}
              </div>
              <motion.div
                initial={{ scale: 0.93, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.28 }}
                style={{
                  background: "linear-gradient(90deg,#ffe45d 10%,#6d4aff 100%)",
                  borderRadius: 19,
                  boxShadow: "0 2px 18px #6d4aff25",
                  color: "#232749",
                  fontWeight: 800,
                  fontSize: 21,
                  padding: "17px 28px",
                  marginBottom: 19,
                  display: "flex",
                  alignItems: "center"
                }}
              >
                {ICONS.trophy}
                <span style={{ marginLeft: 16 }}>
                  {TEXT[lang].bonus}: 1200 {asset.label}
                </span>
              </motion.div>
              <div style={{
                fontSize: 15, fontWeight: 600, color: "#6d4aff", marginBottom: 13
              }}>
                {TEXT[lang].promo_today}
              </div>
              <ul>
                <li style={{ marginBottom: 8 }}>🔥 -20% {TEXT[lang].cashback} на все пополнения!</li>
                <li style={{ marginBottom: 8 }}>🎁 Розыгрыш NFT среди активных пользователей</li>
                <li>🏆 Бонус 500 {asset.label} за каждого друга!</li>
              </ul>
              <div style={{
                marginTop: 18, fontSize: 13, color: "#b4b8cb"
              }}>
                Условия акций обновляются ежедневно.
              </div>
            </motion.div>
          )}

          {/* ——— ВКЛАДКА Профиль ——— */}
          {tab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 70 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ type: "spring", duration: 0.45 }}
              style={{ padding: "26px 18px 0 18px", minHeight: 470, textAlign: "center" }}
            >
              <div style={{
                width: 96, height: 96, borderRadius: "50%",
                background: "linear-gradient(120deg,#ffe45d,#6d4aff 80%)",
                margin: "0 auto 14px auto", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 16px #6d4aff11"
              }}>
                <img src={AVATAR} alt="ava" style={{ width: 67, height: 67, borderRadius: "50%" }} />
              </div>
              <div style={{ fontSize: 21, fontWeight: 800, color: "#363b49", marginBottom: 3 }}>{TEXT[lang].user}</div>
              <div style={{ fontSize: 13, color: "#b4b8cb", marginTop: 2 }}>@agent_sbu</div>
              <div style={{
                margin: "32px 0 0 0",
                fontSize: 14, color: "#b4b8cb"
              }}>
                Кошелек работает с 2024 года<br />
                <span style={{ fontWeight: 700, color: "#6d4aff" }}>Премиум</span> поддержка и максимальная защита.
              </div>
              <div style={{
                marginTop: 22, display: "flex", justifyContent: "center", gap: 16
              }}>
                <button
                  style={{
                    background: "#e8eafd", color: "#363b49", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 700, fontSize: 15, cursor: "pointer"
                  }}
                  onClick={() => setShowTheme(true)}
                >{TEXT[lang].theme_switch}</button>
                <button
                  style={{
                    background: "#e8eafd", color: "#363b49", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 700, fontSize: 15, cursor: "pointer"
                  }}
                  onClick={() => setShowAsset(true)}
                >{TEXT[lang].currency}</button>
              </div>
              <div style={{ marginTop: 28, color: "#b4b8cb", fontSize: 13 }}>
                <div>Ref: <span style={{ color: "#6d4aff", fontWeight: 700 }}>t.me/milion_wallet</span></div>
                <button
                  style={{
                    marginTop: 8,
                    background: "#fff",
                    color: "#6d4aff",
                    border: "2px solid #6d4aff",
                    borderRadius: 13,
                    fontWeight: 700,
                    fontSize: 15,
                    padding: "7px 19px",
                    boxShadow: "0 2px 8px #b7b1ce12",
                    cursor: "pointer",
                    letterSpacing: 1
                  }}
                  onClick={() => copyLink("https://t.me/milion_wallet")}
                >{TEXT[lang].copy_ref}</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Модальное окно перевода */}
        <AnimatePresence>
          {showSend && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "fixed", left: 0, top: 0, width: "100vw", height: "100vh",
                background: "rgba(25,27,33,0.20)", zIndex: 25, display: "flex", alignItems: "center", justifyContent: "center"
              }}
              onClick={() => setShowSend(false)}
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                style={{
                  background: theme === "dark" ? "#232749" : "#fff",
                  borderRadius: 16,
                  padding: 26,
                  minWidth: 320,
                  boxShadow: "0 4px 32px #181a2044"
                }}
              >
                <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 15, color: "#6d4aff" }}>
                  {TEXT[lang].send}
                </div>
                <input
                  placeholder={TEXT[lang].send_amount}
                  value={sendSum}
                  onChange={e => setSendSum(e.target.value.replace(/[^0-9.]/g, ""))}
                  style={{
                    width: "100%", padding: "13px 11px", borderRadius: 11,
                    border: "1.5px solid #e2e3ef", fontSize: 16, marginBottom: 13,
                    outline: "none", background: "#fff", fontWeight: 600, color: "#2d3344"
                  }}
                />
                <input
                  placeholder="Получатель (юзернейм, ID)"
                  value={sendTo}
                  onChange={e => setSendTo(e.target.value)}
                  style={{
                    width: "100%", padding: "13px 11px", borderRadius: 11,
                    border: "1.5px solid #e2e3ef", fontSize: 16, marginBottom: 12,
                    outline: "none", background: "#fff", fontWeight: 600, color: "#2d3344"
                  }}
                />
                <div style={{
                  display: "flex", gap: 12, marginTop: 6
                }}>
                  <button
                    style={{
                      flex: 1,
                      background: "#6d4aff",
                      color: "#fff",
                      border: "none",
                      borderRadius: 12,
                      fontWeight: 700,
                      fontSize: 16,
                      padding: "12px 0",
                      boxShadow: "0 2px 8px #6d4aff24",
                      cursor: "pointer",
                      letterSpacing: 1
                    }}
                    onClick={sendMoney}
                  >{TEXT[lang].confirm}</button>
                  <button
                    style={{
                      flex: 1,
                      background: "#fff",
                      color: "#6d4aff",
                      border: "2px solid #6d4aff",
                      borderRadius: 12,
                      fontWeight: 700,
                      fontSize: 16,
                      padding: "12px 0",
                      boxShadow: "0 2px 8px #b7b1ce12",
                      cursor: "pointer",
                      letterSpacing: 1
                    }}
                    onClick={() => setShowSend(false)}
                  >{TEXT[lang].cancel}</button>
                </div>
                {sendSuccess && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1.08, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    style={{
                      color: "#47e3c9",
                      fontWeight: 800,
                      fontSize: 17,
                      textAlign: "center",
                      marginTop: 13
                    }}
                  >{TEXT[lang].send_success}</motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom-Menu */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100vw",
        maxWidth: 440,
        margin: "0 auto",
        background: theme === "dark"
          ? "linear-gradient(90deg, #181a20 65%,#353861 120%)"
          : "linear-gradient(90deg,#f2f3fa 65%,#6d4aff 120%)",
        boxShadow: "0 -2px 18px #21243b22",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        zIndex: 50,
        padding: "0 8px"
      }}>
        {TABS.map(tabItem => (
          <button
            key={tabItem.key}
            onClick={() => setTab(tabItem.key)}
            style={{
              flex: 1,
              border: "none",
              background: "none",
              color: tab === tabItem.key ? "#36fafe" : "#8b92b9",
              fontWeight: tab === tabItem.key ? 800 : 600,
              fontSize: 14,
              padding: "13px 2px 9px 2px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              transition: "color .17s"
            }}
          >
            <span style={{
              marginBottom: 1,
              fontSize: 22,
              filter: tab === tabItem.key
                ? "drop-shadow(0 2px 10px #6d4aff77)"
                : "none"
            }}>{tabItem.icon}</span>
            {tabItem.label}
          </button>
        ))}
      </div>
    </div>
  );
}
