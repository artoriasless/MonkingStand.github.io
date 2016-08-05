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

		    $('#bodyContainer').addClass('init');
		    showContent('#bodyContainer');
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
        	var indexStr = timeline[key].length ? timeline[key].join() : '-1';
        	timelineStr +=	'<dd>' +
        						'<a onclick="papers.renderCategory(\'' + indexStr + '\')">' +
        							'<span class="time-val">' + key + '</span>(<span class="count">' + timeline[key].length + '</span>)' +
        						'</a>' +
        					'</dd>';
        }

        $('#timeList').append(timelineStr);
	},

	initCategory: function(category) {
		/* 初始化目录，显示全部的文章标题 */
		var indexStr  = '',
			descIndex = category.length - 1;

		for (; descIndex >= 1; descIndex --) {
			indexStr += category[descIndex].index + ',';
		}
		indexStr += '0';

		papers.renderCategory(indexStr);
	},

	renderCategory: function(indexStr) {
		/* 根据标签、时间轴，渲染显示对应类别下的文章目录 */
		/*
		<div class="category-item">
            <div class="item-title">
                <h2><a>标题</a></h2>
            </div>
            <div class="item-subtitle">
                <h3>
                    <span class="subtitle-date">
                        <i class="fa fa-calendar"></i>
                        <span class="date-val">2016-01-01</span>
                    </span>
                    <span class="subtitle-tags">
                        <i class="fa fa-tag"></i>
                        <span class="tags-val">jquery</span>
                    </span>
                </h3>
            </div>
            <div class="item-abstract">
                <p>简介</p>
            </div>
        </div>
		*/
		hideContent('#paperContent')

		if (indexStr == '-1') {
			$('#paperContent .paper-title h1').empty().text('Directory');
			$('#paperContent .paper-content').empty().addClass('no-item');
			showContent('#paperContent');
			return ;
		}

		var indexArr   = indexStr.split(','),
			descIndex  = indexArr.length - 1,
			categoryStr = '';

		if (category.length == (descIndex + 1)) {
			$('#bodyContainer').addClass('init');
		}
		else {
			$('#bodyContainer').removeClass('init');
		}

		for (; descIndex >= 0; descIndex --) {
			var tempObj = category[indexArr[descIndex]],
				tags    = tempObj.tag + (tempObj.others ? ('，' + tempObj.others) : '');

			categoryStr +=	'<div class="category-item">' +
							'<div class="item-title">' +
								'<h2><a onclick="papers.renderPaper(\'' + tempObj.index + '\')" title="' + tempObj.title + '" data-hover="' + tempObj.title + '">' + tempObj.title + '</a></h2>' +
							'</div>' +
							'<div class="item-subtitle">' +
								'<h3>' +
									'<span class="subtitle-date">' + 
										'<i class="fa fa-calendar"></i>&nbsp;<span class="date-val">' + tempObj.date + '</span>' + 
									'</span>' +
									'<span class="subtitle-tags">' + 
										'<i class="fa fa-tag"></i>&nbsp;<span class="tags-val">' + tags + '</span>' + 
									'</span>' +
								'</h3>' +
							'</div>' +
							'<div class="item-abstract"><p>' + tempObj.abstract +'</p></div>' +
						'</div>';
		}

		$('#paperContent .paper-title h1').empty().text('Directory');
		$('#paperContent .paper-content').removeClass('no-item').empty().append(categoryStr);
		showContent('#paperContent');
	},

	renderPaper: function(index) {
		/* 根据指定的文章索引，渲染对应的文章内容 */
		/*
		<strong>小标题</strong>
        <p>文本内容</p>
        <div class="img-container size-lg">
            <img src="图片">
        </div>
		*/
		hideContent('#paperContent');

		var tempObj = category[index],
			tags    = tempObj.tag + (tempObj.others ? ('，' + tempObj.others) : '');
		$('#bodyContainer').removeClass('init');
		$('#paperContent .paper-title h1').empty().text(tempObj.title);
		$('#paperContent .paper-subtitle .date-val').text(tempObj.date);
		$('#paperContent .paper-subtitle .tags-val').text(tags);
		$('#paperContent .paper-content').empty().append('<p>正文内容！</p>');

		showContent('#paperContent');
		//TODO
		console.info('采用分页！')
	}
}

function hideContent(selector) {
	$(selector).addClass('hidden');
	$('#loading').removeClass('hidden');
}

function showContent(selector) {
	setTimeout(function(){
    	$('#loading').addClass('hidden');
    	$(selector).removeClass('hidden').addClass('fade-in-animate');
    }, 1000)
}

/* export */
window.papers = papers;