import { NextResponse } from 'next/server';

const HTML = `<!doctype html>
<html lang="ne">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#10090a">
  <meta name="description" content="लमिछाने बस्नेत समुदायको उत्पत्ति, मष्टो परम्परा, कुलपूजा, वंशावली र नेपाली सांस्कृतिक विरासतको डिजिटल अभिलेख।">
  
  <!-- Open Graph & Social Preview Tags -->
  <meta property="og:title" content="लमिछाने बस्नेत | इतिहास, कुलपूजा र सांस्कृतिक विरासत">
  <meta property="og:description" content="लमिछाने बस्नेत समुदायको उत्पत्ति, मष्टो परम्परा, कुलपूजा, वंशावली र नेपाली सांस्कृतिक विरासतको डिजिटल अभिलेख।">
  <meta property="og:image" content="https://vercel-lb-nepali.vercel.app/LBlogo.jpeg">
  <meta property="og:url" content="https://vercel-lb-nepali.vercel.app">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">

  <!-- Google Sign-In SDK -->
  <script src="https://accounts.google.com/gsi/client" async defer></script>

  <title data-i18n="headTitle">लमिछाने बस्नेत | इतिहास, कुलपूजा र सांस्कृतिक विरासत</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
    :root{--gold:#c9a84c;--gold2:#e8c97a;--maroon:#6b1a2a;--dark:#10090a;--dark2:#1a100c;--ink:#f4ead2;--muted:#b29a76;--line:rgba(201,168,76,.28);--panel:rgba(255,255,255,.045);--ok:#92d18b;--bad:#ff9a9a}
    *{box-sizing:border-box} html{scroll-behavior:smooth;-webkit-text-size-adjust:100%} body{margin:0;background:var(--dark);color:var(--ink);font-family:"Noto Sans Devanagari",system-ui,sans-serif;line-height:1.75;overflow-x:hidden}
    a{color:inherit} button,input,textarea,select{font:inherit} button{cursor:pointer}
    .skip{position:absolute;left:-999px;top:auto}.skip:focus{left:1rem;top:1rem;z-index:200;background:var(--gold);color:#12080a;padding:.6rem 1rem}
    nav{position:sticky;top:0;z-index:100;background:rgba(10,6,2,.94);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
    .nav-inner{max-width:1180px;margin:auto;padding:.75rem 1.25rem;display:flex;align-items:center;gap:1rem;justify-content:space-between}
    .brand{display:flex;align-items:center;gap:.75rem;text-decoration:none;min-width:0}.brand img{width:50px;height:50px;object-fit:contain;border-radius:50%;filter:drop-shadow(0 0 12px rgba(201,168,76,.3))}.brand span{font-family:"Playfair Display",serif;color:var(--gold);font-size:1.1rem;font-weight:700;white-space:nowrap}
    .nav-links{display:flex;gap:1.15rem;align-items:center}.nav-links a{font-size:.88rem;color:var(--muted);text-decoration:none}.nav-links a:hover{color:var(--gold2)}
    .menu-btn{display:none;background:transparent;border:1px solid var(--line);color:var(--gold);padding:.45rem .7rem;border-radius:6px;min-width:48px;min-height:44px}
    .btn{border:1px solid var(--line);background:transparent;color:var(--gold);padding:.72rem 1.1rem;text-decoration:none;display:inline-flex;justify-content:center;align-items:center;gap:.45rem;transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);min-height:44px;border-radius:6px;text-align:center}
    .btn:hover{border-color:var(--gold);background:rgba(201,168,76,.12);transform:translateY(-1px)} .btn.primary{background:var(--gold);color:#12080a;border-color:var(--gold);font-weight:700}.btn.primary:hover{background:var(--gold2);box-shadow:0 0 15px rgba(201,168,76,0.35)}
    .hero{position:relative;min-height:92vh;display:grid;place-items:center;text-align:center;padding:6rem 1.25rem 4rem;overflow:hidden;background:radial-gradient(circle at 50% 25%,rgba(107,26,42,.42),transparent 45%),radial-gradient(circle at 15% 80%,rgba(201,168,76,.12),transparent 35%),var(--dark)}
    .hero:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(201,168,76,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.035) 1px,transparent 1px);background-size:42px 42px}
    .hero-content{position:relative;max-width:900px}.hero-logo{width:min(360px,78vw);height:auto;filter:drop-shadow(0 0 38px rgba(201,168,76,.22));animation:float 5s ease-in-out infinite}@keyframes float{50%{transform:translateY(-8px)}}
    .eyebrow{display:block;color:var(--gold);letter-spacing:.12em;font-size:.82rem;margin-bottom:.6rem}.hero h1{font-family:"Playfair Display",serif;font-size:clamp(2.4rem,8vw,5rem);line-height:1.05;margin:.2rem 0;color:var(--gold2);text-shadow:0 0 40px rgba(201,168,76,.25)}.hero p{max-width:760px;margin:1rem auto;color:#d8c6a8;font-size:1.02rem}.hero-actions{display:flex;gap:.8rem;justify-content:center;flex-wrap:wrap;margin-top:1.6rem}
    section{padding:4.5rem 1.25rem}.wrap{max-width:1120px;margin:auto}.section-head{text-align:center;max-width:760px;margin:0 auto 2.5rem}.section-head h2{font-size:clamp(1.8rem,4vw,3rem);line-height:1.2;margin:.2rem 0;color:var(--ink)}.rule{width:86px;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);margin:1rem auto}.section-head p{color:var(--muted);margin:0}
    .grid{display:grid;gap:1.25rem}.two{grid-template-columns:1.1fr .9fr}.three{grid-template-columns:repeat(3,1fr)}.four{grid-template-columns:repeat(4,1fr)}
    .card{background:var(--panel);border:1px solid var(--line);padding:1.25rem;border-radius:8px;min-width:0;transition:transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease}.card:hover{transform:translateY(-4px);border-color:var(--gold);box-shadow:0 12px 30px rgba(201,168,76,0.12)}.card h3,.card h4{margin:.1rem 0 .55rem;color:var(--gold2);line-height:1.35}.card p{color:var(--muted);margin:.5rem 0}.lead{font-size:1.08rem;color:#decda9!important}.note{border-left:3px solid var(--gold);padding:1rem 1.2rem;background:rgba(201,168,76,.06);color:#dfcca8}
    .timeline{position:relative}.tl{display:grid;grid-template-columns:170px 1fr;gap:1rem;margin-bottom:1rem}.tl time{color:var(--gold);font-weight:700}.tl div{border-left:1px solid var(--line);padding-left:1rem}.tl h3{margin:0 0 .3rem;color:var(--gold2)}
    .facts{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}.fact{text-align:center}.fact strong{display:block;font-family:"Playfair Display",serif;font-size:2rem;color:var(--gold2)}.fact span{color:var(--muted);font-size:.85rem}
    .read-panel{background:#f7eed7;color:#1a100c;border-radius:8px;padding:1.5rem;border:1px solid #d6bc75}.read-panel h3{margin-top:0;color:#4b121d}.read-panel p,.read-panel li{color:#3f3020}.read-panel details{border-top:1px solid #d8c694;padding:1rem 0}.read-panel summary{font-weight:700;cursor:pointer;color:#681b2a}
    .toolbar{display:flex;gap:.6rem;flex-wrap:wrap;justify-content:center;margin-bottom:1.4rem}.toolbar .btn.active{background:var(--gold);color:#12080a}.archive-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}.archive-item{display:block}
    form{display:grid;gap:.85rem}.field label{display:block;color:var(--muted);font-size:.84rem;margin-bottom:.25rem}.field input,.field textarea,.field select{width:100%;border:1px solid var(--line);background:rgba(255,255,255,.055);color:var(--ink);padding:.75rem .85rem;border-radius:6px;min-height:46px}.field textarea{min-height:112px;resize:vertical}.field input:focus,.field textarea:focus,.field select:focus{outline:2px solid rgba(201,168,76,.3);border-color:var(--gold)}
    .status{min-height:1.4rem;font-size:.9rem}.status.ok{color:var(--ok)}.status.bad{color:var(--bad)}.auth-tabs{display:flex;gap:.5rem;margin-bottom:.8rem}.auth-tabs button{flex:1}.hidden{display:none!important}
    .results{margin-top:1rem;display:grid;gap:.65rem}.result{padding:.85rem;border:1px solid var(--line);background:rgba(201,168,76,.05);border-radius:6px}
    footer{background:#070404;border-top:1px solid var(--line);padding:2.5rem 1.25rem;color:var(--muted)}.footer-grid{display:grid;grid-template-columns:1.4fr repeat(3,1fr);gap:1.5rem;max-width:1120px;margin:auto}.footer-grid h4{color:var(--gold);margin:0 0 .6rem}.footer-grid a{display:block;text-decoration:none;color:var(--muted);margin:.25rem 0}.footer-bottom{max-width:1120px;margin:1.5rem auto 0;padding-top:1rem;border-top:1px solid var(--line);font-size:.84rem;display:flex;justify-content:space-between;gap:1rem}
    @media(max-width:900px){.menu-btn{display:block}.nav-inner{position:relative}.nav-links{display:none;position:absolute;left:0;right:0;top:100%;background:rgba(10,6,2,.99);padding:.75rem 1.25rem 1rem;border-bottom:1px solid var(--line);box-shadow:0 18px 40px rgba(0,0,0,.35);flex-direction:column;align-items:stretch;gap:.25rem}.nav-links.open{display:flex}.nav-links a{display:block;width:100%;padding:.78rem .25rem;border-bottom:1px solid rgba(201,168,76,.13);font-size:1rem}.two,.three,.four,.facts,.archive-grid,.footer-grid{grid-template-columns:1fr}.tl{grid-template-columns:1fr;gap:.35rem}.tl div{border-left:0;padding-left:0}.hero{min-height:auto;padding:4.25rem 1.25rem 3.25rem}.hero-logo{width:min(300px,70vw)}.footer-bottom{flex-direction:column}.brand span{font-size:1rem}.read-panel{padding:1.2rem}.archive-grid{gap:.85rem}}
    @media(max-width:640px){body{line-height:1.68}.brand{gap:.55rem}.brand span{max-width:58vw;overflow:hidden;text-overflow:ellipsis}.hero p,.section-head p,.card p,.note{font-size:.96rem}.hero-actions{display:grid;grid-template-columns:1fr;gap:.65rem}.toolbar{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));align-items:stretch}.toolbar .btn{width:100%;padding:.7rem .45rem}.auth-tabs{display:grid;grid-template-columns:1fr 1fr}.footer-grid{gap:1rem}.footer-grid a{padding:.25rem 0}.footer-bottom{text-align:center}.read-panel details{padding:.85rem 0}.read-panel summary{line-height:1.45}.result{overflow-wrap:anywhere}}
    @media(max-width:520px){section{padding:3rem 1rem}.nav-inner{padding:.6rem .9rem}.brand img{width:40px;height:40px}.menu-btn{padding:.42rem .62rem}.btn{width:100%;padding:.78rem .9rem}.card{padding:1rem}.hero{padding:3rem 1rem 2.6rem}.hero-logo{width:min(240px,68vw)}.hero h1{font-size:clamp(2rem,12vw,2.55rem);line-height:1.08}.eyebrow{font-size:.76rem;letter-spacing:.07em}.section-head{margin-bottom:1.7rem}.section-head h2{font-size:clamp(1.55rem,8vw,2.15rem)}.facts{gap:.75rem}.fact strong{font-size:1.65rem}.field input,.field textarea,.field select{font-size:16px}.read-panel{padding:1rem;border-radius:6px}.note{padding:.85rem 1rem}.toolbar{grid-template-columns:1fr 1fr}.archive-item h3{font-size:1.05rem}}
    @media(max-width:360px){.brand span{max-width:50vw;font-size:.92rem}.toolbar{grid-template-columns:1fr}.hero-logo{width:210px}.hero h1{font-size:2rem}.section-head h2{font-size:1.45rem}.card{padding:.9rem}.btn{font-size:.95rem}}
  </style>
</head>
<body>
  <a class="skip" href="#main">मुख्य सामग्रीमा जानुहोस्</a>
  <nav>
    <div class="nav-inner">
      <a class="brand" href="#home"><img src="LBlogo.jpeg" alt="लमिछाने बस्नेत लोगो"><span>Lamichhane Basnet</span></a>
      <button class="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="navLinks">मेनु</button>
      <div class="nav-links" id="navLinks">
        <a href="#origin" data-i18n="navOrigin">उत्पत्ति</a><a href="#history" data-i18n="navHistory">वीर इतिहास</a><a href="#masto" data-i18n="navMasto">मष्टो/कुलपूजा</a><a href="#genealogy" data-i18n="navGenealogy">वंशावली</a><a href="#archive" data-i18n="navArchive">अभिलेख</a><a href="#community" data-i18n="navCommunity">समुदाय</a>
        <button id="langToggleBtn" class="btn" style="min-height:36px;padding:.3rem .7rem;font-size:.8rem;margin-left:.5rem">English</button>
      </div>
    </div>
  </nav>

  <header class="hero" id="home">
    <div class="hero-content">
      <img class="hero-logo" src="LBlogo.jpeg" alt="लमिछाने बस्नेत प्रतीक">
      <span class="eyebrow" data-i18n="heroEyebrow">गर्ग ऋषि वंश, वीर इतिहास र जीवित परम्परा</span>
      <h1 data-i18n="heroTitle">लमिछाने बस्नेत</h1>
      <p data-i18n="heroDesc">उत्पत्ति, मष्टो परम्परा, कुलपूजा, वंशावली र नेपाली सांस्कृतिक विरासतको सार्वजनिक डिजिटल अभिलेख। यो सामग्री तपाईंले उपलब्ध गराउनुभएको ऐतिहासिक ग्रन्थका आधारमा पुनर्संरचना गरिएको हो।</p>
      <div class="hero-actions">
        <a class="btn primary" href="#reader" data-i18n="btnRead">ग्रन्थ पढ्नुहोस्</a>
        <a class="btn" href="#community" data-i18n="btnJoin">सदस्य बन्नुहोस्</a>
        <a class="btn" href="#contact" data-i18n="btnContribute">इतिहास योगदान गर्नुहोस्</a>
      </div>
    </div>
  </header>

  <main id="main">
    <section id="origin">
      <div class="wrap">
        <div class="section-head">
          <span class="eyebrow">भाग १</span>
          <h2>परिचय र ऐतिहासिक पृष्ठभूमि</h2>
          <div class="rule"></div>
          <p>लमिछाने बस्नेतहरूको इतिहास एउटा थरको कथा मात्र होइन; यो सैनिक परम्परा, धार्मिक विश्वास, कुलपूजा, मष्टो संस्कृति र पुर्खाको त्यागसँग जोडिएको जीवित सभ्यता हो।</p>
        </div>
        <div class="grid two">
          <div class="card">
            <h3>बस्नेत थरको अर्थ</h3>
            <p class="lead">‘बस्नेत’ वा ‘बस्न्यात’ शब्द प्राचीन सैनिक प्रशासन र राज्य सुरक्षाको जिम्मेवारीसँग जोडिएको मानिन्छ।</p>
            <p>ऐतिहासिक रूपमा बस्नेतहरू किल्ला, शासक र प्रजाको सुरक्षामा विश्वासिला र वीर संरक्षकका रूपमा चिनिए। उनीहरूलाई संवेदनशील दायित्व सुम्पिइन्थ्यो किनभने विश्वसनीयता, साहस र अनुशासन प्रमाणित थियो।</p>
          </div>
          <div class="card">
            <h3>लमिछाने बस्नेतको उत्पत्ति</h3>
            <p>‘लमिछाने’ शब्दबारे विभिन्न जनश्रुति छन्। केहीले यसलाई “लामो क्षेत्रबाट आएका” भन्ने अर्थसँग जोड्छन्, केहीले “लामोचौर” जस्ता भूगोलसँग। जुम्ला, दैलेख, जाजरकोट, रुकुम, सल्यान र गोरखामा प्राचीन बसोबास पाइने उल्लेख छ।</p>
          </div>
        </div>
        <div class="facts" style="margin-top:1.25rem">
          <div class="card fact"><strong>गर्ग</strong><span>ऋषि परम्परासँग जोडिएको मान्यता</span></div>
          <div class="card fact"><strong>मष्टो</strong><span>पश्चिम नेपालको रक्षक देवता परम्परा</span></div>
          <div class="card fact"><strong>कुलपूजा</strong><span>वंशदेवता र पुर्खाको सामूहिक स्मरण</span></div>
          <div class="card fact"><strong>अभिलेख</strong><span>जनश्रुति, ताम्रपत्र र कुलपुरोहित स्रोत</span></div>
        </div>
      </div>
    </section>

    <section id="history" style="background:var(--dark2)">
      <div class="wrap">
        <div class="section-head">
          <span class="eyebrow">भाग २</span>
          <h2>नेपाल एकीकरण र वीर इतिहास</h2>
          <div class="rule"></div>
          <p>गोरखा राज्यको उदयदेखि पृथ्वीनारायण शाहको नेपाल एकीकरणसम्म, लमिछाने बस्नेत समुदायको स्मृतिमा सैनिक नेतृत्व, सीमा सुरक्षा र प्रशासनिक योगदान प्रमुख छन्।</p>
        </div>
        <div class="timeline">
          <article class="tl"><time>१८औँ शताब्दी</time><div><h3>गोरखा राज्यको उदय</h3><p>गोरखा आधुनिक नेपाल निर्माणको केन्द्र बन्यो। विश्वसनीय वीर समुदायको निष्ठा राष्ट्र निर्माणका लागि अपरिहार्य थियो।</p></div></article>
          <article class="tl"><time>१७४३–१७७५</time><div><h3>पृथ्वीनारायण शाह र एकीकरण</h3><p>दर्जनौँ साना राज्यलाई एकत्रित गर्ने अभियानमा सैन्य प्रतिभा, पहाडी रणनीति र स्थानीय प्रशासनिक क्षमता निर्णायक भए।</p></div></article>
          <article class="tl"><time>युद्ध परम्परा</time><div><h3>खुकुरी र पहाडी रणनीति</h3><p>खुकुरी सम्मान, साहस र पुर्खाको गौरवको प्रतीक मानियो। दुर्ग रक्षा, रात्री रणनीति, सीमाको सुरक्षा र कमजोरको संरक्षण वीर संस्कारका मूल पक्ष बने।</p></div></article>
          <article class="tl"><time>सामाजिक भूमिका</time><div><h3>योद्धा मात्र होइन, संरक्षक</h3><p>बस्नेत परिवारले जितिएका क्षेत्रमा शासन सञ्चालन, जनताको सुरक्षा, धार्मिक तथा सांस्कृतिक एकताको संरक्षण र गाउँ समाजको नेतृत्वमा योगदान पुर्‍याएको स्मृति पाइन्छ।</p></div></article>
        </div>
      </div>
    </section>

    <section id="masto">
      <div class="wrap">
        <div class="section-head">
          <span class="eyebrow">भाग ३</span>
          <h2>मष्टो र कुलपूजा परम्परा</h2>
          <div class="rule"></div>
          <p>मष्टो र कुलपूजा लमिछाने बस्नेत पहिचानका धार्मिक मात्र होइन, सामाजिक एकता र वंश स्मृतिका स्तम्भ पनि हुन्।</p>
        </div>
        <div class="grid three">
          <div class="card"><h3>मष्टोको उत्पत्ति</h3><p>मष्टो पश्चिम नेपालको प्राचीन लोक–धार्मिक परम्परा हो। यसले रक्षक देवता, पुर्खाको आत्मा र गाउँ समुदायको आध्यात्मिक सुरक्षा जनाउँछ।</p></div>
          <div class="card"><h3>धामी–झाँक्री परम्परा</h3><p>धामी वा झाँक्री मानव र दैवी संसारबीच सेतुको रूपमा उभिन्छन्। ढोल, नगारा, शंख र मन्त्रले अनुष्ठानिक वातावरण निर्माण गर्छन्।</p></div>
          <div class="card"><h3>कुलपूजा</h3><p>कुलदेवता र कुलदेवीको सामूहिक पूजा मार्फत पुर्खा स्मरण, पारिवारिक सुरक्षा, सन्तानको कल्याण र भौगोलिक दूरी पारको सामाजिक एकता बलियो बनाइन्छ।</p></div>
        </div>
        <div class="note" style="margin-top:1.25rem">पूजाका प्रमुख सामग्रीमा अक्षता, फूल, धूप–दीप, कलश, प्रसाद र परम्परागत खाद्यपदार्थ पर्दछन्। विधिमा शुद्धिकरण, देवताको आह्वान, पुर्खाको नाम स्मरण, पूजा/आरती र प्रसाद वितरण समावेश हुन्छ।</div>
      </div>
    </section>

    <section id="genealogy" style="background:var(--dark2)">
      <div class="wrap">
        <div class="section-head">
          <span class="eyebrow">भाग ४</span>
          <h2>वंशावली र सामाजिक संरचना</h2>
          <div class="rule"></div>
          <p>वंशावलीले जीवितहरूलाई दिवंगत पुर्खासँग जोड्छ, विवाह, गोत्र, कुल र रक्तसम्बन्धका निर्णयमा आधार दिन्छ।</p>
        </div>
        <div class="grid two">
          <div class="card">
            <h3>गोत्र र वैदिक पहिचान</h3>
            <p>लमिछाने बस्नेतहरू विभिन्न वैदिक गोत्रसँग सम्बन्धित पाइन्छन्। गोत्रले आध्यात्मिक पुर्खासँग नाता जोड्छ र विवाहमा समान गोत्र निषेधको सामाजिक व्यवस्था कायम गर्छ।</p>
          </div>
          <div class="card">
            <h3>वंश खोज्नुहोस्</h3>
            <form id="treeForm">
              <div class="field"><label for="treeSearch">नाम, गाउँ वा शाखा</label><input id="treeSearch" name="query" placeholder="जस्तै: गोरखा, दैलेख, लमिछाने"></div>
              <button class="btn primary" type="submit">वंशावली खोज्नुहोस्</button>
              <div class="status" id="treeStatus" role="status"></div>
            </form>
            <div class="results" id="treeResults"></div>
          </div>
        </div>
      </div>
    </section>

    <section id="reader">
      <div class="wrap">
        <div class="section-head">
          <span class="eyebrow">सजिलो पढाइ</span>
          <h2>ग्रन्थबाट मुख्य अध्यायहरू</h2>
          <div class="rule"></div>
          <p>लामो DOCX सामग्रीलाई वेबसाइटका पाठकका लागि छोटो, स्क्यान गर्न मिल्ने र विषयगत रूपमा व्यवस्थित गरिएको छ।</p>
        </div>
        <div class="read-panel">
          <h3>लमिछाने बस्नेत ऐतिहासिक ग्रन्थ</h3>
          <details open><summary>पुस्तक परिचय</summary><p>यो ग्रन्थ जनश्रुति, वंशावली अभिलेख, ताम्रपत्र र गाउँका ज्येष्ठ नागरिकहरूको साक्ष्यमा आधारित सांस्कृतिक दस्तावेज हो। यसले गर्ग ऋषिको वैदिक परम्परादेखि नेपाल एकीकरण र आधुनिक कालसम्मको यात्रा समेट्छ।</p></details>
          <details><summary>वीर परम्परा</summary><p>पुराना पुस्ताले सत्यका लागि लड्नु, राष्ट्र र धर्मको रक्षा गर्नु, कुलको सम्मान बचाउनु, कमजोरको संरक्षण गर्नु र अन्यायविरुद्ध उभिनु भन्ने शिक्षा दिन्थे।</p></details>
          <details><summary>संस्कृति र परम्परा</summary><p>दशैं, तिहार, देउसी–भैलो, पञ्चेबाजा, ब्रतबन्ध, विवाह, अन्त्येष्टि र परमा जस्ता सामूहिक अभ्यासले समुदायलाई जीवित सांस्कृतिक पुरालेख बनाएका छन्।</p></details>
          <details><summary>आधुनिक पुस्ता</summary><p>शहरीकरण, बसाइँसराइ र डिजिटल युगले परम्परा गुम्ने जोखिम बढाएको छ। वंशावली लेखन, डिजिटल अभिलेख, मष्टो/कुलपूजा दस्तावेजीकरण र युवालाई इतिहास शिक्षा अब मुख्य आवश्यकता हुन्।</p></details>
          <details><summary>स्रोत र सावधानी</summary><p>सामग्री स्थानीय जनश्रुति, ताम्रपत्र, कुलपुरोहित अभिलेख, ज्येष्ठ नागरिकका अन्तर्वार्ता, नेपाली इतिहासका द्वितीयक स्रोत र मष्टो परम्परासम्बन्धी अध्ययनमा आधारित छ। थप प्रमाण भेटिएमा सुधार र परिमार्जन स्वागतयोग्य छन्।</p></details>
        </div>
      </div>
    </section>

    <section id="culture" style="background:var(--dark2)">
      <div class="wrap">
        <div class="section-head">
          <span class="eyebrow">भाग ५–७</span>
          <h2>संस्कृति, योगदान र आधुनिक पहिचान</h2>
          <div class="rule"></div>
        </div>
        <div class="grid three">
          <div class="card"><h3>सैनिक योगदान</h3><p>राष्ट्रिय एकीकरण, गोरखाली सेनामा रणकुशलता, सीमा सुरक्षा र असुरक्षित जनताको संरक्षण।</p></div>
          <div class="card"><h3>सामाजिक योगदान</h3><p>गाउँ शासन, विवाद समाधान, रीतिथिति कानुन, असहायको सहयोग र सामुदायिक एकताको रखरखाव।</p></div>
          <div class="card"><h3>संरक्षण अभियान</h3><p>वंशावली लेखन, डिजिटल अभिलेख, कुलपूजा तथा मष्टोको अडियो/भिडियो दस्तावेजीकरण, युवा इतिहास शिक्षा र सांस्कृतिक सम्मेलन।</p></div>
        </div>
      </div>
    </section>

    <section id="archive">
      <div class="wrap">
        <div class="section-head">
          <span class="eyebrow">डिजिटल अभिलेख</span>
          <h2>खोज, फिल्टर र योगदान</h2>
          <div class="rule"></div>
          <p>फिल्टर बटनहरू अब backend API बाट अभिलेख सूची ल्याउँछन्।</p>
        </div>
        <div class="toolbar" id="archiveToolbar">
          <button class="btn active" data-cat="all">सबै</button><button class="btn" data-cat="photos">तस्वीर</button><button class="btn" data-cat="docs">कागजात</button><button class="btn" data-cat="stories">कथा</button><button class="btn" data-cat="audio">अडियो</button>
        </div>
        <div class="archive-grid" id="archiveGrid"></div>
        <div class="status" id="archiveStatus" role="status"></div>
      </div>
    </section>

    <section id="community" style="background:var(--dark2)">
      <div class="wrap">
        <div class="section-head">
          <span class="eyebrow">समुदाय</span>
          <h2>सदस्यता र लगइन</h2>
          <div class="rule"></div>
          <p>सदस्यता, लगइन र Google अनुरोध अब backend मा POST हुन्छन् र सुरक्षित session-जस्तो token फर्काउँछन्। पूर्ण production auth का लागि database/OAuth credentials थप्न सकिन्छ।</p>
        </div>
        <div class="grid two">
          <div class="card">
            <h3>समुदायमा किन जोडिने?</h3>
            <p>परिवारका कथा, तस्वीर, ताम्रपत्र, मौखिक इतिहास, कुलपूजा विवरण र वंशावली शाखा साझा गर्न सकिन्छ। विदेशमा रहेका पुस्तालाई पनि आफ्ना पुर्खाको स्मृतिसँग जोड्ने उद्देश्य हो।</p>
            <div class="note">“आफू कहाँबाट आएको जान्नु भनेको आफू को हो भनेर जान्नु हो।”</div>
          </div>
          <div class="card">
            <div class="auth-tabs">
              <button class="btn primary" id="signupTab" type="button">सदस्यता</button>
              <button class="btn" id="loginTab" type="button">लगइन</button>
            </div>
            <form id="authForm">
              <input type="hidden" name="mode" id="authMode" value="signup">
              <div class="field" id="nameField"><label for="authName" data-i18n="labelName">पूरा नाम</label><input id="authName" name="name" autocomplete="name" placeholder="तपाईंको नाम"></div>
              <div class="field"><label for="authEmail" data-i18n="labelEmail">इमेल</label><input id="authEmail" name="email" type="email" autocomplete="email" required placeholder="name@example.com"></div>
              <div class="field"><label for="authPassword" data-i18n="labelPassword">पासवर्ड</label><input id="authPassword" name="password" type="password" autocomplete="current-password" required minlength="8" placeholder="कम्तीमा ८ अक्षर"></div>
              <div class="field" id="branchField"><label for="authBranch" data-i18n="labelBranch">कुल शाखा</label><input id="authBranch" name="branch" placeholder="जस्तै: दैलेख शाखा"></div>
              <button class="btn primary" type="submit" data-i18n="btnSubmit">जारी राख्नुहोस्</button>
              
              <!-- Official Google Sign-In Button -->
              <div id="g_id_onload"
                   data-client_id="1012351221764-dummyclientid.apps.googleusercontent.com"
                   data-context="signin"
                   data-ux_mode="popup"
                   data-callback="handleGoogleLogin"
                   data-auto_prompt="false">
              </div>
              <div class="g_id_signin"
                   data-type="standard"
                   data-shape="rectangular"
                   data-theme="filled_blue"
                   data-text="signin_with"
                   data-size="large"
                   data-logo_alignment="left"
                   style="margin-top: 0.75rem; width: 100%;">
              </div>

              <div class="status" id="authStatus" role="status"></div>
            </form>
            <div id="loggedInState" class="hidden">
              <h3 id="welcomeMsg" style="color:var(--gold2);margin-top:0"></h3>
              <p>तपाईं हाम्रो समुदायको सदस्यको रूपमा लगइन हुनुहुन्छ।</p>
              <div class="note" style="margin-bottom:1.25rem;font-size:0.95rem">
                <strong>इमेल:</strong> <span id="userEmailSpan"></span><br>
                <strong>भूमिका:</strong> <span id="userRoleSpan"></span>
              </div>
              <button class="btn primary" id="logoutBtn" type="button">लगआउट गर्नुहोस्</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact">
      <div class="wrap">
        <div class="section-head">
          <span class="eyebrow">योगदान</span>
          <h2>सन्देश, इतिहास वा अभिलेख पठाउनुहोस्</h2>
          <div class="rule"></div>
          <p>तपाईंको सन्देश backend मा validate भएर submission ID सहित स्वीकार हुन्छ।</p>
        </div>
        <div class="grid two">
          <form class="card" id="contactForm">
            <h3>सन्देश पठाउनुहोस्</h3>
            <div class="field"><label for="contactName">नाम</label><input id="contactName" name="name" required></div>
            <div class="field"><label for="contactEmail">इमेल</label><input id="contactEmail" name="email" type="email" required></div>
            <div class="field"><label for="contactPurpose">उद्देश्य</label><select id="contactPurpose" name="purpose"><option value="history">इतिहास सुधार/थप</option><option value="archive">अभिलेख योगदान</option><option value="genealogy">वंशावली जानकारी</option><option value="question">प्रश्न</option></select></div>
            <div class="field"><label for="contactMessage">सन्देश</label><textarea id="contactMessage" name="message" required minlength="10"></textarea></div>
            <button class="btn primary" type="submit">सन्देश पठाउनुहोस्</button>
            <div class="status" id="contactStatus" role="status"></div>
          </form>
          <form class="card" id="storyForm">
            <h3>आफ्नो कथा योगदान गर्नुहोस्</h3>
            <div class="field"><label for="storyTitle">शीर्षक</label><input id="storyTitle" name="title" required></div>
            <div class="field"><label for="storyCategory">प्रकार</label><select id="storyCategory" name="category"><option>मौखिक इतिहास</option><option>कुलपूजा विवरण</option><option>तस्वीर/कागजात विवरण</option><option>वंशावली शाखा</option></select></div>
            <div class="field"><label for="storyText">विवरण</label><textarea id="storyText" name="story" required minlength="20"></textarea></div>
            <button class="btn primary" type="submit">कथा पेश गर्नुहोस्</button>
            <div class="status" id="storyStatus" role="status"></div>
          </form>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="footer-grid">
      <div><h4>Lamichhane Basnet</h4><p>लमिछाने बस्नेत समुदायको इतिहास, संस्कृति, कुलपूजा, मष्टो परम्परा र वंशावलीलाई भावी पुस्ताका लागि व्यवस्थित गर्ने डिजिटल अभिलेख।</p></div>
      <div><h4>विरासत</h4><a href="#origin">उत्पत्ति</a><a href="#history">वीर इतिहास</a><a href="#masto">मष्टो/कुलपूजा</a></div>
      <div><h4>अभिलेख</h4><a href="#reader">ग्रन्थ</a><a href="#genealogy">वंशावली</a><a href="#archive">डिजिटल अभिलेख</a></div>
      <div><h4>समुदाय</h4><a href="#community">सदस्यता</a><a href="#contact">योगदान</a><a href="#contact">सम्पर्क</a></div>
    </div>
    <div class="footer-bottom"><span>© २०२६ लमिछाने बस्नेत विरासत अभिलेख</span><span>पुर्खाबाट पुस्तापुस्तासम्म</span></div>
  </footer>

  <script>
    const $ = (sel, root=document) => root.querySelector(sel);
    const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
    const setStatus = (el, msg, ok=true) => { el.textContent = msg; el.className = 'status ' + (ok ? 'ok' : 'bad'); };
    const api = async (url, data, requiresAuth=false) => {
      const headers = {'Content-Type':'application/json'};
      if (requiresAuth) {
        const tok = localStorage.getItem('lb_session');
        if (!tok) throw new Error('यो कार्यका लागि लगइन आवश्यक छ।');
        headers['Authorization'] = 'Bearer ' + tok;
      }
      const res = await fetch(url, {method:'POST', headers, body: JSON.stringify(data || {})});
      const json = await res.json().catch(() => ({}));
      if(!res.ok) throw new Error(json.error || 'अनुरोध पूरा हुन सकेन।');
      return json;
    };

    $('#menuBtn').addEventListener('click', () => {
      const links = $('#navLinks');
      links.classList.toggle('open');
      $('#menuBtn').setAttribute('aria-expanded', links.classList.contains('open'));
    });
    $$('#navLinks a').forEach(a => a.addEventListener('click', () => $('#navLinks').classList.remove('open')));

    async function loadArchive(category='all'){
      const status = $('#archiveStatus');
      try{
        setStatus(status, 'अभिलेख लोड हुँदैछ...');
        const data = await api('/api/archive', {category});
        $('#archiveGrid').innerHTML = data.items.map(item => \`<article class="card archive-item"><h3>\${item.title}</h3><p><strong>\${item.type}</strong> · \${item.period}</p><p>\${item.summary}</p></article>\`).join('');
        setStatus(status, \`\${data.items.length} अभिलेख भेटिए।\`);
      }catch(err){ setStatus(status, err.message, false); }
    }
    $('#archiveToolbar').addEventListener('click', e => {
      const btn = e.target.closest('button[data-cat]');
      if(!btn) return;
      $$('#archiveToolbar .btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadArchive(btn.dataset.cat);
    });
    loadArchive();

    $('#treeForm').addEventListener('submit', async e => {
      e.preventDefault();
      const status = $('#treeStatus');
      try{
        const query = new FormData(e.currentTarget).get('query');
        const data = await api('/api/tree-search', {query});
        $('#treeResults').innerHTML = data.results.map(r => \`<div class="result"><strong>\${r.name}</strong><br>\${r.region}<br><span>\${r.note}</span></div>\`).join('');
        setStatus(status, data.results.length ? 'सम्भावित शाखा भेटियो।' : 'मिल्दो शाखा भेटिएन; थप विवरण पठाउनुहोस्।', !!data.results.length);
      }catch(err){ setStatus(status, err.message, false); }
    });

    function decodeToken(token) {
      try {
        const base64 = token.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        return JSON.parse(jsonPayload);
      } catch (e) {
        return null;
      }
    }

    function checkSession() {
      const token = localStorage.getItem('lb_session');
      if (token) {
        const user = decodeToken(token);
        if (user && user.email) {
          $('#welcomeMsg').textContent = \`स्वागत छ, \${user.name || 'सदस्य'}!\`;
          $('#userEmailSpan').textContent = user.email;
          $('#userRoleSpan').textContent = user.role === 'admin' ? 'प्रशासक' : 'साधारण सदस्य';
          $('.auth-tabs').classList.add('hidden');
          $('#authForm').classList.add('hidden');
          $('#loggedInState').classList.remove('hidden');
          return;
        }
      }
      $('.auth-tabs').classList.remove('hidden');
      $('#authForm').classList.remove('hidden');
      $('#loggedInState').classList.add('hidden');
    }

    // --- Translation Dictionary and Language Selector ---
    const translations = {
      ne: {
        navOrigin: 'उत्पत्ति',
        navHistory: 'वीर इतिहास',
        navMasto: 'मष्टो/कुलपूजा',
        navGenealogy: 'वंशावली',
        navArchive: 'अभिलेख',
        navCommunity: 'समुदाय',
        heroEyebrow: 'गर्ग ऋषि वंश, वीर इतिहास र जीवित परम्परा',
        heroTitle: 'लमिछाने बस्नेत',
        heroDesc: 'उत्पत्ति, मष्टो परम्परा, कुलपूजा, वंशावली र नेपाली सांस्कृतिक विरासतको सार्वजनिक डिजिटल अभिलेख। यो सामग्री तपाईंले उपलब्ध गराउनुभएको ऐतिहासिक ग्रन्थका आधारमा पुनर्संरचना गरिएको हो।',
        btnRead: 'ग्रन्थ पढ्नुहोस्',
        btnJoin: 'सदस्य बन्नुहोस्',
        btnContribute: 'इतिहास योगदान गर्नुहोस्',
        labelName: 'पूरा नाम',
        labelEmail: 'इमेल',
        labelPassword: 'पासवर्ड',
        labelBranch: 'कुल शाखा',
        btnSubmit: 'जारी राख्नुहोस्',
        headTitle: 'लमिछाने बस्नेत | इतिहास, कुलपूजा र सांस्कृतिक विरासत',
      },
      en: {
        navOrigin: 'Origin',
        navHistory: 'History',
        navMasto: 'Masto/Kulpuja',
        navGenealogy: 'Genealogy',
        navArchive: 'Archive',
        navCommunity: 'Community',
        heroEyebrow: 'Garga Rishi Lineage, Heroic History & Living Traditions',
        heroTitle: 'Lamichhane Basnet',
        heroDesc: 'Public digital archive of origin, Masto tradition, Kulpuja, genealogy, and Nepalese cultural heritage. This content is reconstructed based on the historical texts provided.',
        btnRead: 'Read Book',
        btnJoin: 'Become a Member',
        btnContribute: 'Contribute History',
        labelName: 'Full Name',
        labelEmail: 'Email',
        labelPassword: 'Password',
        labelBranch: 'Lineage Branch',
        btnSubmit: 'Submit / Continue',
        headTitle: 'Lamichhane Basnet | History, Kulpuja & Heritage',
      }
    };

    let currentLang = localStorage.getItem('lang') || 'ne';

    function applyLanguage(lang) {
      currentLang = lang;
      localStorage.setItem('lang', lang);
      document.documentElement.lang = lang;
      
      $$('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations[lang] && translations[lang][key]) {
          el.textContent = translations[lang][key];
        }
      });
      
      // Update page title
      document.title = translations[lang]['headTitle'] || document.title;
      
      // Update lang toggle button text
      $('#langToggleBtn').textContent = lang === 'ne' ? 'English' : 'नेपाली';
    }

    $('#langToggleBtn').addEventListener('click', () => {
      applyLanguage(currentLang === 'ne' ? 'en' : 'ne');
    });

    // Apply default language on load
    applyLanguage(currentLang);

    // --- Google OAuth Callback Handler ---
    window.handleGoogleLogin = async (response) => {
      const status = $('#authStatus');
      try {
        if (!response.credential) throw new Error('Google लगइन असफल भयो।');
        setStatus(status, 'Google मार्फत प्रमाणित गर्दै...');
        const data = await api('/api/auth', { mode: 'google', credential: response.credential });
        localStorage.setItem('lb_session', data.token);
        checkSession();
        setStatus(status, data.message);
      } catch (err) {
        setStatus(status, err.message, false);
      }
    };

    const setAuthMode = mode => {
      $('#authMode').value = mode;
      $('#signupTab').classList.toggle('primary', mode === 'signup');
      $('#loginTab').classList.toggle('primary', mode === 'login');
      $('#authName').closest('.field').classList.toggle('hidden', mode === 'login');
      $('#branchField').classList.toggle('hidden', mode === 'login');
    };
    $('#signupTab').addEventListener('click', () => setAuthMode('signup'));
    $('#loginTab').addEventListener('click', () => setAuthMode('login'));
    $('#authForm').addEventListener('submit', async e => {
      e.preventDefault();
      const status = $('#authStatus');
      try{
        const payload = Object.fromEntries(new FormData(e.currentTarget).entries());
        const data = await api('/api/auth', payload);
        localStorage.setItem('lb_session', data.token);
        checkSession();
        setStatus(status, data.message);
      }catch(err){ setStatus(status, err.message, false); }
    });
    $('#logoutBtn').addEventListener('click', () => {
      localStorage.removeItem('lb_session');
      checkSession();
      setStatus($('#authStatus'), 'लगआउट सफल भयो।');
    });

    // Initial session check
    checkSession();

    $('#contactForm').addEventListener('submit', async e => {
      e.preventDefault();
      const status = $('#contactStatus');
      try{
        const data = await api('/api/contact', Object.fromEntries(new FormData(e.currentTarget).entries()));
        e.currentTarget.reset();
        setStatus(status, \`सन्देश प्राप्त भयो। ID: \${data.id}\`);
      }catch(err){ setStatus(status, err.message, false); }
    });
    $('#storyForm').addEventListener('submit', async e => {
      e.preventDefault();
      const status = $('#storyStatus');
      try{
        const data = await api('/api/contribution', Object.fromEntries(new FormData(e.currentTarget).entries()), true);
        e.currentTarget.reset();
        setStatus(status, \`कथा पेश भयो। ID: \${data.id}\`);
      }catch(err){ setStatus(status, err.message, false); }
    });
  </script>
</body>
</html>
`;

export async function GET() {
  return new NextResponse(HTML, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
