$(document).ready(function(){
	$('body').find('img').error(function() {
		if($(this).attr('id') == 'upload_pic_con' || $(this).hasClass('user_profile_picture'))
		{
			$(this).attr('old-src', $(this).attr('src'));
			$(this).attr('src', nkag.config('url.server.base') + 'assets/images/profile/default-profile.jpg').css({'height':'70px'});
		}
		else
		{
			$(this).attr('old-src', $(this).attr('src'));
			$(this).attr('src', nkag.config('url.server.base') + 'assets/images/no-image_4.png')/*.css({'width':'50%', 'height':'20%', 'left':'0px', 'right':'0px', 'bottom':'35%'})*/;
		}
	}).addClass('img-responsive');

	$('.img-responsive').css('margin', '0 auto');
	$('a.popover-activate').popover({
		html: true
	});

	/*$('.datepicker').datepicker()*/

	$('body').on('click', function (e) {
		$('[data-toggle="popover"]').each(function () {
			if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
				$(this).popover('hide');
			}
		});
	});

	/*$('body').on('click','button.add-contact', function(){ //add conctact

		var uiButton = $(this);
		var uiDiv = uiButton.parent('div');
		//console.log(uiButton.closest('div'));
		var uiTemplate = uiDiv.clone();
		uiTemplate.find('label').html('&nbsp;');
		uiTemplate.find('input').val("");
		uiTemplate.find('button').toggleClass('add-contact delete').text('Remove');
		uiTemplate.find('input[data-id="contact_number_id"]').val('');
		//console.log(uiDiv.siblings('div.f-right'));
		if(uiDiv.siblings('div.f-right').length > 0 && uiDiv.siblings('div.f-right') != null)
		{
			uiDiv.siblings('div.f-right').before(uiTemplate);
		}
		else
		{
			uiButton.parent('div').parent('div').append(uiTemplate);
		}

	});*/


	$('body').on('click', 'button.delete' , function(){  //remove contact client company
		$(this).parent('div').remove();
	});




	$('body').on('click', 'button.add-representative', function(){ //add representative
		/*iRepLength = $(this).siblings('div.representative').length;*/
		/*var uiRepresentativeForm = $(this).parent('div.col-sm-12 ').children('div.border-bottom-dashed').eq(1).clone();*/
		/*var inputs = uiRepresentativeForm.find('input[name*="[representatives]"]');
		 inputs.each(function(){
		 var str = $(this).attr('name');
		 var res = str.replace('[representatives][0]', '[representatives][' + iRepLength + ']');
		 $(this).attr('name', '[representatives][' + iRepLength + ']');
		 })*/
		/*uiRepresentativeForm.append('<button class="btn btn-link xs delete-rep" type="button">Remove</button>');
		 $(this).before(uiRepresentativeForm);*/
		/*iRepLength += 1;*/
		var oThis = $(this);
		var iRepresentativeCount = oThis.siblings('div.representative').length -1;
		//console.log(iRepresentativeCount);
		var uiRepresentativeForm = oThis.prev('div.representative').clone();
		uiRepresentativeForm.find('button.delete-rep').remove();
		var inputs = uiRepresentativeForm.find('input[name]').val("");
		inputs.each(function(){
			var oThis = $(this);
			// alert(oThis.attr('name'));
			var sOrigName = oThis.attr('name');
			//console.log(sOrigName);
			var sNewName = sOrigName.replace('[representatives]['+iRepresentativeCount+']', '[representatives]['+(parseInt(iRepresentativeCount + 1))+']');
			//oThis.attr('name').toString().replace('[new_departments]['+iDepartmentCount+']', '[new_departments]['+iDepartmentCount+']');
			oThis.attr('name', sNewName);
			//console.log(sNewName);
		});
		uiRepresentativeForm.append('<button class="btn btn-link xs delete-rep" type="button">Remove Representative</button>');
		oThis.before(uiRepresentativeForm);
	});


	$('body').on('click', 'button.delete-rep' , function(){ // remove representative
		$(this).parent('div.representative').remove();
	});


	var iDepartmentCount = 0;
	$('body').on('click', 'button.add-department', function(){
		/*var uiDepartmentForm = $(this).parent('div.f-left').siblings('div.col-sm-12.department').eq(0).clone();
		uiDepartmentForm.find('input[name]').each(function(i) {
			var oThis = $(this);
			// alert(oThis.attr('name'));
			var sString = (oThis.attr('name')).toString().replace('['+iCount2+']', '['+(parseInt(iCount2)+1)+']');
			oThis.attr('name', sString);
		});
		iCount2 = $(this).parent('div.f-left').siblings('div.col-sm-12.department').length;
		*/

		var uiDepartmentForm = $(this).parent('div.f-left').prev('div.department').clone();
		//iDepartmentCount = $(this).parent('div.f-left').siblings('.department').length;
		//console.log(uiDepartmentForm);
		uiDepartmentForm.find('button.delete-dep').remove();
		var inputs = uiDepartmentForm.find('input[name]').val("");
		//console.log(inputs);
		inputs.each(function(){
			var oThis = $(this);
			// alert(oThis.attr('name'));
			var sOrigName = oThis.attr('name');
			//console.log(sOrigName);
			var sNewName = sOrigName.replace('new_departments['+iDepartmentCount+']', 'new_departments['+(parseInt(iDepartmentCount + 1))+']');
			//oThis.attr('name').toString().replace('[new_departments]['+iDepartmentCount+']', '[new_departments]['+iDepartmentCount+']');
			oThis.attr('name', sNewName);
			console.log(sNewName);
		});
		uiDepartmentForm.one().append('<button class="btn btn-link xs delete-dep" type="button">Remove Department</button>');
		$(this).parent('div.f-left').before(uiDepartmentForm);
		iDepartmentCount += 1;
		//console.log(iDepartmentCount);
	});

	$('body').on('click', 'button.delete-dep' , function(){ // remove representative
		$(this).parent('div.department').slideUp(500).remove();
	});





	$('li.profile').on('click', '.profile_link', function(e) {
		e.preventDefault();

		var uiThis = $(this),
			uiPMenu = uiThis.find('div.profile_menu');

		uiThis.find('i:first').toggleClass('fa-chevron-down fa-chevron-up');
		uiPMenu.stop(true);
		uiPMenu.slideToggle();
	});

	// $('body').off('click', '[data-type="add_account"]').on('click', '[data-type="add_account"]', function(e) {
	// 	var oModal = $(this).data();
	// 	$('body .tooltip').remove();
	// 	$(oModal.target).find('form')[0].reset();
	// });

	$('body').off('click', 'button[type=button]:visible:contains(Generate)').on('click', 'button[type=button]:visible:contains(Generate)', function(e) {
		e.preventDefault();
		var sText = "";
		var sPossible = "abcdefghijklmnopqrstuvwxyz_-@0123456789";
		var oThis = $(this);
		var uiForm = oThis.closest('form:visible');

		if(typeof uiForm.find('input[name=first_name]').val() != 'undefined') {
			var sFullname = $.trim(uiForm.find('input[name=first_name]').val() + ' ' + uiForm.find('input[name=last_name]').val());
		}else {
			var sFullname = "";
		}
		if(sFullname != '' || sFullname.indexOf(' ') > -1) {
			sPossible = sFullname.replace(' ', '') + '_-@0123456789';
		}

		for( var k=0; k < 10; k++ ) {
			sText += sPossible.charAt(Math.floor(Math.random() * sPossible.length));
		}

		var oFormData = uiForm.data();

		var uiInput = oThis.closest('div').find('input');
		var iKeyUpCount = 1;
		if(uiInput.attr('type') == 'password') {
			var oUserData = {'name':oFormData.addType, 'password':sText};
			var bIsCopyPaste = false;
			uiInput.unbind().bind({
				copy : function(){
					$(this).attr('type', 'text');
				},
				paste : function(){
					$(this).attr('type', 'password');
				},
				cut : function(){
					$(this).attr('type', 'password');
				},
				change : function() {
					$(this).attr('type', 'password');
				}
			});
		} else {
			var oUserData = {'name':oFormData.addType, 'username':sText};
		}
		// alert(sText);
		////console.log(uiInput);

		var oRequest = nkag.ajax.run({
			url:sBaseUrl + 'users/ajax_check_user',
			data:oUserData,
			failure:function(oData) {
				// alert(oData.message)
			},
			success:function(sData) {
				// console.clear();
				if(sData == '0')
				{
					if(uiInput.attr('type') == 'password') {
						uiInput.attr('type', 'text').val(sText);
					} else {
						uiInput.val(sText);
					}
				}
				else
				{
					////console.log(oRequest);
					// oRequest.abort();
					oThis.trigger('click');
				}
			}
		});
	});

	// for error messege glyphicon plugin
	$('body').find('span.glyphicon').css({'cursor':'pointer'});

	$('span.glyphicon').off('mouseenter mouseleave').hover(
		function(){$(this).tooltip({trigger:'hover'});},
		function(){$(this).tooltip({trigger:'hover'});}
	);

	$('body').on('click', 'button.add-client-contact', function(){
		uiButton = $(this);
		var uiDiv = uiButton.closest('div')/*('input.sm[name^="new_contact_numbers"]')*/;
		var uiTemplate = uiDiv.clone();
		uiTemplate.find('label').html('&nbsp;');
		uiTemplate.find('input').val("").attr('name', 'new_client_numbers[]');;
		uiTemplate.find('button').toggleClass('add-contact-edit delete').text('Remove');
		uiDiv.parent('div').append(uiTemplate);
	});

	/**
	 * representatives
	 * department
	 * representative-contacts
	 */
	/*	function getTotalDepartment(){
	 return $('div.department').length;
	 }

	 function getTotalRepByDep (uiClickedAddContact) {
	 return uiClickedAddContact.closest('.department').children('div.representative').length
	 }

	 function getTotalRepContactByDepByRep (uiClickedAddContact) {
	 // body...
	 }*/

	//var iRepresentativeContactCount = 0;
	$('body').on('click', 'button.add-representative-contact', function(e){

		var arrTemp = [],
			uiDiv = $(this).parents('div.col-sm-6:first'),
			uiInputs = uiDiv.find('input.representative-contact'),
			iRepCount = uiInputs.length,
			sFinal = "";

		uiInputs.each(function(){
			var sTemp = $(this).attr('name');
			arrTemp = sTemp.split("][");
			//console.log(arrTemp);
			//console.log(arrTemp[3]+''+arrTemp[4]);
			sTemp = sTemp.replace(arrTemp[3]+']['+arrTemp[4], arrTemp[3]+']['+iRepCount);
			//$(this).attr('name', sTemp);
			sFinal = sTemp;
		});

		var uiClonedContact = $(this).parent('div').clone();
		uiClonedContact.find('input[name]').val("");
		uiClonedContact.find('label').html('&nbsp;');
		uiClonedContact.find('button').toggleClass('add-contact-edit delete').text('Remove');
		//uiClonedContact.find('input[name]').attr('name', sFinal);
		uiClonedContact.appendTo($(this).closest('.col-sm-6'));

		console.log(sFinal);
		/*var uiDivCloned = uiDiv.clone();
		 uiDivCloned.find('input.representative-contact').attr('name', sFinal);
		 uiDivCloned.appendTo($(this).closest('di'));*/

		//console.log(sFinal);


		//console.log(arrTemp);




		/*var uiThis = $(e.target),
		 uiClonedContact = uiThis.parent('div').clone();

		 uiClonedContact.find('input[name]').val("");
		 uiClonedContact.find('label').html('&nbsp;');
		 uiClonedContact.find('button').toggleClass('add-contact-edit delete').text('Remove');

		 getTotalRepByDep(uiThis);

		 uiClonedContact.find('input.representative-contact')
		 .attr('name', 'departments[][representatives][][representative_contact_number][][id]')
		 uiClonedContact.find('input:hidden')
		 .attr('name', 'departments[][representatives][][representative_contact_number][][id]')


		 uiClonedContact.appendTo($(e.target).closest('div.col-sm-6'));*/





		/*uiButton = $(this);
		 var uiDiv = uiButton.closest('div')/*('input.sm[name^="new_contact_numbers"]')
		 var uiTemplate = uiDiv.clone();
		 uiTemplate.find('input[name]').val("");
		 uiTemplate.find('label').html('&nbsp;');
		 uiTemplate.find('input').val("");
		 var inputs = uiTemplate.find('input[name]')
		 inputs.each(function(){
		 var oThis = $(this);
		 // alert(oThis.attr('name'));
		 var sOrigName = oThis.attr('name');
		 //console.log(sOrigName);
		 var sNewName = sOrigName.replace('[new_representatives][0]', '[new_representatives]['+(parseInt(iRepresentativeContactCount + 1))+']');
		 //oThis.attr('name').toString().replace('[new_departments]['+iDepartmentCount+']', '[new_departments]['+iDepartmentCount+']');
		 oThis.attr('name', sNewName);
		 //console.log(sNewName);
		 });
		 uiTemplate.find('button').toggleClass('add-contact-edit delete').text('Remove');
		 uiDiv.parent('div').append(uiTemplate);*/
	});

	/*$('body').on('click', 'button.add-department-edit', function(){
	 var uiDepartmentForm = $('div.template-department').clone().css('display', '').toggleClass('template-department new-department');
	 var inputs = uiDepartmentForm.find('input[name],select[name]').val("");
	 //console.log(inputs);
	 inputs.each(function(){
	 var oThis = $(this);
	 // alert(oThis.attr('name'));
	 var sOrigName = oThis.attr('name');
	 //console.log(sOrigName);
	 var sNewName = sOrigName.replace('new_departments[0]', 'new_departments['+(parseInt(iDepartmentCount + 1))+']');
	 //oThis.attr('name').toString().replace('[new_departments]['+iDepartmentCount+']', '[new_departments]['+iDepartmentCount+']');
	 oThis.attr('name', sNewName);
	 //console.log(sNewName);
	 });
	 uiDepartmentForm.one().append('<button class="btn btn-link xs delete-dep-edit" type="button">Remove Department</button>');
	 $('div.department:first').after(uiDepartmentForm);
	 iDepartmentCount += 1;
	 });*/

	$('body').on('click', 'button.delete-dep-edit' , function(){ // remove department
		$(this).parent('div').slideUp(500).remove();
	});

	$('body').find('.list_downloader').off().on('click', function(){
		var checked = $('body').find('input:checkbox:checked:visible').map(function() {
		    return this.value;
		}).get();

		// special case for billing report
		if($(this).hasClass('for_billing_report')){
			 checked = $('body').find('input:checkbox:checked:visible').map(function() {
				return this.id;
			}).get();
		}

		var checkedValues = [];
		$.each(checked, function(i, el){
		    if($.inArray(el, checkedValues) === -1) checkedValues.push(el);
		});


		var link = $(this).val();
		// alert(link);
		////console.log(sBaseUrl + link);
		$.ajax({
            url : sBaseUrl + link,
            type : 'POST', //the way you want to send data to your URL
            data : {'transid': checkedValues, 'csrf_nkag_token' : $.cookie('csrf_nkag_cookie')},
            'success' : function(data){ //probably this request will return anything, it'll be put in var "data"
            	console.log(data);
            	var myvalues = JSON.parse(data);
            	// alert(myvalues);
            	for(var x in myvalues)
            	{
            		console.log(myvalues[x]);
            		// window.location.assign(myvalues[x]);
            		var link = document.createElement('a');
				    link.href = myvalues[x];
				    link.download = '';
				    document.body.appendChild(link);
				    link.click();
            		////console.log(myvalues[x]);
            	}
                // alert("downloading..."+data);
            }
        });
	});

	$('.checkbox_stoponclick').click(function(e){
		e.stopPropagation();
	});

	fnProfileDropdown();
	fnAjaxEditProfile();
	fnUploadProfilePic();

	$('body').on('click', 'a.fn-retract' , function(e){ // remove department
		e.preventDefault();
		var oThis = $(this);
		var oRetractData = oThis.data();
		var sPath = oThis.attr('fn-path');
		var uiParent = oThis.parents('div.item-panel');
		////console.log(oRetractData);

		function fnCallBack() {
			fnCallNotificationBox('success', $('<p><i>' + uiParent.find('[data-field="display_name"]').text() + '</i>, successfully retracted!</p>'));
		}
		
		fnCallNotificationBox('enabled', $('<p>Sure you want to retract <i>' + uiParent.find('[data-field="display_name"]').text() + '</i></p>'), function() {
			var oSettings = {
				url : nkag.config('url.server.base') + sPath + 'ajax_delete',
				data: oRetractData,
				beforeSend : function() {

				},
				error : function() {
					fnCallNotificationBox('failed', 'Unable to contact server!');
				},
				success : function (sData) {
					if(sData != '0')
					{
						oThis.parents('div.item-panel:visible').parent('div').fadeOut(500, function() {
							$(this).remove();
							if($('div.item-panel:visible').length == 0)
							{
								$("ul[data-filter='b-units'] li.active").click();
							}
							fnCallBack();
						});
					}
				},
				complete : function() {
				}
			}

			nkag.ajax.run(oSettings);
		});
	});
	
	$('body').on('click', 'a.fn-edit' , function(e){
		e.preventDefault();
		var oThis = $(this);
		var oAddData = oThis.data();
		var sModalID = oThis.attr('href');

		$('#add-store-head').text('Edit Store');
		var uiModalBody = $('div.modal-body-form');

		uiModalBody.find('#store-id').val(oAddData.store_id);
		uiModalBody.find('#store-code').val(oAddData.store_code);
		uiModalBody.find('#store-name').val(oAddData.store_name);
		uiModalBody.find('#store-address').val(oAddData.store_address);
		uiModalBody.find('#store-status').val(oAddData.status);
		uiModalBody.find('#billing_date_from').val(oAddData.date_from);
		uiModalBody.find('#billing_date_to').val(oAddData.date_to);
		uiModalBody.find('#store-address').val(oAddData.store_address);
        uiModalBody.find("input:radio[name ='status'][status = " + oAddData.status + "]").prop('checked', true);
        uiModalBody.find("input:radio[name ='is_onds'][onds = " + oAddData.is_onds + "]").prop('checked', true);
		//console.log(oAddData.is_24_hours);
		if(oAddData.is_24_hours	== "1")
		{
			uiModalBody.find('#store-is_24_hours').prop('checked', true);
		}


		uiModalBody.find('#store-id').attr('value', oAddData.store_id);
		uiModalBody.find('#store-code').attr('value', oAddData.store_code);
		uiModalBody.find('#store-name').attr('value', oAddData.store_name);
		uiModalBody.find('#store-address').text(oAddData.store_address);
	});

	$('body').on('click', 'div[view-report]', function(e) {
		var oThis = $(this),
			uiTarget = $(e.target),
			link = oThis.attr('view-report-url'),
			bool = oThis.attr('view-report');
        
        if (uiTarget.hasClass('td-check-box') || uiTarget.closest('td').hasClass('td-check-box')) {
        	////console.log(uiTarget.find('input'))
            if (uiTarget.prop('tagName') != 'INPUT') {
            	uiTarget.find('input').prop('checked', !uiTarget.find('input').prop('checked'));
            }
            else if(uiTarget.attr('type') == 'checkbox')
            { 
				$('[type="checkbox"]').click(function(e){
					e.stopPropagation();
				});
        		e.preventDefault();
        		uiTarget.toggleAttr('checked', true);
            }
        }
        else if(uiTarget.attr('data-target') === '#addinvoice' || uiTarget.attr('data-target') === '#addor'){
            var numOrderId = uiTarget.closest('div.report-box').find(':checkbox[class="billing"]').attr('id');

			var uiOrderIdForBillingReport = $('input[name="order_id_for_billing_report"]');
            uiOrderIdForBillingReport.val(numOrderId);


            nkag.errors.remove_all_messages(uiOrderIdForBillingReport.closest('form'));
        }
        else if ((typeof(bool) == 'boolean' || bool == true) || bool == 'true') {
            fnOnClickViewReport(link, bool);
        }
        else
		{
			fnOnClickViewReport(link, bool, function(ui) {
				var uiParent = oThis.parents('.view-main');
					uiParent.hide();
				var uiContainer = oThis.parents('.view-main').parent('div.li-selection');
				if(! $('#tobeprint').is(':visible')){					
					uiContainer.prepend(ui);
				}

				if($('.data-print:visible').length > 0)
				{
					$('body .data-print').printPage();
				}
			});
		}
	});

	$('body .data-print').printPage();

	$('body').on('click', '.back-list', function(e) {
		e.preventDefault();
		var uiRow = $(this).parents('section').parent('div.li-selection');
		if(uiRow.length == 0)
		{
			uiRow = $(this).parents('section:not(.first-child-section):eq(0)').parent('div');
		}
		if(uiRow.find('.view-main').is(':visible')==false)
		{
			uiRow.find('section:not(.view-main)').remove();
			uiRow.find('.view-main').fadeIn();
		}
	});

    $('body').find(".break-down-container").mCustomScrollbar({
        horizontalScroll:true,
        scrollInertia:100,
        advanced:{ updateOnContentResize:true },
        theme:"dark-thick"
    });

    fnSendEmail();

});

function fnBindSelectItems(ui) {

	if($('ul.filter-nav li.active').length > 0)
	{
		ui.off('click').on('click', function() {
			var oThis = $(this);
			////console.log(oThis);
			if(typeof(oThis.attr('data-item-selected')) != 'undefined')
			{
				oThis.removeAttr('data-item-selected');
			}
			else
			{
				if($.trim($('ul.filter-nav li.active').attr('class').replace('active', '')) == 'product_data_row')
				{
					// alert('product_data_row')
					oThis.attr('data-item-selected', 1);
				}
				else if($.trim($('ul.filter-nav li.active').attr('class').replace('active', '')) == 'store_data_row')
				{
					ui.removeAttr('data-item-selected');
					// alert('store_data_row')
					oThis.attr('data-item-selected', 1);
				}
			}

		});
	}

}

function fnCallNotificationBox(sType, sMessege, fnCallBack, fnFalseCallback) {
	$('div.message-modal-box').removeClass('success failed');
	$('#message-modal').find('div.notif-btns').closest('div.modal-footer').hide();

	if(sType == 'success' || sType == 'failed' || sType == 'fail' || sType == 'enabled')
	{
		if(typeof(sMessege)=='object')
		{
			$('#message-modal').find('div.message-modal-box').html(sMessege).addClass(sType);
			$('#message-modal-triggerer').click();
		}
		else
		{
			$('#message-modal').find('div.message-modal-box').text(sMessege).addClass(sType);
			$('#message-modal-triggerer').click();
		}
	}

	$('#message-modal').find('div.notif-btns').parent('div').hide();

	switch(sType)
	{
		case 'enabled':
			$('#message-modal').find('div.notif-btns').parent('div').show();
			if(typeof(fnCallBack) == 'function')
			{
				$('#message-modal').find('div.notif-btns button.una').off('click').on('click', function() {
					fnCallBack();
				});

			}

            if(typeof(fnFalseCallback) == 'function')
            {
                $('#message-modal').find('div.notif-btns button.duha').off('click').on('click', function() {
                    fnFalseCallback();
                });
            }
		break;
		case 'success_alert': case 'failed_alert':
			if(typeof(sMessege)=='object')
			{
				var uiMessege = $('<div class="ajax-loader" style="margin: 0px auto; height: inherit; cursor: pointer;"><div style="width: 100%; line-height: 6em;"><div class="'+sType+'" style="color: white; display: block;">'+(sMessege.toString())+'</div></div></div>');
			}
			else
			{
				var uiMessege = $('<div class="ajax-loader" style="margin: 0px auto; height: inherit; cursor: pointer;"><div style="width: 100%; line-height: 6em;"><div class="'+sType+'" style="color: white; display: block;">'+sMessege+'</div></div></div>');
			}

			var uiHeader = $('.modal-header:visible');
			uiMessege.insertAfter(uiHeader);

			if(typeof(fnCallBack) == 'function')
			{
				fnCallBack();
			}
			
			uiMessege.off('mouseenter').on('mouseenter', function() {
				uiMessege.stop(true, true).off('click').on('click', function() {
					$(this).remove();
				});
			}).off('mouseleave').on('mouseleave', function() {
				uiMessege.delay(1000).fadeOut(1000, function() {
					$(this).remove();
				});
			});

		break;

		default:
			if(typeof(fnCallBack) == 'function')
			{
				fnCallBack();
			}
		break;
	}

}

$.fn.extend({
    toggleAttr: function (attr, turnOn) {
        var justToggle = (turnOn === undefined);
        return this.each(function () {
            if ((justToggle && !$(this).is("[" + attr + "]")) ||
                (!justToggle && turnOn)) {
                $(this).attr(attr, attr);
            } else {
                $(this).removeAttr(attr);
            }
        });
    }
});
/**
 * Sets the value of specific field of a cloned template
 *
 * @param {Object} uiClonedTemplate The Cloned template
 * @param {Object} oInsertData Return data of the ajax
 */
function setValue(uiClonedTemplate, oInsertData){
	for(var key in oInsertData) {
		if(oInsertData.hasOwnProperty(key)) {
			uiClonedTemplate.find('[data-view-field="'+key+'"]').text(oInsertData[key]);
			uiClonedTemplate.find('[data-value-field="'+key+'"]').attr('value', oInsertData[key]);
		}
	}
}

function fnProfileDropdown() {
	var uiLiProfile = $('li.profile');

	var bShowed = false;
	uiLiProfile.find('a.profile_link').on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();

		$('.info-edit').stop().hide();
		$('.prof-pic').removeClass("edit");
		$('.info-container').stop().show();

		$(this).find('i.fa').toggleClass('fa-chevron-down fa-chevron-up');

		var uiEditPopopUser = $('#edit_popop_user');
		if(! bShowed) {
			uiEditPopopUser.removeClass('hide');
			setTimeout(function () {
				uiEditPopopUser.css('opacity', 1);
			}, 100);
			bShowed = true;
		}
		else {
			uiEditPopopUser.css('opacity', 0);
			setTimeout(function () {
				uiEditPopopUser.addClass('hide');
			}, 100);
			bShowed = false;
		}
	});

	uiLiProfile.find('a.edit-profile').off("click").on("click", function (e) {
		e.stopPropagation();
		e.preventDefault();

		$('.info-container').stop().fadeOut(500, function () {
			var uiFname = $('input[name="first_name"]');
			$('.prof-pic').addClass("edit");
			$('.info-edit').stop().fadeIn(500);

			uiFname.focus();
			uiFname.select();
		});
	});

	uiLiProfile.find('button.cancel-edit').off("click").on("click", function (e) {
		if(e.originalEvent === undefined) {
			// triggered
			e.stopPropagation();
			e.preventDefault();
		}
		else {
			// clicked by user
			e.stopPropagation();
			$('#upload_pic_con').attr('src', $('#user_profile_picture').attr('src'));
		}

		$('.info-edit').stop().fadeOut(500, function () {
			$('.prof-pic').removeClass("edit");
			$('.info-container').stop().fadeIn(500);
		});
	});
}

function fnAjaxEditProfile() {
	"use strict";

	$('li.profile').off('submit').on('submit', '.edit_profile_details', function(e) {
		e.preventDefault();

		var uiThis = $(this);

		var oAjaxSettings = {
			url: nkag.config('url.server.base') + 'users/ajax_save',
			data: uiThis.serializeArray(),
			beforeSend: function() {
				// show the saving modal
				fnShowNofication();
			},
			success: function(sRetData) {
				if(sRetData !== undefined || sRetData.length > 0) {
					var oRetData = $.parseJSON(sRetData);

					if(oRetData.status) {
						// change the notification to saved
						fnSetNotificationMsg('Saved.');

						setValue(uiThis, oRetData.data);

						var uiProPic = $('input[name=profile_pic]');

						if(uiProPic.val().length > 0) {
							$('#user_profile_picture, .user_profile_picture').attr('src', nkag.config('url.server.base') + 'assets/images/profile/users/' + uiProPic.val() + '?' + (Math.random()));
						}

						// back to view page
						setTimeout(function() {
							$('button.cancel-edit').trigger('click');
						}, 700);
					}
					else {
						var oErrors = oRetData.error.all;
						for(var key in oErrors) {
							if(oErrors.hasOwnProperty(key)) {
								nkag.errors.create_message(uiThis, 'input[name="'+key+'"]', oErrors[key]);
							}
						}
					}
				}

			},
			complete: function() {
				// hide the saving modal
				fnHideNotification();
			}
		};

		nkag.ajax.run(oAjaxSettings);
	});
}

function fnUploadProfilePic() {
	var uiProfPic = $('div.prof-pic');

	uiProfPic.on('click', '#upload_pic_btn', function (e) {
		e.stopPropagation();

		$('#upload_pic_inpt').trigger('click');
	});

	uiProfPic.on('change', '#upload_pic_inpt', function (e) {
		var formData = new FormData(),
			uiImage = $('#upload_pic_inpt')[0],
			sImagePath = '';

		// if no image is selected
		if(! uiImage.files[0]) {
			return;
		}

		formData.append('user_img', uiImage.files[0]);
		formData.append('csrf_nkag_token', $.cookie('csrf_nkag_cookie'));

		$.ajax(nkag.config('url.server.base') + 'users/ajax_upload_image', {
			type: 'POST',
			data: formData,
			processData: false,
			contentType: false,
			beforeSend: function() {
				fnShowNofication('Uploading...');
			},
			success: function(sRetData) {
				if(sRetData !== undefined || sRetData.length > 0) {
					var oRetData = $.parseJSON(sRetData),
						uiProfilePic = $('input[name=profile_pic]'),
						sCurrentProfilePic = uiProfilePic.val();

					if(oRetData.status === true) {
						uiProfilePic
							.attr('value', oRetData.data.file_name) // for debugging purposes since if set by val() it is only in cache
							.val(oRetData.data.file_name); // if in case the getter is val() not attr

						$('#upload_pic_con').attr('src', nkag.config('url.server.base') + 'assets/images/temp_thumbs/' + oRetData.data.raw_name + '_thumb' + oRetData.data.file_ext + '?' + (Math.random()));

						fnSetNotificationMsg('Uploaded.');
					} else {
						if(sCurrentProfilePic.length === 0) {
							uiProfilePic
								.attr('value', '')
								.val('');
						} else {
							uiProfilePic
								.attr('value', sCurrentProfilePic)
								.val(sCurrentProfilePic);
						}
						fnSetNotificationMsg('Error.', false);
					}
				}
			},
			complete: function() {
				fnHideNotification();
			}
		});
	})
}

function fnShowNofication(sMessage) {
	var uiAjaxLoader = $('#ajax_loader');

	sMessage = (sMessage !== undefined && sMessage.length) ? sMessage : 'Saving...';

	uiAjaxLoader.removeClass('hide').animate({'opacity':1},600);
	uiAjaxLoader.find('span').text(sMessage);
}

function fnSetNotificationMsg(sMessage, bStatus) {
	var uiAjaxLoader = $('#ajax_loader'),
		sStatClass = '';

	sMessage = (sMessage !== undefined && sMessage.length) ? sMessage : 'Saved.';
	bStatus = (bStatus !== undefined) ? bStatus : true;
	sStatClass = (bStatus) ? 'fa-check':'fa-exclamation-circle';

	// change the notification to saved
	uiAjaxLoader.find('i.fa').addClass(sStatClass).removeClass('fa-circle-o-notch fa-spin');
	uiAjaxLoader.find('span').text(sMessage);
}

function fnHideNotification() {
	var uiAjaxLoader = $('#ajax_loader');

	setTimeout(function() {
		uiAjaxLoader.animate({'opacity': 0}, 200, function () {

			uiAjaxLoader.addClass('hide').find('i.fa').addClass('fa-circle-o-notch fa-spin')
				.removeClass('fa-check fa-exclamation-circle');
			uiAjaxLoader.find('span').text('Saving...');
		});
	}, 600);
}

/*
 *
 * fnOnClickViewReport
 *
 * function onclick for href
 * link = string contains the link of the controller for viewing
 * bool = boolean, true->window load, false->do something else
 *
 * return null
 * @author Athan subion
 *
*/
function fnOnClickViewReport(link, bool, fnCallBack)
{
	if(bool==='true' || bool === true)
	{
		window.location = link;
	}
	else
	{
		//do something
		// alert(link);
		var oSettings = {
			url : link + '/0/1',
			data : {'csrf_nkag_token' : $.cookie('csrf_nkag_cookie')},
			beforeSend : function() {},
			error : function() {},
			async: false,
			success : function (sData) {
				if(typeof(sData) == 'string' && sData.length > 0)
				{
					if(typeof(fnCallBack)=='function')
					{
						fnCallBack(sData);
					}
				}
			},
			complete : function() {}
		}

		nkag.ajax.run(oSettings);

	}
}

function fnSendEmail()
{
	$('body').on('click', 'button.email', function (e) {
		e.stopPropagation();
		e.preventDefault();
		
		var uiButton = $(this),
			sId = uiButton.attr('data-order-id'),
			oSettings = {
				url : nkag.config('url.server.base') + $(this).attr('data-function-url'),
				type : 'POST',
				data : { 'order_id' : sId },
				beforeSend: function() {},
				success: function() {
					fnCallNotificationBox('success', 'The e-mail has been sent.');
				},
				complete: function() {},
				error: function() {
					fnCallNotificationBox('failed', 'The e-mail cannot be sent. Please check your internet connection.');
				}
			};

		nkag.ajax.run(oSettings);
	});
}

function printDiv(divName) 
{
// var printContents = document.getElementById(divName).innerHTML;
// var originalContents = document.body.innerHTML;
// document.body.innerHTML = printContents;
// window.print();
// document.body.innerHTML = originalContents;

var openWindow = window.open('', '', 'left=0,top=0,width=1300,height=900,toolbar=0,scrollbars=0,status=0');
openWindow.document.write(
    '<html>' +
        '<head>' +
	        document.getElementsByTagName('head')[0].innerHTML  +
        '</head>' +
        '<body>' +
            document.getElementById(divName).innerHTML +
        '</body>' +
    '</html>'
);
openWindow.document.close();
openWindow.focus();
setTimeout(function(){
	openWindow.print();
	openWindow.close();
}, 100);

// alert(divName);
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = [37, 38, 39, 40];

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
  preventDefault(e);
}

function disable_scroll() {
  if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
}