const key = Mousetrap;

key.bind("m", buyMaxAll);
key.bind("e", function() {
	player.eff.buyMax();
});
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