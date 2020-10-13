/* 基于jQuery的城市选择插件 */
;(function(window, $) {
	"use strict";

	function CitySelector(options) {
		var _this = this;

		this.options = $.extend(true, {
			citys : null, // required 城市列表
			hotCitys : null, // required 热门城市
			callback : null // required 选中事件回调function(city)
		}, options);

		function _init() {
			var ui = $("<div class=\"search-bar-box\" style=\"display: none;\">");
			ui.append(_createToolsBar());
			$("<div class=\"search-bar\">").append(_createSearchBar()).append(_createHotCityBox()).append(_createCityListBox()).appendTo(ui);
			ui.appendTo(window.document.body);
			_this.ui = ui.get(0);

			_this.ui.$searchBar = ui.find("[data-search-bar='search_bar']");
			_this.ui.$searchCancel = ui.find("[data-search-bar='search_cancel']");
			_this.ui.$searchClear = ui.find("[data-search-bar='search_clear']");
			_this.ui.$searchClose = ui.find("[data-search-bar='search_close']");
			_this.ui.$searchForm = ui.find("[data-search-bar='search_form']");
			_this.ui.$searchHotCity = ui.find("[data-search-bar='search_hot_city']");
			_this.ui.$searchInput = ui.find("[data-search-bar='search_input']");
			_this.ui.$searchLabel = ui.find("[data-search-bar='search_label']");
			_this.ui.$searchResult = ui.find("[data-search-bar='search_result']");
		}

		function _createToolsBar() {
			var $toolsBar = $("<div class=\"search-tools-bar\">");
			$("<a href=\"javascript:;\" class=\"search-close-btn\">").attr("data-search-bar", "search_close").appendTo($toolsBar);
			return $toolsBar;
		}

		function _createSearchBar() {
			var $searchBar = $("<div class=\"weui-search-bar\">").attr("data-search-bar", "search_bar");
			var $form = $("<form class=\"weui-search-bar__form\">").attr("data-search-bar", "search_form").appendTo($searchBar);
			var $inputBox = $("<div class=\"weui-search-bar__box\">").appendTo($form);
			$("<i class=\"weui-icon-search\">").appendTo($inputBox);
			$("<input type=\"search\" class=\"weui-search-bar__input\" placeholder=\"搜索\">").attr("data-search-bar", "search_input").appendTo($inputBox);
			$("<a href=\"javascript:;\" class=\"weui-icon-clear\">").attr("data-search-bar", "search_clear").appendTo($inputBox);
			var $label = $("<label class=\"weui-search-bar__label\" style=\"transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);\">").attr("data-search-bar", "search_label").appendTo($form);
			$("<i class=\"weui-icon-search\">").appendTo($label);
			$("<span>搜索</span>").appendTo($label);
			$("<a href=\"javascript:;\" class=\"weui-search-bar__cancel-btn\">取消</a>").attr("data-search-bar", "search_cancel").appendTo($searchBar);
			return $searchBar;
		}

		function _createHotCityBox() {
			var hotCitys = _this.options.hotCitys;
			if (hotCitys != null && hotCitys.length > 0) {
				var $hotCityBox = $("<fieldset class=\"search-hot-city\"><legend>热门城市</legend></fieldset>").attr("data-search-bar", "search_hot_city");
				var $hotCityList = $("<div class=\"search-hot-city-list\">").appendTo($hotCityBox);
				$.each(hotCitys, function(index, city) {
					$("<span>" + city.name + "</span>").attr("data-search-bar", "search_hot_city_item").data("city", city).appendTo($hotCityList);
				});
				return $hotCityBox;
			}
		}

		function _createCityListBox() {
			return $("<div class=\"weui-cells searchbar-result\" style=\"display: block;\">").attr("data-search-bar", "search_result");
		}

		function _createCityList(citys) {
			var $cityList = $();
			$.each(citys, function(index, city) {
				var $item = $("<div class=\"weui-cell weui-cell_access\">").attr("data-search-bar", "search_result_item").data("city", city);
				$("<div class=\"weui-cell__bd weui-cell_primary\">").append("<p>" + city.name + "</p>").appendTo($item);
				$cityList = $cityList.add($item);
			});
			return $cityList;
		}

		function _bindEvent() {
			_this.ui.$searchLabel.on("click", function() {
				_this.ui.$searchBar.addClass("weui-search-bar_focusing");
				_this.ui.$searchInput.focus();
			});
			_this.ui.$searchInput.on("blur", function() {
				if ($.trim($(this).val()).length == 0) {
					_cancel();
				}
			}).on("input", function() {
				var searchString = $.trim($(this).val());
				if (searchString.length > 0) {
					_search(searchString);
				} else {
					// _this.ui.$searchResult.hide();
                    _reset();
				}
			});
			_this.ui.$searchForm.on("submit", function() {
				return false;
			});
			_this.ui.$searchClear.on("click", function() {
				_clear();
				_this.ui.$searchInput.focus();
			});
			_this.ui.$searchCancel.on("click", function() {
				_cancel();
				_this.ui.$searchInput.blur();
			});
			_this.ui.$searchClose.on("click", function() {
				_close();
			});
			_this.ui.$searchResult.on("click", function(event) {
				var target = event.target;
				var $item = $(target);
				if (!$item.is("[data-search-bar='search_result_item']")) {
					$item = $item.parents("[data-search-bar='search_result_item']");
				}
				_select($item.get(0));
			});
			_this.ui.$searchHotCity.find("[data-search-bar='search_hot_city_item']").on("click", function() {
				_select(this);
			});
		}

		function _search(searchString) {
			var citys = [];
			$.each(_this.options.citys, function(index, city) {
				if (city.name.contains(searchString)) {
					citys.push(city)
				}
			});
			_this.ui.$searchResult.empty().append(_createCityList(citys)).show();
		}

		function _select(item) {
			if (!item) {
				return;
			}
			var $item = $(item);
			_this.options.callback.call(_this, $item.data("city"));
			_close();
		}

		function _clear() {
			// _this.ui.$searchResult.hide();
            _reset();
			_this.ui.$searchInput.val("");
		}

		function _cancel() {
			_clear();
			_this.ui.$searchBar.removeClass("weui-search-bar_focusing");
			_this.ui.$searchLabel.show();
		}

		function _show() {
            _reset();
			$(_this.ui).show();
		}

		function _hide() {
			$(_this.ui).hide();
		}

		function _open() {
			_show();
			$("input").blur();
		}

		function _close() {
			_hide();
			_cancel();
			_this.ui.$searchInput.blur();
		}

		function _reset() {
            _this.ui.$searchResult.empty().append(_createCityList(_this.options.citys));
        }

		_init();
		_bindEvent();

		this.open = function() {
			_open();
		};

		this.close = function() {
			_close();
		};
	}

	window.CitySelector = CitySelector;

})(window, window.jQuery);