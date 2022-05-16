import Header from "../../components/Header/Header";
import Panel from "../../components/Panel/Panel";
import Portofolio from "../../components/Portofolio/Portofolio";
import './Dashboard.css';
import WakatimeData from '../../utils/wakaTimeData.js'
import Charts from "../../components/Charts/Charts";
import Transactions from "../../components/Transactions/Transactions";
import UserDataTable from "../../components/UserDataTable/UserDataTable";
import { useContext } from "react";
import { AlertContext } from "../../providers/AlertProvider";

const Dashboard = props =>{
    const {
        imageSrc
     } = props
     const {alert} = useContext(AlertContext)
    return(
        <>
        
        <Panel/>
        <Header imageSrc={imageSrc}/>
        <section className="dashboardPage">
            {alert.appAlerts}
            <Transactions/>
       <UserDataTable/>
       <Charts data={WakatimeData}/>
        </section>
        </>
    )
}

export default Dashboard;