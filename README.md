# Runes API

A RESTful API for Runes - [runesapi.co](http://runesapi.co/)

The RunesAPI will have its API requests versioned
to promote backwards compatibility.

## Endpoints

### `find`

Find runes. Optionally filter by aett or name, by
default this action return all runes.

#### Parameters

- `aett` - optional
  - _Accepted Values_ - `freya` | `heimdall` | `tyr`
  - This also can take an array of aetts to return like
    `['freya', 'heimdall']` to return a combination of runes

## Local development

While you can always interact with our stable API at
[runesapi.co](http://runesapi.co/), we also provide a
public docker container for consuming our API during local
development for reliable API response times while testing.
