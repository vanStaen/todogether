import { parse } from 'node-html-parser';

export const getTitleFromUrl = async (url) => {  
    const response = await fetch(url);
    const html = await response.text()
    const doc = parse(html);
    const title = doc.querySelectorAll('title')[0];
    return title.innerText;
  };