var exam = {}
 
$(function(){
	
	
	$('#create_exam_on_server_btn').off('click').on('click',create_exam_on_server);
	
	$('#create_exam_btn').click(function(){
		$('.create_exam').hide();
		$('.show_exam').show();
		
		
		var qname = $("input[name='all_name']").val();
		var count = 0;
		
		var desc = $("input[name='all_desc']").val();
		
		var weixinname = $("input[name='all_weixin_name']").val();
		var weixinid = $("input[name='all_weixin_id']").val();
		
		
		
		
		exam = {
			"is_ad"		: 	$("select[name='is_ad']").val(),
			"name"		: 	qname,
			"count"		: 	count,
			"desc"		: 	desc,
			"weixinName": 	weixinname,
			"weixinId"	: 	weixinid
		}
		
	});
	
	$('#create_question_btn').click(function(){
		var h = "<br>"
			+ "<div style='border:1px dashed lightblue' class='question_info'>"
			+ "<input type='text' name='all_weixin_name' value='智楠金柜' />"
			+"<button class='create_answer_btn'>创建答案</button>"
			+"<button class='save_question_btn'>保存题目</button>"
			+ "<div class='answer'>"
			+'以下是试题答案，请仔细填写'
			+ "</div>"
			
			+ "</div>"
		
		$('.show_exam_questions').append(h);
		
		$('.create_answer_btn').off('click').on('click',create_answer);
		$('.save_question_btn').off('click').on('click',save_question);
	});
	
	function create_answer(e){
		console.log(e.target);
		var h = ""
			+ "<input type='text' name='all_weixin_name' value='' />"
			+ "    是否为答案<select  name='all_select_name'>"
			+ "	<option value='true' >true</option>"
			+ "	<option value='false' selected>false</option>"
			+ "</select>"
		
		$(e.target).parent().closest('div').last().append(h);
	}
	
	function save_question(e){
		var _this = $(e.target).parent();
		
		console.log(_this);
		
		var all_answers = $(_this).find("input[name='all_weixin_name']");
		
		
		var q_title = '';
		var q_answers = [];
		
		$.each(all_answers, function(i){
			if(i === 0){
				q_title = $(this).val()
			}else{
				var answer = {
					"label": $(this).val(),
					"is_answer":false
				}
				
				q_answers.push(answer);
			}
			
			console.log($(this).val());
		});
		
		
		var all_select = $(_this).find("select[name='all_select_name']");
		
		$.each(all_select, function(i){
			console.log($(this).val());
			
			var answer = q_answers[i];
			
			if($(this).val() === "true") {
				answer.is_answer = true;
			}
		});
		
	
		var q = {
			"label" : q_title ,
			"answers": q_answers
		}
		
		
		$(this).closest('.question_info').last().data('data',q);
					
		console.log(q);
		
		create_q_list();
	}
	
	function create_q_list(){
		
		$('#all_qs').html('');
		var question_infos  = $('.question_info');
		$.each(question_infos, function(i){
			console.log($(this).val());
			
			var data = $(this).data('data');
			
			var dom =  "<li>" + data.label + "</li>";
			$('#all_qs').append(dom);
		});
		
	}
	
	function create_exam_on_server(){
		var question_infos  = $('.question_info');
		
		var q_array = [];
		$.each(question_infos, function(i){
			console.log($(this).val());
			
			var data = $(this).data('data');
			
			q_array.push(data);
		});
		
		exam.questions = q_array;
		
		var json = JSON.stringify(exam);  
		console.log(json);
		
		$.get('http://127.0.0.1:3000/?data='+json+'',function(data){
			console.log('get data = '+data);
		});
		
		setTimeout(function(){
			window.href.location = 'http://127.0.0.1:3000/dataStream.html'
		},2000);
	}
	
});