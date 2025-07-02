import React, { useState } from "react";

// "Банковский" шрифт через Google Fonts CDN
const customFont = document.createElement("link");
customFont.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Open+Sans:wght@400;600;700&display=swap";
customFont.rel = "stylesheet";
document.head.appendChild(customFont);

const TABS = [
  { label: "Главная", value: "main" },
  { label: "Карты", value: "cards" },
  { label: "История", value: "history" },
  { label: "Аналитика", value: "analytics" },
  { label: "Пополнить", value: "topup" },
  { label: "Профиль", value: "profile" }
];

const fakeCards = [
  {
    id: 1,
    number: "5336 2410 8956 6521",
    type: "Visa",
    name: "ANTON KUGOP",
    expiry: "09/28",
    balance: "₽ 36 900",
    color: "linear-gradient(120deg, #363b49 50%, #765dff 100%)",
    chip: true
  },
  {
    id: 2,
    number: "4242 1812 3478 4352",
    type: "Mastercard",
    name: "ANTON KUGOP",
    expiry: "11/27",
    balance: "₽ 6 420",
    color: "linear-gradient(120deg,#e7e9ed 30%, #d8c168 100%)",
    chip: false
  }
];

const fakeHistory = [
  { id: 1, type: "Пополнение", desc: "Сбербанк", sum: "+ 20 000 ₽", date: "2025-07-02", status: "success" },
  { id: 2, type: "Перевод", desc: "Евгений С.", sum: "- 3 400 ₽", date: "2025-07-01", status: "success" },
  { id: 3, type: "Оплата", desc: "Wildberries", sum: "- 1 990 ₽", date: "2025-06-29", status: "pending" },
  { id: 4, type: "Кэшбек", desc: "Пятёрочка", sum: "+ 120 ₽", date: "2025-06-25", status: "success" }
];

const fakeAnalytics = {
  month: "Июль",
  total: 41000,
  income: 22000,
  outcome: 8700,
  byCategory: [
    { label: "Покупки", percent: 48 },
    { label: "Переводы", percent: 27 },
    { label: "Кэшбек", percent: 7 },
    { label: "Сервисы", percent: 18 }
  ]
};

export default function App() {
  const [tab, setTab] = useState("main");
  const [cardIdx, setCardIdx] = useState(0);

  return (
    <div
      style={{
        maxWidth: 410,
        margin: "40px auto",
        borderRadius: 26,
        background: "#f9fafd",
        fontFamily: "'Inter','Open Sans',Arial,sans-serif",
        boxShadow: "0 12px 56px 0 rgba(34,44,84,0.15)",
        border: "1.5px solid #eaeaf5",
        overflow: "hidden",
        minHeight: 680
      }}
    >
      {/* Header: строгий, минимальный */}
      <div style={{
        background: "linear-gradient(90deg,#353861 65%,#6d4aff 120%)",
        color: "#fff",
        padding: "26px 32px 20px 32px",
        fontSize: 27,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        letterSpacing: 1
      }}>
        <span style={{
          fontSize: 34,
          marginRight: 14,
          filter: "drop-shadow(0 3px 12px #9d87f9)"
        }}>💠</span>
        ПРИВЕТ МАМЕ"
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex",
        borderBottom: "1.5px solid #f2f3fa",
        background: "#f6f8fd"
      }}>
        {TABS.map((item) => (
          <div
            key={item.value}
            onClick={() => setTab(item.value)}
            style={{
              flex: 1,
              padding: "16px 0 7px 0",
              textAlign: "center",
              cursor: "pointer",
              fontWeight: tab === item.value ? 700 : 500,
              fontSize: tab === item.value ? 17.2 : 16.2,
              color: tab === item.value ? "#363b49" : "#b7bace",
              borderBottom: tab === item.value ? "2.5px solid #6d4aff" : "2.5px solid transparent",
              background: tab === item.value ? "#fff" : "transparent",
              letterSpacing: tab === item.value ? 0.5 : 0.2,
              transition: "all .2s"
            }}
          >
            {item.label}
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: 30, minHeight: 410 }}>
        {/* Главная */}
        {tab === "main" && (
          <div>
            <div style={{ fontSize: 17, color: "#535874", fontWeight: 600, marginBottom: 9 }}>
              Баланс всех счетов
            </div>
            <div style={{
              fontSize: 41,
              fontWeight: 800,
              color: "#363b49",
              marginBottom: 22,
              letterSpacing: 2
            }}>
              43 320 ₽
            </div>
            <div style={{ marginBottom: 30 }}>
              {fakeCards.map((card, idx) => (
                <div
                  key={card.id}
                  onClick={() => {
                    setTab("cards");
                    setCardIdx(idx);
                  }}
                  style={{
                    background: card.color,
                    borderRadius: 22,
                    color: "#fff",
                    boxShadow: "0 3px 20px #35386127",
                    padding: "17px 23px 16px 23px",
                    marginBottom: 14,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform .13s",
                    border: idx === cardIdx ? "2.5px solid #ffe45d" : "2px solid #e6e7f3"
                  }}
                >
                  <div style={{
                    fontSize: 14,
                    fontWeight: 700,
                    opacity: 0.92,
                    letterSpacing: 1.1,
                    marginBottom: 7,
                    display: "flex", alignItems: "center"
                  }}>
                    {card.chip && <span style={{
                      display: "inline-block",
                      width: 18, height: 13,
                      background: "linear-gradient(150deg,#fffae4,#cfcfcf 80%)",
                      borderRadius: 4, marginRight: 8,
                      border: "1px solid #d9d5b1", boxShadow: "0 0 2px #fff9"
                    }}></span>}
                    {card.type}
                  </div>
                  <div style={{
                    fontSize: 22, fontFamily: "monospace",
                    letterSpacing: 2.3,
                    marginBottom: 8
                  }}>
                    {card.number}
                  </div>
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center"
                  }}>
                    <div style={{ fontSize: 12, color: "#f4f6fa" }}>Срок: {card.expiry}</div>
                    <div style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#fff",
                      background: "#3f395f7e",
                      padding: "3px 11px",
                      borderRadius: 8
                    }}>
                      {card.balance}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 18,
              marginBottom: 18
            }}>
              <button style={{
                flex: 1,
                background: "linear-gradient(90deg,#6d4aff,#ffe45d)",
                color: "#fff",
                border: "none",
                borderRadius: 16,
                fontWeight: 700,
                fontSize: 15.5,
                padding: "13px 0",
                boxShadow: "0 2px 8px #b7b1ce22",
                cursor: "pointer",
                letterSpacing: 1
              }}>
                Пополнить
              </button>
              <button style={{
                flex: 1,
                background: "#fff",
                color: "#6d4aff",
                border: "2px solid #6d4aff",
                borderRadius: 16,
                fontWeight: 700,
                fontSize: 15.5,
                padding: "13px 0",
                boxShadow: "0 2px 8px #b7b1ce12",
                cursor: "pointer",
                letterSpacing: 1
              }}>
                Перевести
              </button>
            </div>
            <div style={{ fontSize: 13, color: "#b4b8cb", marginTop: 22 }}>
              Ваши деньги под надёжной защитой<br />и доступны в любой момент.
            </div>
          </div>
        )}

        {/* Карты */}
        {tab === "cards" && (
          <div>
            <div style={{
              fontSize: 17, color: "#535874", fontWeight: 700, marginBottom: 18
            }}>Виртуальные карты</div>
            <div style={{
              display: "flex", gap: 20, overflowX: "auto", marginBottom: 28
            }}>
              {fakeCards.map((card, idx) => (
                <div
                  key={card.id}
                  onClick={() => setCardIdx(idx)}
                  style={{
                    minWidth: 240,
                    background: card.color,
                    color: "#fff",
                    borderRadius: 22,
                    boxShadow: idx === cardIdx ? "0 4px 19px #765dff3b" : "0 2px 9px #6d4aff15",
                    padding: "24px 22px 18px 22px",
                    cursor: "pointer",
                    border: idx === cardIdx ? "3px solid #ffe45d" : "2px solid #e6e7f3",
                    position: "relative",
                    transition: "all .19s"
                  }}
                >
                  <div style={{
                    fontWeight: 800,
                    fontSize: 16,
                    opacity: 0.95,
                    marginBottom: 9,
                    letterSpacing: 1.2,
                    display: "flex", alignItems: "center"
                  }}>
                    {card.type}
                    <span style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#fff7",
                      marginLeft: 11,
                      borderRadius: 7,
                      padding: "2px 7px",
                      border: "1px solid #fff5",
                      background: "#fff3",
                      boxShadow: "0 0 6px #fff5"
                    }}>
                      {card.chip ? "CHIP" : "VIRTUAL"}
                    </span>
                  </div>
                  <div style={{
                    fontSize: 22,
                    fontFamily: "monospace",
                    letterSpacing: 2.3,
                    marginBottom: 11
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
                    }}>{card.balance}</span>
                  </div>
                  <div style={{
                    position: "absolute", left: 20, bottom: 12,
                    fontSize: 11, color: "#f5f4fa90", fontWeight: 600, letterSpacing: 1.1
                  }}>{card.name}</div>
                </div>
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
            }}>
              + Выпустить новую карту
            </button>
          </div>
        )}

        {/* История */}
        {tab === "history" && (
          <div>
            <div style={{
              fontSize: 17, color: "#535874", fontWeight: 700, marginBottom: 19
            }}>История операций</div>
            {fakeHistory.map((item) => (
              <div key={item.id} style={{
                display: "flex", alignItems: "center", marginBottom: 13, padding: "8px 0",
                borderBottom: "1px solid #e8e9f3"
              }}>
                <div style={{
                  fontWeight: 700,
                  color: item.status === "success" ? "#50bb61" : "#b2a14e",
                  fontSize: 17, marginRight: 18, minWidth: 32, textAlign: "center"
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
              </div>
            ))}
            {fakeHistory.length === 0 && (
              <div style={{ color: "#b3bacb", textAlign: "center", marginTop: 70, fontSize: 19 }}>
                Нет операций
              </div>
            )}
          </div>
        )}

        {/* Аналитика */}
        {tab === "analytics" && (
          <div>
            <div style={{
              fontSize: 17, color: "#535874", fontWeight: 700, marginBottom: 20
            }}>Аналитика за {fakeAnalytics.month}</div>
            <div style={{
              display: "flex", justifyContent: "space-between", marginBottom: 22
            }}>
              <div style={{
                background: "#f4f6ff",
                borderRadius: 18,
                padding: "16px 22px",
                textAlign: "center",
                flex: 1, marginRight: 13,
                boxShadow: "0 2px 6px #fff3"
              }}>
                <div style={{ fontWeight: 800, color: "#50bb61", fontSize: 19 }}>+{fakeAnalytics.income} ₽</div>
                <div style={{ fontSize: 13, color: "#b4b8cb" }}>Поступления</div>
              </div>
              <div style={{
                background: "#fff5f6",
                borderRadius: 18,
                padding: "16px 22px",
                textAlign: "center",
                flex: 1,
                boxShadow: "0 2px 6px #ffc80115"
              }}>
                <div style={{ fontWeight: 800, color: "#d34c4c", fontSize: 19 }}>-{fakeAnalytics.outcome} ₽</div>
                <div style={{ fontSize: 13, color: "#b4b8cb" }}>Расходы</div>
              </div>
            </div>
            <div style={{ fontWeight: 700, color: "#b4b8cb", fontSize: 15, marginBottom: 9 }}>По категориям</div>
            <div>
              {fakeAnalytics.byCategory.map(cat => (
                <div key={cat.label} style={{
                  display: "flex", alignItems: "center", marginBottom: 11
                }}>
                  <div style={{
                    width: 15, height: 15, borderRadius: "50%", background: "#6d4aff", marginRight: 10,
                    opacity: 0.5 + cat.percent/200
                  }}></div>
                  <div style={{
                    fontWeight: 700, color: "#6d4aff", flex: 1, fontSize: 14
                  }}>{cat.label}</div>
                  <div style={{
                    fontWeight: 600, color: "#aaa", fontSize: 13
                  }}>{cat.percent}%</div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 20,
              textAlign: "center",
              fontSize: 13,
              color: "#b4b8cb"
            }}>
              Все траты и поступления<br />автоматически сортируются по категориям
            </div>
          </div>
        )}

        {/* Пополнение */}
        {tab === "topup" && (
          <div>
            <div style={{
              fontSize: 17, color: "#535874", fontWeight: 700, marginBottom: 19
            }}>Пополнить кошелек</div>
            <div style={{
              background: "#f5f6fa", borderRadius: 16, padding: 20, marginBottom: 21
            }}>
              <input placeholder="Сумма, ₽"
                style={{
                  width: "96%", padding: "14px 12px", borderRadius: 11,
                  border: "1.5px solid #e2e3ef", fontSize: 16, marginBottom: 13,
                  outline: "none", background: "#fff", fontWeight: 600, color: "#2d3344"
                }}
              /><br />
              <input placeholder="Карта отправителя"
                style={{
                  width: "96%", padding: "14px 12px", borderRadius: 11,
                  border: "1.5px solid #e2e3ef", fontSize: 16, marginBottom: 11,
                  outline: "none", background: "#fff", fontWeight: 600, color: "#2d3344"
                }}
              />
            </div>
            <button style={{
              padding: "13px 0", width: "100%",
              background: "#6d4aff",
              color: "#fff",
              border: "none",
              borderRadius: 15,
              fontWeight: 700,
              fontSize: 16,
              boxShadow: "0 2px 8px #6d4aff24",
              cursor: "pointer",
              letterSpacing: 1
            }}>
              Пополнить кошелек
            </button>
            <div style={{ fontSize: 12, color: "#b4b8cb", marginTop: 17 }}>
              Данные защищены — 256-bit SSL, банковский стандарт безопасности.
            </div>
          </div>
        )}

        {/* Профиль */}
        {tab === "profile" && (
          <div style={{ textAlign: "center", paddingTop: 10 }}>
            <div style={{
              width: 90, height: 90, borderRadius: "50%",
              background: "linear-gradient(120deg,#ffe45d,#6d4aff 80%)",
              margin: "0 auto 14px auto", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 16px #6d4aff11"
            }}>
              <span style={{ fontSize: 41, fontWeight: 600, color: "#353861" }}>A</span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#363b49" }}>Anton Kugop</div>
            <div style={{ fontSize: 13, color: "#b4b8cb", marginTop: 4 }}>@telegramusername</div>
            <div style={{
              margin: "32px 0 0 0",
              fontSize: 14, color: "#b4b8cb"
            }}>
              Кошелек работает с 2024 года<br />
              <span style={{ fontWeight: 700, color: "#6d4aff" }}>Премиум</span> поддержка и максимальная защита.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
