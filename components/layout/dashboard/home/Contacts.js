"use client";
import React from "react";
import { avatar } from "@material-tailwind/react";
import Avatar, { genConfig } from "react-nice-avatar";

const Contacts = () => {
  const contacts = [
    { name: "Sourabh", status: "online" },
    { name: "Gautam Raj", status: "online" },
    { name: "Anoy", status: "online" },
    { name: "Pratik", status: "offline" },
  ];

  const chunkSize = 2; // Number of avatars per row

  const chunkedContacts = [];
  for (let i = 0; i < contacts.length; i += chunkSize) {
    chunkedContacts.push(contacts.slice(i, i + chunkSize));
  }

  return (
    <div className="bg-transparent flex flex-col items-start">
      <h1 className="text-2xl text-primary-white font-bold mb-4">Contacts</h1>
      <div className="w-[310px] h-[190px] bg-gradient-to-r from-[#4AFF93] to-[#26FFFF]  rounded-lg p-1 ">
        <div className="bg-[#1C1D22] h-full rounded-lg">
          {chunkedContacts.map((chunk, index) => (
            <div key={index} className="flex justify-center items-center ">
              {chunk.map((contact) => (
                <div
                  key={contact.name}
                  className=" flex flex-col items-center w-[120px] my-[14px]"
                >
                  <div className="relative">
                    <Avatar
                      style={{ width: "2rem", height: "2rem" }}
                      {...genConfig(contact.name)}
                      className=""
                    />
                    <div
                      className={`absolute bottom-0 right-0 w-[6.5px] h-[6.5px] rounded-full ${
                        contact.status === "online"
                          ? "bg-primary"
                          : "bg-red-500"
                      } -mr-19 mb-15`}
                    ></div>
                  </div>
                  <h1 className="text-center text-primary-white text-[14px] font-bold mt-[12px]">
                    {contact.name}
                  </h1>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
