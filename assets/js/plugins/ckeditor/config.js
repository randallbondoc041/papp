/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

// CKEDITOR.editorConfig = function( config ) {
// 	// Define changes to default configuration here. For example:
// 	// config.language = 'fr';
// 	// config.uiColor = '#4a719e';

// };



CKEDITOR.editorConfig = function( config )
{

	config.toolbar = 'Full';
	config.toolbar_Full =
	[
		// { name: 'document', items : [ 'Source','-','Save','NewPage','DocProps','Preview','Print','-','Templates' ] },
		// { name: 'clipboard', items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
		// { name: 'editing', items : [ 'Find','Replace','-','SelectAll','-','SpellChecker', 'Scayt' ] },
		// { name: 'forms', items : [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 
	 //        'HiddenField' ] },
		// '/',
		{ name: 'styles', items : [ 'Font','FontSize' ] },
		{ name: 'basicstyles', items : [ 'Bold','Italic','Underline' ] },
		{ name: 'colors', items : [ 'TextColor', '-', 'BGColor' ] },
		{ name: 'insert', items : [ 'Table'] },
		{ name: 'paragraph', items : [ '-', 'JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock' ] }
		// { name: 'links', items : [ 'Link','Unlink','Anchor' ] },
		
		// { name: 'tools', items : [ 'Maximize', 'ShowBlocks','-','About' ] }
	];

	// config.toolbar = 'MyToolbar';
 
	// config.toolbar_MyToolbar =
	// [
	// 	// { name: 'document', items : [ 'NewPage','Preview' ] },
	// 	// { name: 'clipboard', items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
	// 	// { name: 'editing', items : [ 'Find','Replace','-','SelectAll','-','Scayt' ] },
		
                
	// 	{ name: 'styles', items : [ 'Styles','Format' ] },
	// 	{ name: 'basicstyles', items : [ 'Bold','Italic','Strike','-','RemoveFormat' ] },
	// 	{ name: 'paragraph', items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote' ] },
	// 	{ name: 'links', items : [ 'Link','Unlink','Anchor' ] },
	// 	{ name: 'insert', items : [ 'Table' ] },
	// 	{ name: 'colors', groups : [ 'colors' ] }
	// 	// { name: 'tools', items : [ 'Maximize' ] }
	// ];
};
