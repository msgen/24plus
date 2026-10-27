import fs from "node:fs";
import path from "node:path";
import { getStore } from "@netlify/blobs";
// src/lib/store.ts
var defaults = {
	categories: [
		{
			"slug": "productie-publicitara",
			"title": "Producție publicitară",
			"blurb": "Litere volumetrice, firme luminoase, totemuri și personalizări auto."
		},
		{
			"slug": "printuri-mari",
			"title": "Printuri mari",
			"blurb": "Autocolante, bannere, afișe, canvas și fototapet."
		},
		{
			"slug": "print-digital",
			"title": "Print digital",
			"blurb": "Flyere, cărți de vizită, cataloage, calendare și etichete."
		},
		{
			"slug": "obiecte-promotionale",
			"title": "Obiecte promoționale",
			"blurb": "Tricouri, pixuri, brelocuri, brichete, magneți și roll-up-uri."
		}
	],
	services: /* @__PURE__ */ JSON.parse("[{\"slug\":\"litere-volumetrice\",\"category\":\"productie-publicitara\",\"title\":\"Litere volumetrice\",\"order\":1,\"excerpt\":\"Litere 3D pentru fațade și interioare, care fac brandul tău vizibil de departe.\",\"paragraphs\":[\"Literele volumetrice sunt cea mai la îndemână metodă de a-ți semnala sediul sau punctul de lucru și de a-ți consolida imaginea de brand, atât în exterior, cât și în interior.\",\"Le realizăm într-o mare varietate de forme și materiale, cu sau fără iluminare, în funcție de locație și de stilul brandului tău.\"],\"hidden\":false,\"needsReview\":true},{\"slug\":\"casete-luminoase\",\"category\":\"productie-publicitara\",\"title\":\"Casete și firme luminoase\",\"order\":2,\"excerpt\":\"Casete și firme luminoase cu impact vizual puternic, zi și noapte.\",\"paragraphs\":[\"Casetele și firmele luminoase sunt soluția ideală pentru companiile care vor să comunice brandul și să impresioneze, mai ales după lăsarea serii.\",\"Îți oferim o gamă variată de casete luminoase, de la proiectare până la montaj.\"],\"hidden\":false,\"needsReview\":true},{\"slug\":\"totem\",\"category\":\"productie-publicitara\",\"title\":\"Totem\",\"order\":3,\"excerpt\":\"Totemuri stradale elegante, care semnalizează și informează clientul.\",\"paragraphs\":[\"Totemul este un element de semnalistică stradală cu rol de a indica și de a informa mai bine clientul. Dă valoare locației și se remarcă prin verticalitate.\",\"Poate avea forme, dimensiuni și grosimi diferite și se confecționează din materiale precum alucobond, stiplex, polyplan sau policarbonat, cu sau fără iluminare.\"],\"hidden\":false,\"needsReview\":true},{\"slug\":\"personalizari-auto\",\"category\":\"productie-publicitara\",\"title\":\"Personalizări auto\",\"order\":4,\"excerpt\":\"Înscripționare auto rapidă și accesibilă, cu vizibilitate maximă în trafic.\",\"paragraphs\":[\"Înscripționarea auto este o metodă de promovare foarte populară și eficientă. Se realizează rapid, la un cost mic față de alte tipuri de reclamă.\",\"Datorită traficului intens din orașe, mașina ta devine un panou publicitar în mișcare.\"],\"hidden\":false,\"needsReview\":true},{\"slug\":\"decorari-geamuri-si-vitrine\",\"category\":\"productie-publicitara\",\"title\":\"Decorări geamuri și vitrine\",\"order\":5,\"excerpt\":\"Vitrine care vând: oferte, brand și produse la dimensiuni mari.\",\"paragraphs\":[\"Înscripționarea vitrinelor este una dintre cele mai eficiente acțiuni de marketing la locul de vânzare. Spațiul mare permite expunerea ofertelor, a brandului sau a produselor.\",\"Personalizarea se poate face cu autocolant decupat pe contur sau cu autocolant printat, cu sau fără laminare.\"],\"hidden\":false,\"needsReview\":true},{\"slug\":\"gravura-computerizata\",\"category\":\"productie-publicitara\",\"title\":\"Gravură computerizată\",\"order\":6,\"excerpt\":\"Gravură precisă pentru sigle, scrisuri și imagini.\",\"paragraphs\":[\"Gravura este procedeul prin care un desen este trasat pe suprafața unui material rezistent. Se pot realiza gravări superficiale sau profunde, pentru sigle, logo-uri, scrisuri și imagini.\",\"Putem realiza plachete, trofee, panouri de afișaj, numere pentru camere, numere de inventar, brelocuri și altele.\"],\"hidden\":false,\"needsReview\":true},{\"slug\":\"panouri-publicitare\",\"category\":\"productie-publicitara\",\"title\":\"Panouri publicitare\",\"order\":7,\"excerpt\":\"\",\"paragraphs\":[],\"hidden\":true,\"needsReview\":false},{\"slug\":\"mese-candybar\",\"category\":\"productie-publicitara\",\"title\":\"Mese candy bar\",\"order\":8,\"excerpt\":\"Mese candy bar din polistiren, pentru nunți, botezuri și petreceri.\",\"paragraphs\":[\"Mesele pentru candy bar sunt realizate din polistiren dur, finisate și vopsite cu vopsea pe bază de apă, în diferite culori.\",\"Sunt folosite la nunți, botezuri, petreceri private sau corporate. Înălțimea, lungimea, grosimea și culoarea se pot adapta cerințelor tale.\"],\"hidden\":false,\"needsReview\":true},{\"slug\":\"decupaj-polistiren\",\"category\":\"productie-publicitara\",\"title\":\"Decupaj polistiren\",\"order\":9,\"excerpt\":\"Litere și semne volumetrice din polistiren, pentru exterior și interior.\",\"paragraphs\":[\"Literele și semnele volumetrice din polistiren se pot folosi atât în exterior, pe frontoane și frontispicii, cât și în interior.\"],\"hidden\":false,\"needsReview\":true},{\"slug\":\"autocolante\",\"category\":\"printuri-mari\",\"title\":\"Autocolante\",\"order\":10,\"excerpt\":\"Autocolante de orice dimensiune și formă, rezistente la apă și zgârieturi.\",\"paragraphs\":[\"Realizăm autocolante de mari dimensiuni și stickere adezive în diverse dimensiuni și în orice formă, tăiate pe contur.\",\"Sunt din vinil, rezistente la apă și la zgârieturi, și pot fi laminate mat sau lucios pentru o rezistență mai mare în timp.\"],\"hidden\":false,\"needsReview\":true},{\"slug\":\"bannere\",\"category\":\"printuri-mari\",\"title\":\"Bannere\",\"order\":11,\"excerpt\":\"Bannere și mesh publicitar rezistente, pentru exterior și interior.\",\"paragraphs\":[\"Bannerul și meshul publicitar sunt o metodă de promovare foarte folosită, care nu agresează publicul. Scopul lor este să informeze și să atragă atenția prin amplasare bună și integrare cu mediul.\",\"Bannerul din poliplan are avantajul unei rezistențe crescute a imaginii în timp.\"],\"hidden\":false,\"needsReview\":true},{\"slug\":\"print-afise\",\"category\":\"printuri-mari\",\"title\":\"Print afișe mari\",\"order\":12,\"excerpt\":\"Afișe de format mare, pentru evenimente și promoții.\",\"paragraphs\":[\"Orice eveniment are nevoie de afișul lui. Afișele sunt cea mai simplă formă de publicitate stradală sau interioară. Pot fi de diferite mărimi și se tipăresc pe materiale potrivite destinației finale.\"],\"hidden\":false,\"needsReview\":true},{\"slug\":\"tablouri-canvas\",\"category\":\"printuri-mari\",\"title\":\"Tablouri canvas\",\"order\":13,\"excerpt\":\"Imaginile tale tipărite pe pânză, gata de pus pe perete.\",\"paragraphs\":[\"Un tablou canvas este o imagine imprimată pe pânză, folosit frecvent pentru decorarea locuințelor, a clădirilor publice sau a unor spații precum restaurante, cluburi sau spitale.\",\"Este o decorațiune care îmbunătățește aspectul oricărei camere, aducând viață și căldură.\"],\"hidden\":false,\"needsReview\":true},{\"slug\":\"fototapet\",\"category\":\"printuri-mari\",\"title\":\"Fototapet\",\"order\":14,\"excerpt\":\"Fototapet imprimat la dimensiunea peretelui tău.\",\"paragraphs\":[\"Decorează-ți casa, biroul sau punctul de lucru în cel mai unic mod, cu fototapet imprimat după imaginea ta.\"],\"hidden\":false,\"needsReview\":true},{\"slug\":\"flyere-pliante\",\"category\":\"print-digital\",\"title\":\"Flyere și pliante\",\"order\":15,\"excerpt\":\"Flyere și pliante: cea mai ieftină metodă de a-ți face oferta cunoscută.\",\"paragraphs\":[\"Pliantele sunt una dintre cele mai întâlnite și populare modalități de a-ți face cunoscută oferta. Marele avantaj este prețul scăzut, mult mai mic decât în cazul altor materiale promoționale.\",\"Pentru flyere poți alege hârtie între 90 și 200 g/mp, în diverse formate.\"],\"hidden\":false,\"needsReview\":true},{\"slug\":\"afise\",\"category\":\"print-digital\",\"title\":\"Afișe publicitare\",\"order\":18,\"excerpt\":\"Afișe publicitare pentru vitrine, promoții și evenimente.\",\"paragraphs\":[\"Ideale pentru vitrine, pentru promoții și pentru anunțarea de evenimente, afișele sunt un produs tipografic cu impact puternic.\",\"Le oferim în condiții de calitate, la costuri reduse, chiar și pentru tiraje mici și medii.\"],\"hidden\":false,\"needsReview\":true},{\"slug\":\"carti-de-vizita\",\"category\":\"print-digital\",\"title\":\"Cărți de vizită\",\"order\":19,\"excerpt\":\"Cărți de vizită cu aspect impecabil, pe carton mat sau lucios.\",\"paragraphs\":[\"Cartea de vizită este cel mai simplu mijloc de a te face cunoscut pe tine sau afacerea ta. Ea reflectă imaginea ta, de aceea trebuie să aibă un design în acord cu brandul.\",\"Tipărim cărți de vizită digital, pe carton special mat sau lucios, cu culori fidele.\"],\"hidden\":false,\"needsReview\":true},{\"slug\":\"cataloage-si-brosuri\",\"category\":\"print-digital\",\"title\":\"Cataloage și broșuri\",\"order\":20,\"excerpt\":\"Cataloage și broșuri care transformă privitorul în client.\",\"paragraphs\":[\"Cataloagele și broșurile de prezentare sunt o modalitate accesibilă și eficientă de informare despre compania, produsele, serviciile sau evenimentele tale.\",\"Cu un design bine gândit, ele nu transmit doar informații, ci fac un pas important spre transformarea privitorului într-un client fidel.\"],\"hidden\":false,\"needsReview\":true},{\"slug\":\"mape-de-prezentare\",\"category\":\"print-digital\",\"title\":\"Mape de prezentare\",\"order\":21,\"excerpt\":\"Mape personalizate care dau imaginea unei firme serioase.\",\"paragraphs\":[\"În orice întâlnire de afaceri imaginea contează. Mapele de prezentare personalizate transmit seriozitate și grijă pentru detalii.\",\"În interior încap până la 50 de foi și o carte de vizită. Se pot realiza pe carton alb lucios sau mat de 300 sau 350 g/mp, cu print pe copertile exterioare.\"],\"hidden\":false,\"needsReview\":true},{\"slug\":\"calendare\",\"category\":\"print-digital\",\"title\":\"Calendare\",\"order\":22,\"excerpt\":\"Calendare de perete, de birou și de buzunar, personalizate.\",\"paragraphs\":[\"Calendarele sunt o metodă foarte bună de promovare: oferit cadou altor firme sau angajaților, un calendar face reclamă timp de un an.\",\"Poate conține imaginile tale sau imagini oferite de noi, plus reclama ta pe fiecare pagină. Realizăm calendare de perete, de birou și de buzunar.\"],\"hidden\":false,\"needsReview\":true},{\"slug\":\"foi-cu-antet\",\"category\":\"print-digital\",\"title\":\"Foi cu antet\",\"order\":23,\"excerpt\":\"\",\"paragraphs\":[],\"hidden\":true,\"needsReview\":false},{\"slug\":\"etichete\",\"category\":\"print-digital\",\"title\":\"Etichete autocolante\",\"order\":24,\"excerpt\":\"Etichete autocolante din PVC, decupate pe contur.\",\"paragraphs\":[\"Stickerele sau etichetele autocolante din PVC sunt nelipsite din campaniile de marketing, la promoții și reduceri.\",\"De obicei se decupează pe contur, pentru a fi aplicate mai ușor, și pot avea forme și mărimi diferite.\"],\"hidden\":false,\"needsReview\":true},{\"slug\":\"felicitari\",\"category\":\"print-digital\",\"title\":\"Felicitări\",\"order\":25,\"excerpt\":\"\",\"paragraphs\":[],\"hidden\":true,\"needsReview\":false},{\"slug\":\"ecusoane-si-legitimatii\",\"category\":\"print-digital\",\"title\":\"Ecusoane și legitimații\",\"order\":26,\"excerpt\":\"\",\"paragraphs\":[],\"hidden\":true,\"needsReview\":false},{\"slug\":\"tricouri-personalizate\",\"category\":\"obiecte-promotionale\",\"title\":\"Tricouri personalizate\",\"order\":28,\"excerpt\":\"Tricouri, polo, șepci, hanorace și jachete personalizate.\",\"paragraphs\":[\"Oferim o gamă largă de tricouri simple, tricouri polo, șepci, hanorace și jachete, într-o paletă diversificată de culori.\",\"Personalizarea se face prin transfer termic.\"],\"hidden\":false,\"needsReview\":true},{\"slug\":\"pixuri\",\"category\":\"obiecte-promotionale\",\"title\":\"Pixuri\",\"order\":29,\"excerpt\":\"Pixuri din plastic sau metal, cu sigla companiei.\",\"paragraphs\":[\"Îți oferim pixuri personalizate cu sigla companiei, din plastic sau metal. Personalizarea poate fi full-color, cu print UV direct pe pix, sau prin gravură laser.\"],\"hidden\":false,\"needsReview\":true},{\"slug\":\"brelocuri\",\"category\":\"obiecte-promotionale\",\"title\":\"Brelocuri\",\"order\":30,\"excerpt\":\"Brelocuri metalice și din plastic, utile și ușor de ținut minte.\",\"paragraphs\":[\"Brelocurile personalizate sunt o modalitate clasică și eficientă de a te face cunoscut. Cele cu fisă sunt utile, pentru că înlocuiesc moneda de la coșul de cumpărături.\",\"Brelocurile metalice promovează brandul pe termen lung, iar cele din plastic o fac cu costuri minime.\"],\"hidden\":false,\"needsReview\":true},{\"slug\":\"brichete\",\"category\":\"obiecte-promotionale\",\"title\":\"Brichete\",\"order\":31,\"excerpt\":\"Brichete personalizate: vizibilitate și utilitate într-un singur produs.\",\"paragraphs\":[\"Brichetele personalizate au un dublu avantaj: vizibilitatea mărcii și utilitatea produsului. Sunt potrivite mai ales pentru baruri, restaurante, pub-uri și hoteluri.\"],\"hidden\":false,\"needsReview\":true},{\"slug\":\"magneti-frigider\",\"category\":\"obiecte-promotionale\",\"title\":\"Magneți de frigider\",\"order\":32,\"excerpt\":\"Magneți de frigider pentru cadouri, promovare și mărturii.\",\"paragraphs\":[\"Magneții de frigider personalizați sunt ideali ca cadou, pentru promovarea firmei sau ca mărturii pentru nuntă și botez.\"],\"hidden\":false,\"needsReview\":true},{\"slug\":\"roll-up\",\"category\":\"obiecte-promotionale\",\"title\":\"Roll-up-uri\",\"order\":33,\"excerpt\":\"Roll-up-uri pentru expoziții, târguri și showroom-uri.\",\"paragraphs\":[\"Roll-up-ul, sau X-bannerul, este un sistem expozițional folosit pentru prezentări vizuale la expoziții, târguri și campanii de promovare, în showroom-uri, magazine, săli de conferință și de așteptare.\",\"Este foarte ușor de folosit și se montează în doar două-trei minute.\"],\"hidden\":false,\"needsReview\":true},{\"slug\":\"alte-obiecte-promotionale\",\"category\":\"obiecte-promotionale\",\"title\":\"Alte obiecte promoționale\",\"order\":34,\"excerpt\":\"\",\"paragraphs\":[],\"hidden\":true,\"needsReview\":false}]"),
	clients: [
		{
			"id": 18,
			"name": "Roman's",
			"url": "https://romans.ro"
		},
		{
			"id": 22,
			"name": "Grand Imperial Deluxe",
			"url": "https://www.grandimperialdeluxe.ro"
		},
		{
			"id": 25,
			"name": "Zoomserie",
			"url": "https://www.zoomserie.ro"
		},
		{
			"id": 26,
			"name": "Emigab",
			"url": "https://www.emigab.ro"
		},
		{
			"id": 27,
			"name": "Luxury",
			"url": "https://www.facebook.com/LUXURY-by-the-forest-1660308524044505/"
		},
		{
			"id": 29,
			"name": "Vilextur",
			"url": "https://vilextur.ro"
		},
		{
			"id": 30,
			"name": "Badcom",
			"url": "http://www.badcom-distributie.ro"
		},
		{
			"id": 31,
			"name": "Filos",
			"url": "https://www.facebook.com/filosgreek.ro/"
		},
		{
			"id": 32,
			"name": "Amal Tour",
			"url": "https://amaltour.ro"
		},
		{
			"id": 33,
			"name": "Pensiunea NOEL",
			"url": "http://www.noelolanesti.ro"
		},
		{
			"id": 35,
			"name": "Profesional New Consult",
			"url": "https://www.profesionalnewconsult.ro"
		},
		{
			"id": 36,
			"name": "O'livio",
			"url": "http://olivio-fastfood.ro"
		}
	],
	projects: /* @__PURE__ */ JSON.parse("[{\"id\":\"litere-volumetrice-01\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-01-s.webp\",\"full\":\"/img/litere-volumetrice-01.webp\"},{\"id\":\"litere-volumetrice-02\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-02-s.webp\",\"full\":\"/img/litere-volumetrice-02.webp\"},{\"id\":\"litere-volumetrice-03\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-03-s.webp\",\"full\":\"/img/litere-volumetrice-03.webp\"},{\"id\":\"litere-volumetrice-04\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-04-s.webp\",\"full\":\"/img/litere-volumetrice-04.webp\"},{\"id\":\"litere-volumetrice-05\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-05-s.webp\",\"full\":\"/img/litere-volumetrice-05.webp\"},{\"id\":\"litere-volumetrice-06\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-06-s.webp\",\"full\":\"/img/litere-volumetrice-06.webp\"},{\"id\":\"litere-volumetrice-07\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-07-s.webp\",\"full\":\"/img/litere-volumetrice-07.webp\"},{\"id\":\"litere-volumetrice-08\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-08-s.webp\",\"full\":\"/img/litere-volumetrice-08.webp\"},{\"id\":\"litere-volumetrice-09\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-09-s.webp\",\"full\":\"/img/litere-volumetrice-09.webp\"},{\"id\":\"litere-volumetrice-10\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-10-s.webp\",\"full\":\"/img/litere-volumetrice-10.webp\"},{\"id\":\"litere-volumetrice-11\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-11-s.webp\",\"full\":\"/img/litere-volumetrice-11.webp\"},{\"id\":\"litere-volumetrice-12\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-12-s.webp\",\"full\":\"/img/litere-volumetrice-12.webp\"},{\"id\":\"litere-volumetrice-13\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-13-s.webp\",\"full\":\"/img/litere-volumetrice-13.webp\"},{\"id\":\"litere-volumetrice-14\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-14-s.webp\",\"full\":\"/img/litere-volumetrice-14.webp\"},{\"id\":\"litere-volumetrice-15\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-15-s.webp\",\"full\":\"/img/litere-volumetrice-15.webp\"},{\"id\":\"litere-volumetrice-16\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-16-s.webp\",\"full\":\"/img/litere-volumetrice-16.webp\"},{\"id\":\"litere-volumetrice-17\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-17-s.webp\",\"full\":\"/img/litere-volumetrice-17.webp\"},{\"id\":\"litere-volumetrice-18\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-18-s.webp\",\"full\":\"/img/litere-volumetrice-18.webp\"},{\"id\":\"litere-volumetrice-19\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-19-s.webp\",\"full\":\"/img/litere-volumetrice-19.webp\"},{\"id\":\"litere-volumetrice-20\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-20-s.webp\",\"full\":\"/img/litere-volumetrice-20.webp\"},{\"id\":\"litere-volumetrice-21\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-21-s.webp\",\"full\":\"/img/litere-volumetrice-21.webp\"},{\"id\":\"litere-volumetrice-22\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-22-s.webp\",\"full\":\"/img/litere-volumetrice-22.webp\"},{\"id\":\"litere-volumetrice-23\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-23-s.webp\",\"full\":\"/img/litere-volumetrice-23.webp\"},{\"id\":\"litere-volumetrice-24\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-24-s.webp\",\"full\":\"/img/litere-volumetrice-24.webp\"},{\"id\":\"litere-volumetrice-25\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-25-s.webp\",\"full\":\"/img/litere-volumetrice-25.webp\"},{\"id\":\"litere-volumetrice-26\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-26-s.webp\",\"full\":\"/img/litere-volumetrice-26.webp\"},{\"id\":\"litere-volumetrice-27\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-27-s.webp\",\"full\":\"/img/litere-volumetrice-27.webp\"},{\"id\":\"litere-volumetrice-28\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-28-s.webp\",\"full\":\"/img/litere-volumetrice-28.webp\"},{\"id\":\"litere-volumetrice-29\",\"service\":\"litere-volumetrice\",\"thumb\":\"/img/litere-volumetrice-29-s.webp\",\"full\":\"/img/litere-volumetrice-29.webp\"},{\"id\":\"casete-luminoase-01\",\"service\":\"casete-luminoase\",\"thumb\":\"/img/casete-luminoase-01-s.webp\",\"full\":\"/img/casete-luminoase-01.webp\"},{\"id\":\"casete-luminoase-02\",\"service\":\"casete-luminoase\",\"thumb\":\"/img/casete-luminoase-02-s.webp\",\"full\":\"/img/casete-luminoase-02.webp\"},{\"id\":\"casete-luminoase-03\",\"service\":\"casete-luminoase\",\"thumb\":\"/img/casete-luminoase-03-s.webp\",\"full\":\"/img/casete-luminoase-03.webp\"},{\"id\":\"casete-luminoase-04\",\"service\":\"casete-luminoase\",\"thumb\":\"/img/casete-luminoase-04-s.webp\",\"full\":\"/img/casete-luminoase-04.webp\"},{\"id\":\"casete-luminoase-05\",\"service\":\"casete-luminoase\",\"thumb\":\"/img/casete-luminoase-05-s.webp\",\"full\":\"/img/casete-luminoase-05.webp\"},{\"id\":\"casete-luminoase-06\",\"service\":\"casete-luminoase\",\"thumb\":\"/img/casete-luminoase-06-s.webp\",\"full\":\"/img/casete-luminoase-06.webp\"},{\"id\":\"casete-luminoase-07\",\"service\":\"casete-luminoase\",\"thumb\":\"/img/casete-luminoase-07-s.webp\",\"full\":\"/img/casete-luminoase-07.webp\"},{\"id\":\"casete-luminoase-08\",\"service\":\"casete-luminoase\",\"thumb\":\"/img/casete-luminoase-08-s.webp\",\"full\":\"/img/casete-luminoase-08.webp\"},{\"id\":\"casete-luminoase-09\",\"service\":\"casete-luminoase\",\"thumb\":\"/img/casete-luminoase-09-s.webp\",\"full\":\"/img/casete-luminoase-09.webp\"},{\"id\":\"casete-luminoase-10\",\"service\":\"casete-luminoase\",\"thumb\":\"/img/casete-luminoase-10-s.webp\",\"full\":\"/img/casete-luminoase-10.webp\"},{\"id\":\"casete-luminoase-11\",\"service\":\"casete-luminoase\",\"thumb\":\"/img/casete-luminoase-11-s.webp\",\"full\":\"/img/casete-luminoase-11.webp\"},{\"id\":\"casete-luminoase-12\",\"service\":\"casete-luminoase\",\"thumb\":\"/img/casete-luminoase-12-s.webp\",\"full\":\"/img/casete-luminoase-12.webp\"},{\"id\":\"totem-01\",\"service\":\"totem\",\"thumb\":\"/img/totem-01-s.webp\",\"full\":\"/img/totem-01.webp\"},{\"id\":\"totem-02\",\"service\":\"totem\",\"thumb\":\"/img/totem-02-s.webp\",\"full\":\"/img/totem-02.webp\"},{\"id\":\"totem-03\",\"service\":\"totem\",\"thumb\":\"/img/totem-03-s.webp\",\"full\":\"/img/totem-03.webp\"},{\"id\":\"personalizari-auto-01\",\"service\":\"personalizari-auto\",\"thumb\":\"/img/personalizari-auto-01-s.webp\",\"full\":\"/img/personalizari-auto-01.webp\"},{\"id\":\"personalizari-auto-02\",\"service\":\"personalizari-auto\",\"thumb\":\"/img/personalizari-auto-02-s.webp\",\"full\":\"/img/personalizari-auto-02.webp\"},{\"id\":\"personalizari-auto-03\",\"service\":\"personalizari-auto\",\"thumb\":\"/img/personalizari-auto-03-s.webp\",\"full\":\"/img/personalizari-auto-03.webp\"},{\"id\":\"personalizari-auto-04\",\"service\":\"personalizari-auto\",\"thumb\":\"/img/personalizari-auto-04-s.webp\",\"full\":\"/img/personalizari-auto-04.webp\"},{\"id\":\"personalizari-auto-05\",\"service\":\"personalizari-auto\",\"thumb\":\"/img/personalizari-auto-05-s.webp\",\"full\":\"/img/personalizari-auto-05.webp\"},{\"id\":\"personalizari-auto-06\",\"service\":\"personalizari-auto\",\"thumb\":\"/img/personalizari-auto-06-s.webp\",\"full\":\"/img/personalizari-auto-06.webp\"},{\"id\":\"personalizari-auto-07\",\"service\":\"personalizari-auto\",\"thumb\":\"/img/personalizari-auto-07-s.webp\",\"full\":\"/img/personalizari-auto-07.webp\"},{\"id\":\"personalizari-auto-08\",\"service\":\"personalizari-auto\",\"thumb\":\"/img/personalizari-auto-08-s.webp\",\"full\":\"/img/personalizari-auto-08.webp\"},{\"id\":\"personalizari-auto-09\",\"service\":\"personalizari-auto\",\"thumb\":\"/img/personalizari-auto-09-s.webp\",\"full\":\"/img/personalizari-auto-09.webp\"},{\"id\":\"personalizari-auto-10\",\"service\":\"personalizari-auto\",\"thumb\":\"/img/personalizari-auto-10-s.webp\",\"full\":\"/img/personalizari-auto-10.webp\"},{\"id\":\"personalizari-auto-11\",\"service\":\"personalizari-auto\",\"thumb\":\"/img/personalizari-auto-11-s.webp\",\"full\":\"/img/personalizari-auto-11.webp\"},{\"id\":\"personalizari-auto-12\",\"service\":\"personalizari-auto\",\"thumb\":\"/img/personalizari-auto-12-s.webp\",\"full\":\"/img/personalizari-auto-12.webp\"},{\"id\":\"personalizari-auto-13\",\"service\":\"personalizari-auto\",\"thumb\":\"/img/personalizari-auto-13-s.webp\",\"full\":\"/img/personalizari-auto-13.webp\"},{\"id\":\"personalizari-auto-14\",\"service\":\"personalizari-auto\",\"thumb\":\"/img/personalizari-auto-14-s.webp\",\"full\":\"/img/personalizari-auto-14.webp\"},{\"id\":\"personalizari-auto-15\",\"service\":\"personalizari-auto\",\"thumb\":\"/img/personalizari-auto-15-s.webp\",\"full\":\"/img/personalizari-auto-15.webp\"},{\"id\":\"personalizari-auto-16\",\"service\":\"personalizari-auto\",\"thumb\":\"/img/personalizari-auto-16-s.webp\",\"full\":\"/img/personalizari-auto-16.webp\"},{\"id\":\"personalizari-auto-17\",\"service\":\"personalizari-auto\",\"thumb\":\"/img/personalizari-auto-17-s.webp\",\"full\":\"/img/personalizari-auto-17.webp\"},{\"id\":\"decorari-geamuri-si-vitrine-01\",\"service\":\"decorari-geamuri-si-vitrine\",\"thumb\":\"/img/decorari-geamuri-si-vitrine-01-s.webp\",\"full\":\"/img/decorari-geamuri-si-vitrine-01.webp\"},{\"id\":\"decorari-geamuri-si-vitrine-02\",\"service\":\"decorari-geamuri-si-vitrine\",\"thumb\":\"/img/decorari-geamuri-si-vitrine-02-s.webp\",\"full\":\"/img/decorari-geamuri-si-vitrine-02.webp\"},{\"id\":\"decorari-geamuri-si-vitrine-03\",\"service\":\"decorari-geamuri-si-vitrine\",\"thumb\":\"/img/decorari-geamuri-si-vitrine-03-s.webp\",\"full\":\"/img/decorari-geamuri-si-vitrine-03.webp\"},{\"id\":\"decorari-geamuri-si-vitrine-04\",\"service\":\"decorari-geamuri-si-vitrine\",\"thumb\":\"/img/decorari-geamuri-si-vitrine-04-s.webp\",\"full\":\"/img/decorari-geamuri-si-vitrine-04.webp\"},{\"id\":\"decorari-geamuri-si-vitrine-05\",\"service\":\"decorari-geamuri-si-vitrine\",\"thumb\":\"/img/decorari-geamuri-si-vitrine-05-s.webp\",\"full\":\"/img/decorari-geamuri-si-vitrine-05.webp\"},{\"id\":\"mese-candybar-01\",\"service\":\"mese-candybar\",\"thumb\":\"/img/mese-candybar-01-s.webp\",\"full\":\"/img/mese-candybar-01.webp\"},{\"id\":\"mese-candybar-02\",\"service\":\"mese-candybar\",\"thumb\":\"/img/mese-candybar-02-s.webp\",\"full\":\"/img/mese-candybar-02.webp\"},{\"id\":\"mese-candybar-03\",\"service\":\"mese-candybar\",\"thumb\":\"/img/mese-candybar-03-s.webp\",\"full\":\"/img/mese-candybar-03.webp\"},{\"id\":\"mese-candybar-04\",\"service\":\"mese-candybar\",\"thumb\":\"/img/mese-candybar-04-s.webp\",\"full\":\"/img/mese-candybar-04.webp\"},{\"id\":\"mese-candybar-05\",\"service\":\"mese-candybar\",\"thumb\":\"/img/mese-candybar-05-s.webp\",\"full\":\"/img/mese-candybar-05.webp\"}]"),
	testimonials: [],
	leads: [],
	users: [],
	settings: {
		phone: "0745 537 715",
		email: "contact@24plus.ro",
		address: "Str. Gib Mihăescu nr. 14, Râmnicu Vâlcea",
		facebook: "https://www.facebook.com/24plus.ro/",
		heroTitle: "Brandul tău, văzut de departe.",
		heroSubtitle: "De la design la montaj: litere volumetrice, firme luminoase, personalizări auto, print mare și digital, obiecte promoționale.",
		intro: [
			"24 Plus Media este o firmă de producție publicitară, specializată în materiale publicitare, decorări și personalizări auto, vitrine, spații comerciale, semnalistică de interior și exterior, print de mari dimensiuni, tipar digital și obiecte promoționale.",
			"Echipa noastră îți oferă soluții complete: design, consiliere în alegerea materialelor, producție, asamblare, montaj și logistică.",
			"Ne adaptăm cerințelor tale, reducem la minimum timpii de livrare și lucrăm cu soluții de calitate la prețuri corecte."
		]
	}
};
var usingNetlify = process.env.STORAGE ? process.env.STORAGE === "netlify" : !!(process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT);
var DATA_DIR = path.resolve(process.env.DATA_DIR ?? "data");
var UPLOAD_DIR = path.join(DATA_DIR, "uploads");
if (!usingNetlify) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
var blobs = (name) => getStore({
	name,
	consistency: "strong"
});
var data = () => blobs("cms-data");
var PUBLIC = [
	"categories",
	"services",
	"clients",
	"projects",
	"testimonials",
	"settings"
];
var file = (n) => path.join(DATA_DIR, `${n}.json`);
var fileCache = /* @__PURE__ */ new Map();
async function get(name) {
	if (usingNetlify) {
		const v = await data().get(name, { type: "json" });
		if (v !== null && v !== void 0) return v;
		await data().setJSON(name, defaults[name]);
		return structuredClone(defaults[name]);
	}
	const f = file(name);
	if (!fs.existsSync(f)) fs.writeFileSync(f, JSON.stringify(defaults[name], null, 2));
	const mtime = fs.statSync(f).mtimeMs;
	const hit = fileCache.get(name);
	if (hit && hit.mtime === mtime) return structuredClone(hit.value);
	const value = JSON.parse(fs.readFileSync(f, "utf8"));
	fileCache.set(name, {
		mtime,
		value
	});
	return structuredClone(value);
}
async function put(name, value) {
	if (usingNetlify) {
		await data().setJSON(name, value);
		if (PUBLIC.includes(name)) await data().setJSON("snapshot", await buildSnapshot(name, value));
		return;
	}
	const f = file(name);
	const tmp = `${f}.${process.pid}.tmp`;
	fs.writeFileSync(tmp, JSON.stringify(value, null, 2));
	fs.renameSync(tmp, f);
	fileCache.set(name, {
		mtime: fs.statSync(f).mtimeMs,
		value: structuredClone(value)
	});
}
var read = get;
var queue = Promise.resolve();
function update(name, fn) {
	const run = async () => {
		const v = await get(name);
		await put(name, await fn(v) ?? v);
	};
	const p = queue.then(run, run);
	queue = p.catch(() => {});
	return p;
}
async function buildSnapshot(override, value) {
	const out = {};
	await Promise.all(PUBLIC.map(async (n) => {
		out[n] = n === override ? value : await get(n);
	}));
	return out;
}
async function snapshot() {
	if (usingNetlify) {
		const s = await data().get("snapshot", { type: "json" });
		if (s) return s;
		const built = await buildSnapshot();
		await data().setJSON("snapshot", built);
		return built;
	}
	return buildSnapshot();
}
/** Counts events for rate limiting; returns hits within the window, including this one. */
var memHits = /* @__PURE__ */ new Map();
async function hit(bucket, seconds) {
	const now = Date.now();
	const keep = (l) => l.filter((t) => now - t < seconds * 1e3);
	if (usingNetlify) {
		const s = blobs("cms-ratelimit");
		const k = bucket.replace(/[^\w.:-]/g, "_").slice(0, 120);
		const list = keep(await s.get(k, { type: "json" }) ?? []);
		list.push(now);
		await s.setJSON(k, list);
		return list.length;
	}
	const list = keep(memHits.get(bucket) ?? []);
	list.push(now);
	memHits.set(bucket, list);
	return list.length;
}
async function putImage(name, buf) {
	if (usingNetlify) {
		await blobs("cms-images").set(name, buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
		return;
	}
	fs.writeFileSync(path.join(UPLOAD_DIR, name), buf);
}
async function getImage(name) {
	if (usingNetlify) return await blobs("cms-images").get(name, { type: "arrayBuffer" }) ?? null;
	const f = path.join(UPLOAD_DIR, name);
	return fs.existsSync(f) ? fs.readFileSync(f) : null;
}
async function deleteImage(name) {
	if (usingNetlify) {
		await blobs("cms-images").delete(name).catch(() => {});
		return;
	}
	fs.rmSync(path.join(UPLOAD_DIR, name), { force: true });
}
var newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
export { newId as a, snapshot as c, hit as i, update as l, deleteImage as n, putImage as o, getImage as r, read as s, DATA_DIR as t, usingNetlify as u };
