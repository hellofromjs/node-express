## Get hotels

GET http://localhost:8888/api/v1/hotels?ranking=4&page=2&limit=3&fields=name,address,room_price&rankingAverage=3&comfort=4&room_price[lt]=200&sort=room_price,comfort

## Get top 5 hotels

GET http://localhost:8888/api/v1/hotels/top-5-best

## Register user
POST http://localhost:8888/api/v1/users/signup
```js
{
    "name": "Jonas",
    "email": "jonas.petraitis@gmail.com",
    "password": "123456789",
    "passwordConfirm": "123456789"
}
```
