var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs-extra');

var url = 'http://bindingofisaacrebirth.gamepedia.com/Item';

// request(url, function(err, res, html) {
// 	if(!err && res.statusCode == 200) {

// 		var $ = cheerio.load(html);
		
// 		var collectibles = {
// 			'activatedCollectibles': [],
// 			'passiveCollectibles': []
// 		};

// 		$('table.active-collectible tr td:first-child a').each(function(i, el) {
// 			collectibles['activatedCollectibles'][i] = {
// 				'url': 'http://bindingofisaacrebirth.gamepedia.com'+$(this).attr('href')
// 			}

// 			// collectibles['activatedCollectibles'][i] = {
// 			// 	'id': $(this).find('td:nth-child(2)').text().replace(/\r?\n|\r/, '').replace(/\s+/g, ''),
// 			// 	'name': $(this).find('td:nth-child(1)').text().replace(/\r?\n|\r/, ''),
// 			// 	'quote': $(this).find('td:nth-child(4)').text().replace(/\r?\n|\r/, ''),
// 			// 	'description': $(this).find('td:nth-child(5)').text().replace(/\r?\n|\r/, ''),
// 			// 	'recharge': $(this).find('td:nth-child(6)').text().replace(/\r?\n|\r/, '')
// 			// }

// 		});
// 		$('table.passive-collectible tr td:first-child a').each(function(i, el) {
// 			collectibles['passiveCollectibles'][i] = {
// 				'url': 'http://bindingofisaacrebirth.gamepedia.com/Item'+$(this).attr('href')
// 			}
// 		});

// 		fs.writeJson('./collectibles.json', collectibles).then(function() {
// 			console.log('success!');
// 		}).catch(function (err) {
// 			console.error(err);
// 		});
// 	}
// });

fs.readJson('./collectibles.json', (err, collectibles) => {
	var count = 0;

	collectibles['activatedCollectibles'].forEach(function(el, i) {

		request(el.url, function(err, res, html) {
			if(!err && res.statusCode == 200) {

				var $ = cheerio.load(html);

				var test = {
					'activatedCollectibles': [],
					'passiveCollectibles': []
				};

				console.log($('#firstHeading').text());

				test['activatedCollectibles'][count] = {
					'name': $('#firstHeading').text()
				}

				fs.writeJson('./test.json', test).then(function() {
					console.log('success!');
				}).catch(function (err) {
					console.error(err);
				});
				
				count++;
			}
		});
	});
})