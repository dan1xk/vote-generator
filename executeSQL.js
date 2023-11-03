const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./goresdb.sqlite");

const maps = require("./maps-data.json");

// db.run("DELETE FROM record_maps");
//TODO: migrate this shit to mysql

db.serialize(() => {
  const stmt = db.prepare(
    "INSERT INTO record_maps (Map, Server, Mapper, Points, Stars, Timestamp) VALUES (?, ?, ?, ?, ?, ?)"
  );

  maps.forEach((map) => {
    stmt.run(
      map.map,
      map.type,
      map.mapper,
      map.points,
      map.stars,
      map.releasead.length > 22
        ? "2015-02-14 08:10:22"
        : `${map.releasead.substring(12)} 21:10:53`
    );
  });

  stmt.finalize();
});

db.close();
