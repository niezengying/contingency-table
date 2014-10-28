var share = { 
/** 
* 跨框架数据共享接口 
* @param {String} 存储的数据名 
* @param {Any} 将要存储的任意数据(无此项则返回被查询的数据) 
*/ 
data: function (name, value) { 
var top = window.top, 
cache = top['_CACHE'] || {}; 
top['_CACHE'] = cache; 
return value ? cache[name] = value : cache[name]; 
}, 

/** 
* 跨框架共享添加接口 
* @param {String} 存储的数据名 
* @param {Any} 将要存储的任意数据(无此项则返回被查询的数据) 

adddata: function (name, value) { 
var top = window.top, 
cache = top['_CACHE'] || {}; 
top['_CACHE'] = cache; 

}, */ 


/** 
* 数据共享删除接口 
* @param {String} 删除的数据名 
*/ 
removeData: function (name) { 
var cache = window.top['_CACHE']; 
if (cache && cache[name]) delete cache[name]; 
} 
}; 





//////////////////////////////////////////////////全局变量///////////////////////////////////////////////////////////////////////
var click_bar2wheel = 0,
	bar_clicked_index = 0,
	bar_clicked_d = 0,
	set_bin=10,
	all_or_positive = 1;
	
var	histogram = [],
	mi_long,
	foreground,
foreground_hist,
data_from_click,	
bin = 0.1,
Range = [-1.0,1.0],
//Range = d3.range([-1,1]);
sourcefile ,
histogram_draw;
histogramArray = [];
var foreground_arc;
var histograms;
var outersectors;	
var mychords;
var Foreground;
var hist_group;
var hist_long;	

var peopleTable;

var click_bar_data = {value:[],occup:0};

/*var click_bar_data.value = [],
click_bar_data.histnum = 0,
click_bar_data.occup = 0;*/

/////////////file name////////////////
var reference_col;	

	
var sum_rols =[23000, 85000, 67000, 38000, 70000, 30000, 80000, 1800,10000,34,530,6700,23,25,230, 85000, 67, 3800, 70, 30000, 80 ];
var occupation_list = ["other","academic/educator","artist","clerical/admin","college/grad student","customer service","doctor/health care",
				"executive/managerial","farmer","homemaker","K-12 student","lawyer","programmer","retired","sales/marketing",
				"scientist","self-employed","technician/engineer","tradesman/craftsman","unemployed","writer"];//Occupation

share.data("detail_table_data",[]);

///////////////////////////////////////ShareData////////////////////ShareDate///////////////////////////////////////////////////
share.data('sum_rols', sum_rols); 
share.data('occupation_list',occupation_list);
share.data('sum_rol',sum_rols);



////////////////////////////////////////////ReadFile///////////////////ReadFile///////////////////////////////////////////








/**
/*var sum_rols =[["other"，"academic/educator"，"artist"，"clerical/admin"，"college/grad student"，"customer service"，"doctor/health care"，
				"executive/managerial"，"farmer"，"homemaker"，"K-12 student"，"lawyer"，"programmer"，"retired"，"sales/marketing"，
				"scientist"，"self-employed"，"technician/engineer"，"tradesman/craftsman"，"unemployed"，"writer"],
[23000, 85000, 67000, 38000, 70000, 30000, 80000, 1800,10000,34,530,6700,23,25,230, 85000, 67, 3800, 70, 30000, 80 ]];//fj+*/
/***任意页面要此数据都可以在此获取

alert(‘我的博客地址是： ‘ + share.data(‘myblog'); 
var editTitle = share.data(‘editTitle'); 
editTitle(‘我已经获取到了数据'); 
*/