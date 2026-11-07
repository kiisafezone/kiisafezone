import React from "react";
import { Composition } from "remotion";
import { ReadmeShowcase } from "./Showcase";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ReadmeShowcase"
      component={ReadmeShowcase}
      durationInFrames={1800}
      fps={30}
      width={1080}
      height={2436}
    />
  );
};
