const request = require("request");
const breedName = process.argv[2];

const fetchBreedDescription = function(breedName, cbf) {
  const url = `https://api.thecatapi.com/v1/breeds/search?name=${breedName}`;
  request(url, (error, resp, body) => {
    // console.log(body);
    // console.log(typeof body);

    if (error) {
      cbf(`Failed on request details:${error}`, null);
    }

    const data = JSON.parse(body);
    // console.log(data);

    const breed = data[0];
    if (breed) {
      cbf(null, breed.description);
    } else {
      cbf(`Failed to find breed ${breedName}`, null);
    }
  });
};
//error catch
fetchBreedDescription(breedName, (error, desc) => {
  if (error) {
    console.log("Error fetch details:", error);
  } else {
    console.log(desc);
  }
});
