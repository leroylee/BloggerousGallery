var postBodyClass = '.post-body.entry-content';
var thumbHLtColor = '#669977';
var limitPull = false; //will only gallery the images in a post where 3 images are directly next to each other.
$(document).ready(function() {
    var strQu = postBodyClass + ':has(a > img)';
	if(limitPull){strQu = postBodyClass + ':has(a:has(img) + a:has(img) + a:has(img))';}
	$(strQu).each(function(i, val) {
		var bnum = i;
		var item = $(this);
		var varimg = item.find('a > img');
		if (varimg.size() > 2) {
			item.append('<div id="pgal' + bnum + '" style="clear:both;padding:10px 3px 0;"><div id="pgalbank' + bnum + '" style="margin-left:-2px;overflow:hidden;"></div><a id="pgala'+bnum+'" href="blank.png" title="click for fullsize"><img id="pgalimg' + bnum + '" alt="" style="max-width:396px;border:0;padding:0;" src="blank.png"/></a></div>');
			item.find('a:has(img) + br').remove();
			var varimg = varimg.removeAttr('width').removeAttr('height').css({'height':'auto','width':'56px','margin-left':'-10px','float':'none','border':'0','padding':'0'});
			var vara = varimg.parent().css({'overflow':'hidden','display':'block','float':'left','width':'36px','height':'36px','margin':'0 0 3px','border':'2px solid transparent','outline':'none'}).remove().removeAttr('onblur').removeAttr('onclick');
			vara = vara.each(function(i, val) {
				$(this).click(function() { putImage(this, bnum); return false; });
			});
			$('#pgalbank' + i).append(vara);
			putImage(vara.eq(0), bnum);
		}
	});
});
function putImage(obj, id) {
	jobj = $(obj);
	var varhref = jobj.attr('href');
	$('#pgalbank' + id + ' .pgalselected').removeClass('pgalselected').css('border','2px solid transparent')
	jobj.css('border','2px solid ' + thumbHLtColor).addClass('pgalselected');
	$('#pgalimg' + id).attr('src', varhref.replace('s1600-h/', '')); //s-s200,m-s320,l-s400,xl-640,o-s1600
	$('#pgala' + id).attr('href', varhref);
	return false;
}
