
type Props = {
    video_src:any
    vtt_src:any
}

const Video = (props:Props) =>{
    return(
        <div className="flex flex-col mx-auto container items-center">
            <h1>video</h1>
            <video controls crossOrigin="" src={props.video_src}>
                <track default srcLang="ja" src={props.vtt_src} />
            </video>
        </div>
    )
}

export default Video