$(document).ready(function(){
	// date picker
	$(".date-picker:not(.set-offer-dp)").datetimepicker({pickTime: false});

	//modal
	$("body").on("click", ".modal-trigger", function(){
		$("body").css({overflow:'hidden'});
		var tm = $(this).attr("modal-target");

		$("div[modal-id~='"+tm+"']").addClass("showed");

		$("div[modal-id~='"+tm+"'] .close-me").off('click').on("click",function(){
			$("body").css({'overflow-y':'initial'});
			$("div[modal-id~='"+tm+"']").removeClass("showed");
		});
	});

	//custom select
	// $("select:not([multiple]").transformDD();

	// accordion 
	// $(".panel-group .panel-heading").each(function(){
	// 	var ps = $(this).next(".panel-collapse");
	// 	var ph = ps.find(".panel-body").outerHeight();

	// 	if(ps.hasClass("in")){
	// 		$(this).find("h4").addClass("active")
	// 	}

	// 	$(this).find("a").off("click").on("click",function(e){
	// 		e.preventDefault();
	// 		ps.css({height:ph});

	// 		if(ps.hasClass("in")){

	// 			$(this).find("h4").removeClass("active");

	// 			ps.removeClass("in");
	// 			setTimeout(function(){
	// 				ps.removeAttr("style")
	// 			},100);

	// 			if ($(this).closest('.accordion_custom').hasClass('rounded-accordion')) {
	// 				$(this).closest('.panel-heading').css({'border-radius':'10px'});
	// 			} 
				
	// 		}else{
	// 			$(this).find("h4").addClass("active");
	// 			ps.addClass("in");
	// 			setTimeout(function(){
	// 				ps.removeAttr("style")
	// 			},800);

	// 			if ($(this).closest('.accordion_custom').hasClass('rounded-accordion')) {
	// 				$(this).closest('.panel-heading').css({'border-radius':'0px'});
	// 			} 
				
	// 		}			
	// 	});
	// });
    $('body').on('click', '.panel-group .panel-heading a', function(e){
        var uiParent = $(this).parents('.panel-heading:first');

        var ps = uiParent.next(".panel-collapse");
        var ph = ps.find(".panel-body").outerHeight();
        
		e.preventDefault();
		ps.css({height:ph});

		if(ps.hasClass("in")){

			$(this).find("h4").removeClass("active");

			ps.removeClass("in");
			setTimeout(function(){
				ps.removeAttr("style")
			},100);

			if ($(this).closest('.accordion_custom').hasClass('rounded-accordion')) {
				$(this).closest('.panel-heading').css({'border-radius':'10px'});
			} 
			
		}else{
			$(this).find("h4").addClass("active");
			ps.addClass("in");
			setTimeout(function(){
				ps.removeAttr("style")
			},800);

			if ($(this).closest('.accordion_custom').hasClass('rounded-accordion')) {
				$(this).closest('.panel-heading').css({'border-radius':'0px'});
			} 
			
		}	
    });

	// tooltip
	$("body").append("<div class='show-dialogue'></div>");

	// if($("body .tool-tip").length > 0){
	// 	$(".tool-tip").each(function(){
	// 		var tthtml = $(this).attr("tt-html");

	// 		$(this).on("keypress", function(){
	// 			var ttx = $(this).offset().left;
	// 			var tty = $(this).offset().top - ($(".show-dialogue").height() + 30) ;
	// 			$(".show-dialogue").css({top:tty,left:ttx}).html(tthtml).stop().fadeIn(300);
	// 		}).hover(function () {
	// 			var ttx = $(this).offset().left;
	// 			var tty = $(this).offset().top - ($(".show-dialogue").height() + 30) ;
	// 			$(".show-dialogue").css({top:tty,left:ttx}).html(tthtml).stop().fadeIn(300);
	// 		}).mouseleave(function(){
	// 			$(".show-dialogue").stop().html(tthtml).fadeOut(300);
	// 		});
	// 	});
	// }

	// if($("body .tool-tip").length > 0){
	// 	$(".tool-tip").each(function(){
	// 		var tthtml = $(this).attr("tt-html");

	// 		$(this).on("keypress", function(){
	// 			var ttx = $(this).offset().left;
	// 			var tty = $(this).offset().top - ($(".show-dialogue").height() + 30) ;
	// 			$(".show-dialogue").css({top:tty,left:ttx}).html(tthtml).stop().fadeIn(300);
	// 		}).hover(function () {
	// 			var ttx = $(this).offset().left;
	// 			var tty = $(this).offset().top - ($(".show-dialogue").height() + 30) ;
	// 			$(".show-dialogue").css({top:tty,left:ttx}).html(tthtml).stop().fadeIn(300);
	// 		}).mouseleave(function(){
	// 			$(".show-dialogue").stop().html(tthtml).fadeOut(300);
	// 		});
	// 	});
	// }

	$('body').on('keypress', '.tool-tip', function(){
		var tthtml = $(this).attr("tt-html");
		var ttx = $(this).offset().left;
		var tty = $(this).offset().top - ($(".show-dialogue").height() + 30) ;
		$(".show-dialogue").css({top:tty,left:ttx}).html(tthtml).stop().fadeIn(300);
	});
	$('body').on('mouseenter', '.tool-tip', function(){
		var tthtml = $(this).attr("tt-html");
		var ttx = $(this).offset().left - 30;
		var tty = $(this).offset().top - ($(".show-dialogue").height() + 30) ;
		$(".show-dialogue").css({top:tty,left:ttx}).html(tthtml).stop().fadeIn(300);
	});
	$('body').on('mouseleave', '.tool-tip', function(){
		var tthtml = $(this).attr("tt-html");
		var ttx = $(this).offset().left - 30;
		$(".show-dialogue").stop().html(tthtml).fadeOut(300);
	});

	// modified tabs 
	$(".tab-panel label").off("click").on("click", function() {
		$(".tab-panel label").css({'color':'#333'});
		$(this).css({'color':'#333'});
	});	

	// modified tabs for view esop batch
	$('[data-container="esop_batch_container"]').off("click").on("click", "label", function() {
		$('[data-container="esop_batch_container"]').find("label").css({'color':'#333'});
		$(this).css({'color':'#333'});

		var uiAttr = $(this).attr('data-attr');

		$('[data-container="esop_batch_container"]').find('label').addClass('label_unchecked').removeClass('label_checked');
		$(this).removeClass('label_unchecked').addClass('label_checked');
		$('[data-container="esop_batch_container"]').find('.tab').addClass('tab_unshowed').removeClass('tab_showed');
		$('[data-container="esop_batch_container"]').find('.tab[data-attr="'+uiAttr+'"]').removeClass('tab_unshowed').addClass('tab_showed');
	});	

	// modified tabs for employee dashboard
	$('[data-container="personal_stocks_container"]').off("click").on("click", "label", function() {
		$('[data-container="personal_stocks_container"]').find("label").css({'color':'#333'});
		$(this).css({'color':'#333'});

		var uiAttr = $(this).attr('data-attr');

		$('[data-container="personal_stocks_container"]').find('label').addClass('label_unchecked').removeClass('label_checked');
		$(this).removeClass('label_unchecked').addClass('label_checked');
		$('[data-container="personal_stocks_container"]').find('.tab').addClass('tab_unshowed').removeClass('tab_showed');
		$('[data-container="personal_stocks_container"]').find('.tab[data-attr="'+uiAttr+'"]').removeClass('tab_unshowed').addClass('tab_showed');
	});	

	// modified tabs for hr dept dashboard
	$('[data-container="hr_department_esop_container"]').off("click").on("click", "label", function() {
		$('[data-container="hr_department_esop_container"]').find("label").css({'color':'#333'});
		$(this).css({'color':'#333'});

		var uiAttr = $(this).attr('data-attr');

		$('[data-container="hr_department_esop_container"]').find('label').addClass('label_unchecked').removeClass('label_checked');
		$(this).removeClass('label_unchecked').addClass('label_checked');
		$('[data-container="hr_department_esop_container"]').find('.tab').addClass('tab_unshowed').removeClass('tab_showed');
		$('[data-container="hr_department_esop_container"]').find('.tab[data-attr="'+uiAttr+'"]').removeClass('tab_unshowed').addClass('tab_showed');
	});	

	// modified tabs for hr head and esop admin grid dashboard
	$('[data-container="hr_head_and_admin_esop_grid_container"]').off("click").on("click", "label", function() {
		$('[data-container="hr_head_and_admin_esop_grid_container"]').find("label").css({'color':'#333'});
		$(this).css({'color':'#333'});

		var uiAttr = $(this).attr('data-attr');

		$('[data-container="hr_head_and_admin_esop_grid_container"]').find('label').addClass('label_unchecked').removeClass('label_checked');
		$(this).removeClass('label_unchecked').addClass('label_checked');
		$('[data-container="hr_head_and_admin_esop_grid_container"]').find('.tab').addClass('tab_unshowed').removeClass('tab_showed');
		$('[data-container="hr_head_and_admin_esop_grid_container"]').find('.tab[data-attr="'+uiAttr+'"]').removeClass('tab_unshowed').addClass('tab_showed');
	});	

	// modified tabs for hr head and esop admin list dashboard
	$('[data-container="hr_head_and_admin_esop_list_container"]').off("click").on("click", "label", function() {
		$('[data-container="hr_head_and_admin_esop_list_container"]').find("label").css({'color':'#333'});
		$(this).css({'color':'#333'});

		var uiAttr = $(this).attr('data-attr');

		$('[data-container="hr_head_and_admin_esop_list_container"]').find('label').addClass('label_unchecked').removeClass('label_checked');
		$(this).removeClass('label_unchecked').addClass('label_checked');
		$('[data-container="hr_head_and_admin_esop_list_container"]').find('.tab').addClass('tab_unshowed').removeClass('tab_showed');
		$('[data-container="hr_head_and_admin_esop_list_container"]').find('.tab[data-attr="'+uiAttr+'"]').removeClass('tab_unshowed').addClass('tab_showed');
	});	

	// claimed-rights drop down link 
	var myPending = ""
	$(".status-link div.option").off("click").on("click", function() {
	myPending = $(this).text();
	switch(myPending) {
		case 'Statement of Account': 
			window.location.href="statement-account.php";
			break;
		case 'Claim Form':
			window.location.href="emp-form.php";
			break;
		default:
			break;
		}
	});


	// personal stock selection 
	$(".view-by .grid").trigger('cllick');	
	$(".table-content").hide();
	
	if(window.location.href.indexOf('esop/group_wide_stocks') > -1 || window.location.href.indexOf('esop/view_group_wide_stock_offers') > -1)
	{
		$(".table-content").show();
	}
	$(".dash-table").hide();
	
	$(".view-by .grid").off("click").on("click", function() {		
		$(".grid-content").fadeIn();
		$(".table-content").fadeOut();


		$(".dash-table").fadeOut();
		$(".dash-grid").fadeIn();

		$(this).css({
			'color':'#BDC3C7',
			'font-size':'20px'
		});
		$(this).next(".list").css({
			'font-size':'15px',
			'color':'#fff'
		});

	});

	$(".view-by .list").off("click").on("click", function() {

		$(".table-content").fadeIn();
		$(".grid-content").fadeOut();	

		$(".dash-grid").fadeOut();
		$(".dash-table").fadeIn();	



		$(this).css({
			'color':'#BDC3C7',
			'font-size':'22px'
		});
		$(this).prev(".grid").css({
			'font-size':'15px',
			'color': '#fff'
		});

	});


	// for dropdown navigation in most pages 
	$(".vesting-years").hide();
	$(".price-share").hide();
	$(".grant-date").hide();
	$(".status").hide();
	$(".added-grant-date").hide();
	$(".total-grant-date").hide();
	$(".date-added").hide();
	$(".payment-value").hide();
	$(".payment-type").hide();
	$(".name").hide();
	$(".company").hide();
	$(".user-role").hide();
	$(".esop-name").hide();	
	$(".total-value").hide();
	$(".total-shares-offered").hide();
	$(".total-shares-availed").hide();
	$(".total-shares-unavailed").hide();


	$(".default .select div.option").off("click").on("click", function () {
		var selectedItem = $(this).text();

		switch (selectedItem) {

			case "ESOP Name" :		

				$(".added-grant-date").hide();
				$(".total-grant-date").hide();
				$(".grant-date").hide();
				$(".price-share").hide();
				$(".vesting-years").hide();
				$(".status").hide();
				$(".date-added").hide();
				$(".total-value").hide();

				$(".employee-name").hide();
				$(".payment-type").hide();
				$(".date-added").hide();
				$(".payment-value").hide();
				$(".employee_name").val('');
				$('.empl_from').val('');
				$(".empl_to").val('');
				$('.grant_from').val('');
				$(".grant_to").val('');
				$('.price_share').val('');
				$(".total_value").val('');
				$(".vesting_years").val('');
				$(".payment_type").val('');
				$(".payment_value").val('');
				$(".search-me").show(200);
				$(".esop-name").show(200);
				break;

			case "Vesting Years" :
				$(".date-added").hide();
				$(".payment-type").hide();
				$(".payment-value").hide();
				$(".search-me").hide();
				$(".grant-date").hide();
				$(".price-share").hide();
				$(".status").hide();
				$(".employee-name").hide();
				$(".esop-name").hide();
				$(".employee_name").val('');
				$('.empl_from').val('');
				$(".empl_to").val('');
				$(".esop_name").val('');
				$(".payment_type").val('');
				$(".payment_value").val('');
				$(".vesting-years").show(200);
				break;

			case "Grant Date" :
				$(".search-me").hide();				
				$(".price-share").hide();
				$(".vesting-years").hide();
				$(".status").hide();
				$(".grant-date").show(200);				
				break;

			case "Price per Share" :
				$(".total-value").hide();
				$(".date-added").hide();
				$(".search-me").hide();								
				$(".vesting-years").hide();
				$(".grant-date").hide();
				$(".status").hide();	
				$('.grant_from').val('');
				$(".grant_to").val('');
				$('.esop_name').val('');
				$(".total_value").val('');	
				$(".price-share").show(200);
				break;

			case "Status":
				$(".search-me").hide();								
				$(".vesting-years").hide();
				$(".grant-date").hide();		
				$(".price-share").hide();
				$(".status").show(200);	
				break;


			case "Date Gratuity Added":
				$(".search-me").hide();
				$(".price-share").hide();
				$(".total-grant-date").hide();
				$(".added-grant-date").show(300);
				break;

			case  "Subscription Price":
				$(".search-me").hide();
				$(".added-grant-date").hide();
				$(".total-grant-date").hide();
				$(".price-share").show(300);
				break;

			case "Total Gratuity Granted":
				$(".search-me").hide();
				$(".added-grant-date").hide();
				$(".price-share").hide();
				$(".total-grant-date").show(300);
				break;

			case "Date Added" :
				$(".search-me").hide();
				$(".payment-value").hide();
				$(".employee-name").hide();
				$(".payment-type").hide();			
				$(".total-value").hide();
				$(".price-share").hide();
				$(".vesting-years").hide();
				$(".esop-name").hide();
				$(".employee_name").val('');
				$(".esop_name").val('');
				$(".vesting_years").val('');
				$(".payment_type").val('');
				$(".payment_value").val('');
				$('.price_share').val('');
				$(".total_value").val('');
				$(".date-added").show(300);
				break;

			case "Payment Value" :
				$(".search-me").hide();
				$(".employee-name").hide();
				$(".payment-type").hide();			
				$(".date-added").hide();
				$(".esop-name").hide();	
				$(".employee_name").val('');
				$('.empl_from').val('');
				$(".empl_to").val('');
				$(".vesting_years").val('');
				$(".esop_name").val('');
				$(".payment_type").val('');		
				$(".payment-value").show(300);
				break;

			case "Employee Name" : 
				$(".vesting-years").hide();
				$(".payment-type").hide();
				$(".search-me").hide();
				$(".pament-type").hide();			
				$(".date-added").hide();			
				$(".payment-value").hide();
				$(".esop-name").hide();
				$(".total-shares-offered").hide();
				$(".total-shares-availed").hide();
				$(".total-shares-unavailed").hide();
				$(".empl_from").val('');
				$(".empl_to").val('');
				$(".esop_name").val('');
				$(".vesting_years").val('');
				$(".payment_type").val('');
				$(".payment_value").val('');
				$(".total_shares_unavailed").val('');
				$(".employee-name").show(300);
				break;

			case "Payment Type" :

				$(".vesting-years").hide();
				$(".search-me").hide();
				$(".date-added").hide();			
				$(".payment-value").hide();
				$(".employee-name").hide();
				$(".esop-name").hide();
				$(".employee_name").val('');
				$('.empl_from').val('');
				$(".empl_to").val('');
				$(".vesting_years").val('');
				$(".esop_name").val('');
				$(".payment_value").val('');
				$(".payment-type").show(300);
				break;

			case "Total Shares Offered" :

				$(".employee-name").hide();
				$(".total-shares-availed").hide();
				$(".total-shares-unavailed").hide();
				$(".employee_name").val('');
				$(".total_shares_availed").val('');
				$(".total_shares_unavailed").val('');
				$(".total-shares-offered").show(300);
				break;

			case "Total Shares Availed" :

				$(".employee-name").hide();
				$(".total-shares-offered").hide();
				$(".total-shares-unavailed").hide();
				$(".employee_name").val('');
				$(".total_shares_offered").val('');
				$(".total_shares_unavailed").val('');
				$(".total-shares-availed").show(300);
				break;

			case "Total Shares Unavailed" :

				$(".employee-name").hide();
				$(".total-shares-availed").hide();
				$(".total-shares-offered").hide();
				$(".employee_name").val('');
				$(".total_shares_availed").val('');
				$(".total_shares_offered").val('');
				$(".total-shares-unavailed").show(300);
				break;

			case "Username" :
				$(".name").hide();
				$(".company").hide();
				$(".user-role").hide();
				$(".username").show(300);
				break;

			case "Name" : 
				$(".company").hide();
				$(".user-role").hide();
				$(".username").hide();
				$(".name").show(300);
				break;

			case "Company" :
				$(".user-role").hide();
				$(".username").hide();
				$(".name").hide();
				$(".company").show(300);
				break;

			case "User Role" : 
				$(".username").hide();
				$(".name").hide();
				$(".company").hide();
				$(".user-role").show(300);
				break;

			case "Total Value of Gratuity Given" :
				$(".search-me").hide();
				$(".date-added").hide();
				$(".price-share").hide();
				$('.grant_from').val('');
				$(".grant_to").val('');
				$('.price_share').val('');
				$(".esop_name").val('');
				$(".total-value").show(300);

		}		
	});
	
	$(".add-esop-dash").hide();
	
	
	$(".share-lbl ").off("click").on("click", function() {
	
		if ($(".share-lbl input[type='checkbox']").is(":checked")) {
			$(".add-esop-dash").slideDown();
		} else {
			$(".add-esop-dash").slideUp();
		}
	});



	// link js change 
	$(".claim-doc-dd-btn").off("click").on("click", function() {
		var myChoice = $(".claim-doc-dd option:selected").text();
		switch(myChoice)  {
			case "Statement of Account" :
				window.location.replace('statement-account.php');
				break;	
			case "Claim Form" :
				window.location.replace('claim-form.php');
				break;
		}	
	});


	// personal stock 
	$(".personal-stock-dd-btn").off("click").on("click", function() {
		var myChoice = $(".personal-stock-dd option:selected").text();
		switch(myChoice)  {
			case "Statement of Account" :
				window.location.replace('PERSONAL-STOCK-statement-account.php');
				break;	
			case "Claim Form" :
				window.location.replace('PERSONAL-STOCK-claim-form.php');
				break;
		}	
	});


	//drop down
	$(".popup_person_list").hide();
  	var popup_person = true;

  	$('.angle-down').each(function(){
		$(this).off("click").on("click", function() {
			
	  		if (popup_person == true) {
	  			$(".popup_person_list").slideUp();
	  			$(this).closest('.for-selection').siblings(".popup_person_list").slideDown();  		
	  			popup_person = false;
	  		} else {
	  			$(this).closest('.for-selection').siblings(".popup_person_list").slideUp();  			
	  			popup_person =  true;
	  		}; 		
			});
  	})
 
		$(".thumb_list_view").each(function() {
		$(this).off("click").on("click", function() {
			$(this).toggleClass("marked");	
		});
	});

	
});
