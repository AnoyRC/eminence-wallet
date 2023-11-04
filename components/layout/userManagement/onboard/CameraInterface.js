'use client';

import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  CameraIcon,
} from '@heroicons/react/24/solid';
import Webcam from 'react-webcam';
import { useSelector, useDispatch } from 'react-redux';
import { useRef, useCallback, useState } from 'react';
import { setFile, setImage } from '@/redux/fileSlice';
import Image from 'next/image';
import useToast from '@/hooks/useToast';

export default function CameraInterface() {
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const image = useSelector((state) => state.file.image);
  const file = useSelector((state) => state.file.file);
  const { Info, Error } = useToast();

  function download(e, file) {
    e.preventDefault();

    const link = document.createElement('a');
    const url = URL.createObjectURL(file);

    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  const capture = async (e) => {
    e.preventDefault();
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch(setImage(imageSrc));
    await fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const imageFile = new File([blob], 'image.png', {
          type: 'image/png',
        });
        dispatch(setFile(imageFile));
        console.log(imageFile);
      });
    Info('Make sure to download the image.');
  };

  const retake = (e) => {
    e.preventDefault();
    dispatch(setImage(null));
    dispatch(setFile(null));
  };

  return !image ? (
    <div className="flex w-[400px] h-[300px] flex-col items-center justify-center relative">
      <Webcam
        audio={false}
        height={300}
        width={400}
        screenshotFormat="image/png"
        videoConstraints={{
          facingMode: 'user',
        }}
        ref={webcamRef}
      ></Webcam>
      <div className="absolute ">
        <button
          className="bg-black/30 text-white rounded-full h-[100px] w-[100px] hover:bg-black/50 flex items-center justify-center group"
          onClick={(e) => capture(e)}
        >
          <CameraIcon className="h-10 w-10 opacity-60 group-hover:opacity-100" />
        </button>
      </div>
      <div className="relative w-[80%] group hover:cursor-pointer flex items-center justify-center text-bold mt-1">
        <p className="absolute group-hover:underline font-bold">
          Import your own image
        </p>

        <input
          type="file"
          className="w-full"
          style={{
            opacity: 0,
          }}
          required={true}
          onChange={(e) => {
            if (
              e.target.files[0].type === 'image/png' ||
              e.target.files[0].type === 'image/jpg' ||
              e.target.files[0].type === 'image/jpeg' ||
              e.target.files[0].type === 'image/webp'
            ) {
              dispatch(setFile(e.target.files[0]));
              dispatch(setImage(URL.createObjectURL(e.target.files[0])));
              return;
            }

            Error('Please upload a valid image file.');
          }}
        ></input>
      </div>
    </div>
  ) : (
    <div className="flex w-[400px] h-[300px] flex-col items-center justify-center gap-5 relative">
      <Image
        src={image}
        alt="Picture of the author"
        width={500}
        height={500}
        className=" w-auto max-w-full object-cover"
      />
      <div className="absolute bottom-2 right-2 flex flex-col gap-2 ">
        <button
          className="bg-black/40 text-white rounded-full h-[50px] w-[50px] hover:bg-black/50 flex items-center justify-center group"
          onClick={(e) => retake(e)}
        >
          <ArrowPathIcon className="h-5 w-5 opacity-80 group-hover:opacity-100" />
        </button>

        <button
          className="bg-white text-red-900 rounded-full h-[50px] w-[50px] flex items-center justify-center group hover:bg-black hover:text-white transition-colors duration-300"
          onClick={(e) => download(e, file)}
        >
          <ArrowDownTrayIcon className="h-5 w-5 opacity-100" />
        </button>
      </div>
    </div>
  );
}
