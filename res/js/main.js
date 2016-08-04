console.log('Thx for visiting my blog!');

/* tooltip init */
$(function() {
	$('[data-toggle="tooltip"]').tooltip();
})

/* after click contact-link,hide modal */
$('a[data-toggle="tooltip"]').bind('click', function() {
	$('#contactModal').modal('hide');
})

