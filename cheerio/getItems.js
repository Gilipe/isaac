var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs-extra');
// var Spinner = require('cli-spinner').Spinner;

var itemsCollectibles = [];

// var spinner = new Spinner('processing.. %s');
// spinner.setSpinnerString('|/-\\');
// spinner.start();

fs.readJson('./itemUrls.json', function(err, items) {

	for(category in items) {
		// itemsCollectibles.push(category);

		for(var c = 0; c <= 10; c++) {

			console.log(items[category][c]);

			request(items[category][c], function(err, res, html) {
				if(!err && res.statusCode == 200) {

					var $ = cheerio.load(html);

					if($('#firstHeading').text() == "") {

						console.log($('#firstHeading').text());
						// itemsCollectibles[category][c]['name'].push($('#firstHeading').text());

						itemsCollectibles = 'test';
					}




				} else {
					console.error(err);
				}
			}).end();
		}
	}

	// fs.writeJson('./itemsCollectibles.json', itemsCollectibles).then(function() {
	// 	console.log('success!');
	// }).catch(function (err) {
	// 	console.error(err);
	// });

	console.log(itemsCollectibles);

});