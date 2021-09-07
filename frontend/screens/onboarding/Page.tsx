/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-mixed-type */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-raw-text */
import React from "react";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";

import { AppView, Typography } from "../../components";
import { Spacer } from "../../components/spacer";
import { COLORS } from "../../utils/colors";

type PageProps = {
  readonly title: string;
  readonly subtitle: string;
  readonly image: React.ReactNode;
  readonly backgroundColor: string;
  readonly rightButtonLabel: string;
  readonly rightButtonPress: () => void;
};

export const Page = ({
  backgroundColor,
  image,
  rightButtonLabel,
  rightButtonPress,
  subtitle,
  title,
}: PageProps) => {
  const windowWidth = useWindowDimensions().width;
  const HEIGHT = windowWidth * 0.21;
  const FOOTER_PADDING = windowWidth * 0.1;
  return (
    <>
      <AppView style={styles.container}>
        <Typography size={80} align="center">
          🦊
        </Typography>
        <Spacer my={16} />
        <Typography size={32} weight="bold">
          {title}
        </Typography>
        <Spacer my={8} />
        <Typography align="center" size={20}>
          {subtitle}
        </Typography>
        {image}
      </AppView>
      <AppView
        style={{
          alignItems: "center",
          backgroundColor,
          flexDirection: "row",
          height: HEIGHT,
          justifyContent: "flex-end",
          // opacity: 0.6,
          paddingHorizontal: FOOTER_PADDING,
        }}>
        <Pressable onPress={rightButtonPress}>
          <Typography size={20} color={COLORS.white}>
            {rightButtonLabel}
          </Typography>
        </Pressable>
      </AppView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 8,
  },
});
