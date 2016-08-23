
var svgdoc,x = 0;
// var colorArry = ['#b3504b'/*'#98b1d0'*/,'#4f7daf'/*'#5e88b7'*/,'#4d6ba3','#5f7398','#374e7a','#31456b'];
var colorArry = ['#4f7daf','#b3504b','#4d6ba3','#5f7398','#374e7a','#31456b'];
var dataChart = new Array();


function initialize_pie_chart(uiPieChart){
    if(typeof(uiPieChart) != 'undefined' && uiPieChart != null && uiPieChart.length > 0)
    {
        var dataPieArr = new Array();
            $(uiPieChart).find(".data-container span").each(function(i){
                dataPieArr.push(parseInt($(this).attr('data-value')));

                $(this).on('mouseover',function(){
                    $('.pie-data-'+i).css({'opacity':.8});
                }).on('mouseleave',function(){
                    $('.pie-data-'+i).css({'opacity':1});
                }).addClass('pie-base-'+i);
            });
            svgdoc = $(uiPieChart).find("svg");
            drawArcs(svgdoc,dataPieArr);
    }
    else
    {
    	if($('.chart-container').length > 0){
            $('.chart-container').each(function() {
                var dataPieArr = new Array();
                    $(this).find(".data-container span").each(function(i){
                        dataPieArr.push(parseInt($(this).attr('data-value')));

                        $(this).on('mouseover',function(){
                            $('.pie-data-'+i).css({'opacity':.8});
                        }).on('mouseleave',function(){
                            $('.pie-data-'+i).css({'opacity':1});
                        }).addClass('pie-base-'+i);
                    });
                    svgdoc = $(this).find("svg");
                    drawArcs(svgdoc,dataPieArr);
            });
            
    	}
    }
}   
// initialize_pie_chart();

function makeSVG(tag, attrs) {
    var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
        if (attrs.hasOwnProperty(k)) el.setAttribute(k, attrs[k]);
    return el;
}

function drawArcs(paper, pieData){
    var total = pieData.reduce(function (accu, that) { return that + accu; }, 0);
    var sectorAngleArr = pieData.map(function (v) { return 360 * v / total; });

    var startAngle = 0;
    var endAngle = 0;

    if(sectorAngleArr.length === 2){
        if(sectorAngleArr[0] === 0 || sectorAngleArr[1] === 0){
            var i = sectorAngleArr[0] === 0 ? 0 : 1;
            var circle = makeSVG("circle", {cx: 200, cy: 200, r:200, stroke:'#fff', 'stroke-width':'2px', fill: colorArry[i]});
             paper.append(circle);
            return;
        }
    }

    for (var i=0; i<sectorAngleArr.length; i++){
        startAngle = endAngle;
        endAngle = startAngle + sectorAngleArr[i];

        var x1,x2,x3,x4;

        x1 = parseInt(Math.round(200 + 195*Math.cos(Math.PI*startAngle/180)));
        y1 = parseInt(Math.round(200 + 195*Math.sin(Math.PI*startAngle/180)));

        x2 = parseInt(Math.round(200 + 195*Math.cos(Math.PI*endAngle/180)));
        y2 = parseInt(Math.round(200 + 195*Math.sin(Math.PI*endAngle/180)));

        var d = "M200,200  L" + x1 + "," + y1 + "  A195,195 0 " + ((endAngle-startAngle > 180) ? 1 : 0) + ",1 " + x2 + "," + y2 + " z";
        x = x < 5 ? x + 1 : x = 0;

        paper.find('.pie-date-'+i).remove();

        var c = colorArry[x];
        var arc = makeSVG("path", {class: 'pie-date-'+i, d: d, fill: c, stroke: '#fff', 'stroke-width' : '2px'}); 

        paper.append(arc);  

        $('.pie-date-'+i).on('mouseover',function(){
            $('.pie-data-'+i).css({'background-color':'#eee'});
        }).on('mouseleave',function(){
            $('.pie-data-'+i).css({'background-color':'#fff'});
        });
    }
}

// You can attach additional content (from e.g. AJAX) like this:
var parser = new DOMParser();
var docToEmbed = parser.parseFromString("<svg xmlns='http://www.w3.org/2000/svg'></svg>","image/svg+xml");
Array.prototype.slice.call(docToEmbed.documentElement.childNodes).forEach(function(elem) {
	svgdoc.append(document.importNode(elem, true));
});