console.log('Thx for visiting my blog!');

/* init papers.html */
$(document).ready(function(){
    papers.init();
})

/* tooltip init */
$(function() {
	$('[data-toggle="tooltip"]').tooltip();
})

/* time roundabout init */
//TODO

/* after click contact-link,hide modal */
$('a[data-toggle="tooltip"]').bind('click', function() {
	$('#contactModal').modal('hide');
})

/* toggle time roundabout */
//TODO
$('#showTime').on('mouseover', function() {
	console.log('show time!');
})
.on('mouseout', function() {
	console.log('hide time!');
})

$('#blogLink').on('click', function() {
	if (!$('#bodyContainer').hasClass('init')) {
		papers.initCategory(category);
	}
})