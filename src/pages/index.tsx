import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Video from './components/video'
import { useState,useRef,useEffect } from 'react'

const Home: NextPage = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const [data,setData] = useState([]);
  const [text,setText] = useState('')
  const [edata,setEdata] = useState([])
  const titleRef:any = useRef()


  const handlesubmit = (e:any) => {
    e.preventDefault();
    setText(titleRef.current.value);
    console.log(text);
    // const lang = text.match(/locale=(.*?)[&|$]/)[1]
    let lank:any = text.match(/lank=(.*?)$/)
    if(lank){
      lank = lank[1]
    }
    else{
      console.log('hai')
    }
    console.log(lank)
    fetch(`https://b.jw-cdn.org/apis/mediator/v1/media-items/J/${lank}?clientType=www`)
      .then((res) => {
        const data = res.json();
        return data;
      })
      .then((data) => setData(data.media[0].files.filter(f => 'subtitles' in f)[0].subtitles.url));
    fetch(`https://b.jw-cdn.org/apis/mediator/v1/media-items/E/${lank}?clientType=www`)
      .then((res) => {
        const edata = res.json();
        return edata;
      })
      .then((edata) => setEdata(edata.media[0].files.filter(f => f.label == '720p')[0].progressiveDownloadURL));
      // console.log(data)
      // console.log(edata)
  };
  

  return (
    <div className={styles.container}>
      <form className="mx-auto w-full max-w-sm" onSubmit={handlesubmit}>
  <div className="flex items-center border-b border-teal-500 py-2">
    <input ref={titleRef} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Jane Doe" aria-label="Full name" />
    <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
      取得
    </button>
    {/* <button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
      Cancel
    </button> */}
  </div>
</form>
      <Video
      video_src={edata}
      vtt_src={data}
      />
    </div>
  )
}

export default Home
