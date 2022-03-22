import React from 'react'
import { Result, Button } from 'antd';

class PageNotFound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result:{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                paddingBottom:'15vh'
            }
        }
    };
   
    render() {
        return (
            <div style={this.state.result}>
                <Result
                
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary">Back Home</Button>}
            />
            </div>
        )
    }
}

export default PageNotFound