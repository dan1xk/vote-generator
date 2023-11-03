const generateStars = (value) => {
  let stars = "";
  for (let i = 0; i < value; i++) {
    stars += "■";
  }
  for (let i = value; i < 5; i++) {
    stars += "□";
  }

  return stars;
};

module.exports = generateStars;
