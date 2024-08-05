import "./Loading.css"
const Loading = () => {
    return (
        <div className="loadingspinner">
            <div id="square1" style={{backgroundImage: "url('image/Bitmap1.png')", backgroundSize: "cover"}}></div>
            <div id="square2" style={{backgroundImage: "url('image/Bitmap2.png')", backgroundSize: "cover"}}></div>
            <div id="square3" style={{backgroundImage: "url('image/Bitmap3.png')", backgroundSize: "cover"}}></div>
            <div id="square4" style={{backgroundImage: "url('image/Bitmap1.png')", backgroundSize: "cover"}}></div>
            <div id="square5" style={{backgroundImage: "url('image/Bitmap2.png')", backgroundSize: "cover"}}></div>
        </div>
    );
};

export default Loading