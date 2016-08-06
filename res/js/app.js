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

		    $('#bodyContainer').addClass('category');
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
		/* 初始化“最近文章”，显示最近的5篇文章标题 */
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
		/* 传过来的indexStr已经按照时间远近，从最近到最早进行了排序 */
		$('#bodyContainer').addClass('category');
		if (indexStr == '-1') {

			$('#paperContent .paper-title h1').empty().text('Directory');
			$('#paperContent .paper-content').empty().addClass('no-item');
			showContent('#paperContent');
			return ;
		}
		var indexArr   = indexStr.split(','),
			indexCount  = indexArr.length,
			categoryStr = '';

		for (var i = 0; i < indexCount; i ++) {
			var tempObj = category[indexArr[i]],
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
		
		hideContent('#paperContent')
		$('#paperContent .paper-title h1').empty().text('Directory');
		$('#paperContent .paper-content').removeClass('no-item').empty().append(categoryStr);
		showContent('#paperContent');
		//TODO
		console.info('目录显示采用分页！TODO')
	},
	renderPaper: function(index) {
		/* 根据指定的文章索引，渲染对应的文章内容 */
		hideContent('#paperContent');

		$.getJSON(category[index].path, function(data) {
			var title   = data.title,
				date    = data.date,
				tag     = data.tag,
				content = data.content.join('');

			$('#bodyContainer').removeClass('category');
			$('#paperContent .paper-title h1').empty().text(title);
			$('#paperContent .paper-subtitle .date-val').text(date);
			$('#paperContent .paper-subtitle .tags-val').text(tag);
			$('#paperContent .paper-content').empty().append(content);
			$('.code-container').each(function() {
				var count = 1;
				$(this).find('xmp').each(function() {
					if ($(this).hasClass('indent-4') && count > 100) { $(this).addClass('indent-lg'); }

					if ($(this).hasClass('indent-5') && count > 9 && count < 100) { $(this).addClass('indent-sm'); }
					if ($(this).hasClass('indent-5') && count < 9) { $(this).addClass('indent-xs'); }

					if ($(this).hasClass('indent-6') && count > 9 && count < 100) { $(this).addClass('indent-sm'); }
					if ($(this).hasClass('indent-6') && count < 9) { $(this).addClass('indent-xs'); }

					$(this).attr('data-line', count++);

				})
			})

			/* 设置滚动条滚到顶部，即复位 */
			$('body').scrollTop = 0;
			showContent('#paperContent');
	    })
		/*
		var test =	'<div class="code-container">' +
						'<code>' + 
							'<xmp data-line="9"><strong class="test"></strong><strong class="test"></strong><strong class="test"></strong><strong class="test"></strong></xmp>' + 
							'<xmp data-line="10" class="indent-1"><div><span>asdasd</span></div></xmp>' +
							'<xmp data-line="19" class="indent-2"><div><span>asdasd</span></div></xmp>' +
							'<xmp data-line="20" class="indent-3"><div><span>asdasd</span></div></xmp>' +
							'<xmp data-line="99" class="indent-4"><div><span>asdasd</span></div></xmp>' + 
							'<xmp data-line="100" class="indent-5"><div><span>asdasd</span></div></xmp>' + 
							'<xmp data-line="101" class="indent-6"><div><span>asdasd</span></div></xmp>' + 
						'</code>' +
					'</div>';
		*/
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