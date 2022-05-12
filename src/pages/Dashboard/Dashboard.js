import Header from "../../components/Header/Header";
import Panel from "../../components/Panel/Panel";
import Portofolio from "../../components/Portofolio/Portofolio";
import './Dashboard.css';
import WakatimeData from '../../utils/wakaTimeData.js'
import Charts from "../../components/Charts/Charts";

const Dashboard = props =>{
    const {
        imageSrc
     } = props
    return(
        <>
        <Panel/>
        <Header imageSrc={imageSrc}/>
        <section className="dashboardPage">
       <Charts data={WakatimeData}/>
        </section>
        </>
    )
}

export default Dashboard;