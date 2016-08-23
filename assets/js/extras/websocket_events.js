/**
 *	The JS file that will handle the events for the stores websocket integration.
 *
 */
(function(){
//	var
		//sPresenceChannel = 'presence-2',
		//sPrivateChannel = 'private-2';
        //sPresenceChannel = 'presence-' + sStoreCode,
		//sPrivateChannel = 'private-' + sStoreCode;



	/* event for success subscription */
	//oSock.bind({
	//	'event'    : 'pusher:member_added',
	//	'channel'  : sPrivateChannel,
	//	'callback' : function(oData)
	//	{
	//		console.log("member added");
	//	}
	//});
	//
	///* for offline of store */
	//oSock.bind({
	//	'event'    : 'pusher:member_removed',
	//	'channel'  : sPresenceChannel,
	//	'callback' : function(oData)
	//	{
	//		console.log("member removed");
	//	}
	//});
	
	/* will receive the callcenter order */
// 	oSock.bind({
// 		'event'    : 'receive_order',
// 		'channel'  : sPrivateChannel,
// 		'callback' : function(oOrderData)
// 		{
// 			alert('here');
// 			var uiContainer = $('section#search_order_list_container').find('div.search_result_container');
//             var uiTemplate = $('div.order_search_result_block.template').clone().removeClass('template');
//             //console.log(JSON.stringify(order));
//             var oDisplayData = $.parseJSON(oOrderData);
//            //console.log(oDisplayData)
//             callcenter.coordinator_management.manipulate_template(uiTemplate, oDisplayData);
//             uiContainer.append(uiTemplate);
            
// 		}				
// 	});

	///* will receive the callcenter order */
	//oSock.bind({
	//	'event'    : 'update_order',
	//	'channel'  : sPrivateChannel,
	//	'callback' : function(oData)
	//	{
	//		console.log(oData);
	//	}
	//});
})()