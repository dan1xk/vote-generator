const fs = require("fs");
const maps = require("./maps-data.json");
const generateStars = require("./utils/generateStars");
const communityMaps = require("./community-maps.json");

let main = "";
let easy = "";
let hard = "";
let insane = "";
let mod = "";
let community = "";

//TODO: This code was written in a stupid way if anyone wants to use refactor urgently :3

function template(name, votes) {
  const selected = (type) =>
    `${name === type ? "◆" : "◇"} ${type === "Mod" ? "Mods" : type}`;
  const voteOptions = [
    `add_vote "│ *･★ Galaxy Gores ★*･ﾟ" "info"`,
    `add_vote "│ discord.gg/DFEKtmSbMY" "info"`,
    `add_vote "╰───────────────────╯" "info"`,
    `add_vote " " "info"`,
    `add_vote "╭──┤" "info"`,
    `add_vote "│ ${selected("Easy")}" "clear_votes; exec ./votes/easy.cfg"`,
    `add_vote "│ ${selected("Main")}" "clear_votes; exec ./votes/main.cfg"`,
    `add_vote "│ ${selected("Hard")}" "clear_votes; exec ./votes/hard.cfg"`,
    `add_vote "│ ${selected("Insane")}" "clear_votes; exec ./votes/insane.cfg"`,
    `add_vote "│ ${selected("Mod")}" "clear_votes; exec ./votes/mod.cfg"`,
    `add_vote "│ ${selected(
      "Community"
    )}" "clear_votes; exec ./votes/community.cfg"`,
    `add_vote "╰──┤ " "info"`,
    `add_vote "  " "info"`,
    `add_vote "╭──┤ " "info"`,
    `add_vote "│ Random ${name} map" "random_map"`,
    `add_vote "│ Random ${name} unfinished map by vote caller" "random_unfinished_map"`,
    `add_vote "╰──┤" "info"`,
    `add_vote "   " "info"`,
    `add_vote "╭──┤  " "info"`,
    votes,
    `sv_name "[NEW] |*Galaxy*| BRA - ${name} Gores"`,
    `sv_server_type "${name}"`,
  ];
  return voteOptions.join("\n");
}

communityMaps.forEach((element) => {
  const mapName = element.map;
  const stars = generateStars(element.stars);
  const points = element.points;
  const votes = `add_vote "│ ${mapName} ── ${points} ${
    points > 1 ? "pts" : "pt"
  } ── ${stars}" "change_map ${mapName}"\n`;
  community += votes;
});

maps.forEach((element) => {
  const mapName = element.map;
  const stars = generateStars(element.stars);
  const type = element.type;
  const points = element.points;
  const votes = `add_vote "│ ${mapName} ── ${points} ${
    points > 1 ? "pts" : "pt"
  } ── ${stars}" "change_map ${mapName}"\n`;

  if (type === "Easy") {
    easy += votes;
  } else if (type === "Main") {
    main += votes;
  } else if (type === "Hard") {
    hard += votes;
  } else if (type === "Insane") {
    insane += votes;
  } else if (type === "Mod") {
    mod += votes;
  }
});

function writeFile(filePath, data) {
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error(`Error writing to file ${filePath}:`, err);
    } else {
      console.log(`File ${filePath} created successfully!`);
    }
  });
}

writeFile("./votes/easy.cfg", template("Easy", easy));
writeFile("./votes/main.cfg", template("Main", main));
writeFile("./votes/hard.cfg", template("Hard", hard));
writeFile("./votes/insane.cfg", template("Insane", insane));
writeFile("./votes/mod.cfg", template("Mod", mod));
writeFile("./votes/community.cfg", template("Community", community));
