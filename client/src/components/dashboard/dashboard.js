import { Schedule } from "../Schedule/schedule"
import { Sidebar } from "../sidebar/Sidebar"

import './dashboard.scss'

export const Dashboard = () => {
    return (
        <div className="dashboard__wrapper">
            <Sidebar></Sidebar>
            <Schedule></Schedule>
        </div>
    )
}