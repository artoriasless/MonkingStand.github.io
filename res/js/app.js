$(document).ready(function(){
    $.getJSON('res/papers/category.json', function(data) {
    	console.info(data.tags);
        console.info(data.category);
    })
})