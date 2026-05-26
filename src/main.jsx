import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search, MapPin, Leaf, PawPrint, Bug, Camera, Heart, Info, CheckCircle2,
  Sparkles, Baby, Trees, Mountain, BookOpen, Send, Image as ImageIcon,
  Route, ShieldCheck, Menu, X
} from "lucide-react";
import "./style.css";

const species = [
  ["Keleti sün","Állatok","🦔","tavasztól őszig","kertekben, bokros részeken, csendes utcákban","védett fajként kezelendő","Éjszakai életmódú kisemlős, amely rovarokat, gilisztákat és csigákat fogyaszt. Ha nappal látjuk, érdemes óvatosan figyelni, nem sérült-e.","Ne adjunk neki tejet, mert árthat neki. Inkább vizet tegyünk ki.","Este indul felfedezőútra, mint egy tüskés kis kertész."],
  ["Vörös róka","Állatok","🦊","egész évben","erdőszéleken, mezők közelében","vadon élő állat","Óvatos, alkalmazkodó ragadozó. Leginkább alkonyatkor vagy hajnalban lehet megpillantani.","Távolról figyeljük, ne etessük.","A róka nagyon ügyesen lopakodik, ezért ritkán látjuk közelről."],
  ["Zöld gyík","Állatok","🦎","tavasztól nyár végéig","napos köves, bokros, sziklás részeken","védett fajként kezelendő","Látványos, élénkzöld gyíkféle, amely kedveli a meleg, napos élőhelyeket. A sziklás pázmándi részek jó megfigyelőhelyek lehetnek.","Ne próbáljuk megfogni, mert könnyen megsérülhet.","Olyan, mintha a napfényben egy zöld kis sárkány szaladna el."],
  ["Széncinege","Állatok","🐦","egész évben","kertekben, fákon, parkokban","védett madárként kezelendő","Gyakori énekesmadár fekete fejjel és sárgás hassal. Télen madáretetőknél is megfigyelhető.","Télen napraforgómaggal segíthetjük.","A cinege apró, fürge madár, amely vidáman ugrál az ágakon."],
  ["Egerészölyv","Állatok","🦅","egész évben","mezők fölött, erdőszéleken, magasban körözve","védett ragadozó madárként kezelendő","Nagyobb testű ragadozó madár, amely gyakran köröz a nyílt területek fölött. Távolról is jól felismerhető lassú, méltóságteljes repüléséről.","Távcsővel szépen megfigyelhető, zavarás nélkül.","Olyan, mint az ég csendes őre."],
  ["Tavaszi hérics","Növények","🌼","kora tavasszal","napos gyepekben, szárazabb lejtőkön","védett növényként kezelendő","Aranysárga virágú, feltűnő tavaszi növény. A száraz, napos élőhelyek egyik különleges dísze.","Ne szakítsuk le, csak fotózzuk.","Olyan, mintha egy kis napocska bújna elő a fűből."],
  ["Galagonya","Növények","🌿","virágzik tavasszal, termése ősszel érik","bokros szegélyekben, mezsgyéken","gyakori, de élőhelye értékes","Fehér virágú, piros bogyós cserje. Fontos táplálékot és búvóhelyet ad madaraknak, rovaroknak.","Ősszel sok madár keresi fel a termése miatt.","Tavasszal fehér virágfelhő, ősszel piros bogyós madárbüfé."],
  ["Kökény","Növények","🌸","tavasszal virágzik","erdőszéleken, cserjésekben","gyakori cserje","Korán virágzó, tüskés cserje. Fehér virágai sok beporzó rovart vonzanak.","A virágzó kökény jó hely méhek és lepkék megfigyelésére.","Már akkor virágzik, amikor sok növény még csak ébredezik."],
  ["Molyhos tölgy","Növények","🌳","egész évben felismerhető","száraz, melegebb erdőkben és lejtőkön","élőhelye értékes lehet","A szárazabb, naposabb élőhelyek egyik jellegzetes fája. Lombkoronája sok madárnak és rovarnak ad otthont.","Ősszel makktermését is megfigyelhetjük.","Egy öreg tölgy olyan, mint egy egész kis állatváros."],
  ["Vadkörte","Növények","🍐","tavasszal virágzik, ősszel terem","erdőszéleken, rétek közelében","értékes őshonos fafaj","Őshonos fa, amely virágával beporzókat, termésével madarakat és kisebb állatokat vonzhat.","Virágzáskor és terméséréskor is érdemes megfigyelni.","Apró termése sok állatnak lehet finom falat."],
  ["Nappali pávaszem","Rovarok","🦋","tavasztól őszig","virágos réteken, kertekben, erdőszéleken","gyakori lepke","Színes lepke, szárnyain jellegzetes szemfoltokkal. Gyakran napozik virágokon vagy köveken.","Virágos kerttel sok lepkét csalogathatunk.","A szárnyán lévő szemfoltok olyanok, mint kis festett szemek."],
  ["Hétpettyes katicabogár","Rovarok","🐞","tavasztól őszig","kertekben, réteken, bokrokon","hasznos kerti rovar","Közismert hasznos bogár, amely levéltetveket fogyaszt. Gyerekeknek is könnyen felismerhető faj.","Vegyszermentes kertben több katicát láthatunk.","Piros kabátján hét pöttyöt hord."],
  ["Poszméh","Rovarok","🐝","tavasztól őszig","virágos területeken, gyümölcsösökben, kertekben","fontos beporzó","Fontos beporzó rovar, bundás testtel és mély zümmögéssel. Hűvösebb időben is aktívabb lehet, mint sok más méhféle.","Ültessünk korán és későn virágzó növényeket is.","Bundás kis zümmögő, aki segít a virágoknak termést hozni."],
  ["Cincér","Rovarok","🪲","főleg nyáron","erdőkben, öreg fák közelében, farakásoknál","fajtól függően lehet védett","Hosszú csápú bogárcsoport. Több fajuk idős fákhoz és természetes erdőrészekhez kötődik.","Az öreg fák meghagyása sok rovarnak segít.","Olyan hosszú csápja lehet, mint két kis antenna."],
  ["Szitakötő","Rovarok","🪽","tavasz végétől őszig","vizes élőhelyek, árkok, tavak, nedves rétek közelében","több faj értékes lehet","Gyors röptű, karcsú testű rovar. Vizek közelében gyakrabban lehet találkozni vele.","Fotózni könnyebb, amikor megpihen egy nádszálon vagy ágon.","Úgy repül, mint egy apró természetes helikopter."]
].map(([name,category,icon,season,place,protectedStatus,description,tip,kid]) => ({
  name, category, icon, season, place, protected: protectedStatus, description, tip, kid
}));

const trails = [
  { title:"Kvarcitsziklák séta", time:"45–70 perc", level:"könnyű-közepes", icon:Mountain, description:"Sziklás, napos élőhelyek, gyíkok, szárazságtűrő növények és lepkék megfigyelésére.", checklist:["napos kövek","gyíkok","lepkék","szárazságtűrő növények"] },
  { title:"Kertek és utcák élővilága", time:"20–40 perc", level:"könnyű", icon:Trees, description:"Cinegék, sünök, katicák, méhek és virágzó cserjék felfedezése a lakott területek közelében.", checklist:["madáretetők","virágzó kertek","bokrok","esti sünnyomok"] },
  { title:"Rétek és erdőszélek", time:"60–90 perc", level:"közepes", icon:Route, description:"Virágos gyepek, bokros szegélyek, beporzók és madarak megfigyelése csendes sétával.", checklist:["vadvirágok","beporzók","madárhangok","cserjések"] },
  { title:"Családi mini természetjárás", time:"30–50 perc", level:"gyerekbarát", icon:Baby, description:"Rövidebb séta gyerekeknek: keressetek három madarat, két virágot és egy rovart.", checklist:["3 madár","2 virág","1 rovar","egy természetfotó"] }
];

const gallery = [
  { title:"Pázmándi sziklás élőhely", icon:"⛰️", text:"Ide kerülhet saját fotó a kvarcitsziklák környékéről." },
  { title:"Tavaszi vadvirágok", icon:"🌼", text:"Ide kerülhetnek saját virágfotók, dátummal és helyszínnel." },
  { title:"Kerti madarak", icon:"🐦", text:"Madáretetőnél vagy fákon készült helyi fotók helye." },
  { title:"Rovarok közelről", icon:"🦋", text:"Lepkék, katicák, poszméhek és bogarak fotógalériája." }
];

const categories = [
  { name:"Mind", icon:Sparkles },
  { name:"Állatok", icon:PawPrint },
  { name:"Növények", icon:Leaf },
  { name:"Rovarok", icon:Bug }
];

function App() {
  const [active, setActive] = useState("Mind");
  const [search, setSearch] = useState("");
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [sent, setSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = useMemo(() => species.filter((item) => {
    const matchesCategory = active === "Mind" || item.category === active;
    const text = `${item.name} ${item.category} ${item.place} ${item.description} ${item.kid}`.toLowerCase();
    return matchesCategory && text.includes(search.toLowerCase());
  }), [active, search]);

  function navClick() { setMenuOpen(false); }
  function sendObservation(event) { event.preventDefault(); setSent(true); }

  return (
    <div className="app">
      <header className="hero">
        <div className="blob blobOne"></div><div className="blob blobTwo"></div>
        <nav className="topNav">
          <strong>Pázmánd Természeti Kincsei</strong>
          <button className="menuButton" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
          <div className={menuOpen ? "navLinks open" : "navLinks"}>
            <a onClick={navClick} href="#fajok">Fajok</a>
            <a onClick={navClick} href="#setak">Séták</a>
            <a onClick={navClick} href="#gyerekek">Gyerekeknek</a>
            <a onClick={navClick} href="#galeria">Galéria</a>
            <a onClick={navClick} href="#bekuldes">Beküldés</a>
          </div>
        </nav>

        <div className="heroInner">
          <div className="badge"><MapPin size={16}/> Pázmánd helyi természetismereti appja</div>
          <div className="heroGrid">
            <section>
              <h1>Pázmánd Természeti Kincsei</h1>
              <p className="lead">
                Fedezd fel a falu körüli sziklás, bokros, kerti és réti élőhelyek állatait, növényeit és rovarait.
                Ez az app családoknak, kirándulóknak és természetbarát helyieknek készül.
              </p>
              <div className="heroButtons">
                <a href="#fajok" className="primaryButton">Fajok böngészése</a>
                <a href="#bekuldes" className="secondaryButton">Megfigyelést küldök</a>
              </div>
            </section>
            <aside className="summaryCard">
              <div className="stats">
                <div className="stat animal"><PawPrint/><strong>5</strong><span>állat</span></div>
                <div className="stat plant"><Leaf/><strong>5</strong><span>növény</span></div>
                <div className="stat insect"><Bug/><strong>5</strong><span>rovar</span></div>
              </div>
              <div className="todayTip">
                <div><Info size={16}/> Mai felfedező tipp</div>
                <p>Válassz egy csendes sétát, és jegyezd fel, hányféle madárhangot hallasz!</p>
              </div>
            </aside>
          </div>
        </div>
      </header>

      <main className="content">
        <section className="introPanel">
          <div><ShieldCheck/><h2>Miért hasznos ez az app?</h2><p>Segít észrevenni a közeli természet apró csodáit, támogatja a környezeti nevelést, és összegyűjtheti Pázmánd helyi természeti értékeit egy könnyen használható felületen.</p></div>
          <div><BookOpen/><h2>Fontos megjegyzés</h2><p>A fajleírások oktatási célúak. A végleges kiadás előtt érdemes természetvédelmi szakértővel ellenőriztetni a pontos fajlistát és a védettségi adatokat.</p></div>
        </section>

        <section id="fajok" className="section">
          <div className="sectionHead">
            <h2>Fajok keresője</h2>
            <div className="searchBox"><Search size={18}/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Keress: sün, virág, lepke, gyík..."/></div>
          </div>
          <div className="categoryList">
            {categories.map((cat) => { const Icon = cat.icon; return <button key={cat.name} onClick={() => setActive(cat.name)} className={active === cat.name ? "category active" : "category"}><Icon size={17}/>{cat.name}</button>; })}
          </div>
          <div className="cards">
            {filtered.map((item) => (
              <article className="speciesCard" key={item.name}>
                <div className="cardTop"><div><div className="emoji">{item.icon}</div><h3>{item.name}</h3><p className="categoryName">{item.category}</p></div><span className="protected">{item.protected}</span></div>
                <p className="description">{item.description}</p>
                <div className="details"><p><strong>Mikor?</strong> {item.season}</p><p><strong>Hol?</strong> {item.place}</p></div>
                <div className="kidText"><Baby size={17}/><span>{item.kid}</span></div>
                <div className="tip"><Heart size={17}/><span>{item.tip}</span></div>
              </article>
            ))}
          </div>
        </section>

        <section id="setak" className="section">
          <div className="sectionHead simple"><h2>Sétaútvonal ötletek</h2><p>A pontos térképes útvonalakat később GPS-pontokkal lehet hozzáadni.</p></div>
          <div className="trailGrid">
            {trails.map((trail) => { const Icon = trail.icon; return (
              <article className="trail" key={trail.title}>
                <div className="trailIcon"><Icon/></div><div className="trailHead"><h3>{trail.title}</h3><span>{trail.level}</span></div>
                <p className="trailTime">{trail.time}</p><p>{trail.description}</p>
                <div className="checklist">{trail.checklist.map((i)=><small key={i}>✓ {i}</small>)}</div>
              </article>
            ); })}
          </div>
        </section>

        <section id="gyerekek" className="twoColumns">
          <div className="panel childPanel">
            <h2>Gyerekeknek: természetvadász küldetés</h2>
            <p className="muted">Egy rövid séta alatt keressetek meg minél többet az alábbiakból. A végén beszéljétek meg, melyik volt a legérdekesebb megfigyelés.</p>
            <ul className="missionList"><li>Hallgass meg 3 különböző madárhangot.</li><li>Fotózz le egy virágot anélkül, hogy leszakítanád.</li><li>Keress egy rovart, és figyeld meg, mit csinál.</li><li>Nézz meg egy fát: van rajta madár, rovar vagy termés?</li></ul>
          </div>
          <div className="panel darkPanel">
            <h2>Mini kvíz</h2><p>Melyik állatnak nem szabad tejet adni?</p>
            <div className="quiz">{["Keleti sün","Széncinege","Zöld gyík"].map((a)=><button key={a} onClick={() => setQuizAnswer(a)} className={quizAnswer === a ? "selected" : ""}>{a}</button>)}</div>
            {quizAnswer && <div className="quizResult">{quizAnswer === "Keleti sün" ? <p><CheckCircle2 size={20}/> Ügyes vagy! A sünnek inkább vizet adjunk.</p> : <p>Majdnem! A helyes válasz: Keleti sün.</p>}</div>}
          </div>
        </section>

        <section id="galeria" className="section">
          <div className="sectionHead simple"><h2>Fotógaléria helye</h2><p>Ide kerülhetnek majd a saját pázmándi fotók.</p></div>
          <div className="galleryGrid">
            {gallery.map((item)=><article className="galleryCard" key={item.title}><div className="galleryIcon">{item.icon}</div><ImageIcon/><h3>{item.title}</h3><p>{item.text}</p></article>)}
          </div>
        </section>

        <section id="bekuldes" className="observation">
          <div><div className="cameraIcon"><Camera/></div><h2>Megfigyelés beküldése</h2><p>A végleges appban a lakosok és kirándulók fotóval beküldhetnék, mit láttak Pázmándon: madarat, virágot, lepkét vagy más érdekességet.</p></div>
          <form onSubmit={sendObservation} className="observationForm">
            <input placeholder="Mit láttál?"/><input placeholder="Hol láttad?"/><input placeholder="Mikor?"/><input placeholder="Név vagy becenév / opcionális"/>
            <button type="submit"><Send size={17}/> Beküldés mintája</button>
            {sent && <p className="sentMessage">Köszönjük! Ez most minta-beküldés, éles adatküldés később kerülhet bele.</p>}
          </form>
        </section>

        <footer className="footer"><h2>Következő fejlesztési lépések</h2><p>Saját pázmándi fotók feltöltése, pontos helyszínnevek hozzáadása, térképes pontok megadása, szakmai ellenőrzés, adatvédelmi tájékoztató, majd GitHub + Vercel vagy Netlify feltöltés.</p></footer>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
