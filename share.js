var share = { 
/** 
* �������ݹ���ӿ� 
* @param {String} �洢�������� 
* @param {Any} ��Ҫ�洢����������(�޴����򷵻ر���ѯ������) 
*/ 
data: function (name, value) { 
var top = window.top, 
cache = top['_CACHE'] || {}; 
top['_CACHE'] = cache; 
return value ? cache[name] = value : cache[name]; 
}, 

/** 
* ���ܹ�����ӽӿ� 
* @param {String} �洢�������� 
* @param {Any} ��Ҫ�洢����������(�޴����򷵻ر���ѯ������) 

adddata: function (name, value) { 
var top = window.top, 
cache = top['_CACHE'] || {}; 
top['_CACHE'] = cache; 

}, */ 


/** 
* ���ݹ���ɾ���ӿ� 
* @param {String} ɾ���������� 
*/ 
removeData: function (name) { 
var cache = window.top['_CACHE']; 
if (cache && cache[name]) delete cache[name]; 
} 
}; 





//////////////////////////////////////////////////ȫ�ֱ���///////////////////////////////////////////////////////////////////////
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
/*var sum_rols =[["other"��"academic/educator"��"artist"��"clerical/admin"��"college/grad student"��"customer service"��"doctor/health care"��
				"executive/managerial"��"farmer"��"homemaker"��"K-12 student"��"lawyer"��"programmer"��"retired"��"sales/marketing"��
				"scientist"��"self-employed"��"technician/engineer"��"tradesman/craftsman"��"unemployed"��"writer"],
[23000, 85000, 67000, 38000, 70000, 30000, 80000, 1800,10000,34,530,6700,23,25,230, 85000, 67, 3800, 70, 30000, 80 ]];//fj+*/
/***����ҳ��Ҫ�����ݶ������ڴ˻�ȡ

alert(���ҵĲ��͵�ַ�ǣ� �� + share.data(��myblog'); 
var editTitle = share.data(��editTitle'); 
editTitle(�����Ѿ���ȡ��������'); 
*/