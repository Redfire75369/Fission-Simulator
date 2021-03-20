!(function (global, factory) {
	typeof exports == "object" && typeof module != "undefined" ? (module.exports = factory(require("react"), require("katex")))
		: typeof define == "function" && define.amd ? define(["react", "katex"], factory) :
			((global = global || self).TeX = factory(global.React, global.katex));
})(this, function (React, katex) {
	var t = "default" in React ? React.default : React;
	function n() {
		return (n =
			Object.assign ||
			function (e) {
				for (var r = 1; r < arguments.length; r++) {
					var t = arguments[r];
					for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
				}
				return e;
			}).apply(this, arguments);
	}
	return (
		(katex = katex && Object.prototype.hasOwnProperty.call(katex, "default") ? katex.default : katex),
			React.memo(function (o) {
				var a = o.children,
					i = o.math,
					l = o.block,
					f = o.errorColor,
					c = o.renderError,
					s = o.settings,
					u = o.as,
					d = (function (e, r) {
						if (null == e) return {};
						var t,
							n,
							o = {},
							a = Object.keys(e);
						for (n = 0; n < a.length; n++) r.indexOf((t = a[n])) >= 0 || (o[t] = e[t]);
						return o;
					})(o, ["children", "math", "block", "errorColor", "renderError", "settings", "as"]),
					m = u || (l ? "div" : "span"),
					p = null != a ? a : i,
					h = React.useState({ innerHtml: "" }),
					y = h[0],
					E = h[1];
				return (
					React.useEffect(
						function () {
							try {
								var e = katex.renderToString(p, n({ displayMode: !!l, errorColor: f, throwOnError: !!c }, s));
								E({ innerHtml: e });
							} catch (e) {
								if (!(e instanceof katex.ParseError || e instanceof TypeError)) throw e;
								E(c ? { errorElement: c(e) } : { innerHtml: e.message });
							}
						},
						[l, p, f, c, s]
					),
						"errorElement" in y ? y.errorElement : t.createElement(m, Object.assign({}, d, { dangerouslySetInnerHTML: { __html: y.innerHtml } }))
				);
			})
	);
});
