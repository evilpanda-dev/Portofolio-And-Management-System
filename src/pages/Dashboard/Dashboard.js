import Header from "../../components/Header/Header";
import Panel from "../../components/Panel/Panel";
import Portofolio from "../../components/Portofolio/Portofolio";
import './Dashboard.css';
import WakatimeData from '../../utils/wakaTimeData.js'
import Charts from "../../components/Charts/Charts";
import Transactions from "../../components/Transactions/Transactions";

const Dashboard = props =>{
    const {
        imageSrc
     } = props
    return(
        <>
        <Panel/>
        <Header imageSrc={imageSrc}/>
        <section className="dashboardPage">
            <Transactions/>
       <Charts data={WakatimeData}/>
        </section>
        </>
    )
}

export default Dashboard;