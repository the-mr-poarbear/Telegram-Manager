

import { useLocation } from 'react-router-dom';
import View from '../View/View';

function ViewFiltered(){
    const location = useLocation();
    const data = location.state;

    return <div className='d-flex justify-content-center mt-5' >
        <View keys={["message_id" ,"time_sent","content"]} title='Messages List' users={data} ></View>
    </div>
}

export default ViewFiltered;