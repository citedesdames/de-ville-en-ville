# -*- coding: utf-8 -*-

# Convert a file mixing HTML and XML tags into a proper XML file

import csv, glob, os, re, sys


locations = {
'Paris':'Q90',
'Ollainville':'Q247256',
'Estampes':'Q205584','Étampes':'Q205584',
'Angerville':'Q538536',
'Artenay':'Q706912',
'faulxbourgs d’Orléans':'Q6548','Faubourgs d’Orléans':'Q6548',
'Cléry':'Q816291','Cléry-Saint-André':'Q816291',
'S. Dye':'Q829633','Saint-Dyé-sur-Loire':'Q829633',
'Blois':'Q160927',
'Chenonceaux':'Q274619',
'Tours':'Q288',
'Azé-le-Rideau':'Q243032','Azay-le-Rideau':'Q243032',
'Chinon':'Q194138',
'Fontevraud':'Q632276','Fontevrault':'Q632276',
'Chinon':'Q194138',
'Champigny':'Q1136074','Champigny-sur-Veude':'Q1136074',
'Mont-sur-Guêne':'Q1435299','Monts-sur-Guesnes':'Q1435299',
'Mirebeau':'Q753745',
'Pont-d’Oranse':'','Migné-Auxances':'',
'Poictiers':'Q6616','Poitiers':'Q6616',
'Vyvonne':'Q1613150','Vivonne':'Q1613150',
'Couay':'Q832135','Couhé-Vérac':'Q832135',
'Civray':'Q748393',
'Ruffec':'Q730659',
'Verteuil':'Q836557','Verteuil-sur-Charente':'Q836557',
'Nègre':'Q1451759','Aigre':'Q1451759',
'Anville':'Q1436968','Marcillac-Lanville':'Q1436968',
'Neufvy':'Q1438952','Neuvicq-le-Château':'Q1438952',
'Cognac':'Q285',
'Pons':'Q741626',
'Plassac':'Q1350283',
'Mirambeau':'Q587841',
'Tollyer':'Q186287','Étauliers':'Q186287',
'Blaye':'Q202562',
'Bourg':'Q715671',
'Lybourne':'Q6544','Libourne':'Q6544',
'Créon':'Q194265',
'Bordeaux':'Q1479',
'Cadillac':'Q333571',
'Sainct-Macaire':'Q471984','Saint-Macaire':'Q471984',
'Casteras':'Q302713','Casseuil':'Q302713',
'la Réole':'Q263456',
'Saincte-Bazeille':'Q747513','Sainte-Bazeille':'Q747513',
'Marmande':'Q210742',
'Thonnynx':'Q1070001','Tonneins':'Q1070001',
'Esguillon':'Q404783','Aiguillon':'Q404783',
'Port-Saincte-Marie':'Q1164132','Port-Sainte-Marie':'Q1164132',
'Agen':'Q6625',
'La Fox':'Q207904','Lafox':'Q207904',
'Vallance':'Q1467944','Valence':'Q1467944',
'Mouassac':'Q383089','Moissac':'Q383089',
'Chasteau-Sarrazin':'Q213285','Castelsarrasin':'Q213285',
'Montèche':'Q917979','Montech':'Q917979',
'Sainct-Jorry':'Q1429096','Saint-Jory':'Q1429096',
'Tholouze':'Q7880','Toulouse':'Q7880',
'Pibrac':'Q733833',
'l’Isle en Jourdain':'Q735931','L’Isle-Jourdain':'Q735931',
'Gimont':'Q322406','Agimont':'Q322406',
'Aubyet':'Q1143441','Aubiet':'Q1143441',
'Aulch':'Q181725','Auch':'Q181725',
'Condom':'Q209802',
'Nérac':'Q210769'
}


locations = {







'damoiselle Marie de Nassau':'Q459440',







'don Jouan d’Austria':'Q157107',
'du Plessis':'Q944098',

'duc de Guise':'Q313700',
'duc de Saxe, Jeans Frédéric':'Q563316',
'Elizabeth':'Q7207',

'Françoys de la Noüe':'Q1451253',
'Henry III':'Q53448',







'le conte Maurice':'Q164062',

'le roy de Navarre':'Q936976',




'M. de Guise':'Q313700',
'M. de la Noüe':'Q1451253',
'M. du Plessis':'Q944098',

'M. le Prince d’Orange':'Q78454',




'messieurs de la Noüe':'Q1451253',

'Monseigneur':'Q318380',
'monseigneur d’Alençon':'Q318380',

'Monsieur du Plessis':'Q944098',
'monsieur le duc de Bouillon':'Q3119619',
'monsieur le Prince d’Orange':'Q78454',

'monsr de Bouillon':'Q3119619',
'monsr de Buhy':'Q116171032',


'monsr du Plessis':'Q944098',
'monsr le Prince d’Orange':'Q78454',
'Philippes de Mornay':'Q944098',
'Prince d’Orange':'Q78454',
'roi de Navarre':'Q936976',

'Roy d’Hespagne':'Q34417',
'roy de France Henry IIIe':'Q53448',
'Roy de Navarre':'Q936976',

'royne d’Angleterre':'Q7207',







'sr de la Noüe':'Q1451253',

'sr de Ste Aldegonde':'Q701605',
}

# Get the current folder
folder = os.path.abspath(os.path.dirname(sys.argv[0]))

# Open the input file mixing HTML and XML tags
file = "voyagedegascogne-old.html"
file = "DuplessisMornay-Flandres.v3-old.html.xml"
inputFile = open(file, "r", encoding="utf-8")

# Prepare the output HTML file
outputFile = open(file.replace("-old.html", "-mix.xml"), "w", encoding="utf-8")

# For each line in the input file
for line in inputFile:
    for location in locations:
        #line = line.replace(location,'<placeName type="itineraire" ref="wdt:'+locations[location]+'">'+location+'</placeName>')
        line = line.replace('<persName>'+location+'</persName>','<persName ref="wdt:'+locations[location]+'">'+location+'</persName>')
    outputFile.writelines(line)

outputFile.close()
print("Fini !")