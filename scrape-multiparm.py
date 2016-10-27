import urllib.parse
import urllib.request
from pyquery import PyQuery as pq
import csv

def readHtml(values):
    url = 'https://www.businessregistration-inscriptionentreprise.gc.ca/ebci/brom/registry/registryPromptSubmit.do'
    data = urllib.parse.urlencode(values)
    data = data.encode('utf-8') # data should be bytes
    req = urllib.request.Request(url, data)
    with urllib.request.urlopen(req) as response:
        the_page = response.read().decode("utf-8") 
        the_page = the_page.replace('\\n', '')
        the_page = the_page.replace('\\r', '')
        print(the_page)
        parseHtml(the_page)

def parseHtml(page):
    d = pq(page)
    p = d("span")
    print(p)

#main function
with open('names.csv') as csvfile:
    pagereader = csv.reader(csvfile, delimiter=',', quotechar='"')
    for row in pagereader:
        values = {'businessNumber' : row[0], 'businessName' : row[1], 'requestDate' : row[2]}
        readHtml(values)



