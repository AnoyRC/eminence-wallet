"use client";

import { useState } from "react";

import Avatar, { genConfig } from "react-nice-avatar";
import GenerateNewAvatar from "./GenerateNewAvatar";

const EminentAvatar = ({ avatar, setAvatar }) => {
  const config = genConfig(avatar);

  return (
    <section className="relative mb-8">
      <Avatar
        style={{ width: "12rem", height: "12rem" }}
        {...config}
        className="border-primary-black border-2"
      />

      <GenerateNewAvatar setRandomString={setAvatar} />
    </section>
  );
};

export default EminentAvatar;
