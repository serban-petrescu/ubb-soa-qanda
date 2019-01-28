const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "data");
const BUILD_DIR = path.join(__dirname, "build");

const entries = [];
const addEntry = (key, value) => entries.push({key, value: value.toString(), enabled: true, description: ""});

addEntry("gateway-url", "https://" + (process.env.GATEWAY_HOST || "gateway") + ":" + (process.env.GATEWAY_PORT || "8080"));
addEntry("smtp-url", "http://" + (process.env.SMTP_HOST || "smtp") + ":1080");
addEntry("index", "1");

const files = fs.readdirSync(DATA_DIR);
files.map(f => path.join(DATA_DIR, f))
    .filter(f => fs.statSync(f).isFile())
    .filter(f => path.extname(f).toLowerCase() === ".json")
    .forEach(f => {
        const array = JSON.parse(fs.readFileSync(f, { encoding: "utf8" }));
        const name = path.basename(f, ".json");
        addEntry(name + ".length", array.length);
        array.forEach(object => {
            for (let key in object) {
                if (object.hasOwnProperty(key) && key !== "index") {
                    addEntry([name, object.index, key].join("."), object[key]);
                }
            }
        })
    });

fs.writeFileSync(path.join(BUILD_DIR, "qanda.postman_environment.json"), JSON.stringify({
    name: "Q&A - Generated",
    values: entries
}, null, 4))