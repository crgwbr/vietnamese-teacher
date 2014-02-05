#!/usr/bin/env python

import csv
import simplejson

SOURCE_FILE = 'data/800words.csv'
OUT_FILE = 'www/data.json'


def read_csv(filename):
    with open(filename, 'rb') as srcfile:
        reader = csv.reader(srcfile)
        for row in reader:
            yield row


def process_row(row):
    english = row.pop(0)
    vietnamese = [word for word in row if len(word) > 0]
    vietnamese = map(lambda word: word, vietnamese)
    return (english, vietnamese)


def main():
    out = [process_row(row) for row in read_csv(SOURCE_FILE)]
    json = simplejson.dumps(out)
    with open(OUT_FILE, 'w') as of:
        of.write(json)


if __name__ == "__main__":
    main()
