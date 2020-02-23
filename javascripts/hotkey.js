const key = Mousetrap;

key.bind("m", buyMaxAllReactorEff());
key.bind("e", buyMaxEff());
for (let tier = 0; tier < 8; tier++) {
	key.bind(tier.toString(), buyMaxReactor(tier));
}

key.bind("s", function(){
	buyMeteor();
});

key.bind("n", function(){
	buyNaniteResearch();
});