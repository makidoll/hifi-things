if (process.argv.length < 4) {
	console.log("node getPosts.js [url] [board name]");
	process.exit(1);
}

const URL = process.argv[2];
const BOARDNAME = process.argv[3];

var request = require("request");
var fs = require("fs");

function getData(url) {
	return new Promise((resolve,reject)=>{
		request(url, (err,res,body)=>{
			if (err) return reject(err);

			let match = /window\.__data = ({[\s\S].*});<\/script>/g.exec(body);
			if (match.length<2) return reject();

			let data = undefined;
			try { data = JSON.parse(match[1]);
			} catch(err) { return reject(err); }

			return resolve(data); 
		});
	});
}

function getPosts(url, boardID, pages) {
	return new Promise((resolve,reject)=>{
		request({
			url: url+"/api/posts/get",
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				boardID: boardID,
				pages: pages,
				sort: "newest",
			}),
		}, (err,res,body)=>{
			if (err) return reject(err);

			try {
				let json = JSON.parse(body);
				return resolve(json.result);
			} catch(err) {
				return reject(err);
			}
		});
	});
}

function getPostData(url, boardID, postURLName) {
	return new Promise((resolve,reject)=>{
		request({
			url: url+"/api/posts/getOne",
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				boardID: boardID,
				postURLName: postURLName,
			}),
		}, (err,res,body)=>{
			if (err) return reject(err);

			try {
				let json = JSON.parse(body);
				return resolve(json.post);
			} catch(err) {
				return reject(err);
			}
		});
	});
}

getData(URL).then(data=>{

	console.log("Available boards:\n"+Object.keys(data.boards.items)+"\n");
	if (Object.keys(data.boards.items).includes(BOARDNAME)) {

		//console.log(data.boards.items[BOARDNAME]);
		const BOARDID = data.boards.items[BOARDNAME]._id;
		const PAGES = Math.ceil(data.boards.items[BOARDNAME].activePostCount/10);

		console.log("Board found: "+BOARDNAME);

		getPosts(URL, BOARDID, PAGES).then(async data=>{
			// get all author ids (not really necessary)
			let authorIDs = [];
			data.posts.forEach(post=>{
				if (!authorIDs.includes(post.authorID))
					authorIDs.push(post.authorID);
			});

			console.log("Fetched "+data.posts.length+" posts from "+authorIDs.length+" users");

			// get each individual post
			let posts = [];
			let downloadedPosts = 0;

			for (let i=0; i<data.posts.length; i++) {
				let post = data.posts[i];

				try {
					post = await getPostData(URL, BOARDID, post.urlName);
					console.log("Download post "+(i+1)+": "+post.urlName);
					posts.push(post);
				} catch(err) {
					console.log("Failed to download post: "+post.urlName);
				}
			}

			// write file
			let filename = BOARDNAME+".json";
			fs.writeFileSync(filename, JSON.stringify(posts));
			console.log(filename+" written");

		}).catch(err=>{
			console.log("Failed to retrieve posts");
			console.log(err);
			return;
		});

	} else {
		return console.log("Board not found");
	}

}).catch(err=>{
	console.log("Could not get data from: "+URL);
	console.log(err);
	return;
});