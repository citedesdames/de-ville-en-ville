#!/usr/sfw/bin/python
# -*- coding: utf-8 -*-

import csv, glob, os, re, sys

folder = os.path.abspath(os.path.dirname(sys.argv[0]))

"""
# Locations for Grand tour de France
locations = [
['ville capitale de Paris','1'],
['Sainct Mor des foſſez','2'],
['ville neufue ſainct Georges','3'],
['Corbeil','4'],
['au Lys','5'],
['Fõtainebleau','6'],
['Moret','7'],
['Montereau fault Yonne','8'],
['pont ſur Yonne','9'],
['Sens','10'],
['Pont ſur Venne','11'],
['Ville-neufue l’arceueſque','12'],
['ſainct Liebault','13'],
['ſainct Lye','14'],
['Troyes','15'],
['ſainct ſepulcre','16'],
['Arſy ſus aulbe','17'],
['Poyure','18'],
['Dãmartin','19'],
['leſcuyrie ſur Coſne','20'],
['Challons en Champaigne','21'],
['au May','22'],
['Vitry le Frãçois','23'],
['Bignicourt','24'],
['Sermoiſe','25'],
['Fain','26'],
['Barlduc','27'],
['Ligny en barroys','28'],
['Treueray','29'],
['Gondricourt','30'],
['lezinuille','31'],
['Rinugel','32'],
['mont de Clerre','33'],
['Dermã','34'],
['Chaumont en baſſigny','35'],
['Releupont','36'],
['Lẽgres','37'],
['Lõgeau','38'],
['Lõgſogeon','39'],
['Trichaſteau','40'],
['Ieumeau','41'],
['Meſnil','42'],
['Chartreux','43'],
['Diion','44'],
['Lõgecourt ','45'],
['Paingny','46'],
['Seure','47'],
['Sommier','48'],
['Aſſy','49'],
['Sainct Mareau','50'],
['Challons ſur la Sone','51'],
['Maſcon','52'],
['pont de Velle','53'],
['Maſcon','54'],
['Iſle','55'],
['Lyon','55b'],
['Iſle','55c'],
['Lyon','56'],
['Beauregart','57'],
['Lyon','58'],
['Mirebel','59'],
['Lyon','60'],
['Peron','61'],
['Lyon','62'],
['pont de Cherry','63'],
['Cremieux','64'],
['Erieux','65'],
['Septome','66'],
['Coſte Daray','67'],
['Roſſillon','68'],
['Anlou','69'],
['Iarſieux','70'],
['Chaſteau neuf','71'],
['Romans','72'],
['Valence','73'],
['l’Eſtoille','74'],
['Loriou','75'],
['derbieres','76'],
['Mõtlimar','77'],
['Douſelle','78'],
['la Garde','79'],
['ſainct Paul','80'],
['Seuſe','81'],
['Bollaines','82'],
['Montdragon','83'],
['Mornas','84'],
['Quaderouſſe','85'],
['põt deſorgnes','86'],
['Auignon','87'],
['Chaſteau regnard','88'],
['ſainct Remy','89'],
['Touret','90'],
['Salon de Craux en Prouence','91'],
['Laubés','92'],
['ſainct Iehan de la ſalle','93'],
['Aix en Prouence','94'],
['Pourieres','95'],
['ſainct Maximy','96'],
['ſaincte Baulme','97'],
['Bringnolles','98'],
['Gareau','99'],
['Cueurs','100'],
['ſouliers','101'],
['Yerres','102'],
['Briganſon','103'],
['Yerres','104'],
['Toullon','105'],
['Riolle','106'],
['la Cadiere','107'],
['Aubenes','108'],
['Gauſet','109'],
['Marſeille','110'],
['Baſtille de la Bedoulle','111'],
['Marignan','112'],
['Martegues','113'],
['ſainct Chamant','114'],
['ſainct Martin','115'],
['Arles','116'],
['Tarraſcon','117'],
['Beauquaire','118'],
['Sarignac','119'],
['Pont du Gap','120'],
['ſainct Priuat','121'],
['Nymes','122'],
['Vauvert','123'],
['Aigueſmortes','124'],
['Marſeillagues','125'],
['ſainct Brez ','126'],
['Montpellier','127'],
['villeneufue','128'],
['Montpellier','129'],
['Fabriques','130'],
['Pouſent','131'],
['Florenſac','132'],
['Agde','133'],
['Villeneufue','134'],
['Beziers','135'],
['Nyſens','136'],
['Narbonne','137'],
['Sylan','138'],
['Locquatre','139'],
['Sylan','140'],
['Narbonne','141'],
['Canet','142'],
['Mont','143'],
['Barbairen','144'],
['Carcaſſonne','145'],
['Arzãt','146'],
['Mõtreal','147'],
['Proille','148'],
['Villaſpic','149'],
['Ferratz','150'],
['Caſtelnauderry','151'],
['Vingnonet','152'],
['Ville franche','153'],
['Ville-nouuelle','154'],
['Bazieges','155'],
['Mongiſcart','156'],
['Thoulouſe','157'],
['ſainct Michel','158'],
['Toulouſe','159'],
['ſainct Iorry','160'],
['Fronton','161'],
['Clau','162'],
['Montauban','163'],
['Baſtide del Tempe','164'],
['Moiſac','165'],
['Pontuy','166'],
['Ballence','167'],
['Mageſterre','168'],
['la Foſſe','169'],
['Agen','170'],
['port ſaincte Marie','171'],
['Eguillon','172'],
['Marmande','173'],
['la Reolle','174'],
['Quadillac','175'],
['Bordeaux','176'],
['Toars','177'],
['Frands','177b'],
['Chaſteau Trompette','177c'],
['à l’Eueſché','178'],
['Caſtres','179'],
['Lengon','180'],
['Bazas','181'],
['Boullas','182'],
['Captieux','183'],
['la Trauerſe','184'],
['Roquehort','185'],
['Mont de Marſen','186'],
['Millac','187'],
['Tartas','188'],
['Pouton','189'],
['Dax','190'],
['Saubuſe','191'],
['Bayonne','192'],
['la Houſſe','193'],
['Bayonne','194'],
['ſainct Iean de Luz','195'],
['Endaye','196'],
['ſainct Iean de Luz','197'],
['Bayonne','198'],
['ſainct Bernard','199'],
['Bayõne','200'],
['Iſle Daiſguemeau','201'],
['Bayonne','202'],
['Sainct Iehan de Luz','203'],
['au meſme lieu qu’ilz l’auoient receuë','204'],
['Sainct Iehan de Luz','205'],
['Bierry','206'],
['Bayonne','207'],
['Hurt','208'],
['Bidach','209'],
['Perrehorrade','210'],
['Dax','211'],
['Tartas','212'],
['mont de Marſan','213'],
['Cazaire','214'],
['Noguero','215'],
['Yauze','216'],
['Mõt Real','217'],
['Condon','218'],
['Nerac','219'],
['Buſet','220'],
['Thonintz','221'],
['Verteuil','222'],
['Loſun','223'],
['Bergerac','224'],
['Laugat','225'],
['Menſiden','226'],
['Ribera','227'],
['Rochebeaucourt','228'],
['la Tour Garnier','229'],
['Angouleſme','230'],
['la Thouure','231'],
['Angouleſme','232'],
['Chaſteauneuf','233'],
['Iarnac','234'],
['Coignac','235'],
['Lonza','236'],
['Coignac','237'],
['Port Chauueau','238'],
['Xainctes','239'],
['Cormoreau','240'],
['le Meſnil','241'],
['ſainct Iuſt','242'],
['Marennes','243'],
['le Broage','244'],
['Marennes','245'],
['Cormoran','246'],
['Xainctes','247'],
['Briſembourg','248'],
['ſainct Iehan D’angely','249'],
['Parenſes','250'],
['Surgeres','251'],
['la Iarrie','252'],
['la Rochelle','253'],
['Benon','254'],
['Mozé','255'],
['Fontenay le Battu','256'],
['Nyort','257'],
['Echeroé','258'],
['Chantdenier','259'],
['Baubare','260'],
['la Rochefaton','261'],
['Heruaut','262'],
['Oueron','263'],
['Touarts','264'],
['Ouerõ','265'],
['Loudun','266'],
['Seaulx','267'],
['Champigny','268'],
['Marſé','269'],
['Chauigny','270'],
['Fronteuaux','271'],
['Brezé','272'],
['Doué','273'],
['Martigny Bryant','274'],
['Alẽſon','275'],
['Briſſac','276'],
['Gonnor','277'],
['Chemilly','278'],
['Iallays','279'],
['Beaupreau','280'],
['Regrepiere','281'],
['Loron Bottreau','282'],
['Chebiette','283'],
['Thoret','284'],
['Nantes','285'],
['la Gallochette','286'],
['Ioué','287'],
['Maidon','288'],
['Chaſteaubriand','289'],
['Bourg delbret','290'],
['la Motte','291'],
['Candé','292'],
['Lorou','293'],
['la Touche aux Aſnes','294'],
['Angers','295'],
['au Verger','296'],
['Lezigny','297'],
['Durtal','298'],
['Gerzé','299'],
['Baugé','300'],
['Mõtliherné','301'],
['Fouriers','302'],
['Bourgueil','303'],
['Ingrande','304'],
['Lẽgés','305'],
['Mailly','306'],
['Pleſſis léz Tours','307'],
['Tours','308'],
['Pleſſis','309'],
['la Bourdoiziere','310'],
['Chenonçeau','311'],
['Amboiſe','312'],
['Ecures','313'],
['Bloys','314'],
['Cheuerny','315'],
['Mur','316'],
['Remorentin','317'],
['Menetou','318'],
['Viarrõ','319'],
['Meun ſur Yeure','320'],
['Bourges','321'],
['ſainct Ieu','322'],
['Dun le Roy','323'],
['pont de Chargé','324'],
['Couleuures','325'],
['la Franchiſe','326'],
['ſainct Menou','327'],
['Sauigny','328'],
['Moulins','329'],
['Beſſé','330'],
['Varennes','331'],
['Sainct Germain de la Foſſe','332'],
['Vichy','333'],
['ſainct Priet de Bramefan','334'],
['Maringues','335'],
['pont du Chaſteau','336'],
['Duſſet','337'],
['Villeconte','338'],
['ſainct Amand','339'],
['ſainct Saturnin','340'],
['Clermont en Auuergne','341'],
['Mõtferrand','342'],
['Clermont','343'],
['Rion','344'],
['ſainct Bonnet','345'],
['Aigueperſe','346'],
['Ebruſle','347'],
['Chantelle','348'],
['la Coue','349'],
['Montmarault','350'],
['Brés','351'],
['Coſne en Bourbonnois','352'],
['Tenoille','353'],
['Torſy','354'],
['Grouſobre','355'],
['Guyarche','356'],
['Aubigny','357'],
['la Charité','358'],
['Nerſy','359'],
['Douzy le pré','360'],
['Entrain','361'],
['la Peſſeliere','362'],
['Auoynes','363'],
['Auxerre','364'],
['Regẽt','365'],
['Iuigny','366'],
['Remeau','367'],
['Ville-neufue le Roy','368'],
['Sens','369'],
['Sergines','370'],
['Brais','371'],
['Mont-montoys','372'],
['Nangy','373'],
['Toquin','374'],
['Monceaux','375'],
['Buſſy ſainct George','376'],
['Sainct Mor des foſſez','377'],
['Paris','378'],


]
"""


"""
# Locations for Mémoires de catherine de La Guette
locations = [
['chez nous','1'],
['envoya quérir','2'],
['abbaye de Jarsy','3'],
['petit Bourbon','4'],
['logis de <abbr class="abbr" title="Monsieur">M.</abbr>&#160;Guiot','5'],
['chez elles','6'],
['à table','7'],
['chez moi à la campagne','8'],
['Gros-Bois','9'],
['en nos maisons','10'],
['Gros-Bois','11'],
['Sussy','12'],
['Gros-Bois','13'],
['Sussy','14'],
['à Paris','15'],
['Val-de-Grâce','16'],
['chez moi','17'],
['Orléans','18'],
['Poitiers','19'],
['Angoulême','20'],
['petite ville','21'],
['la Tour Blanche','22'],
['Bourdeille','23'],
['Périgueux','24'],
['Bergerac','25'],
['Libourne','26'],
['la Bastide','27'],
['Garonne','28'],
['porte du Chapeau-Rouge','29'],
['à l’archevêché','30'],
['Bacalan','31'],
['la Bastide','32'],
['Lamone','33'],
['Libourne','34'],
['Mucidan','35'],
['Riberac','36'],
['Angoulême','37'],
['Paris','38'],
['chez la reine','39'],
['chez nous','40'],
['chez <abbr class="abbr" title="Monsieur">M.</abbr>&#160;le Cardinal','41'],
['Montereau-Faut-Yonne','42'],
['du couvent','43'],
['Montereau','44'],
['au milieu de la rivière de Seine','45'],
['Melun','46'],
['Paris','47'],
['chez moi','48'],
]
"""

#"""
# Locations for Voyage de Gascogne
locations = [
['Paris','1'],
['Ollainville','2'],
['Estampes','3'],
['Angerville','4'],
['Artenay','5'],
['faulxbourgs d’Orléans','6'],
['Cléry','7'],
['S. Dye','8'],
['Blois','9'],
['Chenonceaux','10'],
['Tours','11'],
['Azé-le-Rideau','12'],
['Chinon','13'],
['Fontevrault','14'],
['Chinon','15'],
['Champigny','16'],
['Mont-sur-Guêne','17'],
['Mirebeau','18'],
['Pont-d’Oranse','19'],
['Poictiers','20'],
['Vyvonne','21'],
['Couay','22'],
['Civray','23'],
['Ruffec','24'],
['Verteuil','25'],
['Renay','26'],
['Nègre','27'],
['Anville','28'],
['Neufvy','29'],
['Cognac','30'],
['Pons','31'],
['Plassac','32'],
['Mirambeau','33'],
['Tollyer','34'],
['Blaye','35'],
['Bourg','36'],
['Lybourne','37'],
['Créon','38'],
['Bordeaux','39'],
['Cadillac','40'],
['Sainct-Macaire','41'],
['Casteras','42'],
['la Réole','43'],
['Saincte-Bazeille','44'],
['Marmande','45'],
['Tonneins','46'],
['Esguillon','47'],
['Port-Saincte-Marie','48'],
['Agen','49'],
['Lafox','50'],
['Valence d’Agen','51'],
['Mouassac','52'],
['Chasteau-Sarrazin','53'],
['Montèche','54'],
['Sainct-Jorry','55'],
['Tholouze','56'],
['Pibrac','57'],
['L’Isle en Jourdain','58'],
['Agimont','59'],
['Aubiet','60'],
['Auch','61'],
['Condom','62'],
['Nérac','63'],
['Port-Saincte-Marie','64'],
['Nérac','65'],
['Port-Saincte-Marie','66'],
['Nérac','67'],
['Port-Saincte-Marie','68'],
['Nérac','69'],
['Agen','70'],
['Port-Saincte-Marie','71'],
['Nérac','72'],
['Port-Saincte-Marie','73'],
['Agen','74'],
['Port-Saincte-Marie','75'],
['Nérac','76'],
['Port-Saincte-Marie','77'],
['Agen','78'],
['Lafox','79'],
['Valence','80'],
['Saint-Nicolas','81'],
['Beaumont','82'],
['Solomiac','83'],
['Mauvoisin','84'],
['Saint-Germain','85'],
['L’Isle-Jourdain','86'],
['Saint-Lys','87'],
['Muret','88'],
['Caujac','89'],
['Saverdun','90'],
['Mazères','91'],
['Castelnaudary','92'],
['Marquein','93'],
['Saint-Michel','94'],
['Marquin','95'],
['Saint-Michel','96'],
['Marquin','97'],
['Saint-Michel','98'],
['Marquin','99'],
['Saint-Michel','100'],
['Mazères','101'],
['Castelnaudary','102'],
['Mas Sainctes-Puelles','103'],
['Castelnaudary','104'],
['Mazères','105'],
['Pamiers','106'],
['Foix','107'],
['Pamiers','108'],
['Saverdun','109'],
['Lézat','110'],
['Rieux','111'],
['Saint-Félix','112'],
['Sainct-Martory','113'],
['Saint-Goden','114'],
['Montréal','115'],
['Lasnemezan','116'],
['Tournant','117'],
['Tarbes','118'],
['Pontac','119'],
['Coarraze','120'],
['Pau','121'],
['Villepinte','122'],
['Vic-Bigorre','123'],
['Beloc','124'],
['Noguero','125'],
['Eause','126'],
['Barrère','127'],
['Saulx','128'],
['Nérac','129'],
['La Plume','130'],
['Layrac','131'],
['Auvilla','132'],
['Montauban','133'],
['Moissac','135'],
['Lafox','136'],
['Agen','137'],
['Nérac','138'],
['Port-Saincte-Marie','139'],
['Paravys','140'],
['Port-Saincte-Marie','141'],
['Paravis','142'],
['Nérac','143'],
['Touars','144'],
['Clérac','145'],
['Pémiclan','146'],
['Sauvetat','147'],
['Villeneufve','148'],
['Saincte Foy','149'],
['Fleix','150'],
['Gurson','151'],
['Coutras','152'],
['Liborne','153'],
['Bourdeaulx','154'],
['Cadilhac','155'],
['Bordeaux','156'],
['Montferrand','157'],
['Libourne','158'],
['Coutras','159'],
['Nérac','160'],
['Saulx','161'],
['Eauze','162'],
['Noguerot','163'],
['Belloc','164'],
['Vi-Bigorre','165'],
['Tarbes','166'],
['Bannières','167'],
['Tarbes','168'],
['Vi-Bigorre','169'],
['Belloc','170'],
['Noguero','171'],
['Eauze','172'],
['Gondryn','173'],
['Nérac','174'],
['Port-Sainte-Marie','175'],
['Nérac','176'],
['Laussignan','177'],
['Casteljaloux','178'],
['Bazas','179'],
['Langon','180'],
['Cadillac','181'],
['Créon','182'],
['Barraulx','183'],
['Branne','184'],
['Coutras','185'],
['Montguyon','186'],
['Baigne','187'],
['Barbezieux','188'],
['Chattauneuf','189'],
['Jarnac','190'],
['Burye','191'],
['Brisenbourg','192'],
['Sainct-Jehan d’Angely','193'],
['Xainctes','194'],
['Saint-Hilaire','195'],
['Saint-Jehan d’Angely','196'],
['Dampierre','197'],
['Chizay','198'],
['Brion','199'],
['Mesle','200'],
['Saint-Maixant','201'],
['La Mothe Saint-Éray','202'],
['Sanxay','203'],
['Montreuil','204'],
['Vouillé','205'],
['Vendeuvres','206'],
['Chastelleraut','207'],
['La Guerche','208'],
['Loches','209'],
['Roches-Saint-Quentin','210'],
['Chenonceau','211'],
['Plessis-les-Tours','212'],
['Chenonceau','213'],
['Veret','214'],
['Chenonceau','215'],
['Pontlevoy','216'],
['Cheverny','217'],
['Villesavyn','218'],
['Saint-Laurent des Eaux','219'],
['Clery','220'],
['Orléans','221'],
['Boigny','222'],
['La Cour-Dieu','223'],
['Hallier','224'],
['Bois-Mallesherbes','225'],
['La Chapelle','226'],
['Fontainebleau','227'],
['Corbeil','228'],
['Paris','229'],
['Saint-Maur des Fossés','230'],
['… Saint-Anthoine','231'],
['Saint-Maur','232'],
['Coupvray','233'],
['Monceaulx','234'],
['Crouy','235'],
['Villers-Costeretz','236'],
['Acy','237'],
['Monceaulx','238'],
['Jouarre','239'],
['Monceaulx','240'],
['Loigny','241'],
['Saint-Maur-des-Fossés','242'],
['Saint-Anthoine','243'],
['Saint-Maur-des Fossés','244'],
['Villeneuve-Saint-Georges','245'],
['Chailly','246'],
['Fontainebleau','247'],
['Couldray','248'],
['Corbeil','249'],
['Saint-Maur-des-Fossés','250'],
['faulbourg Saint-Honoré','251'],
['Saint-Maur-des-Fossés','252'],
['Paris','253'],
['Saint-Maur-des-Fossés','254'],
['Paris','255'],
['Bourg-la-Roine','256'],
['Pallezeau','257'],
['Saint-Clerc','258'],
['Ablis','259'],
['guey de Lonroi','260'],
['Chartres','261'],
['Illiers','262'],
['Danjeau','263'],
['Chasteaudun','264'],
['La Ferté-Villeneuil','265'],
['La Colombe','266'],
['Marchesnoy','267'],
['Blois','268'],
['Eseures','269'],
['Amboyse','270'],
['Chenonceaux','271'],
['Plessis-les-Tours','272'],
['Azé','273'],
['Chinon','274'],
['Champigny','275'],
['au faulbourg de Chinon','276'],
['Fontevrault','277'],
['Loudun','278'],
['Mirebeau','279'],
['Vendeuvre','280'],
['Dissay','281'],
['Poictiers','282'],
['Rusfergue','283'],
['Vivonne','284'],
['Coué ','285'],
['Civray','286'],
['Villefagnan','287'],
['Aigres','288'],
['Beauvais sur Matha','289'],
['Jarnac','290'],
['Chasteauneuf','291'],
['Barbezieux','292'],
['Chasley','293'],
['Coutras','294'],
['Lybourne','295'],
['Créon','296'],
['Cadillac','297'],
['Saint-Macaire','298'],
['La Réolle','299'],
['Marmande','300'],
['Port-Sainte-Marie','301'],
['Agen','302'],
['Port Saincte Marie','303'],
['Nérac','304'],
['Chastelviel','305'],
['Port-Sainte-Marie','306'],
['Brax','307'],
['Agen','308'],
['Nostre-Dame de Bonne-Fortune','309'],
['Agen','310'],
['Port-Saincte-Marie','311'],
['Nérac','312'],
['Lectoure','313'],
['Auch','314'],
['Manseube','315'],
['Boullongne','316'],
['Causse','317'],
['Sainct-Martory','318'],
['Alais','319'],
['Saint-Élix','320'],
['la Vernoze','321'],
['Sechet','322'],
['Grenade','323'],
['Port-Sainte-Marye','324'],
['Nérac','325'],
['Agen','326'],
['Brassard','327'],
['Castelnau','328'],
['Saint-Project','329'],
['Villeneuve','330'],
['Bournaisel','331'],
['Entraygues','332'],
['Montsalvy','333'],
['Carlat','334'],
['Murat','335'],
['Allanche','336'],
['Luguet','337'],
['Yboy','338'],
['Saint-Amand','339'],
['Saint-Saturnin','340'],
['Usson','341']
]
#"""

"""
inputText = open("tourdefrance-old.html", "r", encoding="utf-8")
outputText = open("tourdefrance.html", "w", encoding="utf-8")
"""

"""
inputText = open("memoires-guette-old.html", "r", encoding="utf-8")
outputText = open("memoires-guette.html", "w", encoding="utf-8")
"""

#"""
inputText = open("voyagedegascogne-old.html", "r", encoding="utf-8")
outputText = open("voyagedegascogne.html", "w", encoding="utf-8")
#"""


allText = ""
for line in inputText:
   allText += line

treatedText = ""
remainingText = allText
l = 0
while l < len(locations):
   location = locations[l][0]
   id = locations[l][1]
   print("Looking for location #" + str(l) + ": " + location)
   position = remainingText.find(location)
   if position > 0:
      treatedText += remainingText[0:position] + '<span class="etape-texte" id="s' + id + '" onclick="(document.querySelector(\'#mark' + id + '\')).click()">' + location + '</span>'
      remainingText = remainingText[position+len(location):len(remainingText)]
   else:
      l = len(locations)
   l = l+1
inputText.close()
outputText.writelines(treatedText + remainingText)
outputText.close()