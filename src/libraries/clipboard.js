function copy_string_to_clipboard(str) {
	const el = document.createElement("textarea");
	el.value = str;
	el.setAttribute("readonly", "");
	el.style = {
		position: "absolute",
		left: "-9999px"
	};
	document.body.appendChild(el);
	copy_to_clipboard(el);
	document.body.removeChild(el);
}

function copy_to_clipboard(el) {
	el = typeof el === "string" ? document.querySelector(el) : el;

	if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
		const editable = el.contentEditable;
		const readOnly = el.readOnly;

		el.contentEditable = true;
		el.readOnly = true;

		const range = document.createRange();
		range.selectNodeContents(el);

		const selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);
		el.setSelectionRange(0, 999999);

		el.contentEditable = editable;
		el.readOnly = readOnly;
	} else {
		el.select();
	}
	document.execCommand("copy");
}
