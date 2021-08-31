import React from "react";
import { Animated } from "react-native";

function AnimatedViewTile(props) {
  const fadeInAnimation = new Animated.Value(0);

  Animated.timing(fadeInAnimation, {
    toValue: 0.5,
    duration: 2000,
    useNativeDriver: true,
  }).start();

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeInAnimation,
      }}
    >
      {props.children}
    </Animated.View>
  );
}

export default AnimatedViewTile;
