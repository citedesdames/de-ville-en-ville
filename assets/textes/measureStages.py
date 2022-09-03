# -*- coding: utf-8 -*-

# Convert a file mixing HTML and XML tags into a proper HTML file

import csv, glob, os, re, sys

# Get the current folder
folder = os.path.abspath(os.path.dirname(sys.argv[0]))

cities = {
's1':'Paris',
's2':'Saint-Denis',
's3':'Luzarches',
's4':'Chantilly',
's5':'Senlis',
's6':'Verberie',
's7':'Compiègne',
's8':'Ourscamp',
's9':'Noyon',
's10':'Chauny',
's11':'La Fère',
's12':'Saint-Quentin',
's13':'Le Catelet',
's14':'Cambrai',
's15':'Somain',
's16':'Valenciennes',
's17':'Boussu',
's18':'Mons',
's19':'Le Rœulx',
's20':'Nivelles',
's21':'Namur',
's22':'Huy',
's23':'Liège',
's24':'Huy',
's25':'Dinant',
's26':'Florennes',
's27':'Thuin',
's28':'Bavay',
's29':'Le Cateau-Cambrésis',
's30':'Le Catelet',
's31':'La Fère',
's32':'Liesse-Notre-Dame',
's33':'Anizy-le-Château',
's34':'Crépy-en-Valois',
's35':'Senlis',
's36':'Chantilly',
's37':'Verneuil-en-Halatte',
's38':'Chantilly',
's39':'Saint-Brice-sous-Forêt',
's40':'Saint-Denis',
's41':'Paris',
}

# Open the input file mixing HTML and XML tags
file = "voyagedesflandres-mix.html"
inputFile = open(file, "r", encoding="utf-8")

# Prepare the output HTML file
outputFile = open(file.replace("-mix.html", ".csv"), "w", encoding="utf-8")

outputString = ""
stages = {}
stageList = []

# For each line in the input file
for line in inputFile:
  line = line.replace("<milestone ref=\"", "¤").replace("&nbsp;"," ")
  # Remove all tags except milestone
  regex = "^(.*)<[^>]+>(.*)$"
  res = re.search(regex, line)
  while res:
    line = res.group(1) + res.group(2)
    res = re.search(regex, line)
  
  # Add the line without tag to the outputString
  outputString += line.replace("\"/>","¤")

# Measure each stages
regex = "^([^¤]*)¤s([0-9]+)¤(.*)"
res = re.search(regex, outputString)
oldStageNb = ""
while res:
  stageNb = res.group(2)
  stageList.append(stageNb)
  if oldStageNb != "":
     stages[oldStageNb] = len(res.group(1))
     outputFile.writelines(stageNb + "\t" + str(len(res.group(1))) + "\n")
     print(oldStageNb + "\t" + str(len(res.group(1))))
  outputString = res.group(3)
  oldStageNb = stageNb
  res = re.search(regex, outputString)

previousStage = ""
for stage in stageList:
  if previousStage != "":
    outputFile.writelines(cities["s"+stage] + "\t" + cities["s"+previousStage] + "\n")
  previousStage = stage

outputFile.close()
print("Fini !")

