! function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    e.overlayMode = function(o, r, a) {
        return {
            startState: function() {
                return {
                    base: e.startState(o),
                    overlay: e.startState(r),
                    basePos: 0,
                    baseCur: null,
                    overlayPos: 0,
                    overlayCur: null,
                    streamSeen: null
                }
            },
            copyState: function(a) {
                return {
                    base: e.copyState(o, a.base),
                    overlay: e.copyState(r, a.overlay),
                    basePos: a.basePos,
                    baseCur: null,
                    overlayPos: a.overlayPos,
                    overlayCur: null
                }
            },
            token: function(e, n) {
                return (e != n.streamSeen || Math.min(n.basePos, n.overlayPos) < e.start) && (n.streamSeen = e, n.basePos = n.overlayPos = e.start), e.start == n.basePos && (n.baseCur = o.token(e, n.base), n.basePos = e.pos), e.start == n.overlayPos && (e.pos = e.start, n.overlayCur = r.token(e, n.overlay), n.overlayPos = e.pos), e.pos = Math.min(n.basePos, n.overlayPos), null == n.overlayCur ? n.baseCur : null != n.baseCur && n.overlay.combineTokens || a && null == n.overlay.combineTokens ? n.baseCur + " " + n.overlayCur : n.overlayCur
            },
            indent: o.indent && function(e, r) {
                return o.indent(e.base, r)
            },
            electricChars: o.electricChars,
            innerMode: function(e) {
                return {
                    state: e.base,
                    mode: o
                }
            },
            blankLine: function(e) {
                var n, t;
                return o.blankLine && (n = o.blankLine(e.base)), r.blankLine && (t = r.blankLine(e.overlay)), null == t ? n : a && null != n ? n + " " + t : t
            }
        }
    }
}));