import {$get, $post} from './intercept';

export function query() {
    return $get('/api/info', {
    
        method: 'GET'
    
    });
    
}