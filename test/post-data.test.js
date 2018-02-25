const request = require(`supertest`);
const {app} = require(`../server/server`);

describe(`POST /api/posts`, function () {

  it(`should consume JSON`, () => {
    return request(app).post(`/api/posts`).
        send({
          comments: [`вф вёфягбъялющс зчл`, `кйёя`, `лъупзелжо аилюкжу`, `йядмнгемоеъкъ`, ` ыёдсш`, `ее м `, `е ытсп`],
          date: 1927170795198,
          effect: `heat`,
          hashtags: [`#ёз`, `#`, `#п`, `#ёйяъфт`, `#сзуяё`],
          likes: 582,
          scale: 40,
          url: `https://picsum.photos/600/?random`,
          filename: `test/fixtures/image.png`
        }).
        expect(200, {
          comments: [`вф вёфягбъялющс зчл`, `кйёя`, `лъупзелжо аилюкжу`, `йядмнгемоеъкъ`, ` ыёдсш`, `ее м `, `е ытсп`],
          date: 1927170795198,
          effect: `heat`,
          hashtags: [`#ёз`, `#`, `#п`, `#ёйяъфт`, `#сзуяё`],
          likes: 582,
          scale: 40,
          url: `https://picsum.photos/600/?random`,
          filename: `test/fixtures/image.png`
        });
  });

  it(`should consume form-data`, () => {
    return request(app).post(`/api/posts`).
        field(`effect`, `chrome`).
        field(`likes`, 152).
        field(`scale`, 78).
        field(`url`, `https://picsum.photos/600/?random`).
        attach(`filename`, `test/fixtures/image.png`).
        expect(200, {
          effect: `chrome`,
          likes: 152,
          scale: 78,
          filename: `test/fixtures/image.png`,
          url: `https://picsum.photos/600/?random`
        });
  });

  it(`should fail if scale is invalid`, () => {
    return request(app).post(`/api/posts`).
        field(`scale`, 15000).
        field(`effect`, `sepia`).
        field(`likes`, 400).
        attach(`filename`, `test/fixtures/image.png`).
        expect(400, [{
          fieldName: `scale`,
          fieldValue: 15000,
          errorMessage: `should be in range 1..100`
        }]);
  });

});