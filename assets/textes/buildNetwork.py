# -*- coding: utf-8 -*-

# Convert a file mixing HTML and XML tags into a proper HTML file

import csv, glob, os, re, sys

# Get the current folder
folder = os.path.abspath(os.path.dirname(sys.argv[0]))

# Open the input file mixing HTML and XML tags
file = "voyagedesflandres-mix.html"
inputFile = open(file, "r", encoding="utf-8")

# Prepare the output HTML file
outputFile = open(file.replace("-mix.html", ".network.csv"), "w", encoding="utf-8")
stages = {}
stageList = []

wikidata = {}

# Codes of the stages of the trip
stageCodes = {
"s1":"Paris",
"s2":"Saint-Denis",
"s3":"Luzarches",
"s4":"Chantilly",
"s5":"Senlis",
"s6":"Verberie",
"s7":"Compiègne",
"s8":"Ourscamp",
"s9":"Noyon",
"s10":"Chauny",
"s11":"La Fère",
"s12":"Saint-Quentin",
"s13":"Le Catelet",
"s14":"Cambrai",
"s15":"Somain",
"s16":"Valenciennes",
"s17":"Boussu",
"s18":"Mons",
"s19":"Le Rœulx",
"s20":"Nivelles",
"s21":"Namur",
"s22":"Huy",
"s23":"Liège",
"s24":"Huy",
"s25":"Dinant",
"s26":"Florennes",
"s27":"Thuin",
"s28":"Bavay",
"s29":"Le Cateau-Cambrésis",
"s30":"Le Catelet",
"s31":"La Fère",
"s32":"Liesse-Notre-Dame",
"s33":"Anizy-le-Château",
"s34":"Crépy-en-Valois",
"s35":"Senlis",
"s36":"Chantilly",
"s37":"Verneuil-en-Halatte",
"s38":"Chantilly",
"s39":"Saint-Brice-sous-Forêt",
"s40":"Saint-Denis",
"s41":"Paris"
}

allText = ""
# For each line in the input file
for line in inputFile:
  allText = allText + line.replace("\n","").replace("\r","")


stageNb = 0
stageLabel = {}
textByStage = {}
currentStage = ""
regex = "(.*)<milestone ref=\"(s[0-9]+)\"/>(.*)"
res = re.search(regex, allText)
while res:
  currentStage = res.group(2)
  stageLabel[stageNb] = currentStage
  textByStage[stageNb] = res.group(3)
  # Update variable line with the rest of the text
  allText = res.group(1)
  # Update stage number
  stageNb += 1
  res = re.search(regex, allText)



personsByStage = {}
# For each stage, find all people mentioned in the stage
for stage in range(0,len(textByStage)):
  stage = len(textByStage) - 1 - stage
  if stageCodes[stageLabel[stage]] in personsByStage:
    persons = personsByStage[stageCodes[stageLabel[stage]]]
    print("already seen stage " + stageLabel[stage])
  else:
    persons = {}
    print("new stage " + stageLabel[stage])

  print(stageLabel[stage] + " : " + stageCodes[stageLabel[stage]])
  regex = "<(rs|persName) ref=\"([^\"]+)\"[^>]*>([^<]+)</(rs|persName)>(.*)"
  remainingText = textByStage[stage]
  res = re.search(regex, remainingText)
  while res:
    person = res.group(2)
    print(person)
    
    # Check if person already seen at this stage:
    if person in persons:
      persons[person] += 1
    else:
      persons[person] = 1
      if person != "??" and stageCodes[stageLabel[stage]] != "Paris":
        outputFile.writelines(person + "\t" + stageCodes[stageLabel[stage]] + "\n")
    remainingText = res.group(5)
    res = re.search(regex, remainingText)
    # Add the person to Wikidata if relevant
    if person[0] == "Q":
      if person in wikidata:
        wikidata[person] += 1
      else:
        wikidata[person] = 1
  personsByStage[stageCodes[stageLabel[stage]]] = persons
  
  
outputFile.writelines("\n\n\n\n\n")
for p in wikidata:
  outputFile.writelines(p + "\n")

print(personsByStage)
outputFile.close()
print("Fini !")