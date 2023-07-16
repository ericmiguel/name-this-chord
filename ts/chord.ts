class Chord {
	root: string;
	intervals: { [key: string]: string };
	intervalNames: string[];
	power: boolean;
	major: boolean;
	minor: boolean;
	sus: boolean;
	augmented: boolean;
	diminished: boolean;

	constructor(root: string, intervals: { [key: string]: string }) {
		this.root = root;
		this.intervals = intervals;
		this.intervalNames = [];
		this.power = false;
		this.major = false;
		this.minor = false;
		this.sus = false;
		this.augmented = false;
		this.diminished = false;

		for (const intervalName in this.intervals) {
			this.intervalNames.push(intervalName);
		}
	}

	getChordName(): string {
		let name = this.root;

		if (
			this.intervalNames.includes("perfect fifth") &&
			this.intervalNames.length === 2
		) {
			name += "5";
			this.power = true;
		} else if (this.intervalNames.includes("major third")) {
			name += "";
			this.major = true;

			if (this.intervalNames.includes("minor sixth")) {
				name += "(aug)";
				this.augmented = true;
			}
		} else if (this.intervalNames.includes("minor third")) {
			name += "m";
			this.minor = true;

			if (this.intervalNames.includes("augmented fourth")) {
				name += "(dim)";
				this.diminished = true;
			}
		} else if (this.intervalNames.includes("major second")) {
			name += "sus2";
			this.sus = true;
		} else if (this.intervalNames.includes("perfect fourth")) {
			name += "sus4";
			this.sus = true;
		}

		if (this.intervalNames.includes("major seventh")) {
			name += "(7)";
		} else if (this.intervalNames.includes("minor seventh")) {
			name += "(7b)";
		} else if (this.intervalNames.includes("major sixth")) {
			name += "(6)";
		} else if (this.intervalNames.includes("minor sixth")) {
			if (!name.includes("aug")) {
				name += "(6b)";
			}
		}

		return name;
	}
}

export { Chord };
