var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs-extra');

var url = 'http://bindingofisaacrebirth.gamepedia.com/Item';

request(url, function(err, res, html) {
	if(!err && res.statusCode == 200) {

		var $ = cheerio.load(html);

		var urls = {
			'activatedCollectibles': [],
			'passiveCollectibles': []
		};

		$('table.active-collectible tr td:first-child a').each(function(i, el) {
			urls['activatedCollectibles'].push('http://bindingofisaacrebirth.gamepedia.com'+$(this).attr('href'));
		});
		$('table.passive-collectible tr td:first-child a').each(function(i, el) {
			urls['passiveCollectibles'].push('http://bindingofisaacrebirth.gamepedia.com'+$(this).attr('href'));
		});

		fs.writeJson('./itemUrls.json', urls).then(function() {
			console.log('success!');
		}).catch(function (err) {
			console.error(err);
		});
	}
});

// fs.readJson('./collectibles.json', (err, collectibles) => {
// 	var count = 0;

// 	collectibles['activatedCollectibles'].forEach(function(el, i) {

// 		request(el.url, function(err, res, html) {
// 			if(!err && res.statusCode == 200) {

// 				var $ = cheerio.load(html);

// 				var test = {
// 					'activatedCollectibles': [],
// 					'passiveCollectibles': []
// 				};

// 				console.log($('#firstHeading').text());

// 				test['activatedCollectibles'][count] = {
// 					'name': $('#firstHeading').text()
// 				}

// 				fs.writeJson('./test.json', test).then(function() {
// 					console.log('success!');
// 				}).catch(function (err) {
// 					console.error(err);
// 				});
				
// 				count++;
// 			}
// 		});
// 	});
// });