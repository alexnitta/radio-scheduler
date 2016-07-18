"use strict";

var sampleData = {
  "version": "1.0",
  "href": "string",
  "attributes": {
    "query": "string",
    "city": "string",
    "state": "string",
    "lat": 0,
    "long": 0
  },
  "items": [{
    "version": "1.0",
    "href": "string",
    "attributes": {
      "apps": {
        "npr_one": {
          "name": "string",
          "logo": "string",
          "donation_url": "string",
          "donation_audio": "string",
          "thankyou_audio": "string",
          "sonic_id_audio": ["string"],
          "hello_id_audio": ["string"]
        }
      },
      "guid": "string",
      "org_id": "string",
      "name": "Public media for Northern California",
      "title": "string",
      "abbreviation": "string",
      "call": "KQED",
      "frequency": "88.5",
      "band": "FM",
      "tagline": "",
      "address": ["string"],
      "market_city": "string",
      "market_state": "string",
      "format": "Public Radio",
      "music_only": false,
      "status": "1",
      "status_name": "Member",
      "email": "string",
      "area_code": "string",
      "phone": "string",
      "phone_extension": "string",
      "fax": "string",
      "network": {
        "org_id": "string",
        "name": "string"
      },
      "npr_one": true
    },
    "items": [null],
    "links": {
      "web": [{
        "href": "http://kqed.org",
        "type_name": "string",
        "title": "",
        "type_id": "1"
      }],
      "audio": [{
        "href": "string",
        "type_name": "string",
        "title": "",
        "type_id": "10",
        "stream_guid": "string",
        "primary_stream": true
      }],
      "image": [{
        "href": "string",
        "type_name": "string",
        "title": "",
        "type_id": "18"
      }],
      "related": [{
        "href": "string",
        "type_name": "string",
        "title": "",
        "type_id": "7"
      }]
    },
    "errors": [null]
  }, { // station
    'attributes': {
      'call': 'KALW',
      'band': 'FM',
      'frequency': '91.7',
      'name': 'Local public radio'
    },
    'links': {
      'web': [{
        'href': 'http://kalw.org'
      }]
    }
  }, { // station
    'attributes': {
      'call': 'KPFA',
      'band': 'FM',
      'frequency': '94.1',
      'name': 'Community Powered Radio'
    },
    'links': {
      'web': [{
        'href': 'https://kpfa.org/'
      }]
    }
  }],
  "links": {},
  "errors": [null]
};