Mousetrap.bind("m", function() {
	buyMaxAll();
});
Mousetrap.bind("e", function() {
	player.eff.buyMax();
});
for (let tier = 0; tier < 8; tier++) {
	Mousetrap.bind((tier+1).toString(), function() {
		player.reactors[tier].buyMax()
	});
	Mousetrap.bind("ctrl+" + (tier+1).toString(), function() {
		player.mines[tier].buyMax()
	});
}

Mousetrap.bind("n", function(){
	buyMaxNucleosynthesis();
});

Mousetrap.bind("r", function(){
	buyNaniteResearch();
});
