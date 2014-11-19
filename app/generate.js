var express = require('express');
var router = express.Router();
var Handlebars = require('handlebars');
var uuid = require('node-uuid');
var BufferHelper = require('bufferhelper');


var o = "{\"is_ad\":\"false\",\"name\":\"前端技术专业八级考试15\",\"count\":0,\"desc\":\"友情提示：不准携带通讯工具，不准交头接耳、 一经发现，取消考试成绩，并终生禁止再次参与本考试！一定要记得哦！\",\"weixinName\":\"all_weixin_name\",\"weixinId\":\"188888888\",\"questions\":[{\"label\":\"单选\",\"answers\":[{\"label\":\"我不是答案\",\"is_answer\":false},{\"label\":\"我是答案\",\"is_answer\":true},{\"label\":\"我是小三\",\"is_answer\":false}]},{\"label\":\"多选\",\"answers\":[{\"label\":\"我是答案1\",\"is_answer\":true},{\"label\":\"我是答案2\",\"is_answer\":true},{\"label\":\"我不是答案\",\"is_answer\":false}]}]} ";

var i = JSON.parse(o);
	
var survey_name = i.name
console.log( i );

var fs = require('fs'); 
var ws = fs.createWriteStream('public/dataStream.json', { encoding: "utf8" })

ws.write(o); 
ws.end(); // 目前和destroy()和destroySoon()一样  
 // Generate a v1 (time-based) id
var pid = uuid.v1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

var rs = fs.createReadStream('public/template.html', {encoding: 'utf-8', bufferSize: 11});
var bufferHelper = new BufferHelper();

rs.on("data", function (trunk){
	bufferHelper.concat(trunk);
});

rs.on("end", function () {
	var source = bufferHelper.toBuffer().toString();
	var template = Handlebars.compile(source);

	console.log(source + i);

	var template = Handlebars.compile(source);
	var dddd = template(i);
			
	console.log('complied source = ' + pid);
	var html_path = '/html/'+pid+'.html';
	var generated_html_path = 'public' + html_path;
  var ws1 = fs.createWriteStream(generated_html_path, { encoding: "utf8" })
	ws1.write(dddd); 
  ws1.end(); 
	
	var open = require("open");
	open("http://127.0.0.1:4100/html/"+pid+".html"); 
});