# Rest Interface design

On 05/03/2020, we drafted a list of back end resources that we foresee needed. This list should only be considered as a reference. The actual endpoints will be developed during the implementation of the features and based on the User Story needs.

## Workshops

```
GET /workshop   -> [{workshop},{workshop},...,{workshop}]
POST
```

```
GET /workshop/uuid -> {workshop}
PUT
DELETE
```

```
workshop: {
  "uuid": "5bf0ea16a70501ab3a02f3d8ba7db90bfb2fa54b",
  "location": "Company",
  "date": "2012-04-23T18:30:00.000Z"
}
```
## Participants

```
GET /workshop/uuid/student -> [{student},{student},...,{student}]
POST
```

```
GET /workshop/uuid/coach -> [{coach},{coach},...,{coach}]
POST
```

```
student: {

}
```

```
coach: {

}
```

## Groups
