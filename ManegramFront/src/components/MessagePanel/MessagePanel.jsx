import PanelBody from '../PanelBody/PanelBody';
import './MessagePanel.css'

function MessagePanel({property}){
    return <div>
        <PanelBody topLeft={{title:'Container info', info : property.info}} topMiddle={{title:'total Message' , content: property.message_count , link: '/seeMessagesCont'}} 
                    right={ [ {title:'Connected Bots' , content:property.connected_bots_count} , {title:'Total Admins' , content:property.connected_admins_count} , {title:'Created Since' , content:property.container.create_date} , {title:'Last Active' , content:property.container.last_active} ] } 
                    bottomLeft={property.last_7days_log} />
    </div>
}
export default MessagePanel;