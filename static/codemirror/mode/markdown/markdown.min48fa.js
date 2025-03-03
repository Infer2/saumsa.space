! function(t) {
	"object" == typeof exports && "object" == typeof module ? t(require("../../lib/codemirror"), require("../xml/xml"), require("../meta")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../xml/xml", "../meta"], t) : t(CodeMirror)
}((function(t) {
	t.defineMode("markdown", (function(e, i) {
		function n(t, e, i) {
			return e.f = e.inline = i, i(t, e)
		}

		function r(t) {
			return t.linkTitle = !1, t.linkHref = !1, t.linkText = !1, t.em = !1, t.strong = !1, t.strikethrough = !1, t.mark = !1, 1 <= t.code && (t.code = 0), t.quote = 0, t.indentedCode = !1, t.f == o && (t.f = m, t.block = a), t.trailingSpace = 0, t.trailingSpaceNewLine = !1, t.prevLine = t.thisLine, t.thisLine = {
				stream: null
			}, null
		}

		function a(r, a) {
			var o = r.column() === a.indentation,
				g = a.prevLine.stream,
				m = !g || !/\S/.test(g.string),
				s = a.indentedCode,
				f = a.prevLine.hr,
				d = a.prevLine.header,
				u = !1 !== a.list,
				k = (a.listStack[a.listStack.length - 1] || 0) + 3,
				p = !m && !f && !d;
			if (a.indentedCode = !1, g = a.indentation, null === a.indentationDiff && (a.indentationDiff = a.indentation, u)) {
				for (a.em = !1, a.strong = !1, a.code = !1, a.strikethrough = !1, a.mark = !1, a.list = null; g < a.listStack[a.listStack.length - 1];) a.listStack.pop(), a.listStack.length ? a.indentation = a.listStack[a.listStack.length - 1] : a.list = !1;
				!1 !== a.list && (a.indentationDiff = g - a.listStack[a.listStack.length - 1])
			}
			var x = !(m || f || a.prevLine.header || u && s || a.prevLine.fencedCodeEnd),
				F = (!1 === a.list || f || m) && a.indentation <= k && r.match(v);
			if (f = null, 4 <= a.indentationDiff && (s || a.prevLine.fencedCodeEnd || a.prevLine.header || m)) return r.skipToEnd(), a.indentedCode = !0, S.code;
			if (r.eatSpace()) return null;
			if (o && a.indentation <= k && (f = r.match(q)) && 6 >= f[1].length) return a.quote = 0, a.header = f[1].length, a.thisLine.header = !0, i.highlightFormatting && (a.formatting = "header"), a.f = a.inline, h(a);
			if (a.indentation <= k && r.eat(">")) return 1 <= a.code && (a.code = 0), a.quote = o ? 1 : a.quote + 1, i.highlightFormatting && (a.formatting = "quote"), r.eatSpace(), h(a);
			if (!F && !a.setext && o && (m || u || d || p) && a.indentation <= k && (f = r.match(L))) return o = f[1] ? "ol" : "ul", a.indentation = g + r.current().length, a.list = !0, a.quote = 0, a.listStack.push(a.indentation), i.taskLists && r.match(T, !1) && (a.taskList = !0), a.f = a.inline, i.highlightFormatting && (a.formatting = ["list", "list-" + o]), h(a);
			if (o && a.indentation <= k && (f = r.match(b, !0))) return a.quote = 0, a.fencedEndRE = new RegExp(f[1] + "+ *$"), (o = i.fencedCodeBlockHighlighting) && (o = f[2], t.findModeByName && (g = t.findModeByName(o)) && (o = g.mime || g.mimes[0]), o = "null" == (o = t.getMode(e, o)).name ? null : o), a.localMode = o, a.localMode && (a.localState = t.startState(a.localMode)), a.f = a.block = l, i.highlightFormatting && (a.formatting = "code-block"), a.code = -1, h(a);
			if (a.setext || !(x && u || a.quote || !1 !== a.list || a.code || a.mark || F || E.test(r.string)) && (f = r.lookAhead(1)) && (f = f.match(M))) return a.setext ? (a.header = a.setext, a.setext = 0, r.skipToEnd(), i.highlightFormatting && (a.formatting = "header")) : (a.header = "=" == f[0].charAt(0) ? 1 : 2, a.setext = a.header), a.thisLine.header = !0, a.f = a.inline, h(a);
			if (F) return r.skipToEnd(), a.hr = !0, a.thisLine.hr = !0, S.hr;
			if (a.indentation <= k && r.match(j)) a.formatting = "admonition";
			else if ("[" === r.peek()) {
				if (!r.match(y)) return n(r, a, c);
				a.formatting = "toc"
			} else a.indentation <= k && !r.eat(">") && o && 0 !== a.quote && !r.string.startsWith(">") && (a.quote = 0, a.formatting = !1);
			return n(r, a, a.inline)
		}

		function o(e, i) {
			var n = k.token(e, i.htmlState);
			if (!p) {
				var r = t.innerMode(k, i.htmlState);
				("xml" == r.mode.name && null === r.state.tagStart && !r.state.context && r.state.tokenize.isInText || i.md_inside && -1 < e.current().indexOf(">")) && (i.f = m, i.block = a, i.htmlState = null)
			}
			return n
		}

		function l(t, e) {
			var n, r = e.listStack[e.listStack.length - 1] || 0,
				o = e.indentation < r;
			return e.fencedEndRE && e.indentation <= r + 3 && (o || t.match(e.fencedEndRE)) ? (i.highlightFormatting && (e.formatting = "code-block"), o || (n = h(e)), e.localMode = e.localState = null, e.block = a, e.f = m, e.fencedEndRE = null, e.code = 0, e.thisLine.fencedCodeEnd = !0, o ? (r = e.block, e.f = e.block = r, r(t, e)) : n) : e.localMode ? e.localMode.token(t, e.localState) : (t.skipToEnd(), S.code)
		}

		function h(t) {
			var e = [];
			if (t.formatting) {
				e.push(S.formatting), "string" == typeof t.formatting && (t.formatting = [t.formatting]);
				for (var n = 0; n < t.formatting.length; n++) e.push(S.formatting + "-" + t.formatting[n]), "header" === t.formatting[n] && e.push(S.formatting + "-" + t.formatting[n] + "-" + t.header), "quote" === t.formatting[n] && (!i.maxBlockquoteDepth || i.maxBlockquoteDepth >= t.quote ? e.push(S.formatting + "-" + t.formatting[n] + "-" + t.quote) : e.push("error"))
			}
			return t.taskOpen ? (e.push("meta"), e.length ? e.join(" ") : null) : t.taskClosed ? (e.push("property"), e.length ? e.join(" ") : null) : (t.linkHref ? e.push(S.linkHref, "url") : (t.strong && e.push(S.strong), t.em && e.push(S.em), t.strikethrough && e.push(S.strikethrough), t.mark && e.push(S.mark), t.emoji && e.push(S.emoji), t.linkText && e.push(S.linkText), t.code && e.push(S.code), t.image && e.push(S.image), t.imageAltText && e.push(S.imageAltText, "link"), t.imageMarker && e.push(S.imageMarker)), t.header && e.push(S.header, S.header + "-" + t.header), t.quote && (e.push(S.quote), !i.maxBlockquoteDepth || i.maxBlockquoteDepth >= t.quote ? e.push(S.quote + "-" + t.quote) : e.push(S.quote + "-" + i.maxBlockquoteDepth)), !1 !== t.list && ((t.listStack.length - 1) % 2 ? e.push(S.list2) : e.push(S.list1)), t.trailingSpaceNewLine ? e.push("trailing-space-new-line") : t.trailingSpace && e.push("trailing-space-" + (t.trailingSpace % 2 ? "a" : "b")), e.length ? e.join(" ") : null)
		}

		function g(t, e) {
			if (t.match(F, !0)) return h(e)
		}

		function m(e, n) {
			var r = n.text(e, n);
			if (void 0 !== r) return r;
			if (n.list) return n.list = null, h(n);
			if (n.taskList) return " " === e.match(T, !0)[1] ? n.taskOpen = !0 : n.taskClosed = !0, i.highlightFormatting && (n.formatting = "task"), n.taskList = !1, h(n);
			if (n.taskOpen = !1, n.taskClosed = !1, n.header && e.match(/^#+$/, !0)) return i.highlightFormatting && (n.formatting = "header"), h(n);
			if (r = e.next(), n.linkTitle) {
				n.linkTitle = !1;
				var a = r;
				if ("(" === r && (a = ")"), a = (a + "").replace(/([.?*+^\[\]\\(){}|-])/g, "\\$1"), e.match(new RegExp("^\\s*(?:[^" + a + "\\\\]+|\\\\\\\\|\\\\.)" + a), !0)) return S.linkHref
			}
			if ("`" === r) return r = n.formatting, i.highlightFormatting && (n.formatting = "code"), e.eatWhile("`"), a = e.current().length, 0 != n.code || n.quote && 1 != a ? a == n.code ? (r = h(n), n.code = 0, r) : (n.formatting = r, h(n)) : (n.code = a, h(n));
			if (n.code) return h(n);
			if ("\\" === r && (e.next(), i.highlightFormatting)) return r = h(n), a = S.formatting + "-escape", r ? r + " " + a : a;
			if ("!" === r && e.match(/\[[^\]]*\] ?(?:\(|\[)/, !1)) return n.imageMarker = !0, n.image = !0, i.highlightFormatting && (n.formatting = "image"), h(n);
			if ("[" === r && n.imageMarker && e.match(/[^\]]*\](\(.*?\)| ?\[.*?\])/, !1)) return n.imageMarker = !1, n.imageAltText = !0, i.highlightFormatting && (n.formatting = "image"), h(n);
			if ("]" === r && n.imageAltText) return i.highlightFormatting && (n.formatting = "image"), r = h(n), n.imageAltText = !1, n.image = !1, n.inline = n.f = f, r;
			if ("[" === r && !n.image) return n.linkText && e.match(/^.*?\]/) || (n.linkText = !0, i.highlightFormatting && (n.formatting = "link")), h(n);
			if ("]" === r && n.linkText) return i.highlightFormatting && (n.formatting = "link"), r = h(n), n.linkText = !1, n.inline = n.f = e.match(/\(.*?\)| ?\[.*?\]/, !1) ? f : m, r;
			if ("<" === r && e.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/, !1)) return n.f = n.inline = s, i.highlightFormatting && (n.formatting = "link"), ((r = h(n)) ? r + " " : "") + S.linkInline;
			if ("<" === r && e.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/, !1)) return n.f = n.inline = s, i.highlightFormatting && (n.formatting = "link"), ((r = h(n)) ? r + " " : "") + S.linkEmail;
			if (i.xml && "<" === r && e.match(/^(!--|[a-z]+(?:\s+[a-z_:.\-]+(?:\s*=\s*[^>]+)?)*\s*>)/i, !1)) return -1 != (r = e.string.indexOf(">", e.pos)) && (r = e.string.substring(e.start, r), /markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(r) && (n.md_inside = !0)), e.backUp(1), n.htmlState = t.startState(k), r = o, n.f = n.block = r, r(e, n);
			if (i.xml && "<" === r && e.match(/^\/\w*?>/)) return n.md_inside = !1, "tag";
			if ("*" === r || "_" === r) {
				for (var l = 1, g = 1 == e.pos ? " " : e.string.charAt(e.pos - 2); 3 > l && e.eat(r);) l++;
				var c = e.peek() || " ",
					d = !/\s/.test(c) && (!w.test(c) || /\s/.test(g) || w.test(g)),
					u = !/\s/.test(g) && (!w.test(g) || /\s/.test(c) || w.test(c)),
					p = a = null;
				if (l % 2 && (n.em || !d || "*" !== r && u && !w.test(g) ? n.em != r || !u || "*" !== r && d && !w.test(c) || (a = !1) : a = !0), 1 < l && (n.strong || !d || "*" !== r && u && !w.test(g) ? n.strong != r || !u || "*" !== r && d && !w.test(c) || (p = !1) : p = !0), null != p || null != a) return i.highlightFormatting && (n.formatting = null == a ? "strong" : null == p ? "em" : "strong em"), !0 === a && (n.em = r), !0 === p && (n.strong = r), r = h(n), !1 === a && (n.em = !1), !1 === p && (n.strong = !1), r
			} else if (" " === r && (e.eat("*") || e.eat("_"))) {
				if (" " === e.peek()) return h(n);
				e.backUp(1)
			}
			if (i.strikethrough)
				if ("~" === r && e.eatWhile(r)) {
					if (n.strikethrough) return i.highlightFormatting && (n.formatting = "strikethrough"), r = h(n), n.strikethrough = !1, r;
					if (e.match(/^[^\s]/, !1)) return n.strikethrough = !0, i.highlightFormatting && (n.formatting = "strikethrough"), h(n)
				} else if (" " === r && e.match(/^~~/, !0)) {
				if (" " === e.peek()) return h(n);
				e.backUp(2)
			}
			if (i.mark)
				if ("=" === r && e.eatWhile(r)) {
					if (n.mark) return i.highlightFormatting && (n.formatting = "mark"), r = h(n), n.mark = !1, r;
					if (e.match(/^[^\s]/, !1)) return n.mark = !0, i.highlightFormatting && (n.formatting = "mark"), h(n)
				} else if (" " === r && e.match(/^==/, !0)) {
				if (" " === e.peek()) return h(n);
				e.backUp(2)
			}
			return i.emoji && ":" === r && e.match(/^[a-z_\d+-]+:/) ? (n.emoji = !0, i.highlightFormatting && (n.formatting = "emoji"), r = h(n), n.emoji = !1, r) : (" " === r && (e.match(/^ +$/, !1) ? n.trailingSpace++ : n.trailingSpace && (n.trailingSpaceNewLine = !0)), h(n))
		}

		function s(t, e) {
			if (">" === t.next()) {
				e.f = e.inline = m, i.highlightFormatting && (e.formatting = "link");
				var n = h(e);
				return (n ? n + " " : "") + S.linkInline
			}
			return t.match(/^[^>]+/, !0), S.linkInline
		}

		function f(t, e) {
			if (t.eatSpace()) return null;
			var n = t.next();
			return "(" === n || "[" === n ? (e.f = e.inline = function(t) {
				return function(e, n) {
					if (e.next() === t) {
						n.f = n.inline = m, i.highlightFormatting && (n.formatting = "link-string");
						var r = h(n);
						return n.linkHref = !1, r
					}
					return e.match(C[t]), n.linkHref = !0, h(n)
				}
			}("(" === n ? ")" : "]"), i.highlightFormatting && (e.formatting = "link-string"), e.linkHref = !0, h(e)) : "error"
		}

		function c(t, e) {
			return t.match(/^([^\]\\]|\\.)*\]:/, !1) ? (e.f = d, t.next(), i.highlightFormatting && (e.formatting = "link"), e.linkText = !0, h(e)) : n(t, e, m)
		}

		function d(t, e) {
			if (t.match(/^\]:/, !0)) {
				e.f = e.inline = u, i.highlightFormatting && (e.formatting = "link");
				var n = h(e);
				return e.linkText = !1, n
			}
			return t.match(/^([^\]\\]|\\.)+/, !0), S.linkText
		}

		function u(t, e) {
			return t.eatSpace() ? null : (t.match(/^[^\s]+/, !0), void 0 === t.peek() ? e.linkTitle = !0 : t.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/, !0), e.f = e.inline = m, S.linkHref + " url")
		}
		var k = t.getMode(e, "text/html"),
			p = "null" == k.name;
		void 0 === i.highlightFormatting && (i.highlightFormatting = !1), void 0 === i.maxBlockquoteDepth && (i.maxBlockquoteDepth = 0), void 0 === i.taskLists && (i.taskLists = !1), void 0 === i.strikethrough && (i.strikethrough = !1), void 0 === i.mark && (i.mark = !1), void 0 === i.emoji && (i.emoji = !1), void 0 === i.fencedCodeBlockHighlighting && (i.fencedCodeBlockHighlighting = !0), void 0 === i.xml && (i.xml = !0), void 0 === i.tokenTypeOverrides && (i.tokenTypeOverrides = {});
		var x, S = {
			header: "header",
			code: "comment",
			quote: "quote",
			list1: "variable-2",
			list2: "keyword",
			list3: "keyword",
			hr: "hr",
			image: "image",
			imageAltText: "image-alt-text",
			imageMarker: "image-marker",
			formatting: "formatting",
			linkInline: "link",
			linkEmail: "link",
			linkText: "link",
			linkHref: "string",
			em: "em",
			strong: "strong",
			strikethrough: "strikethrough",
			mark: "mark",
			emoji: "builtin"
		};
		for (x in S) S.hasOwnProperty(x) && i.tokenTypeOverrides[x] && (S[x] = i.tokenTypeOverrides[x]);
		var v = /^([*\-_])(?:\s*\1){2,}\s*$/,
			L = /^(?:[*\-+]|^[0-9]+([.)]))\s+/,
			T = /^\[(x| )\](?=\s)/i,
			q = i.allowAtxHeaderWithoutSpace ? /^(#+)/ : /^(#+)(?: |$)/,
			M = /^ *(?:={1,}|-{1,})\s*$/,
			F = /^[^#!\[\]*_\\<=>` "'(~:]+/,
			b = /^(~~~+|```+)[ \t]*([\w+#-]*)[^\n`]*$/,
			E = /^\s*\[[^\]]+?\]:.*$/,
			w = /[!"#$%&'()*+,\-\.\/:;<=>?@\[\\\]^_`{|}~\u2014]/,
			y = /^\[TOC[1-6]?\]\s*$/,
			j = /^!!!/,
			C = {
				")": /^(?:[^\\\(\)]|\\.|\((?:[^\\\(\)]|\\.)*\))*?(?=\))/,
				"]": /^(?:[^\\\[\]]|\\.|\[(?:[^\\\[\]]|\\.)*\])*?(?=\])/
			},
			H = {
				startState: function() {
					return {
						f: a,
						prevLine: {
							stream: null
						},
						thisLine: {
							stream: null
						},
						block: a,
						htmlState: null,
						indentation: 0,
						inline: m,
						text: g,
						formatting: !1,
						linkText: !1,
						linkHref: !1,
						linkTitle: !1,
						code: 0,
						em: !1,
						strong: !1,
						header: 0,
						setext: 0,
						hr: !1,
						taskList: !1,
						list: !1,
						listStack: [],
						quote: 0,
						trailingSpace: 0,
						trailingSpaceNewLine: !1,
						strikethrough: !1,
						mark: !1,
						emoji: !1,
						fencedEndRE: null
					}
				},
				copyState: function(e) {
					return {
						f: e.f,
						prevLine: e.prevLine,
						thisLine: e.thisLine,
						block: e.block,
						htmlState: e.htmlState && t.copyState(k, e.htmlState),
						indentation: e.indentation,
						localMode: e.localMode,
						localState: e.localMode ? t.copyState(e.localMode, e.localState) : null,
						inline: e.inline,
						text: e.text,
						formatting: !1,
						linkText: e.linkText,
						linkTitle: e.linkTitle,
						linkHref: e.linkHref,
						code: e.code,
						em: e.em,
						strong: e.strong,
						strikethrough: e.strikethrough,
						mark: e.mark,
						emoji: e.emoji,
						header: e.header,
						setext: e.setext,
						hr: e.hr,
						taskList: e.taskList,
						list: e.list,
						listStack: e.listStack.slice(0),
						quote: e.quote,
						indentedCode: e.indentedCode,
						trailingSpace: e.trailingSpace,
						trailingSpaceNewLine: e.trailingSpaceNewLine,
						md_inside: e.md_inside,
						fencedEndRE: e.fencedEndRE
					}
				},
				token: function(t, e) {
					if (e.formatting = !1, t != e.thisLine.stream) {
						if (e.header = 0, e.hr = !1, t.match(/^\s*$/, !0)) return r(e), null;
						if (e.prevLine = e.thisLine, e.thisLine = {
								stream: t
							}, e.taskList = !1, e.trailingSpace = 0, e.trailingSpaceNewLine = !1, !e.localState && (e.f = e.block, e.f != o)) {
							var i = t.match(/^\s*/, !0)[0].replace(/\t/g, "    ").length;
							if (e.indentation = i, e.indentationDiff = null, 0 < i) return null
						}
					}
					return e.f(t, e)
				},
				innerMode: function(t) {
					return t.block == o ? {
						state: t.htmlState,
						mode: k
					} : t.localState ? {
						state: t.localState,
						mode: t.localMode
					} : {
						state: t,
						mode: H
					}
				},
				indent: function(e, i, n) {
					return e.block == o && k.indent ? k.indent(e.htmlState, i, n) : e.localState && e.localMode.indent ? e.localMode.indent(e.localState, i, n) : t.Pass
				},
				blankLine: r,
				getType: h,
				closeBrackets: "()[]{}''\"\"``",
				fold: "markdown"
			};
		return H
	}), "xml"), t.defineMIME("text/markdown", "markdown"), t.defineMIME("text/x-markdown", "markdown")
}));