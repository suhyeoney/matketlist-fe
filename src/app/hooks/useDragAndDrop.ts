'use client'

import { ReactNode, useState } from 'react';

type DragAndDropProps<T> = {
  data: T[],
  setState: React.Dispatch<React.SetStateAction<T[]>>
};

const DragAndDrop = <T, >({ data, setState }: DragAndDropProps<T>) => {
  console.log('data', data);

  let dragged: EventTarget & HTMLDivElement;
  let over: EventTarget & HTMLDivElement;

  // const placeholder = document.createElement('div');
  // document.getElementById('hashtagList')?.appendChild(placeholder);
  // placeholder.className = 'placeholder';
  // placeholder.setAttribute('before', 'Drop Here');
  // placeholder.classList.add('bg-yellow-200');
  // placeholder.classList.add('before:content-[attr(before)]');
  // placeholder.classList.add('before:bg-lime-200');

  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text', e.currentTarget.id);
  };

  const dragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const tempArr = data;
    dragged.style.display = 'block';
    // dragged.parentNode?.removeChild(placeholder);
    let from = Number(dragged.dataset.id);
    let to = Number(over.dataset.id);
    console.log(`from: ${from}, to: ${to}`);
    if(from < to) {
      to--;
    }
    tempArr.splice(to, 0, tempArr.splice(from, 1)[0]);
    console.log('tempArr', tempArr);
    setState([ ...tempArr ]);
  };

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragged.style.display = 'none';
    // if(e.currentTarget.className === 'placeholder') return;
    over = e.currentTarget;
    // e.currentTarget.parentElement?.insertBefore(placeholder, e.currentTarget);
  };

  return {
    dragStart,
    dragEnd,
    dragOver,
  };
};

export default DragAndDrop;