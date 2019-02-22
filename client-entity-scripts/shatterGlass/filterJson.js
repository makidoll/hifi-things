var fs = require("fs");
var json = JSON.parse(fs.readFileSync("./original.json", "utf8"));

json.Entities.forEach((entity,i)=>{
	entity.name = "Shattered Glass "+i;
	delete entity.id;
	entity.shapeType = "simple-compound";
	entity.userData = '{"grabbable_key":["grabbable":false]}}';
	entity.grab = {
		grabbable: false,
		grabFollowsController: false,
	}
	entity.gravity = {
        "x": 0,
        "y": -4,
        "z": 0
    };
    entity.damping = 0;
    entity.angularDamping = 0;
    entity.dynamic = true;
    entity.collisionsWillMove = true;
    entity.animation = {
    	"allowTranslation": false
    };
    entity.lifetime = 10;

    entity.modelURL = entity.modelURL.replace("atp:/Desktop/", "https://hifi.maki.cat/client-entity-scripts/shatterGlass/glass/")

    //console.log(entity);
});

fs.writeFileSync("./glass.json", JSON.stringify(json));

json.Entities.forEach((entity,i)=>{
	entity.name = "PRELOAD";
	entity.dynamic = false;
	entity.gravity = {
        "x": 0,
        "y": 0,
        "z": 0
    };
    entity.position = {
        "x": 0,
        "y": 0,
        "z": 0
    };
    entity.lifetime = -1;
});

fs.writeFileSync("./glass-preload.json", JSON.stringify(json));