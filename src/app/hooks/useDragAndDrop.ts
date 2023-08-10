'use client'

import { ReactNode, useState } from 'react';

interface DragAndDropProps<T> {
  data: T[],
  elements: NodeListOf<Element>,
  setState: React.Dispatch<React.SetStateAction<T[]>>,
  idPrefix: string,
  containerId: string,
  rootId: string,
};

const DragAndDrop = <T, >({ data, elements, setState, idPrefix, containerId, rootId }: DragAndDropProps<T>) => {

  let dragged: EventTarget & HTMLDivElement;
  let over: EventTarget & HTMLDivElement;

  const placeholder = document.createElement('div');
  const classList = ('flex flex-row gap-2 items-center justify-center w-full ' + 
  'border-2 border-gray-200 border-dotted rounded-[10px] p-3 ' +
  'before:content-[attr(before)] before:text-red-500').split(' ');
  placeholder.className = 'placeholder';
  placeholder.setAttribute('before', 'Drop! Drop! Drop!');
  for(const c of classList) {
    placeholder.classList.add(c);
  }

  const hashtagImages = document.querySelectorAll('.hashtagImage');
  const hashtagInputs = document.querySelectorAll('.hashtagInput');
  const hashtagMinusButtons = document.querySelectorAll('.hashtagMinusButton');

  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    for(let i = 0; i < elements.length; i++) {
      hashtagImages[i].classList.add('pointer-events-none');
      hashtagInputs[i].setAttribute('readOnly', 'true');
      hashtagInputs[i].classList.add('pointer-events-none');
      hashtagMinusButtons[i].classList.add('pointer-events-none');    
    }
    dragged = e.currentTarget;
    placeholder.classList.add('cursor-grab');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text', e.currentTarget.id);
  };

  const dragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const tempArr = data;
    const container = document.getElementById(containerId);
    dragged.style.display = 'block';
    if(container?.contains(placeholder)) {
      dragged.parentNode?.removeChild(placeholder);
    } else {
      return;
    }
    let from = Number(dragged.dataset.id);
    let to = Number(over.dataset.id);
    console.log(`from: ${from}, to: ${to}`);
    if(from < to) {
      to--;
    }
    tempArr.splice(to, 0, tempArr.splice(from, 1)[0]);
    console.log('tempArr', tempArr);
    setState([ ...tempArr ]);
    
    for(let i = 0; i < elements.length; i++) {
      hashtagImages[i].classList.remove('pointer-events-none');
      hashtagInputs[i].removeAttribute('readOnly');
      hashtagInputs[i].classList.remove('pointer-events-none');
      hashtagMinusButtons[i].classList.remove('pointer-events-none');    
    }
  };

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragged.style.display = 'none';
    // elements.forEach((e: Element) => {
    //   e.setAttribute('aria-disabled', 'true');
    // });
    if((e.target as HTMLDivElement).className === 'placeholder') return;
    // if((e.target as HTMLDivElement).id !== rootId) return;
    if((e.target as HTMLDivElement).id === undefined || !(e.target as HTMLDivElement).id.includes(idPrefix)) return;
    over = e.target as HTMLDivElement;
    (e.target as HTMLDivElement).parentElement?.insertBefore(placeholder, e.target as HTMLDivElement);
    // console.log('target ID', (e.target as HTMLDivElement).id);
    // (e.target as HTMLDivElement).parentElement?.insertBefore(placeholder, (e.target as HTMLDivElement).nextSibling);

  };

  return {
    dragStart,
    dragEnd,
    dragOver,
  };
};

export default DragAndDrop;