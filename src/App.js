import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Импорт шрифтов
const font = document.createElement("link");
font.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap";
font.rel = "stylesheet";
document.head.appendChild(font);

// CDN иконки
const icons = {
  visa: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
  mc: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  sol: "https://cryptologos.cc/logos/solana-sol-logo.png?v=032",
  settings: "https://cdn-icons-png.flaticon.com/512/3524/3524636.png",
  ref: "https://cdn-icons-png.flaticon.com/512/3524/3524669.png",
  trade: "https://cdn-icons-png.flaticon.com/512/3524/3524616.png",
  research: "https://cdn-icons-png.flaticon.com/512/3524/3524626.png",
  wallet: "https://cdn-icons-png.flaticon.com/512/3524/3524638.png",
  bridge: "https://cdn-icons-png.flaticon.com/512/6647/6647491.png",
  deposit: "https://cdn-icons-png.flaticon.com/512/3190/3190420.png",
  send: "https://cdn-icons-png.flaticon.com/512/3126/3126589.png"
};

const TABS = [
  { value: "wallet", label: "Кошелек", icon: icons.wallet },
  { value: "research", label: "Исследования", icon: icons.research },
  { value: "trade", label: "Торговля", icon: icons.trade },
  { value: "ref", label: "Рефералы", icon: icons.ref },
  { value: "settings", label: "Настройки", icon: icons.settings }
];

const fakeCards = [
  {
    id: 1,
    number: "5536 2410 8956 6521",
    type: "Visa",
    name: "Anton Kugop",
    expiry: "09/28",
    balance: "$1,840",
    logo: icons.visa,
    color: "linear-gradient(130deg, #4341B3 50%, #8e72e9 100%)"
  },
  {
    id: 2,
    number: "5355 1812 3478 4382",
    type: "Mastercard",
    name: "Anton Kugop",
    expiry: "11/28",
    balance: "$540",
    logo: icons.mc,
    color: "linear-gradient(120deg, #a39064 60%, #f8d58e 100%)"
  }
];

const history = [
  { id: 1, type: "Депозит", desc: "Binance", sum: "+ $2,000", date: "2025-07-02" },
  { id: 2, type: "Отправка", desc: "Eugene S.", sum: "- $140", date: "2025-07-01" },
  { id: 3, type: "Мост", desc: "SOL → TON", sum: "- $40", date: "2025-06-29" },
  { id: 4, type: "Кэшбек", desc: "Wildberries", sum: "+ $10", date: "2025-06-28" }
];

export default function App() {
  const [tab, setTab] = useState("wallet");
  const [cardIdx, setCardIdx] = useState(0);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #21243b 0%, #181a20 90%)",
      fontFamily: "'Inter', Arial, sans-serif",
      color: "#fff"
    }}>
      {/* Header */}
      <div style={{
        width: "100vw",
        background: "linear-gradient(90deg, #242749 90%, #181a20 100%)",
        minHeight: 84,
        padding: "0 0 0 0",
        borderBottom: "1px solid #222437"
      }}>
        <div style={{
          maxWidth: 1180,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 36px 0 16px"
        }}>
          {/* Лого */}
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <img src={icons.sol} alt="" style={{width:36,height:36,marginRight:2}}/>
            <span style={{fontSize:25,fontWeight:800,letterSpacing:1.2, color:"#9fffd4"}}>SOL</span>
          </div>
          <div style={{fontWeight:700,fontSize:19,letterSpacing:0.5, color:"#a6bfff"}}>
            <span style={{opacity:0.75}}>SOL</span> <span style={{fontWeight:400, fontSize:16}}>▼</span>
          </div>
          <motion.div whileTap={{scale:0.92}} style={{
            background:"#23294a",
            borderRadius:"50%",
            padding:9,
            border:"1.5px solid #23294a",
            cursor:"pointer",
            boxShadow:"0 2px 12px #22243720"
          }}>
            <img src={icons.avatar} alt="avatar" style={{width:28,height:28,borderRadius:"50%"}} />
          </motion.div>
        </div>
      </div>

      {/* Main block (animated) */}
      <AnimatePresence mode="wait">
      <motion.div
        key={tab}
        initial={{opacity:0, y:15}}
        animate={{opacity:1, y:0}}
        exit={{opacity:0, y:-10}}
        transition={{duration:0.32}}
        style={{
          maxWidth: 1150,
          margin: "0 auto",
          padding: "38px 22px 110px 22px",
          minHeight: 690
        }}
      >
        {/* WALLET */}
        {tab === "wallet" && (
          <div>
            {/* Account header */}
            <div style={{
              display:"flex",
              alignItems:"center",
              gap:24,
              marginBottom:26
            }}>
              <motion.img
                src={icons.avatar}
                alt="avatar"
                style={{
                  width:70, height:70, borderRadius:"50%",
                  objectFit:"cover",
                  border:"2.5px solid #23243a",
                  boxShadow:"0 4px 22px #23243a60"
                }}
                whileHover={{scale:1.04}}
                whileTap={{scale:0.98}}
              />
              <div>
                <div style={{fontWeight:800,fontSize:22,marginBottom:2}}>SOL Account 1</div>
                <div style={{fontSize:15.2,opacity:0.67,letterSpacing:0.3,marginBottom:2}}>
                  AkEB...JNV5 <span style={{fontSize:16,verticalAlign:"middle"}}>📋</span>
                </div>
                <div style={{fontWeight:800,fontSize:37,marginTop:3,letterSpacing:1.5, color:"#fff"}}>
                  $0
                </div>
              </div>
            </div>
            {/* Actions */}
            <div style={{
              display:"flex",
              gap:24,
              marginBottom:38,
              justifyContent:"center"
            }}>
              {[
                {label:"Мост", icon: icons.bridge},
                {label:"Депозит", icon: icons.deposit},
                {label:"Отправить", icon: icons.send}
              ].map((btn,i)=>(
                <motion.button
                  key={btn.label}
                  whileTap={{scale:0.95}}
                  style={{
                    flex:1,
                    background: "linear-gradient(90deg, #2d325b 0%, #1e2341 100%)",
                    border: "none",
                    borderRadius: 16,
                    color: "#c2d4ff",
                    fontWeight: 800,
                    fontSize: 18,
                    minWidth: 165,
                    padding: "21px 0 13px 0",
                    margin: "0 7px",
                    boxShadow: "0 2px 15px #191b2333",
                    cursor: "pointer",
                    letterSpacing: 1,
                    display:"flex", flexDirection:"column", alignItems:"center",
                    gap:8,
                    transition:"all .13s"
                  }}>
                  <img src={btn.icon} alt="" style={{width:29,marginBottom:4}}/>
                  <span style={{color:"#fff",fontWeight:900}}>{btn.label}</span>
                </motion.button>
              ))}
            </div>
            {/* Cards */}
            <div style={{fontWeight:800, fontSize:21, margin:"0 0 20px 5px", color:"#b8c8fd"}}>
              Виртуальные карты
            </div>
            <div style={{
              display: "flex",
              gap: 36,
              flexWrap: "wrap"
            }}>
              {fakeCards.map((card, idx) => (
                <motion.div
                  key={card.id}
                  initial={{scale:0.98,opacity:0}}
                  animate={{scale:1,opacity:1}}
                  whileHover={{scale:1.028,boxShadow:"0 4px 24px #181a2045"}}
                  transition={{type:"spring",stiffness:240,damping:17}}
                  style={{
                    minWidth: 328,
                    minHeight: 190,
                    background: card.color,
                    borderRadius: 19,
                    color: "#fff",
                    boxShadow: idx === cardIdx
                      ? "0 6px 28px #aa97ff49"
                      : "0 2px 11px #2a263d26",
                    padding: "26px 24px 18px 24px",
                    cursor: "pointer",
                    border: idx === cardIdx
                      ? "2.8px solid #36fafe"
                      : "2.2px solid #23243a",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                  onClick={() => setCardIdx(idx)}
                >
                  <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <img src={card.logo} alt={card.type} style={{
                      width:42,height:22,marginRight:0,objectFit:"contain"
                    }}/>
                    <span style={{
                      fontWeight:700,fontSize:15.2,opacity:0.91
                    }}>{card.type}</span>
                  </div>
                  <div style={{
                    fontSize: 24,
                    fontWeight: 800,
                    fontFamily: "monospace",
                    letterSpacing: 1.4,
                    margin: "14px 0 10px 0"
                  }}>
                    {card.number}
                  </div>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end"
                  }}>
                    <div>
                      <div style={{ fontSize: 13.3, color: "#c5c5de" }}>EXP: {card.expiry}</div>
                      <div style={{ fontWeight: 800, fontSize: 15.5, marginTop: 2 }}>{card.name}</div>
                    </div>
                    <div style={{
                      fontWeight: 900,
                      fontSize: 18,
                      color: "#fff",
                      background: "#23243a90",
                      padding: "8px 19px",
                      borderRadius: 11,
                      marginLeft: 16,
                      boxShadow: "0 2px 9px #23243a22"
                    }}>{card.balance}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        {/* Остальные вкладки: реализованы как в лучших финтех-приложениях */}
        {tab === "research" && (
          <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{duration:0.34}}>
            <div style={{fontWeight:900, fontSize:25, color:"#a5f5f9", marginBottom:17}}>Исследования</div>
            <div style={{
              background:"#22243a",
              borderRadius:17,
              padding:"23px 22px",
              marginBottom:17,
              boxShadow: "0 2px 12px #23273a40"
            }}>
              <div style={{fontWeight:700, fontSize:17.3, marginBottom: 9}}>Топ криптовалют</div>
              <div style={{display:"flex",gap:23}}>
                {["BTC", "ETH", "TON", "SOL"].map((coin,i)=>(
                  <div key={coin} style={{fontSize:18.5, fontWeight:900, color:"#36fafe",display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <span style={{fontSize:32,marginBottom:3}}>{coin==="BTC"?"₿":coin==="ETH"?"Ξ":coin==="TON"?"⧫":"◎"}</span>
                    {coin}
                  </div>
                ))}
              </div>
            </div>
            <div style={{fontWeight:900, fontSize:18, marginBottom:11, color:"#b3bfff"}}>Новости и аналитика</div>
            <div style={{
              background: "#23273a",
              borderRadius: 15,
              padding: "17px 22px",
              marginBottom: 17,
              color:"#b2e7fd"
            }}>
              <div style={{fontWeight:800, fontSize:17}}>SOL на историческом максимуме!</div>
              <div style={{fontSize:15.3, margin:"8px 0 0 0"}}>Аналитики прогнозируют рост до $210.</div>
            </div>
            <div style={{
              background: "#23273a",
              borderRadius: 15,
              padding: "17px 22px",
              marginBottom: 17,
              color:"#b2e7fd"
            }}>
              <div style={{fontWeight:800, fontSize:17}}>TON запускает новые NFT-инструменты</div>
              <div style={{fontSize:15.3, margin:"8px 0 0 0"}}>Платформа расширяет функционал для инвесторов.</div>
            </div>
          </motion.div>
        )}
        {tab === "trade" && (
          <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{duration:0.34}}>
            <div style={{fontWeight:900,fontSize:25,marginBottom:14,color:"#02f3fa"}}>Торговля</div>
            <div style={{
              background: "#23273a",
              borderRadius: 17,
              padding: "22px 19px",
              marginBottom: 18
            }}>
              <div style={{fontWeight:800, fontSize:16, color:"#a4eefd",marginBottom:13}}>Валютные пары</div>
              <div style={{display:"flex",gap:15, marginBottom:11}}>
                <span style={tradePair}>SOL/TON</span>
                <span style={tradePair}>BTC/USDT</span>
                <span style={tradePair}>ETH/SOL</span>
              </div>
              <div style={{fontSize:15, color:"#bdcfff", marginBottom:9}}>Моментальный обмен между активами</div>
              <motion.button whileTap={{scale:0.96}} style={{
                width: "100%",
                background: "linear-gradient(90deg,#02f3fa,#b664fe 80%)",
                border: "none",
                borderRadius: 13,
                color: "#181a20",
                fontWeight: 900,
                fontSize: 16,
                padding: "13px 0",
                cursor: "pointer",
                marginTop: 6,
                boxShadow: "0 2px 10px #02f3fa1c"
              }}>Начать обмен</motion.button>
            </div>
            <div style={{fontWeight:900,fontSize:16,marginBottom:10,color:"#b3bfff"}}>История операций</div>
            {history.map(h=>(
              <div key={h.id} style={{
                display:"flex",alignItems:"center",marginBottom:12,padding:"9px 0",
                borderBottom:"1px solid #282c42",color:"#b7daf9"
              }}>
                <div style={{fontWeight:800,color:h.sum[0]==="+"?"#32ffc4":"#fe5870",fontSize:19,minWidth:43,textAlign:"center"}}>
                  {h.type[0]}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:15}}>{h.type}</div>
                  <div style={{fontSize:13.5,color:"#b1b1be"}}>{h.desc}</div>
                </div>
                <div style={{
                  minWidth:77,textAlign:"right",fontWeight:900,
                  color:h.sum[0]==="+"?"#36fafe":"#ffb3b3",fontSize:16
                }}>
                  {h.sum}
                  <div style={{
                    fontSize:11,fontWeight:400,color:"#b1b1b6"
                  }}>{h.date}</div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
        {tab === "ref" && (
          <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{duration:0.34}}>
            <div style={{fontWeight:900, fontSize:25, color:"#a5f5f9", marginBottom:17}}>Реферальная программа</div>
            <div style={{
              background:"#22243a",
              borderRadius:17,
              padding:"23px 22px",
              marginBottom:17,
              boxShadow: "0 2px 12px #23273a40",
              color:"#fff"
            }}>
              <div style={{fontWeight:700, fontSize:17.3, marginBottom: 11}}>Ваша ссылка:</div>
              <div style={{
                background:"#161921", padding:"14px 20px", borderRadius:11, fontWeight:800,
                color:"#36fafe", fontSize:17, marginBottom:14, wordBreak:"break-all"
              }}>
                https://t.me/YourMiniAppBot?start=ref12345
              </div>
              <motion.button whileTap={{scale:0.97}} style={{
                padding:"12px 0", width:"100%",
                background:"linear-gradient(90deg,#36fafe,#b664fe 80%)",
                color:"#181a20",
                border:"none",
                borderRadius:14,
                fontWeight:900,
                fontSize:16,
                boxShadow:"0 2px 8px #02f3fa2a",
                cursor:"pointer",
                letterSpacing:1
              }}>Копировать ссылку</motion.button>
            </div>
            <div style={{fontWeight:700,fontSize:16,marginBottom:8}}>За каждого друга — $10!</div>
            <div style={{color:"#c1f5f5",fontSize:15}}>Начисление мгновенно после первой сделки приглашенного.</div>
          </motion.div>
        )}
        {tab === "settings" && (
          <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{duration:0.34}}>
            <div style={{fontWeight:900,fontSize:25,marginBottom:18,color:"#36fafe"}}>Настройки</div>
            <div style={{
              background:"#23273a",
              borderRadius:17,
              padding:"27px 22px",
              marginBottom:17,
              color:"#fff"
            }}>
              <div style={{marginBottom:16}}>
                <span style={{fontWeight:700,fontSize:16}}>Тема:</span>
                <span style={{fontWeight:700,marginLeft:14,fontSize:16, color:"#a4eefd"}}>Тёмная</span>
              </div>
              <div>
                <span style={{fontWeight:700,fontSize:16}}>Поддержка:</span>
                <a href="https://t.me/YourMiniAppSupport" style={{marginLeft:12, fontWeight:700, color:"#36fafe",fontSize:16}}>Telegram</a>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
      </AnimatePresence>
      
      {/* Bottom menu */}
      <div style={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100vw",
        background: "linear-gradient(90deg,#21243b 90%,#181a20 100%)",
        borderTop: "1.5px solid #23243a",
        boxShadow: "0 -2px 24px #23243a55"
      }}>
        <div style={{
          maxWidth: 1150,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px"
        }}>
          {TABS.map(t => (
            <motion.div
              key={t.value}
              whileTap={{scale:0.94}}
              onClick={() => setTab(t.value)}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "12px 0 5px 0",
                cursor: "pointer",
                fontWeight: tab === t.value ? 900 : 600,
                color: tab === t.value ? "#36fafe" : "#8798b4",
                fontSize: 16.5,
                borderTop: tab === t.value ? "2.7px solid #36fafe" : "2.7px solid transparent",
                background: "none",
                letterSpacing: 0.7,
                transition: "all .18s"
              }}
            >
              <img src={t.icon} alt="" style={{width:25,marginBottom:5,opacity:tab===t.value?1:0.69}}/>
              <div>{t.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Вспомогательные стили
const tradePair = {
  background: "linear-gradient(90deg,#36fafe,#b664fe 70%)",
  color: "#181a20",
  padding: "7px 16px",
  borderRadius: 10,
  fontWeight: 900,
  marginRight: 7,
  fontSize: 15.5
};
