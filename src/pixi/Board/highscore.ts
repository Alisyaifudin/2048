export const highscore = {
	get() {
		const score = localStorage.getItem("SCORE");
		if (score === null) return 0;
		const num = Number(score);
		if (isNaN(num) || !isFinite(num)) {
			localStorage.removeItem("SCORE");
			return 0;
		}
		return num;
	},
	set(score: number) {
		localStorage.setItem("SCORE", score.toString());
	},
};
