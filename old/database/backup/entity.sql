-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 27, 2026 at 08:17 AM
-- Server version: 11.4.13-MariaDB-cll-lve
-- PHP Version: 8.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `plusro_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `entity`
--

CREATE TABLE `entity` (
  `id` int(11) NOT NULL,
  `type` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `itime` timestamp NULL DEFAULT current_timestamp(),
  `utime` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `entity`
--

INSERT INTO `entity` (`id`, `type`, `title`, `description`, `itime`, `utime`) VALUES
(1, 1, 'Litere volumetrice', '<p>Indiferent daca ne referim la spatii indoor sau outdoor, o metoda originala de personalizare si de transpunere a unor mesaje, reclame sau brand este data de  literele volumetrice, Ele sunt folosite, pe scara larga, în întreaga lume în vederea identificarii facile a sediului sau punctului de lucru al  companiei, sau în vederea consolidarii imaginii brand-uli.</p>\n<p>\n     Acestea se pot realiza intr-o varietate de forme, din diferite materiale precum plexiglas, PVC, tabla, aluminiu, spuma extrudata (polistiren). Literele volumetrice pot fi luminoase sau neluminoase. </p>\n<p>\n       Literele volumetrice luminoase  pot fi iluminate fie direct, cu  led in interior sau pixeli, fie indirect (prin halou). Literele volumetrice iluminate ne atrag atentia odata cu lasarea intunericului datorita efectelor vizuale deosebite pe care le ofera. Iluminarea acestora se face cu ajutorul LED-urilor speciale care produc iluminarea si efectul dorit, au o mare durata de viata si un consum foarte mic de energie electrica.</p><p>\n     \n     ', '2019-03-09 12:46:28', '2020-06-14 14:17:24'),
(2, 2, 'Casete luminoase', '<p> Casetele si firmele luminoase reprezinta in prezent, metoda perfecta pentru toate companiile care doresc sa realizeze publicitate, sa comunice propriul brand sau care doresc sa impresioneze intr-un mod cu totul deosebit. 24 Plus Media vine in intampinarea tuturor clientilor cu o gama variata de casete luminoase ce au asupra publicului un impact vizual impresionant si care vor scoate in evidenta brandul afacerii dumneavoastra pe timpul zilei dar  mai ales pe timpul noptii.  \n<p> Va poatem oferi casete luminoase de forme si dimensiuni diferite, la preturile cele mai avantajoase. Casetele luminoase produse de noi au posibilitatea de a fi personalizate asa cum doriti dumneavoastra, in cele mai variate culori, marimi si forme, iar pretul acestora difera in functie de materiale care sunt folosite la realizarea lor, de dimensiunile pe care le doriti si de sistemul de iluminare. \n<p> In functie de materialele folosite casetele luminoase pot fi: Caseta luminoasa cu fata din Plexiglas, Caseta luminoasa din Dibond, Caseta luminoasa din Backlit Banner, Caseta luminoasa Dubla Fata.\n', '2019-04-14 18:23:14', '2020-04-26 14:01:58'),
(3, 3, 'Totem', '<p>Totemul este un element de semnalistica stradala si are rolul de a semnaliza si informa mai bine clientul. Este foarte elegant si impunator dand valoare locatiei. Totemurile sunt caracterizate de verticalitate si pot avea forme, marimi si grosimi diferite.</p><p>\n     Pot fi cu fete vacumate, curbe sau drepte, forme neregulate, trapezoidale, conice sau rectangulare. Sunt confectionate din: alucobond, stiplex, polyplan, polycarbonat.</p><p>\n     Are mai multe tipuri de iluminari : iluminare din interior, iluminare tip halou si iluminare indirecta.\n     In functie de grafica, marimea si forma aleasa de client, pot fi personalizate si se pot adauga litere volumetrice</p>\n', '2019-04-14 18:23:34', '2019-11-09 19:26:33'),
(4, 4, 'Personalizari auto', 'Inscriptionarea auto este o metoda de promovare devenita foarte populara în ultima vreme, considerata chiar cea mai eficienta metoda. Inscriptionarea se realizeaza rapid,  costul este mic fata de alte tipuri de reclama. Datorita traficului intens din orase inscriptionarea auto capata vizibilitate maxima.', '2019-04-14 18:23:55', '2019-11-09 19:45:37'),
(5, 5, 'Decorari geamuri i vitrine', '<p>Una din cele mai eficiente actiuni de marketing la „locul de vanzare” este inscriptionarea vitrinelor. Spatiul mare disponibil face posibila expunerea la mari dimensiuni a ofertelor promotionale, a brandului companiei sau a produselor/serviciile oferite. \n</p><p>Personalizarea vitrinelor se poate realiza prin inscriptionare cu autocolant decupat pe contur sau inscriptionare cu autocolant printat cu sau fara laminare. Se pot realiza inscriptionari prin combinarea intre autocolante ce imita sablarea, autocolante ce imita vitraliile si autocolante colorate in masa sau printate, in functie de design-ul dorit. Personalizarea se poate face atat cu autocolante cu opacitate 100% cat si cu Window Graphics (folii cu perforatii care nu permite vizualizarea în interiorul unui spatiu din exterior, în schimb, din interior spre exterior vizibilitatea este excelenta;).</p>', '2019-04-14 18:24:21', '2020-06-14 14:20:54'),
(6, 5, 'Decorari geamuri i vitrine', 'test', '2019-04-14 18:24:35', '2019-04-14 18:24:35'),
(7, 6, 'Gravura computerizata', '<p>Gravura este procedeul de sapare, zgâriere a unui desen pe suprafata unui material rezistent prelucrarii mecanice.</p><p>\n 	Se pot realiza atât gravari superficiale cât si gravari profunde, cu cât instrumentul de gravat patrunde mai adânc în material, cu atât linia devine mai pronuntata realizând: sigle, logo-uri, scrisuri, imagini.</p><p>\nVa putem oferi plachete, trofee, panouri de afisaj, numere pentru camere, numere de inventar, brelocuri, aviziere, tarifare, panouri de afisaj pentru curs valutar, cifre mobile, inscriptionari cupe si trofee sportive, ecusoane .</p>', '2019-04-14 18:25:31', '2019-11-09 19:46:59'),
(8, 7, 'Panouri publicitare', 'test', '2019-04-14 18:25:50', '2019-04-14 18:25:50'),
(9, 8, 'Mese candybar', 'Mesele pentru Candy-Bar sunt realizate din polistiren dur, finisate si vopsite cu vopsea pe baza de apa in diferite culori. Ele sunt folosite cu precadere la evenimente de tip nunta, botez petreceri private sau corporate. Inaltimea, lungimea, grosimea si culoarea pot varia in functie de cerintele clientului.', '2019-04-14 18:26:14', '2020-04-26 11:34:26'),
(10, 9, 'Decupaj polistiren', 'Literele si semnele volumetrice din polistiren se pot utiliza atat la exterior pe frontoane si frontispicii cat si la interior.</p>', '2019-04-14 18:26:27', '2020-06-14 14:17:54'),
(11, 10, 'Autocolante', 'Realizam autocolante de mari dimensiuni si stickere adezive in diverse dimensiuni si in orice forma, taiate pe contur. Fie ca sunt stickere auto sau etichete pentru ambalaje si cutii, acestea sunt din vinyl, rezistente la apa si la zgarieturi.Pot fi laminate mat sau lucios, pentru o rezistenta mai mare in timp.', '2019-04-14 18:26:46', '2020-06-14 14:32:07'),
(12, 11, 'Bannere', 'Banner-ul si Meshul publicitar, care este o metoda de promovare foarte utilizata, care nu este agresiva, nu este deranjanta si care nu produce reactii de tip negativ din partea publicului. \n\n<p> Un banner publicitar are ca scop principal sa informeze si sa atraga publicul, prin amplasarea sa intr-un loc cat mai bun si prin integrarea perfecta a acestuia cu mediul. Bannerul publicitar realizat din poliplan are o multime de avantaje: prezinta o rezistenta crescuta a imaginii, o rezistenta mare la diversi factori de mediu si prezinta o foarte buna vizibilitate. \n<p> Mesh-urile sunt destinate publicitatii outdoor, sunt impunatoare, rezistente, calitative si au um mare impact vizual. ', '2019-04-14 18:26:58', '2020-04-26 14:12:10'),
(13, 12, 'Print afise', 'Orice eveniment are nevoie de afisul lui. Afisele sunt cea mai simpla forma de publicitate stradala sau interioara. Pot fi de diferite marimi si se tipartesc pe diferite materiale in funcrie de destinatia finala', '2019-04-14 18:27:16', '2020-06-14 14:41:27'),
(14, 13, 'Tablouri canvas', '<p>Un tablou canvas este practic o imagine imprimata pe o panza, frecvent utilizat in decorarea interioara a locuintelor, cladirilor publice sau private sau a altor spatii, precum spitale, restaurante, cluburi etc. Etalon al artei contemporane, acest tip de decoratiune interioara reuseste cu succes sa imbunatateasca aspectul oricarei camere, echilibrand decorul, aducand viata sau caldura. </p>\n\n      <p> Adaugati un plus de rafinament peretilor cu ajutorul unui tablou modern. Tablourile sunt realizate din panza canvas fixata pe un sasiu de lemn.', '2019-04-14 18:27:34', '2020-04-21 10:07:41'),
(15, 14, 'Fototapet', 'Decoreaza-ti casa, biroul sau punctul de lucru în cel mai unic mod, cu fototapetul printabil', '2019-04-14 18:27:49', '2020-06-14 15:29:01'),
(16, 15, 'Print si tipar digital', 'Pliantele reprezinta una din cele mai des întâlnite si populare modalitati de a va face cunoscuta oferta. Fie ca detineti o companie sau doriti sa promovati cursurile profesionale pe care le predati sau orice altceva puteti apela cu încredere la pliante.Marele avantaj îl reprezinta pretul scazut care este mult mai mic decât în cazul altor materiale promotionale. Pentru flyere puteti alege hârtie între 90-200 g/mp si diverse formate de?i cele mai des întâlnite sunt A6, A5 si 1/3 A4.', '2019-04-14 18:28:15', '2020-07-05 20:10:13'),
(17, 17, 'Pliante', 'test', '2019-04-14 18:28:32', '2019-04-14 18:28:32'),
(18, 18, 'Afise', 'Ideale pentru lipirea in vitrine pentru promotii, pentru anuntarea de evenimente, nelipsite de la salile de concerte, afisele sunt un produs tipografic cu un impact puternic, pe care vi-l oferim in conditii de calitate deosebita, cu costuri reduse, chiar si atunci cand vorbim de tiraje mici si medii.', '2019-04-14 18:28:45', '2020-07-05 20:14:44'),
(19, 19, 'Carti de vizita', '<p> Toata lumea stie ce e o carte de vizita. Si toata lumea le foloseste. Sunt cel mai simplu si mai la indemana mijloc de care dispui pentru a te face cunoscut pe tine ori pe afacerea ta. Cartile de vizita reflecta imaginea dvs., de aceea ele trebuie sa aiba un design in concordanta cu imaginea companiei si un aspect impecabil.</p>\nDin aceste motive tiparim carti de vizita pe tipar digital, folosind carton special mat sau lucios garantand culori fidele si calitate deosebita a printului. De regula sunt cateva dimensiuni standard, dar nimeni nu spune ca trebuie neaparat sa te incadrezi în tipare. Optional cartile de vizita pot fi plastifiate mat sau lucios si pot avea colt rotunjit.\n', '2019-04-14 18:29:13', '2020-04-21 10:40:43'),
(20, 20, 'Cataloage si brosuri', 'Cataloagele si brosurile de prezentare sunt o modalitate accesibila si eficienta de informare cu privire la compania, produsele, serviciile sau evenimentele dvs.\n\nAvand un design cu un concept puternic, un catalog sau o brosura, nu va transmite doar informatii  ci va face un pas important catre transformarea privitorului intru-un client loial.', '2019-04-14 18:29:40', '2020-07-05 12:42:18'),
(21, 21, 'Mape de prezentare', 'In orice intalnire de afaceri imaginea conteaza foarte mult. Felul in care prezentati produsele si serviciile clientilor ii poate influenta pozitiv sau negativ.\nMapele de prezentare personalizate dau impresia unei firme serioase care pune accent pe imagine.In interiorul mapei pot intra pana la 50 foi plus o carte de vizita.\nPot fi realizate pe carton alb lucios/mat de 300 sau 350 gr/mp.Printarea se face pe copertile exterioare ale mapei.Format desfasurat: 440x310 mm | format inchis: 220x310 mm si pot avea un big (o pliere) sau doua biguri (doua plieri).\n', '2019-04-14 18:29:57', '2020-07-05 20:23:04'),
(22, 22, 'Calendare', 'Calendarele  sunt o metoda foarte buna de promovare a firmei si serviciilor dvs. Oferit sub forma de cadou altor firme sau angajatilor dvs., un simplu calendar va face publicitate timp de un an.Calendarul poate contine imaginile dvs. sau imagini gratuite oferite de noi si in plus reclama dvs. pe fiecare pagina. \nVa oferim Calenadare de perete, Calendare de birou si Calendare de buzunar personalizate total sau partial', '2019-04-14 18:30:13', '2020-07-05 20:32:32'),
(23, 23, 'Foi cu antet', 'test', '2019-04-14 18:30:40', '2019-04-14 18:30:40'),
(24, 24, 'Etichete', 'A?a numitele stickere sau ab?ibilduri sunt etichete autocolante din PVC ?i sunt nelipsite în campaniilor de marketing. Le g?se?ti cu siguran?? utilizate din plin la promo?ii ?i reduceri semnalizând avantaje la cump?rare ?i pre?uri sc?zute.Etichetele autocolante de obicei se decupeaz? pe contur pentru a fi utilizate mai u?or si au diferite forme si marimi', '2019-04-14 18:30:50', '2020-07-05 20:41:08'),
(25, 25, 'Felicitari', 'test', '2019-04-14 18:31:04', '2019-04-14 18:31:04'),
(26, 26, 'Ecusoane si legitimatii', 'test', '2019-04-14 18:31:19', '2019-04-14 18:31:19'),
(27, 27, 'Obiecte promotionale', 'test', '2020-05-24 17:11:57', NULL),
(28, 28, 'Tricouri personalizate', 'Oferim o gama larga de  tricouri simple, tricouri polo, sepci, hanorace si jachete intro paleta diversificata de culori. Personalizatea se face prin transfer tremic', '2020-05-24 17:15:19', '2020-07-26 09:47:47'),
(29, 29, 'Pixuri', 'Va oferim pixuri personalizate cu sigla companiei din plastic sau metal. Personalizare full-color cu print UV direct pe suprafata pixului sau prin gravura laser.', '2020-05-24 17:15:19', '2020-06-14 15:31:59'),
(30, 30, 'Brelocuri', 'Promovarea folosind diferite modele de brelocuri personalizate poate reprezenta o modalitate clasica dar si eficienta prin care te poti face cunoscut si recunoscut.\nBrelocurile cu fisa sunt renumite datorita utilitatii lor, acestea inlocuind monedele folosite la cosul de cumparaturi. Brelocurile metalice asigura promovarea brandului tau pentru o perioada indelungata de timp, iar cu ajutorul celor de plastic poti sa te faci cunoscut folosind costuri minime.', '2020-05-24 17:15:19', '2020-07-26 09:11:41'),
(31, 31, 'Brichete', 'Brichetele personalizate sunt incluse in categoria acelor materiale promotionale care au un dublu avantaj: cel al vizibilitatii marcii cu care au fost inscriptionate si cel al utilitatii produsului. Comanda brichete promotionale personalizate cu datele companiei si asigura vizibilitatea brand-ului pe care-l promovezi, in special daca utilizezi aceste materiale promotionale pentru promovarea barurilor, restaurantelor, puburilor, hotelurilor etc.', '2020-05-24 17:15:19', '2020-07-26 09:08:52'),
(32, 32, 'Magneti de frigider', 'Magneti de frigider personalizati sunt ideali pentru a fi oferiti cadou, pentru promovarea firmei, sau marturii nunta, botez.', '2020-05-24 17:15:19', '2020-07-26 10:15:21'),
(33, 33, 'Rollup-uri', 'Roll-up-ul sau X-banner-ul este un sistem expozi?ional folosit pentru prezent?ri vizuale la expozi?ii, târguri ?i campanii de promovare ori în showroom-uri, magazine, s?li de conferin?? ?i s?li de a?teptare. Este foarte u?or de folosit ?i se monteaz? în doar dou?-trei minute.', '2020-05-24 17:15:19', '2020-07-26 09:30:02'),
(34, 34, 'Alte obiecte promotionale', 'test', '2020-05-24 17:15:19', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `entity`
--
ALTER TABLE `entity`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `entity`
--
ALTER TABLE `entity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
