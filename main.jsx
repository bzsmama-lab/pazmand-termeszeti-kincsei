import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Leaf, PawPrint, Bug, Camera, Heart, Info, CheckCircle2, Sparkles } from "lucide-react";

const species = [
  {
    name: "Keleti sün",
    category: "Állatok",
    icon: "🦔",
    season: "tavasztól őszig",
    place: "kertekben, bokros részeken, csendes utcákban",
    protected: "védett",
    description: "Éjszakai életmódú kisemlős, amely rovarokat, gilisztákat és csigákat fogyaszt. Ha nappal látjuk, érdemes óvatosan figyelni, nem sérült-e.",
    tip: "Ne adjunk neki tejet, mert árthat neki. Inkább vizet tegyünk ki."
  },
  {
    name: "Vörös róka",
    category: "Állatok",
    icon: "🦊",
    season: "egész évben",
    place: "erdőszéleken, mezők közelében",
    protected: "nem védett",
    description: "Óvatos, alkalmazkodó ragadozó. Leginkább alkonyatkor vagy hajnalban lehet megpillantani.",
    tip: "Távolról figyeljük, ne etessük."
  },
  {
    name: "Zöld gyík",
    category: "Állatok",
    icon: "🦎",
    season: "tavasztól nyár végéig",
    place: "napos köves, bokros, sziklás részeken",
    protected: "védett",
    description: "Látványos, élénkzöld gyíkféle, amely kedveli a meleg, napos élőhelyeket. A sziklás pázmándi részek jó megfigyelőhelyek lehetnek.",
    tip: "Ne próbáljuk megfogni, mert könnyen megsérülhet."
  },
  {
 import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Leaf, PawPrint, Bug, Camera, Heart, Info, CheckCircle2, Sparkles } from "lucide-react";

const species = [
  {
    name: "Keleti sün",
    category: "Állatok",
    icon: "🦔",
    season: "tavasztól őszig",
    place: "kertekben, bokros részeken, csendes utcákban",
    protected: "védett",
    description: "Éjszakai életmódú kisemlős, amely rovarokat, gilisztákat és csigákat fogyaszt. Ha nappal látjuk, érdemes óvatosan figyelni, nem sérült-e.",
    tip: "Ne adjunk neki tejet, mert árthat neki. Inkább vizet tegyünk ki."
  },
  {
    name: "Vörös róka",
    category: "Állatok",
    icon: "🦊",
    season: "egész évben",
    place: "erdőszéleken, mezők közelében",
    protected: "nem védett",
    description: "Óvatos, alkalmazkodó ragadozó. Leginkább alkonyatkor vagy hajnalban lehet megpillantani.",
    tip: "Távolról figyeljük, ne etessük."
  },
  {
    name: "Zöld gyík",
    category: "Állatok",
    icon: "🦎",
    season: "tavasztól nyár végéig",
    place: "napos köves, bokros, sziklás részeken",
    protected: "védett",
    description: "Látványos, élénkzöld gyíkféle, amely kedveli a meleg, napos élőhelyeket. A sziklás pázmándi részek jó megfigyelőhelyek lehetnek.",
    tip: "Ne próbáljuk megfogni, mert könnyen megsérülhet."
  },
  {
  name: "Kerti madarak"
category: "Állatok",
  image: "./madar.jpg",
icon: "🐦",
season: "egész évben",
place: "kertekben, fákon, parkokban",
protected: "védett",
description: "Gyakori énekesmadár fekete fejjel és sárgás hassal. Télen madáretetőknél is megfigyelhető.",
tip: "Télen napraforgómaggal segíthetjük.",

  },
  {
    name: "Tavaszi hérics",
    category: "Növények",
    icon: "🌼",
    season: "kora tavasszal",
    place: "napos gyepekben, szárazabb lejtőkön",
    protected: "védett",
    description: "Aranysárga virágú, feltűnő tavaszi növény. A száraz, napos élőhelyek egyik különleges dísze.",
    tip: "Ne szakítsuk le, csak fotózzuk."
  },
  {
    name: "Galagonya",
    category: "Növények",
    icon: "🌿",
    season: "virágzik tavasszal, termése ősszel érik",
    place: "bokros szegélyekben, mezsgyéken",
    protected: "általában nem védett",
    description: "Fehér virágú, piros bogyós cserje. Fontos táplálékot és búvóhelyet ad madaraknak, rovaroknak.",
    tip: "Ősszel sok madár keresi fel a termése miatt."
  },
  {
    name: "Kökény",
    category: "Növények",
    icon: "🌸",
    season: "tavasszal virágzik",
    place: "erdőszéleken, cserjésekben",
    protected: "általában nem védett",
    description: "Korán virágzó, tüskés cserje. Fehér virágai sok beporzó rovart vonzanak.",
    tip: "A virágzó kökény jó hely méhek és lepkék megfigyelésére."
  },
  {
    name: "Molyhos tölgy",
    category: "Növények",
    icon: "🌳",
    season: "egész évben felismerhető",
    place: "száraz, melegebb erdőkben és lejtőkön",
    protected: "élőhelye értékes lehet",
    description: "A szárazabb, naposabb élőhelyek egyik jellegzetes fája. Lombkoronája sok madárnak és rovarnak ad otthont.",
    tip: "Ősszel makktermését is megfigyelhetjük."
  },
  {
    name: "Nappali pávaszem",
    category: "Rovarok",
    icon: "🦋",
    season: "tavasztól őszig",
    place: "virágos réteken, kertekben, erdőszéleken",
    protected: "nem védett",
    description: "Színes lepke, szárnyain jellegzetes szemfoltokkal. Gyakran napozik virágokon vagy köveken.",
    tip: "Virágos kerttel sok lepkét csalogathatunk."
  },
  {
    name: "Hétpettyes katicabogár",
    category: "Rovarok",
    icon: "🐞",
    season: "tavasztól őszig",
    place: "kertekben, réteken, bokrokon",
    protected: "nem védett",
    description: "Közismert hasznos bogár, amely levéltetveket fogyaszt. Gyerekeknek is könnyen felismerhető faj.",
    tip: "Vegyszermentes kertben több katicát láthatunk."
  },
  {
    name: "Poszméh",
    category: "Rovarok",
    icon: "🐝",
    season: "tavasztól őszig",
    place: "virágos területeken, gyümölcsösökben, kertekben",
    protected: "több faj védett lehet",
    description: "Fontos beporzó rovar, bundás testtel és mély zümmögéssel. Hűvösebb időben is aktívabb lehet, mint sok más méhféle.",
    tip: "Ültessünk korán és későn virágzó növényeket is."
  },
  {
    name: "Cincér",
    category: "Rovarok",
    icon: "🪲",
    season: "főleg nyáron",
    place: "erdőkben, öreg fák közelében, farakásoknál",
    protected: "fajtól függően lehet védett",
    description: "Hosszú csápú bogárcsoport. Több fajuk idős fákhoz és természetes erdőrészekhez kötődik.",
    tip: "Az öreg fák meghagyása sok rovarnak segít."
  }
];

const trails = [
  {
    title: "Kvarcitsziklák séta",
    time: "45–70 perc",
    level: "könnyű-közepes",
    description: "Sziklás, napos élőhelyek, gyíkok, szárazságtűrő növények és lepkék megfigyelésére."
  },
  {
    title: "Kertek és utcák élővilága",
    time: "20–40 perc",
    level: "könnyű",
    description: "Cinegék, sünök, katicák, méhek és virágzó cserjék felfedezése a lakott területek közelében."
  },
  {
    title: "Rétek és erdőszélek",
    time: "60–90 perc",
    level: "közepes",
    description: "Virágos gyepek, bokros szegélyek, beporzók és madarak megfigyelése csendes sétával."
  }
];

const categories = [
  { name: "Mind", icon: Sparkles },
  { name: "Állatok", icon: PawPrint },
  { name: "Növények", icon: Leaf },
  { name: "Rovarok", icon: Bug }
];

function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function Button({ children, variant = "primary" }) {
  return <button className={`button ${variant}`}>{children}</button>;
}

export default function App() {
  const [active, setActive] = useState("Mind");
  const [search, setSearch] = useState("");
  const [quizAnswer, setQuizAnswer] = useState(null);

  const filtered = useMemo(() => {
    return species.filter((item) => {
      const matchesCategory = active === "Mind" || item.category === active;
      const text = `${item.name} ${item.category} ${item.place} ${item.description}`.toLowerCase();
      return matchesCategory && text.includes(search.toLowerCase());
    });
  }, [active, search]);

  return (
    <div className="page">
      <header className="hero">
        <div className="blob blob-right"></div>
        <div className="blob blob-left"></div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container"
        >
          <div className="badge">
            <MapPin size={16} />
            Pázmánd természeti kalauza
          </div>

          <div className="hero-grid">
            <div>
              <h1>Pázmánd Természeti Kincsei</h1>
              <p className="lead">
                Egy barátságos appötlet a falu állatvilágának, növényvilágának és rovarvilágának felfedezéséhez. Sétákhoz, családoknak, gyerekeknek és természetkedvelőknek.
              </p>
              <div className="hero-buttons">
                <Button>Fajok böngészése</Button>
                <Button variant="secondary">Sétaútvonalak</Button>
              </div>
            </div>

            <Card className="stats-card">
              <div className="stats">
                <div className="stat green">
                  <PawPrint />
                  <strong>4</strong>
                  <span>állat</span>
                </div>
                <div className="stat lime">
                  <Leaf />
                  <strong>4</strong>
                  <span>növény</span>
                </div>
                <div className="stat amber">
                  <Bug />
                  <strong>4</strong>
                  <span>rovar</span>
                </div>
              </div>
              <div className="tip-box dark">
                <div className="small-row">
                  <Info size={16} />
                  Mai felfedező tipp
                </div>
                <p>Figyeld meg, melyik virágon van a legtöbb beporzó!</p>
              </div>
            </Card>
          </div>
        </motion.div>
      </header>

      <main className="container main">
        <section>
          <div className="section-head">
            <h2>Fajok keresője</h2>
            <div className="search-box">
              <Search size={18} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Keress: sün, virág, lepke..."
              />
            </div>
          </div>

          <div className="category-row">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActive(cat.name)}
                  className={active === cat.name ? "category active" : "category"}
                >
                  <Icon size={17} />
                  {cat.name}
                </button>
              );
            })}
          </div>

          <div className="species-grid">
            {filtered.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
              >
                <Card className="species-card">
                  <div className="species-top">
                    <div>
                      <div className="emoji">{item.icon}</div>
                      <h3>{item.name}</h3>
                      <p className="category-name">{item.category}</p>
                    </div>
                    <span className="protected">{item.protected}</span>
                  </div>

                  <p className="description">{item.description}</p>

                  <div className="details">
                    <p><strong>Mikor?</strong> {item.season}</p>
                    <p><strong>Hol?</strong> {item.place}</p>
                  </div>

                  <div className="heart-tip">
                    <Heart size={16} />
                    <span>{item.tip}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="two-col">
          <Card>
            <h2>Javasolt pázmándi séták</h2>
            <p className="muted">A pontos útvonalakat később térképpel és GPS-pontokkal lehet bővíteni.</p>

            <div className="trail-list">
              {trails.map((trail) => (
                <div key={trail.title} className="trail">
                  <div className="trail-head">
                    <h3>{trail.title}</h3>
                    <span>{trail.level}</span>
                  </div>
                  <p className="muted small">{trail.time}</p>
                  <p>{trail.description}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="quiz-card">
            <h2>Mini kvíz gyerekeknek</h2>
            <p>Melyik állatnak nem szabad tejet adni?</p>

            <div className="quiz-options">
              {["Keleti sün", "Széncinege", "Zöld gyík"].map((answer) => (
                <button
                  key={answer}
                  onClick={() => setQuizAnswer(answer)}
                  className={quizAnswer === answer ? "selected" : ""}
                >
                  {answer}
                </button>
              ))}
            </div>

            {quizAnswer && (
              <div className="quiz-result">
                {quizAnswer === "Keleti sün" ? (
                  <p className="correct"><CheckCircle2 size={20} /> Ügyes vagy! A sünnek inkább vizet adjunk.</p>
                ) : (
                  <p className="wrong">Majdnem! A helyes válasz: Keleti sün.</p>
                )}
              </div>
            )}
          </Card>
        </section>

        <section>
          <Card className="observe-card">
            <div>
              <div className="camera-icon">
                <Camera />
              </div>
              <h2>Megfigyelés beküldése</h2>
              <p className="muted">
                A végleges appban a lakosok és kirándulók fotóval beküldhetnék, mit láttak Pázmándon: madarat, virágot, lepkét vagy más érdekességet.
              </p>
            </div>

            <div className="form-grid">
              <input placeholder="Mit láttál?" />
              <input placeholder="Hol láttad?" />
              <input placeholder="Mikor?" />
              <button>Beküldés mintája</button>
            </div>
          </Card>
        </section>

        <footer>
          <h2>Következő fejlesztési lépések</h2>
          <p>
            Helyi fotók feltöltése, pontos fajlista szakmai ellenőrzéssel, térképes pontok megadása, adatvédelmi tájékoztató, majd webappként vagy Android/iPhone appként való kiadás.
          </p>
        </footer>
      </main>
    </div>
  );
}
  },
  {
    name: "Tavaszi hérics",
    category: "Növények",
    icon: "🌼",
    season: "kora tavasszal",
    place: "napos gyepekben, szárazabb lejtőkön",
    protected: "védett",
    description: "Aranysárga virágú, feltűnő tavaszi növény. A száraz, napos élőhelyek egyik különleges dísze.",
    tip: "Ne szakítsuk le, csak fotózzuk."
  },
  {
    name: "Galagonya",
    category: "Növények",
    icon: "🌿",
    season: "virágzik tavasszal, termése ősszel érik",
    place: "bokros szegélyekben, mezsgyéken",
    protected: "általában nem védett",
    description: "Fehér virágú, piros bogyós cserje. Fontos táplálékot és búvóhelyet ad madaraknak, rovaroknak.",
    tip: "Ősszel sok madár keresi fel a termése miatt."
  },
  {
    name: "Kökény",
    category: "Növények",
    icon: "🌸",
    season: "tavasszal virágzik",
    place: "erdőszéleken, cserjésekben",
    protected: "általában nem védett",
    description: "Korán virágzó, tüskés cserje. Fehér virágai sok beporzó rovart vonzanak.",
    tip: "A virágzó kökény jó hely méhek és lepkék megfigyelésére."
  },
  {
    name: "Molyhos tölgy",
    category: "Növények",
    icon: "🌳",
    season: "egész évben felismerhető",
    place: "száraz, melegebb erdőkben és lejtőkön",
    protected: "élőhelye értékes lehet",
    description: "A szárazabb, naposabb élőhelyek egyik jellegzetes fája. Lombkoronája sok madárnak és rovarnak ad otthont.",
    tip: "Ősszel makktermését is megfigyelhetjük."
  },
  {
    name: "Nappali pávaszem",
    category: "Rovarok",
    icon: "🦋",
    season: "tavasztól őszig",
    place: "virágos réteken, kertekben, erdőszéleken",
    protected: "nem védett",
    description: "Színes lepke, szárnyain jellegzetes szemfoltokkal. Gyakran napozik virágokon vagy köveken.",
    tip: "Virágos kerttel sok lepkét csalogathatunk."
  },
  {
    name: "Hétpettyes katicabogár",
    category: "Rovarok",
    icon: "🐞",
    season: "tavasztól őszig",
    place: "kertekben, réteken, bokrokon",
    protected: "nem védett",
    description: "Közismert hasznos bogár, amely levéltetveket fogyaszt. Gyerekeknek is könnyen felismerhető faj.",
    tip: "Vegyszermentes kertben több katicát láthatunk."
  },
  {
    name: "Poszméh",
    category: "Rovarok",
    icon: "🐝",
    season: "tavasztól őszig",
    place: "virágos területeken, gyümölcsösökben, kertekben",
    protected: "több faj védett lehet",
    description: "Fontos beporzó rovar, bundás testtel és mély zümmögéssel. Hűvösebb időben is aktívabb lehet, mint sok más méhféle.",
    tip: "Ültessünk korán és későn virágzó növényeket is."
  },
  {
    name: "Cincér",
    category: "Rovarok",
    icon: "🪲",
    season: "főleg nyáron",
    place: "erdőkben, öreg fák közelében, farakásoknál",
    protected: "fajtól függően lehet védett",
    description: "Hosszú csápú bogárcsoport. Több fajuk idős fákhoz és természetes erdőrészekhez kötődik.",
    tip: "Az öreg fák meghagyása sok rovarnak segít."
  }
];

const trails = [
  {
    title: "Kvarcitsziklák séta",
    time: "45–70 perc",
    level: "könnyű-közepes",
    description: "Sziklás, napos élőhelyek, gyíkok, szárazságtűrő növények és lepkék megfigyelésére."
  },
  {
    title: "Kertek és utcák élővilága",
    time: "20–40 perc",
    level: "könnyű",
    description: "Cinegék, sünök, katicák, méhek és virágzó cserjék felfedezése a lakott területek közelében."
  },
  {
    title: "Rétek és erdőszélek",
    time: "60–90 perc",
    level: "közepes",
    description: "Virágos gyepek, bokros szegélyek, beporzók és madarak megfigyelése csendes sétával."
  }
];

const categories = [
  { name: "Mind", icon: Sparkles },
  { name: "Állatok", icon: PawPrint },
  { name: "Növények", icon: Leaf },
  { name: "Rovarok", icon: Bug }
];

function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function Button({ children, variant = "primary" }) {
  return <button className={`button ${variant}`}>{children}</button>;
}

export default function App() {
  const [active, setActive] = useState("Mind");
  const [search, setSearch] = useState("");
  const [quizAnswer, setQuizAnswer] = useState(null);

  const filtered = useMemo(() => {
    return species.filter((item) => {
      const matchesCategory = active === "Mind" || item.category === active;
      const text = `${item.name} ${item.category} ${item.place} ${item.description}`.toLowerCase();
      return matchesCategory && text.includes(search.toLowerCase());
    });
  }, [active, search]);

  return (
    <div className="page">
      <header className="hero">
        <div className="blob blob-right"></div>
        <div className="blob blob-left"></div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container"
        >
          <div className="badge">
            <MapPin size={16} />
            Pázmánd természeti kalauza
          </div>

          <div className="hero-grid">
            <div>
              <h1>Pázmánd Természeti Kincsei</h1>
              <p className="lead">
                Egy barátságos appötlet a falu állatvilágának, növényvilágának és rovarvilágának felfedezéséhez. Sétákhoz, családoknak, gyerekeknek és természetkedvelőknek.
              </p>
              <div className="hero-buttons">
                <Button>Fajok böngészése</Button>
                <Button variant="secondary">Sétaútvonalak</Button>
              </div>
            </div>

            <Card className="stats-card">
              <div className="stats">
                <div className="stat green">
                  <PawPrint />
                  <strong>4</strong>
                  <span>állat</span>
                </div>
                <div className="stat lime">
                  <Leaf />
                  <strong>4</strong>
                  <span>növény</span>
                </div>
                <div className="stat amber">
                  <Bug />
                  <strong>4</strong>
                  <span>rovar</span>
                </div>
              </div>
              <div className="tip-box dark">
                <div className="small-row">
                  <Info size={16} />
                  Mai felfedező tipp
                </div>
                <p>Figyeld meg, melyik virágon van a legtöbb beporzó!</p>
              </div>
            </Card>
          </div>
        </motion.div>
      </header>

      <main className="container main">
        <section>
          <div className="section-head">
            <h2>Fajok keresője</h2>
            <div className="search-box">
              <Search size={18} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Keress: sün, virág, lepke..."
              />
            </div>
          </div>

          <div className="category-row">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActive(cat.name)}
                  className={active === cat.name ? "category active" : "category"}
                >
                  <Icon size={17} />
                  {cat.name}
                </button>
              );
            })}
          </div>

          <div className="species-grid">
            {filtered.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
              >
                <Card className="species-card">
                  <div className="species-top">
                    <div>
                      <div className="emoji">{item.icon}</div>
                      <h3>{item.name}</h3>
                      <p className="category-name">{item.category}</p>
                    </div>
                    <span className="protected">{item.protected}</span>
                  </div>

                  <p className="description">{item.description}</p>

                  <div className="details">
                    <p><strong>Mikor?</strong> {item.season}</p>
                    <p><strong>Hol?</strong> {item.place}</p>
                  </div>

                  <div className="heart-tip">
                    <Heart size={16} />
                    <span>{item.tip}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="two-col">
          <Card>
            <h2>Javasolt pázmándi séták</h2>
            <p className="muted">A pontos útvonalakat később térképpel és GPS-pontokkal lehet bővíteni.</p>

            <div className="trail-list">
              {trails.map((trail) => (
                <div key={trail.title} className="trail">
                  <div className="trail-head">
                    <h3>{trail.title}</h3>
                    <span>{trail.level}</span>
                  </div>
                  <p className="muted small">{trail.time}</p>
                  <p>{trail.description}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="quiz-card">
            <h2>Mini kvíz gyerekeknek</h2>
            <p>Melyik állatnak nem szabad tejet adni?</p>

            <div className="quiz-options">
              {["Keleti sün", "Széncinege", "Zöld gyík"].map((answer) => (
                <button
                  key={answer}
                  onClick={() => setQuizAnswer(answer)}
                  className={quizAnswer === answer ? "selected" : ""}
                >
                  {answer}
                </button>
              ))}
            </div>

            {quizAnswer && (
              <div className="quiz-result">
                {quizAnswer === "Keleti sün" ? (
                  <p className="correct"><CheckCircle2 size={20} /> Ügyes vagy! A sünnek inkább vizet adjunk.</p>
                ) : (
                  <p className="wrong">Majdnem! A helyes válasz: Keleti sün.</p>
                )}
              </div>
            )}
          </Card>
        </section>

        <section>
          <Card className="observe-card">
            <div>
              <div className="camera-icon">
                <Camera />
              </div>
              <h2>Megfigyelés beküldése</h2>
              <p className="muted">
                A végleges appban a lakosok és kirándulók fotóval beküldhetnék, mit láttak Pázmándon: madarat, virágot, lepkét vagy más érdekességet.
              </p>
            </div>

            <div className="form-grid">
              <input placeholder="Mit láttál?" />
              <input placeholder="Hol láttad?" />
              <input placeholder="Mikor?" />
              <button>Beküldés mintája</button>
            </div>
          </Card>
        </section>

        <footer>
          <h2>Következő fejlesztési lépések</h2>
          <p>
            Helyi fotók feltöltése, pontos fajlista szakmai ellenőrzéssel, térképes pontok megadása, adatvédelmi tájékoztató, majd webappként vagy Android/iPhone appként való kiadás.
          </p>
        </footer>
      </main>
    </div>
  );
}
