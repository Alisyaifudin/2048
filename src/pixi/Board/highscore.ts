const KEY = "SCORE_2048";
export const highscore = {
	get() {
		const score = localStorage.getItem(KEY);
		if (score === null) return 0;
		const num = Number(score);
		if (isNaN(num) || !isFinite(num)) {
			localStorage.removeItem(KEY);
			return 0;
		}
		return num;
	},
	set(score: number) {
		localStorage.setItem(KEY, score.toString());
	},
};
