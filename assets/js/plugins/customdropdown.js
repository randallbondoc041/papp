/* 
	The Class that will transform normal select box into custom (stylable) drop down.
	
	@author: D. Canillo
			 dominic@cr8vwebsolutions.com
			 
	
	@dependecy: jQuery 1.7 + 
 */
 
(function($){
	

	
	var 
		el, // the element
		oDefaults = {}, // default options
		sDDValue = '', // value of the dropdown.
		oMethods = {};  // method list
	
	
	/* class definition */
	function transformDD (uiElement, oOptions)
	{
		this.el = uiElement;
		oOptions = $.extend(oDefaults, oOptions);
		
		this.initialize(uiElement, oOptions);
		
	}
	
	
	/* function that will assemble the Dropdown markup. */
	function assembleMarkup (oOptions)
	{
		// assembly of the main dropdown markup
		var sMarkup = "<div class = 'frm-custom-dropdown font-0'>";
				sMarkup	+= "<div class = 'frm-custom-dropdown-txt'>";
					sMarkup	+= "<input type = 'text' class = 'dd-txt' name='"+ oOptions.name +"' value='"+oOptions.selected+"'  autocomplete='off'/>"; // custom text input //added name to transform select to input with corresponding name and value
				sMarkup += "</div>";
				sMarkup += "<div class = 'frm-custom-icon'></div>";
		
				/* assembly of the dropdown options. */
				sMarkup += "<div class = 'frm-custom-dropdown-option' style='max-height: 350px;overflow: auto;'>" ;
				if ( typeof (oOptions) != 'undefined' && typeof (oOptions.children) != 'undefined')
				{
					for (var x in oOptions.children)
					{
						sMarkup += "<div class = 'option ellipsis-dropdown ' data-value = '" + x + "'>" + oOptions.children[x] + "</div>";
					}
				}
				sMarkup += "</div>";
			sMarkup += "</div>";

		var uiDropdown = $(sMarkup);
		// setting the selected value
		if (typeof (oOptions.default_value) != 'undefined' && typeof (oOptions.children[oOptions.default_value]) != 'undefined')
		{
			uiDropdown.find("input:text.dd-txt").val(oOptions.children[oOptions.default_value]);
			sDDValue = oOptions.default_value;
		}
		
		return uiDropdown;
	}
	
	
	function bindEvents ()
	{
		/* blur */
		$("body").off("click.dismiss-custom-dd").on("click.dismiss-custom-dd", function(e){
			$(".frm-custom-dropdown-option").hide().removeClass("option-visible");
		});
	
		$("body").off("click.custom-dd").on("click.custom-dd", ".frm-custom-dropdown", function(e){
			var uiTarget = $(e.target);
			// 
			e.preventDefault();
			var uiDDinstance = $(this).closest(".frm-custom-dropdown");
			
			/* click event for dropdown icon */
			if ( uiTarget.closest(".frm-custom-icon").length == 1 )
			{
				
				e.stopPropagation();
				// reveal options:
				setTimeout(function(){
				
					if ( ! uiDDinstance.find(".frm-custom-dropdown-option").hasClass("option-visible"))
					{
						$(".frm-custom-dropdown-option").removeClass("option-visible").hide();
						uiDDinstance.find(".frm-custom-dropdown-option .option").show();
						uiDDinstance.find(".frm-custom-dropdown-option")
							   .addClass("option-visible")
							   .show()
							   
					} else {
						
						$(".frm-custom-dropdown-option").removeClass("option-visible").hide();
					}
				},10);
			}
			/* for option */
			else if ( uiTarget.closest(".option").length == 1)
			{
				sDDValue = uiTarget.closest(".option").attr("data-value");
				$(this).find("input:text.dd-txt").val(uiTarget.closest(".option").text());
				$(this).next(".frm-custom-dropdown-origin").val(sDDValue);
				$(this).find(".frm-custom-dropdown-option").removeClass("option-visible").hide();
			}
		});
		
		/* bind on keypress of textbox */
		$("body").off("keyup.custom-dd").on("keyup.custom-dd", ".frm-custom-dropdown input:text.dd-txt", function(e){
			var sTextVal = $(this).val();
			var uiOptions = $(this).closest(".frm-custom-dropdown").find(".frm-custom-dropdown-option .option");
			if (sTextVal.length > 0)
			{
				var oRegExp = new RegExp(sTextVal.toLowerCase());
				uiOptions.each(function(){
					if($(this).text().length > 0)
					{					
						if (oRegExp.test( $(this).text().toLowerCase()))
						{
							$(this).show();
						} else {
							$(this).hide();
						}
					}
				});
				uiOptions.parent().show();
			} else {
				uiOptions.parent().hide();
			}
		});
	}
	
	
	/* 
		Extends the main class to have initialize function, this will be the centralized method that will call all required method to transform the dropdown.
	*/
	transformDD.prototype.initialize = function(uiElement)
	{
		uiElement.addClass("frm-custom-dropdown-origin").hide();
		var oOptions = {"children" : {}, "selected" : ""};
		uiElement.children("option").each(function(){
			oOptions.children[ $(this).attr("value") ] = $(this).html();
		});
		oOptions.selected = uiElement.val();
        oOptions.name = uiElement.attr('name');
		var uiDD = assembleMarkup(oOptions);
		uiDD.insertBefore(uiElement);
		bindEvents();
	}
	
	
	$.fn.transformDD = function(param)
	{
		if (typeof (param) == 'string' && typeof (oMethods[param]) == 'function')
		{
			return oMethods[param]( this );
		}
		else
		{
			return this.each(function(){
			
				if ( ! $(this).hasClass("frm-custom-dropdown-origin"))
				{
					new transformDD($(this), param);
				}
			});
		}
	}	
	
 })(jQuery);