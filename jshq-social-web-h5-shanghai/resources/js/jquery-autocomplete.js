/* 基于jQuery的自动完成插件 */
;(function(window, $) {
	"use strict";

	function AutoComplete(options) {
		var _this = this;
		this.options = $.extend(true, {
			input : null, // required 输入框
			items : null, // required 数据源
			showCount : 0, // 显示的数量，大于0才生效
			advanced : { // 高级选项
				appendTo : null, // 列表添加的位置
				positionElement : null, // 定位用的element
			},
			//
			createItem : null, // required 创建单行function(item)
			filter : null, // required 筛选function(item, query) 返回false不显示此项
			//
			beforeOpen : null, // 打开前事件function() 返回false阻止打开
			open : null, // 打开事件function()
			beforeClose : null, // 关闭前事件function() 返回false阻止关闭
			close : null, // 关闭事件function()
			select : null // required 选中事件function(item) 返回false阻止选中
		}, options);

		function _init() {
			_this.input = $(_this.options.input).attr("autocomplete", "off");

			var ui = $(_this.options.advanced.positionElement);
			if (ui.length == 0) {
				ui = $("<div>").addClass("autocomplete-box-default");
				ui.appendTo(window.document.body);
			}
			ui.addClass("autocomplete-box").hide();
			_this.ui = ui;

			var appendTo = $(_this.options.advanced.appendTo);
			if (appendTo.length == 0) {
				appendTo = ui;
			}
			_this.appendTo = appendTo;

			_this.ui.width(_this.input.innerWidth());
		}

		function _createList(ul, items) {
            ul.append("<li class='empty-li' style='display: none'>暂不支持该城市</li>");
			$.each(items, function(index, item) {
				//ul.append("<li class='empty-li'>暂不支持该城市</li>");
			    ul.append(_createItemData(item));
			});
		}

		function _createItemData(item) {
			return $("<li>").append(_this.options.createItem.call(_this, item))
				.addClass("autocomplete-item").data("autocomplete-item", item);
		}

		function _move(step) {
			var li = _this.ul.find(".autocomplete-item:visible");
			var oldLi = li.filter(".autocomplete-item-active");
			var oldIndex = li.index(oldLi);
			var newIndex = 0;
			if (oldIndex < 0) {
				if (step < 0) {
					newIndex = li.length - 1;
				} else {
					newIndex = 0;
				}
			} else {
				newIndex = oldIndex + step;
				newIndex %= li.length;
				if (newIndex < 0) {
					newIndex += li.length;
				}
			}
			var newLi = li.removeClass("autocomplete-item-active").eq(newIndex).addClass("autocomplete-item-active");
			var oldLiTop = 0;
			if (oldIndex >= 0) {
				oldLiTop = oldLi.offsetParent().is(_this.ul) ? oldLi.offset().top : Math.abs(_this.ul.offset().top - oldLi.offset().top);
			}
			var newLiTop = newLi.offsetParent().is(_this.ul) ? newLi.offset().top : Math.abs(_this.ul.offset().top - newLi.offset().top);
			_this.ul.parent().scrollTop(_this.ul.parent().scrollTop() + (newLiTop - oldLiTop));
		}

		function _bindEvent() {
			var blur = false;
			_this.input.on("keydown", function(event) {
				if (this.readOnly || this.disabled) {
					return;
				}
				event = event || window.event;
				var keyCode = event.which ? event.which : event.keyCode;
				if (keyCode == 37) { // "←"
					return;
				} else if (keyCode == 38) { // "↑"
					_move(-1);
					return false;
				} else if (keyCode == 39) { // "→"
					return;
				} else if (keyCode == 40) { // "↓"
					_move(1);
					return false;
				} else if (keyCode == 13) { // "回车"
					// _select(_this.ul.find(".autocomplete-item-active"));
					return false;
				}
			}).on("keyup", function(event) {
				if (this.readOnly || this.disabled) {
					return;
				}
				event = event || window.event;
				var keyCode = event.which ? event.which : event.keyCode;
				if (keyCode == 37) { // "←"
					return;
				} else if (keyCode == 38) { // "↑"
					return false;
				} else if (keyCode == 39) { // "→"
					return;
				} else if (keyCode == 40) { // "↓"
					return false;
				} else if (keyCode == 13) { // "回车"
					return false;
				}
				_search();
				_show();
			}).on("focus", function() {
				if (blur) {
					blur = false;
					return;
				}
				_search();
				_show();
			}).on("blur", function() {
				if (_this.ui.is(":hover")) {
					if (!_this.ui.is(":hover")) {
						blur = true;
						$(this).focus();
					}
				} else {
					// _close();
				}
			});
		}

		function _select(li) {
			if (_this.options.select.call(_this, $(li).data("autocomplete-item")) === false) {
				return false;
			}
			// _close();
		}

		function _search() {
			var query = _this.input.val();
			var items = [];
			var showCount = 0;
			$.each(_this.options.items, function(index, item) {
				if (_this.options.filter.call(_this, item, query) === true) {
					items.push(item)
					showCount++;
				}
				if (_this.options.showCount > 0 && showCount == _this.options.showCount) {
					return false;
				}
			});
			var ul = $("<ul>").addClass("autocomplete");
			//console.log(items);
            _createList(ul, items, query);
            //console.log(items.length);
			if(items.length==0){
				$(".empty-li").show();
				//console.log("111")
			}else {
                $(".empty-li").hide();
			}
			ul.appendTo(_this.appendTo.empty());
			ul.find(".autocomplete-item").on("click", function() {
				return _select(this);
			});
			_this.ul = ul;
		}

		function _show() {
			var inputOffset = _this.input.offset();
			var position = {
				top : inputOffset.top + _this.input.outerHeight()+20,
				left : inputOffset.left
			};
			_this.ui.css(position).show();
			_this.ul.parent().scrollTop(0);
		}

		function _hide() {
			_this.ui.hide();
		}

		function _open() {
			var open = true;
			if (typeof _this.options.beforeOpen === "function") {
				open = _this.options.beforeOpen.call(_this);
			}
			if (open !== false) {
				_search();
				_show();
				if (typeof _this.options.open === "function") {
					_this.options.open.call(_this);
				}
			} else {
				return false;
			}
		}

		function _close() {
			var close = true;
			// if (typeof _this.options.beforeClose === "function") {
			// 	close = _this.options.beforeClose.call(_this);
			// }
			if (close !== false) {
				_hide();
				if (typeof _this.options.close === "function") {
					_this.options.close.call(_this);
				}
			} else {
				return false;
			}
		}

		_init();
		_bindEvent();

		this.open = function() {
			_open();
		};

		this.close = function() {
			_close();
		}
	}

	window.AutoComplete = AutoComplete;
})(window, window.jQuery);