import React from "react";
import { View } from "react-native";

type SpacerProps = {
  readonly mt?: number;
  readonly mb?: number;
  readonly ml?: number;
  readonly mr?: number;
  readonly mx?: number;
  readonly my?: number;
};

export const Spacer = ({ mt, mb, ml, mr, mx, my }: SpacerProps) => {
  return (
    <View
      style={{
        marginBottom: mb,
        marginHorizontal: mx,
        marginLeft: ml,
        marginRight: mr,
        marginTop: mt,
        marginVertical: my,
      }}></View>
  );
};
