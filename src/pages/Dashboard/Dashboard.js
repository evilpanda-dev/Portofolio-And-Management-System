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
import CommentsTable from "../../components/CommentsTable/CommentsTable";
import { UserCountContext } from "../../providers/UserCountProvider";
import { CommentCountContext } from "../../providers/CommentCountProvider";

const Dashboard = props =>{
    const {
        imageSrc
     } = props
     const {alert} = useContext(AlertContext)
     const {userCount} = useContext(UserCountContext)
     const {commentsCount} = useContext(CommentCountContext)
    return(
        <>
        <Panel/>
        <Header imageSrc={imageSrc}/>
        <section className="dashboardPage">
            {alert.appAlerts}
                <h1 className="transactionsTitle">Welcome to your dashboard</h1>
            <div className="cardBox">
                <div className="card">
                <h2 className="numbers">{userCount.totalUsers}</h2>
                <h4 className="cardName"> Total users</h4>
                </div>
                <div className="card">
                <h2 className="numbers">{commentsCount.totalComments}</h2>
                <h4 className="cardName"> Total comments</h4>
                </div>
            </div>
       <UserDataTable/>
<CommentsTable/>
            <Transactions/>
       <Charts data={WakatimeData}/>
        </section>
        </>
    )
}

export default Dashboard;