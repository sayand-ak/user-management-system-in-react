import "./ErrorPage.css"

function ErrorComponent(){
    return(
        <div className="errorMainDiv">
            <h1>500</h1>
            <p>Server Under maintainance!</p>
            <span className="text-white text-xl">Try again after sometime</span>
        </div>
    )
}

export default ErrorComponent