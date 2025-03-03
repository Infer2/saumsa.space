(function() {
	$(document).ready((function() {
		$("#id_text").focus();
		var t = !1,
			e = $("#entry-form"),
			n = $("#submitButton"),
			o = !1;
		e.keydown((function(t) {
			10 != t.keyCode && 13 != t.keyCode || !event.ctrlKey || n.click(), o || (window.onbeforeunload = function() {
				return !0
			}, o = !0)
		})), n.on("click", (function(t) {
			t.preventDefault(), e[0].reportValidity() && (window.onbeforeunload = null, setTimeout((function() {
				e.submit()
			}), 150))
		})), $("#deleteShowButton").on("click", (function() {
			e[0].reportValidity() && $("#deleteModal").modal("show")
		})), e.submit((function(e) {
			var o;
			!0 !== t ? (t = !0, $("#deleteModal").length ? (window.onbeforeunload = null, $("#deleteModal").is(":visible") ? (o = $("#deleteButton")).addClass("btn-delete-disabled") : (o = n).attr("disabled", !0), o.html('<i class="spinner filter-white"/>')) : ((o = n).html('<i class="spinner"/>'), o.attr("disabled", !0)), o.css("pointer-events", "none")) : e.preventDefault()
		}));
		var a = !0;
		if (void 0 !== $("#metadata_text")) {
			var i = $("#metadata_text").val();
			i.length > 0 && (s(), a = !1);
			var r = i.split("\n").length;
			$("#metadata_text").css("min-height", 10 * r + "px")
		}

		function s() {
			$(".metadata-button-container button").removeClass("active"), $(".metadata-fieldset").addClass("active")
		}

		function l() {
			if ($(".metadata-button-container button").addClass("active"), $(".metadata-fieldset").removeClass("active"), void 0 !== document.querySelector("#metadata_text")) {
				const t = document.querySelector("#metadata_text").value.split("\n").filter((t => "" !== t.trim())).length;
				t > 0 && $(".metadata-button-container button.metadata-plus").text("+ Metadata (" + t + ")")
			}
		}
		a && l(), $(".metadata-button-container button").click((function() {
			"hide" != $(this).data("action") ? s() : l()
		}));
		var u = document.getElementById("id_url") || document.getElementById("id_new_url"),
			c = null,
			d = null;

		function m(t, e) {
			t.classList.remove("input-success"), t.classList.remove("input-warning"), t.classList.remove("input-error"), e && e.length > 0 && t.classList.add(e)
		}
		u.addEventListener("input", (function(t) {
			if (m(u, ""), (d = t.target.value.trim()).length < 2 || d.length > 100) return;
			if (d = encodeURIComponent(d), !/^[\-\_a-z0-9]+$/i.test(d)) return void m(u, "input-error");
			c && clearTimeout(c);
			const e = d;
			c = setTimeout((function() {
				$.ajax(`/${e}/exists`, {
					success: function(t, n, o) {
						"True" == t && e.toLowerCase() === d.toLowerCase() ? m(u, "input-warning") : e.toLowerCase() === d.toLowerCase() && m(u, "input-success")
					},
					error: function(t, n, o) {
						e.toLowerCase() === d.toLowerCase() && m(u, "input-error")
					}
				})
			}), 500)
		}))
	})), $('a[data-toggle="tab"]').on("shown.bs.tab", (function(t) {
		$("#id_text").focus()
	}));
	var t = 0,
		e = $("#how-tab"),
		n = $("#how-inner");
	e.on("hide.bs.tab", (function(e) {
		t = n.scrollTop()
	})), e.on("shown.bs.tab", (function(e) {
		n.scrollTop(t)
	}));
	var o = 0,
		a = $("#preview-tab"),
		i = $("#preview-inner");
	a.on("hide.bs.tab", (function(t) {
		o = i.scrollTop()
	})), a.on("shown.bs.tab", (function(t) {
		i.scrollTop(o)
	}));
	try {
		var r = CodeMirror.fromTextArea(document.getElementById("id_text"), {
			mode: {
				name: "gfm",
				strikethrough: !0,
				mark: !0,
				gitHubSpice: !1,
				emoji: !1,
				allowAtxHeaderWithoutSpace: !0
			},
			autofocus: !0,
			viewportMargin: 1 / 0,
			lineWrapping: !0,
			inputStyle: "contenteditable",
			highlightFormatting: !1,
			fencedCodeBlockHighlighting: !1,
			xml: !1,
			smartIndent: !1,
			extraKeys: {
				Home: "goLineLeft",
				End: "goLineRight",
				Enter: function(t) {
					t.replaceSelection("\n")
				}
			}
		});
		enforceMaxLength = function(t, e) {
			var n = t.getOption("maxLength");
			if (n && e.update) {
				var o = e.text.join("\n"),
					a = o.length - (t.indexFromPos(e.to) - t.indexFromPos(e.from));
				if (a <= 0) return !0;
				(a = t.getValue().length + a - n) > 0 && (o = o.substr(0, o.length - a), e.update(e.from, e.to, o.split("\n")))
			}
			return !0
		}, r.setOption("maxLength", 2e5), r.on("beforeChange", enforceMaxLength);
		var s = $("#id_text");
		r.on("change", (function(t, e, n) {
			s.val(r.getValue()), s[0].dispatchEvent(new Event("input"))
		})), $('a[data-toggle="tab"]').on("shown.bs.tab", (function(t) {
			r.focus()
		}));
		var l = document.getElementsByClassName("CodeMirror-code")[0];
		l.setAttribute("spellcheck", "true"), l.setAttribute("autocapitalize", "sentences")
	} catch (t) {}
}).call(this);