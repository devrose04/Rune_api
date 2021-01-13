# RunesAPI

RunesAPI is a simple open source API for interacting with various
runic systems.

## API Endpoints

If you are running this locally within docker you'll have access to the full
suite of functions available such as adding your own runes, or changing rune
names to match what you may be more familiar with.

Documentation for all endpoints are below, but if you intend to simply use the
public http site we offer you will be restricted to **read only** endpoints like
`find`.

It should be noted that the `GET` endpoints are expecting query parameters whereas
the `POST`, `PUT` and `DELETE` endpoints are expecting a request body.

The complete list of endpoints is below:

- [find](#find)
- [add](#add)
- [remove](#remove)
- [update](#update)

### Find

Find runes. Optionally filter by aett, by default this action return all runes.

```http
GET https://runesapi.com/find
```

#### Query Parameters

- name - optional `[string]`
- aett - optional `[string]`
  - Accepted Values - `freya` | `heimdall` | `tyr`
  - This also can take a comma delimited string of aettir to return like `'freya,heimdall` to return a combination of runes

#### Response

Provided there are no schema errors with your input the output of this
function will be as follows:

```ts
{
  "count": number,
  "runes": [
    { "name": string, "transliteration": string, "aett": string }
    { "name": string, "transliteration": string, "aett": string }
  ]
}
```

### Add

Add a new rune to an aett. The name must be unique.

```http
POST https://runesapi.com/add
```

#### Request Body

- name - required `[string]`
- aett - required `[string]`
  - Accepted Values - `freya` | `heimdall` | `tyr`
- transliteration - optional `[string]`

### Remove

Remove a rune by its name.

```http
DELETE https://runesapi.com/remove
```

#### Request Body

- name - required `[string]`

### Update

Update a rune by its name. You cannot use this endpoint to rename a rune.

```http
PUT https://runesapi.com/update
```

#### Request Body

- name - required `[string]`
- aett - optional `[string]`
  - Accepted Values - `freya` | `heimdall` | `tyr`
- transliteration - optional `[string]`
