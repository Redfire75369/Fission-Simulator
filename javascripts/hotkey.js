Mousetrap.bind("m", function() {});
for (let tier = 0; tier < 8; tier++) {
	Mousetrap.bind((tier+1).toString(), function() {
		player.reactors[tier].buyMax()
	});
}

Mousetrap.bind("n", function(){
	buyMaxNucleosynthesis();
});

Mousetrap.bind("r", function(){
	buyNaniteResearch();
});
