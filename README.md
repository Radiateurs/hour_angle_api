# Hour Angle API
An awesome API that tells you the angle between the hour and minute hands on an analog clock.

## Getting started

### Requirement
- [Postman](https://www.postman.com/) must be installed
- [Docker](https://www.docker.com/) must be installed and running
- [Git](https://git-scm.com/downloads) must be installed

### Running the API

First clone the repository in a terminal and move in it :
```sh
git clone https://github.com/Radiateurs/hour_angle_api.git
cd hour_angle_api
```
Start the docker container using `docker-compose` :
```sh
docker-compose build && docker-compose up
```
You should see in the terminal a variety of lines. Once the line following line appears the API is up and running
```sh
web_1  | Listening at http://<HOSTNAME>:3030/
```

### Testing the app

1. Open Postman and click on IMPORT (top-left, next to +NEW) and select the files `TheControlGroup - Hour angle API.postman_collection.json` and `TheControlGroup - Hour API Env.postman_environment.json`.
2. Select the new imported environment `TheControlGroup - Hour API Env` by clicking on the top-right drop-down menu.
3.  Click on the collection `TheControlGroup - Hour angle API` and select a request (`[GET] Angle` or `[POST] Angle`).
4.  You should receive an answer from the API in a JSON format similar to this :
```json
{
    "result": 120
}
```

## Contributing & developping
If you wish to contribute to the project, here are a few useful tips you can using during your development :
- To run a server locally that recompile on the go at every modification simply run `npm run start:dev` in `hour_angle_api/hour_angle_api_core/` 
- To test your code add test files in `hour_angle_api/hour_angle_api_core/test/`. Your files should follow the Jest synthax and be named `<file>.test.js` where <file> is your file's name. Take inspiration on `hour_angle_api/hour_angle_api_core/test/angle.test.js`. Nevertheless, your tests files should always use the variable `app` to send request on the API (POST / GET / etc ...) and therfore start with :
```js
/* global describe test expect */
import request from 'supertest';

const app = request.agent(global.angleRouter);
```

Make sure to comment your code because hours of research can save minutes of comments reading.🙃