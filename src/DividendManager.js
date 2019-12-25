;(function(){
	module.exports = function(){
		const Devidend = require('./models/Dividend.js')();
		const fs = require('fs');
		const iconv = require('iconv-lite');
		const inputFilePath = './src/files/input.csv';

		var dividendListByCode = [];
		var ordered2019DividendListByCode = [];
		var ordered2018DividendListByCode = [];
		var orderedDividendListByDate = [];


		function load(){
			loadByFile(inputFilePath);
			console.log('codeKeyLen : '+Object.keys(dividendListByCode).length);
			ordered2019DividendListByCode = orderByDividend(2019);
			console.log('19bestLen : '+ordered2019DividendListByCode.length);
			ordered2018DividendListByCode = orderByDividend(2018);
			console.log('18bestLen : '+ordered2018DividendListByCode.length);
			orderedDividendListByDate = orderByDividend(null);
			return {list1:dividendListByCode,
				list2:ordered2019DividendListByCode,
				list3:ordered2018DividendListByCode,
				list4:orderedDividendListByDate,
			};
		}

		function orderByDividend(year){
			var list = [];
			var keys = Object.keys(dividendListByCode);
			for(var i=0;i!=keys.length;++i){
				var item = dividendListByCode[keys[i]];
				if(year==undefined){
					list.push(dividendListByCode[keys[i]]);	
				}
				else if(parseInt(item.assignDate/10000)===year){
					list.push(dividendListByCode[keys[i]]);	
				}
			}
			if(year==undefined){

				list.sort(function(a,b){
					return b.assignDate - a.assignDate;
				});

			} else {
				list.sort(function(a,b){
					return b.dividend - a.dividend;
				});
			}
			
			return list;
		}

		function loadByFile(filename) {
			
			var file = fs.readFileSync(filename);
			file = iconv.decode(file,'euc-kr');
			var lines = file.split('\n');

			console.log('InputLines : '+lines.length);

			for(var i=2;i!=lines.length;++i){
				if(lines[i]===''){
					break;
				}
				var item = lines[i].split(','); 
				if(item.length!=17){
					console.log(`item type is wrong[line:${i}]`);
					return;
				}

				var d=itemParse(item);
				if(dividendListByCode[d.code]===undefined){
					dividendListByCode[d.code] = d;
				}
			}
		}


		function itemParse(item){
			var d=new Devidend();
			d.assignDate = parseInt(item[0]);	
			d.shareDate = parseInt(item[1]);
			d.code = item[3];
			d.name = item[4];
			d.market = item[5];
			d.shareType = item[6]; 
			d.stockType = item[8];
			d.dividend = parseInt(item[9]);
			d.dividendPercent = parseFloat(item[11]);
			d.unit = parseInt(item[15]);
			d.setMonth = parseInt(item[16]);

			return d;
		}

		var returnObj = {
			load:load
		};
		return returnObj;
	}
})();