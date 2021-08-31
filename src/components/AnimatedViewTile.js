import React from "react";
import { Animated } from "react-native";

import Colors from "./Colors";

function AnimatedViewTile(props) {
  const slideAnimation = new Animated.Value(0);
  const fadeInAnimation = new Animated.Value(0);

  Animated.sequence([
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }),
    Animated.timing(fadeInAnimation, {
      toValue: 1,
      duration: 75,
      useNativeDriver: true,
    }),
  ]).start();

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: props.isNew ? fadeInAnimation : 1,
        transform: [
          {
            translateX: slideAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [
                77 * props.oldCol + 8.4 * (props.oldCol + 1),
                77 * props.col + 8.4 * (props.col + 1),
              ],
            }),
          },
          {
            translateY: slideAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [
                77 * props.oldRow + 8.4 * (props.oldRow + 1),
                77 * props.row + 8.4 * (props.row + 1),
              ],
            }),
          },
        ],
      }}
    >
      {props.children}
    </Animated.View>
  );
}

export default AnimatedViewTile;
