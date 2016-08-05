var papers = {
	init: function(){
		$.getJSON('res/papers/category.json', function(data) {
			var tags     = data.tags,
				timeline = data.timeline,
				category = data.category;

			window.category = category;
			papers.initTags(tags);
		    papers.initLatest(category);
		    papers.initTimeline(timeline);
		    papers.initCategory(category);

		    setTimeout(function(){
		    	$('#loading').addClass('hidden');
		    	$('#bodyContainer').removeClass('hidden').addClass('init fade-in-animate');
		    }, 1000)
	    })
	},

	initTags: function(tags) {
		/* 初始化“我的标签”，统计对应标签的的篇数 */
		var i = 0,
			tagCount = [tags.htmlcss.length, tags.javascript.length, tags.jquery.length, tags.bootstrap.length],
			indexArr = [tags.htmlcss.join(), tags.javascript.join(), tags.jquery.join(), tags.bootstrap.join()];

		$('#tagList .tag-count').each(function() {
			$(this).text(tagCount[i]);
			$(this).closest('a').attr('onclick', 'papers.renderCategory(\'' + (indexArr[i] ? indexArr[i] : '-1') + '\')');
			i ++;
		})
	},

	initLatest: function(category) {
		/* 初始化“最近文章”，显示最近的5片文章标题 */
		//	<dd>
	    //      <a data-no="1." title="【jQuery】中，animate、slide、fade等动画的连续触发及滞后反复执行的bug">
	    //         【jQuery】中，animate、slide、fade等动画的连续触发及滞后反复执行的bug"
	    //      </a>
	    //  </dd>
		var descIndex = category.length - 1,
			latestStr = '',
			count     = 0;

		for (; descIndex >= 0; descIndex --) {
			count ++;
			latestStr +=	'<dd>' +
								'<a data-no="' + count + '." title="【' + category[descIndex].date + '】' + category[descIndex].title + '" onclick="papers.renderPaper(\'' + category[descIndex].index + '\')">' +
									category[descIndex].title +
								'</a>' +
							'</dd>';
			if (count == 5) break;
		}

		$('#latestList').append(latestStr);
	},

	initTimeline: function(timeline) {
		/* 初始化时间线，按时间先后显示有发布文章的年月 */
		//	<dd>
	    //      <a><span class="time-val">2016-11</span>(<span class="count">--</span>)</a>
	    //  </dd>
        var timelineStr = '';

        for (key in timeline) {
        	var indexArr = timeline[key].length ? timeline[key].join() : '-1';
        	timelineStr +=	'<dd>' +
        						'<a onclick="papers.renderCategory(\'' + indexArr + '\')">' +
        							'<span class="time-val">' + key + '</span>(<span class="count">' + timeline[key].length + '</span>)' +
        						'</a>' +
        					'</dd>';
        }

        $('#timeList').append(timelineStr);
	},

	initCategory: function(category) {
		/* 初始化目录，显示全部的文章标题 */
		//TODO
		console.info('TODO，初始状态显示全部的文章title');
		console.info('采用分页！')
	},

	renderCategory: function(indexStr) {
		/* 根据标签、时间轴，渲染显示对应类别下的文章目录 */
		//TODO
		console.info('renderCategory' + indexStr);
	},

	renderPaper: function(index) {
		/* 根据指定的文章索引，渲染对应的文章内容 */
		//TODO
		console.info('renderPaper' + index);
	}
}

/* export */
window.papers = papers;