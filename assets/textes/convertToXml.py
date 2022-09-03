# -*- coding: utf-8 -*-

# Convert a file mixing HTML and XML tags into a proper XML file

import csv, glob, os, re, sys

# Get the current folder
folder = os.path.abspath(os.path.dirname(sys.argv[0]))

# Open the input file mixing HTML and XML tags
file = "voyagedesflandres-mix.html"
inputFile = open(file, "r", encoding="utf-8")

# Prepare the output HTML file
outputFile = open(file.replace("-mix.html", "-clean.xml"), "w", encoding="utf-8")

# For each line in the input file
flag = True
for line in inputFile:

 #make a flag for add the teiHeader balise at the xml program. The flag is up and when it reach the second <p> balise it down.
 regex = "(.*)</a>.</p>(.*)"
 res = re.search(regex, line)
 if(flag == True):
    if res:
        line = line.replace(res.group(1), "<\?xml version=\"1\.0\" encoding=\"UTF-8\"\?> \n<\?xml-model href=\"Teinte/teinte\.rng\" type=\"application/xml\" schematypens=\"http\://relaxng\.org/ns/structure/1\.0\"\?> \n<\?xml-stylesheet type=\"text/xsl\" href=\"Teinte/tei2html\.xsl\"\?> \n<TEI xmlns=\"http://www\.tei-c\.org/ns/1\.0\" xml:lang=\"fr\"> \n <teiHeader> \n    <fileDesc> \n      <titleStmt> \n 	    <title>Extrait des Mémoires de Marguerite de Valois</title> \n		<author>Marguerite de Valois</author> \n 	  </titleStmt> \n	  <publicationStmt> \n		<publisher>Université Gustave Eiffel</publisher> \n		<editor>Nicole Dufournaud, Philippe Gambette, Isabelle Qin, Caroline Trotot</editor> \n		<availability status=\"free\"> \n			<licence target=\"https://creativecommons.org/licenses/by-nc-nd/2.0/fr/\"/> \n				<p>Creative Commons CC BY-NC-ND 2.0	</p> \n		</availability> \n	  </publicationStmt> \n	  <sourceDesc> \n		<bibl> \n			<author>Marguerite de Valois</author>\n			<title>Extrait des Mémoires de Marguerite de Valois</title>\n			<publisher>Éliane Viennot</publisher>\n			<idno>http://www.elianeviennot.fr/Marguerite/MgV-Memoires.xml</idno>\n        </bibl>\n         </sourceDesc>\n      </fileDesc>\n	  <profileDesc>\n		<langUsage>\n			<language ident=\"fr\">\n			</language>\n		</langUsage>\n	   </profileDesc>\n	</teiHeader>\n <body>\n    <div>\n    <head>Extrait des Mémoires de Marguerite de Valois</head>")
        flag = False

 #change lines with "<span class="etape-texte" id="s1" onclick="(document.querySelector('#mark'+1)).click()"> (.*)" for remove it and put word avant and after côte à côte
 if(flag == False):
    regex = "(.*)<span class=\"etape-texte\" id=\"(s[0-9]+)\" onclick=\"\(document.querySelector\('#mark'\+[0-9]+\)\).click\(\)\">(.*)"
    res = re.search(regex, line)
    while res:
        line = res.group(1)+res.group(3)
        res = re.search(regex, line)

 # Replace all HTML tags by XML tags
    line = line.replace("</a>.</p>", "")
    line = line.replace("h1", "head")
    line = line.replace("<span class=\"lieu\"", "<placeName")
    line = line.replace("</span>", "</placeName>")
    line = line.replace(" id=", " ref=")
    line = line.replace("</placeName></placeName>", "</placeName>")

    outputFile.writelines(line)


outputFile.close()
print("Fini !")