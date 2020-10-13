/*
 * 基于jQuery的共通对话框js
 */

;(function(window, document, $) {
	"use strict";

	/*
	options = {
		element : "<div>hahahaha</div>",
		title : "测试玩",
		width : "auto",
		height : "auto",
		buttons : [ {
			id : "btn_1",
			text : "btn_11",
			class : "btn-111",
			click : function() {
				console.log(this.dialog);
			}
		}, {
			text : "关闭",
			click : function() {
				this.dialog.close();
			}
		} ],
		maskClose : false,
		beforeCancel : function() {
		},
		cancel : function() {
		},
		beforeClose : function() {
		},
		close : function() {
		},
		beforeOpen : function() {
		},
		open : function() {
		}
	};
	*/
	function Dialog(options) {
		options = options || {};
		//
		var $dialog = $("<div class='dialog' style='display: none;'></div>");
		if (options.maskClose !== false) {
			$dialog.attr("title", "点击关闭").on("click", function() {
				this.dialog.cancel();
			});
		}
		$dialog[0].dialog = this;
		var $dialogBox = $("<div class='dialog-box'></div>");
		if (options.maskClose !== false) {
			$dialogBox.attr("title", "").on("click", function(event) {
				event.stopPropagation();
			});
		}
		if (options.width != null) {
			$dialogBox.css("width", options.width).css("min-width", "initial");
		}
		if (options.height != null) {
			$dialogBox.css("height", options.height).css("min-height", "initial");
		}
		if (options.title != null) {
			var $titleBar = $("<div class='dialog-titlebar dialog-line'></div>");
			var $title = $("<span class='dialog-title'></span>").html(options.title);
			var $close = $("<button type='button' class='dialog-close'></button>").on("click", function() {
				this.dialog.cancel();
			});
			$close[0].dialog = this;
			$titleBar.append($title).append($close);
			$dialogBox.append($titleBar);
		}
		var $content = $(options.element).addClass("dialog-content");
		$content[0].dialog = this;
		$dialogBox.append($content.show());
		if (options.buttons instanceof Array && options.buttons.length > 0) {
			var $buttonBar = $("<div class='dialog-buttonbar'></div>");
			if (options.title == null) {
				$buttonBar.addClass("dialog-line");
			}
			for (var i = 0; i < options.buttons.length; i++) {
				var $button = $("<button></button>", options.buttons[i]).addClass("dialog-button");
				$button[0].dialog = this;
				$buttonBar.append($button);
			}
			$dialogBox.append($buttonBar);
		}
		$dialog.append($dialogBox);
		$(document.body).append($dialog);
		this.context = $dialog[0];
		this.content = $content[0];
		this.options = options;
	}

	Dialog.prototype.open = function() {
		var open = true;
		if (typeof this.options.beforeOpen === "function") {
			open = this.options.beforeOpen.call(this);
		}
		if (open !== false) {
			$(this.context).show();
			if (typeof this.options.open === "function") {
				this.options.open.call(this);
			}
		}
		return this;
	};

	Dialog.prototype.cancel = function() {
		var cancel = true;
		if (typeof this.options.beforeCancel === "function") {
			cancel = this.options.beforeCancel.call(this);
		}
		if (cancel !== false) {
			if (typeof this.options.cancel === "function") {
				this.options.cancel.call(this);
			}
			this.close();
		}
		return this;
	};

	Dialog.prototype.close = function() {
		var close = true;
		if (typeof this.options.beforeClose === "function") {
			close = this.options.beforeClose.call(this);
		}
		if (close !== false) {
			$(this.context).hide();
			if (typeof this.options.close === "function") {
				this.options.close.call(this);
			}
		}
		return this;
	};

	Dialog.prototype.destroy = function() {
		$(this.context).remove();
	};

	$.progress = function(message) {
		var element;
		if (typeof message === "string") {
			element = $("<div><p class='dialog-message'>" + message + "</p></div>")
		} else {
			element = $("<div>").append(message);
		}
		var dialog = new Dialog({
			element : element,
			maskClose : false,
			close : function() {
				this.destroy();
			}
		});
		dialog.open();
		return dialog;
	};

	$.alert = function(message, callback, title, maskClose) {
		var element;
		if (typeof message === "string") {
			element = $("<div><p class='dialog-message'>" + message + "</p></div>")
		} else {
			element = $("<div>").append(message);
		}
		var dialog = new Dialog({
			element : element,
			title : title,
			maskClose : maskClose,
			buttons : [ {
				text : "确定",
				click : function() {
					this.dialog.close();
				}
			} ],
			beforeClose : function() {
				var close = true;
				if (typeof callback === "function") {
					close = callback.call(this);
				}
				return close;
			},
			close : function() {
				this.destroy();
			}
		});
		dialog.open();
		return dialog;
	};

	$.confirm = function(message, callback, title, maskClose) {
		var element;
		if (typeof message === "string") {
			element = $("<div><p class='dialog-message'>" + message + "</p></div>")
		} else {
			element = $("<div>").append(message);
		}
		var dialog = new Dialog({
			element : element,
			title : title,
			maskClose : maskClose,
			buttons : [ {
				text : "取消",
				"class" : "dialog-buttonbar-only",
				click : function() {
					this.dialog.cancel();
				}
			}, {
				text : "确定",
				click : function() {
					var close = true;
					if (typeof callback === "function") {
						close = callback.call(this, true);
					}
					if (close !== false) {
						this.dialog.close();
					} else {
						return false;
					}
				}
			} ],
			cancel : function() {
				var close = true;
				if (typeof callback === "function") {
					close = callback.call(this, false);
				}
				if (close !== false) {
					this.close();
				} else {
					return false;
				}
			},
			close : function() {
				this.destroy();
			}
		});
		dialog.open();
		return dialog;
	};

	window.Dialog = Dialog;
})(window, document, jQuery);