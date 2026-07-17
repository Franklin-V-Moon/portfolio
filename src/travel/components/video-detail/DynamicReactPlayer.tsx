import { Ref } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";

const DynamicReactPlayer = ({
	playerRef,
	...props
}: ReactPlayerProps & { playerRef?: Ref<ReactPlayer> }) => (
	<ReactPlayer ref={playerRef} {...props} />
);

export default DynamicReactPlayer;
