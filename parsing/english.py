#!/usr/bin/python3

import json

with open('english_vocab') as f:
    lines = f.readlines()
    kv_words = {}
    for line in lines:
        line = line.replace('-', '')
        words = line.split(':', 1)
        k = words[0].strip()
        v = words[1].replace('\n', '').strip()
        kv_words[k] = v

    print(json.dumps(kv_words))
