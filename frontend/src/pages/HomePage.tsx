import landingImage from "../assets/landing.png"
import appDownloadImage from "../assets/appDownload.png"

const HomePage = () => {
    return (
        <div className={"flex flex-col gap-12"}>
            <div className={"bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16"}>
                <h1 className={"text-5xl font-bold tracking-tight text-orange-600"}>
                    Tuck into a takeaway today
                </h1>
                <span className={"text-xl"}>
                    Food is just a click way
                </span>
            </div>
            <div className={"grid md:grid-cols-2 gap-2"}>
                <img src={landingImage}/>
                <div className={"flex flex-col items-center gap-4 text-center"}>
                    <span className={"text-2xl font-bold tracking-tighter"}>
                        Order takeaway even faster
                    </span>
                    <span>
                        Download the app and order food in minutes
                    </span>
                    <img src={appDownloadImage} alt="Download image"/>
                </div>
            </div>
        </div>
    )
}
export default HomePage
