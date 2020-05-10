const key = Mousetrap;

key.bind("e", player.eff.buyMax);
for (let tier = 0; tier < 8; tier++) {
	key.bind((tier+1).toString(), function() {
		player.reactors[tier].buyMax()
	});
}

key.bind("n", function(){
	buyMaxNucleosynthesis();
});

key.bind("r", function(){
	buyNaniteResearch();
});

function updateHotkeys() {
	if (player.unlocked.naniteUps || player.unlocked.meltdown) {
		key.bind("m", buyMaxAll);
		document.getElementById("max_all").style.display = "inline-block";
	} else {
		key.unbind('m');
		document.getElementById("max_all").style.display = "none";
	}
	
}