;(function(){
	module.exports=function(_g){

		var app = _g.app;
		var http = _g.http;

		function route(){
			app.get('/',function(req,res){
				loginCheckRouteHook(()=>{
					var type = req.query.type;
					if(type==undefined){
						type=1;//default;
					}
					res.render('index.html',{
						type:type,
						list1:_g.list1,
						list2:_g.list2,
						list3:_g.list3,
						list4:_g.list4,
					});
				});
			});


			app.get('/item',function(req,res){
				loginCheckRouteHook(()=>{
					res.render('item.html',{
						type:req.query.type, //0:list4 ,1:list2, 2:list3
						start:req.query.start,
						end:req.query.end,
						list1:_g.list1,
						list2:_g.list2,
						list3:_g.list3,
						list4:_g.list4,
					});
				});
			});


			app.get('/search',function(req,res){
				loginCheckRouteHook(()=>{
					res.render('search.html',{
						search:req.query.search,
						list1:_g.list1,
					});
				});
			});

			//http://smmsmm.shop/naver369600b9522b96cb0b63b2bc39396558.html
			app.get('/naver369600b9522b96cb0b63b2bc39396558.html',function(req,res){
				loginCheckRouteHook(()=>{
					res.render('naver369600b9522b96cb0b63b2bc39396558.html',{});
				});
			});
			//http://smmsmm.shop/robots.txt
			app.get('/robots.txt',function(req,res){
				loginCheckRouteHook(()=>{
					res.send(`User-agent: *
Allow:/`);
				});
			});


			app.get('/pinfo',function(req,res){
				loginCheckRouteHook(()=>{
					res.render('pinfo.html',{});
				});
			});


			//1. enetry point
			app.listen(1225,function(){
			  preLoad();
			  console.log('ShowMeTheMoney#SMM! Server listen on *:1225');
			});
		}

		function loginCheckRouteHook(doInLoginCheckRouteHook){
			routeHook(()=>{
				return {result:"success"};
			},(params)=>{
				if(params==undefined || params.result==undefined){
					return;
				}
				if(params.result === "success"){
					//to-do-something
					doInLoginCheckRouteHook();
				} else { //in case of not having session, or not login..etc..
					//to-do
				}
				return {result:"success"};
			},(params)=>{
				return 1;
			});
		}

		function routeHook(onPreExecute,doInRoute,onPostExecute){
			var preReturn = onPreExecute();
			var doReturn = doInRoute(preReturn);
			return onPostExecute(doReturn);
		}

		function preLoad(){
			//to-do
		}

		var publicReturn = {
			route:route,
		}
		return publicReturn;
	}

})();



