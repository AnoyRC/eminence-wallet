"use client";
import { useState } from "react";
import CardFront from "./CardFront";
import CardBack from "./CardBack";

export default function CardContainer({ design, user }) {
  const [isFrontCardVisible, setIsFrontCardVisible] = useState(true);

  const toggleCard = () => {
    setIsFrontCardVisible((prevIsFrontCardVisible) => !prevIsFrontCardVisible);
  };

  return isFrontCardVisible ? (
    <CardFront toggleCard={toggleCard} user={user} design={design} />
  ) : (
    <CardBack toggleCard={toggleCard} user={user} design={design} />
  );
}
