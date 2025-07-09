
// import useNetworkStatus from "./components/Connection_Status/ConnectionStatus"
import SyncManager from "./components/SyncManager/Sync"
import DetailedNetworkStatus from "./components/Connection_Status/DetailedNetworkStatus"
import Viewer from "./components/DocumentViwer/LazyLoadPage/Doc_Viwer"

const Home = ()=> {
    // const isOnline = useNetworkStatus()

    return (
        <div>
     
            <SyncManager/>
            {/* {isOnline ? (
                <p>You are online!</p>
            ) : (
                <p>You are offline</p>
            )} */}
            {/* <DetailedNetworkStatus/> */}
            <Viewer/>
        </div>
    )


}

export default Home