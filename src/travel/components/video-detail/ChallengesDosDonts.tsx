import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Extras } from "../../types";
import indexStyles from "../../index.module.scss";
import styles from "./ChallengesDosDonts.module.scss";

export const ChallengesDosDonts = ({
	challenges,
	dos,
	donts,
}: {
	challenges?: Extras["challenges"];
	dos?: Extras["dos"];
	donts?: Extras["donts"];
}) => {
	return (
		<div className={indexStyles.extraInfoContainer}>
			{challenges && (
				<>
					<h2 style={{ margin: "0" }}>Challenges</h2>
					{challenges.map((challengeItem) => (
						<div className={styles.doDontIconContainer} key={challengeItem}>
							<HeartBrokenIcon
								style={{
									color: "ffeb3b",
									fontSize: 30,
									margin: "0 0 0 -4px",
								}}
							/>
							<p className={styles.doDontText}>{challengeItem}</p>
						</div>
					))}
				</>
			)}
			{dos && (
				<>
					<h2 style={{ margin: "40px 0 0 0" }}>Do</h2>
					{dos.map((doItem) => (
						<div className={styles.doDontIconContainer} key={doItem}>
							<ThumbUpIcon style={{ color: "66bb6a" }} />
							<p className={styles.doDontText}>{doItem}</p>
						</div>
					))}
				</>
			)}
			{donts && (
				<>
					<h2 style={{ margin: "40px 0 0 0" }}>{"Don't"}</h2>
					{donts.map((dontItem) => (
						<div className={styles.doDontIconContainer} key={dontItem}>
							<ThumbDownIcon style={{ color: "f44336" }} />
							<p className={styles.doDontText}>{dontItem}</p>
						</div>
					))}
				</>
			)}
		</div>
	);
};
