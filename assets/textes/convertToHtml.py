# -*- coding: utf-8 -*-
# Créé par titou, le 16/06/2022 en Python 3.7

# Convert a file mixing HTML and XML tags into a proper HTML file

import csv, glob, os, re, sys

# Get the current folder
folder = os.path.abspath(os.path.dirname(sys.argv[0]))
foundIds = {}

# Open the input file mixing HTML and XML tags
file = "voyagedesflandres-mix.html"
inputFile = open(file, "r", encoding="utf-8")

# Prepare the output HTML file
outputFile = open(file.replace("-mix.html", ".html"), "w", encoding="utf-8")

# For each line in the input file
for line in inputFile:
  # Replace all XML tags by HTML tags


  line = line.replace("<rs", "<span class=\"persName nc")
  line = line.replace("</rs>", "</span>")
  line = line.replace("<persName", "<span class=\"persName")
  line = line.replace("</persName>", "</span>")
  line = line.replace(" ref=\"", " ")
  line = line.replace("\" type=\"", " ")

  #change lines with "milestone" for remove it and put word avant and after côte à côte


  regex = "(.*)<milestone (s[0-9]+)\"/>(.*)"
  res = re.search(regex, line)
  while res:
    locationId = res.group(2)
    while locationId in foundIds:
      locationId = "l" + locationId
    foundIds[locationId] = 1
    line = res.group(1)+"<span class=\"milestone\" id=\"l" + locationId + "\"></span>"+res.group(3)
    res = re.search(regex, line)

  # ...

  # Replace all "bananas" in the line by "apples"
  #and save the line into the outputfile
  #outputFile.writelines(line.replace("bananas", "apples"))
  outputFile.writelines(line)


outputFile.close()
print("Fini !")
