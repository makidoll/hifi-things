declare class AnimationObject {
	jointNames: string[];
	frames: AnimationFrameObject[];

	getFrames(): AnimationFrameObject[];
	getJointNames(): string[];
}
